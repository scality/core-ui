const modalFooterRequired = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce that <Modal> always receives a footer prop',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
    },

    create(context) {
        return {
            JSXElement(node) {
                if (node.openingElement.name.name !== 'Modal') return;

                const hasFooter = node.openingElement.attributes.some(
                    attr => attr.type === 'JSXAttribute' && attr.name.name === 'footer',
                );

                if (!hasFooter) {
                    context.report({
                        node: node.openingElement,
                        message: '<Modal> must have a footer prop.',
                    });
                }
            },
        };
    },
};

export default modalFooterRequired;
