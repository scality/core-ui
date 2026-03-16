import ts from 'typescript';

/**
 * Returns true when the TypeScript type — or any member of a union — is a
 * numeric type (number primitive or a number literal type such as `42`).
 */
function typeIncludesNumber(type) {
    if (type.flags & ts.TypeFlags.Number) return true;
    if (type.flags & ts.TypeFlags.NumberLiteral) return true;
    // Handle union types: `number | undefined`, `number | null`, `string | number`, …
    if (type.flags & ts.TypeFlags.Union) {
        return type.types.some(t => typeIncludesNumber(t));
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

                if (typeIncludesNumber(type)) {
                    context.report({ node, messageId: 'rawNumber' });
                }
            },
        };
    },
};

export default noRawNumberInJsx;
