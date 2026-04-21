/**
 * Matches whole words "yes", "no", or "ok" case-insensitively.
 * "Okay", "Book", "Note", "Yesterday" etc. are intentionally NOT matched.
 */
const FORBIDDEN_PATTERN = /\b(yes|no|ok)\b/i;

/**
 * Walks up the ancestor chain to determine whether `node` is a descendant
 * of a <Modal> JSX element (including elements nested inside JSX attribute
 * expression containers such as the `footer` prop).
 */
function isInsideModal(node) {
    let current = node.parent;
    while (current) {
        if (
            current.type === 'JSXElement' &&
            current.openingElement?.name?.name === 'Modal'
        ) {
            return true;
        }
        current = current.parent;
    }
    return false;
}

const modalButtonForbiddenLabel = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Disallow Button labels containing "Yes", "No", or "Ok" inside a Modal',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
    },

    create(context) {
        return {
            JSXElement(node) {
                if (node.openingElement.name.name !== 'Button') return;
                if (!isInsideModal(node)) return;

                // ── Check JSX text children ─────────────────────────────────────────
                node.children.forEach(child => {
                    if (child.type !== 'JSXText') return;
                    const text = child.value.trim();
                    if (text && FORBIDDEN_PATTERN.test(text)) {
                        context.report({
                            node: child,
                            message:
                                'Button inside Modal should not use "Yes", "No", or "Ok" as a label.',
                        });
                    }
                });

                // ── Check label prop ────────────────────────────────────────────────
                const labelProp = node.openingElement.attributes.find(
                    attr => attr.type === 'JSXAttribute' && attr.name.name === 'label',
                );
                if (!labelProp?.value) return;

                let labelText = null;
                if (labelProp.value.type === 'Literal') {
                    // label="Ok, delete"
                    labelText = String(labelProp.value.value);
                } else if (
                    labelProp.value.type === 'JSXExpressionContainer' &&
                    labelProp.value.expression.type === 'Literal'
                ) {
                    // label={"Ok, delete"}
                    labelText = String(labelProp.value.expression.value);
                }

                if (labelText && FORBIDDEN_PATTERN.test(labelText)) {
                    context.report({
                        node: labelProp,
                        message:
                            'Button inside Modal should not use "Yes", "No", or "Ok" as a label.',
                    });
                }
            },
        };
    },
};

export default modalButtonForbiddenLabel;
