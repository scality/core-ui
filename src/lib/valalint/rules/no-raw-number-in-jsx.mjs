import ts from 'typescript';

/**
 * Returns true when the TypeScript type is a numeric type (number primitive or
 * a number literal type such as `42`), or a union where number is the only
 * non-nullish type (e.g., `number | undefined`, `number | null`).
 *
 * Does NOT match broad types like ReactNode where number is just one of many
 * non-nullish options.
 */
function isPureNumberType(type) {
    if (type.flags & ts.TypeFlags.Number) return true;
    if (type.flags & ts.TypeFlags.NumberLiteral) return true;

    // Handle union types: only flag if number is the primary type
    // (i.e., the only non-nullish member)
    if (type.flags & ts.TypeFlags.Union) {
        let hasNumber = false;
        let hasOtherNonNullishType = false;

        for (const t of type.types) {
            // Check if this member is a number
            if (t.flags & ts.TypeFlags.Number || t.flags & ts.TypeFlags.NumberLiteral) {
                hasNumber = true;
            }
            // Check if this member is a non-nullish, non-number type
            else if (!(t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.Void))) {
                hasOtherNonNullishType = true;
            }
        }

        // Only flag if we have number and no other non-nullish types
        return hasNumber && !hasOtherNonNullishType;
    }

    return false;
}

const noRawNumberInJsx = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Disallow raw numeric expressions in JSX text; use formatISONumber() instead',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
        messages: {
            rawNumber:
                'Avoid rendering raw numbers in JSX text. ' +
                'Use formatISONumber(value) to apply proper ISO formatting ' +
                '(space as thousands separator, leading zero before decimal point).',
        },
    },

    create(context) {
        // Type-aware rule: opt out gracefully when no TypeScript program is available.
        const services = context.sourceCode?.parserServices ?? context.parserServices;
        if (!services?.program) return {};

        const checker = services.program.getTypeChecker();

        return {
            JSXExpressionContainer(node) {
                // Only flag children positions — attribute values are intentionally excluded.
                // A child container's direct parent is JSXElement; an attribute value's is JSXAttribute.
                if (node.parent.type !== 'JSXElement') return;

                const { expression } = node;

                // Skip {/* JSX comments */}
                if (expression.type === 'JSXEmptyExpression') return;

                const tsNode = services.esTreeNodeToTSNodeMap.get(expression);
                const type = checker.getTypeAtLocation(tsNode);

                if (isPureNumberType(type)) {
                    context.report({ node, messageId: 'rawNumber' });
                }
            },
        };
    },
};

export default noRawNumberInJsx;
