const RESOURCE_NAMES = [
  'Bucket', 'Object', 'Node', 'Disk', 'Volume', 'Cluster', 'Policy', 'User',
  'Group', 'Role', 'Workflow', 'Rule', 'Account', 'License', 'Location', 'Alert', 'Certificate'
];
const TARGET_COMPONENTS = ['Button', 'Text', 'Tooltip'];

function checkSentenceCase(text) {
  const trimmed = text.trim();
  if (!trimmed) return true;
  const firstLetter = trimmed.charAt(0);
  return firstLetter === firstLetter.toUpperCase();
}

function checkResourceNames(text) {
  for (const resource of RESOURCE_NAMES) {
    const regex = new RegExp(`\\b${resource.toLowerCase()}\\b`);
    const match = text.match(regex);
    if (match) {
      return resource;
    }
  }
  return null;
}

const technicalSentenceCase = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Technical Sentence Case for UI text',
      category: 'Stylistic Issues',
      recommended: false,
    },
    schema: [],
    fixable: 'code',
  },

  create(context) {
    return {
      JSXElement(node) {
        const name = node.openingElement.name.name;
        if (!TARGET_COMPONENTS.includes(name)) return;

        // Find the index of the first non-empty JSXText child that appears
        // before any non-text node. Sentence case only applies to that child.
        let firstTextChildIndex = -1;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.type === 'JSXText' && child.value.trim()) {
            firstTextChildIndex = i;
            break;
          } else if (child.type !== 'JSXText') {
            break; // expression comes first — can't determine sentence start
          }
        }

        node.children.forEach((child, index) => {
          // Only check for JSXText (e.g., <Button>text</Button>)
          if (child.type === 'JSXText') {
            const text = child.value.trim();
            if (!text) return;

            // Compose the fixed text for both fixes if needed
            let fixedText = text;

            // Sentence case fix — only on the first visible text fragment
            if (index === firstTextChildIndex && !checkSentenceCase(text)) {
              fixedText = fixedText.charAt(0).toUpperCase() + fixedText.slice(1);
              context.report({
                node: child,
                message: `Text in <${name}> should start with a capital letter (sentence case).`,
                fix: fixer => fixer.replaceText(child, ' ' + fixedText + ' ')
              });
            }

            // Resource name fix
            const wrongResource = checkResourceNames(text);
            if (wrongResource) {
              const regex = new RegExp(`\\b${wrongResource.toLowerCase()}\\b`, 'g');
              fixedText = fixedText.replace(regex, wrongResource);
              context.report({
                node: child,
                message: `Resource name "${wrongResource}" in <${name}> must be capitalized.`,
                fix: fixer => fixer.replaceText(child, fixedText)
              });
            }
          }
        });
      }
    };
  }
};

export default technicalSentenceCase;
