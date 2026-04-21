const modalAlertdialogNoClose = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce that <Modal role="alertdialog"> does not receive a close prop',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
    },

    create(context) {
        return {
            JSXElement(node) {
                if (node.openingElement.name.name !== 'Modal') return;

                const roleAttr = node.openingElement.attributes.find(
                    attr => attr.type === 'JSXAttribute' && attr.name.name === 'role',
                );
                if (!roleAttr) return;

                let role = null;
                if (roleAttr.value?.type === 'Literal') {
                    role = roleAttr.value.value;
                } else if (
                    roleAttr.value?.type === 'JSXExpressionContainer' &&
                    roleAttr.value.expression.type === 'Literal'
                ) {
                    role = roleAttr.value.expression.value;
                }
                if (role !== 'alertdialog') return;

                const hasClose = node.openingElement.attributes.some(
                    attr => attr.type === 'JSXAttribute' && attr.name.name === 'close',
                );

                if (hasClose) {
                    context.report({
                        node: node.openingElement,
                        message:
                            '<Modal role="alertdialog"> must not have a close prop. Alert dialogs require an explicit user action via footer buttons.',
                    });
                }
            },
        };
    },
};

export default modalAlertdialogNoClose;
