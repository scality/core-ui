const modalTitleString = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Enforce that the title prop of <Modal> is a string, not JSX — important for correct aria-labelledby screen reader behaviour',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
    },

    create(context) {
        return {
            JSXElement(node) {
                if (node.openingElement.name.name !== 'Modal') return;

                const titleAttr = node.openingElement.attributes.find(
                    attr => attr.type === 'JSXAttribute' && attr.name.name === 'title',
                );
                if (!titleAttr || !titleAttr.value) return;

                const value = titleAttr.value;

                // title="string literal" — always fine
                if (value.type === 'Literal') return;

                if (value.type === 'JSXExpressionContainer') {
                    const expr = value.expression;
                    // title={"string"} or title={`template`} or title={variable} — fine
                    if (expr.type === 'Literal' && typeof expr.value === 'string') return;
                    if (expr.type === 'TemplateLiteral') return;
                    if (expr.type === 'Identifier') return;
                    // title={fn()} — call expression likely returns a string, trust it
                    if (expr.type === 'CallExpression') return;
                    if (expr.type === 'MemberExpression') return;

                    // title={<JSX />} or title={{...}} — flag
                    context.report({
                        node: titleAttr,
                        message:
                            '<Modal> title should be a plain string for correct screen reader behaviour (aria-labelledby). Use a string literal, template literal, or a string variable instead of JSX.',
                    });
                }
            },
        };
    },
};

export default modalTitleString;
