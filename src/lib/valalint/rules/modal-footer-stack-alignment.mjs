/**
 * Walks up the ancestor chain to check whether `node` is inside the `footer`
 * prop of a `<Modal>` element.
 */
function isInModalFooterProp(node) {
    let current = node.parent;
    while (current) {
        if (
            current.type === 'JSXAttribute' &&
            current.name?.name === 'footer' &&
            current.parent?.name?.name === 'Modal'
        ) {
            return true;
        }
        current = current.parent;
    }
    return false;
}

const modalFooterStackAlignment = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Enforce that a <Stack> inside a Modal footer has justifyContent="flex-end"',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
    },

    create(context) {
        return {
            JSXElement(node) {
                if (node.openingElement.name.name !== 'Stack') return;
                if (!isInModalFooterProp(node)) return;

                const hasFlexEnd = node.openingElement.attributes.some(attr => {
                    if (attr.type !== 'JSXAttribute') return false;
                    if (attr.name.name !== 'justifyContent') return false;
                    const val = attr.value;
                    if (val?.type === 'Literal') return val.value === 'flex-end';
                    if (
                        val?.type === 'JSXExpressionContainer' &&
                        val.expression.type === 'Literal'
                    ) {
                        return val.expression.value === 'flex-end';
                    }
                    return false;
                });

                if (!hasFlexEnd) {
                    context.report({
                        node: node.openingElement,
                        message:
                            '<Stack> inside a Modal footer must have justifyContent="flex-end".',
                    });
                }
            },
        };
    },
};

export default modalFooterStackAlignment;
