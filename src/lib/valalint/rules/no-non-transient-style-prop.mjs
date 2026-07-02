import isPropValid from '@emotion/is-prop-valid';

/**
 * styled-components v6 forwards every prop to the underlying host DOM element
 * unless it is a `$`-prefixed transient prop (or filtered by an explicit
 * `shouldForwardProp`). A style-only prop whose name is not a valid HTML/React
 * attribute therefore leaks to the DOM and triggers a React `console.error`.
 *
 * This rule flags a `styled.<htmlTag>` template that reads such a prop
 * (`props.foo` or a destructured `({ foo }) => ...`) when `foo` is neither
 * `$`-prefixed nor a known valid HTML/React attribute. It intentionally does
 * NOT flag:
 *   - `styled(Component)` targets (only host elements auto-forward to the DOM),
 *   - styled components that declare `.withConfig({ shouldForwardProp })`
 *     (the author has explicitly taken control of prop forwarding, e.g. Box/Text),
 *   - `theme` / `as` / `forwardedAs` (framework props), and
 *   - valid HTML/React attributes such as `disabled`, `href`, `type`, `aria-*`,
 *     `role`, and event handlers (Tier 3 — they must reach the DOM).
 */

const HTML_TAG = /^[a-z][a-z0-9-]*$/;
const FRAMEWORK_PROPS = new Set(['theme', 'as', 'forwardedAs']);

/**
 * Resolve a tagged-template tag to a styled host element.
 * Returns { tag, hasShouldForwardProp } for `styled.div`, `styled.div.attrs(..)`,
 * `styled.div.withConfig(..)`, etc. Returns null for `styled(Component)` chains.
 */
function resolveStyledHost(node) {
  let hasShouldForwardProp = false;

  function unwrap(n) {
    if (!n) return null;
    if (n.type === 'CallExpression') {
      const callee = n.callee;
      // Detect `.withConfig({ shouldForwardProp })` anywhere in the chain.
      if (
        callee.type === 'MemberExpression' &&
        callee.property.type === 'Identifier' &&
        callee.property.name === 'withConfig' &&
        n.arguments[0]?.type === 'ObjectExpression' &&
        n.arguments[0].properties.some(
          (p) =>
            p.type === 'Property' &&
            p.key.type === 'Identifier' &&
            p.key.name === 'shouldForwardProp',
        )
      ) {
        hasShouldForwardProp = true;
      }
      return unwrap(callee);
    }
    if (n.type === 'MemberExpression') {
      // `styled.div` → object is the `styled` identifier.
      if (n.object.type === 'Identifier' && n.object.name === 'styled') {
        return n.property.type === 'Identifier' &&
          HTML_TAG.test(n.property.name)
          ? n.property.name
          : null;
      }
      // `styled.div.attrs` / `styled.div.withConfig` → keep unwrapping.
      return unwrap(n.object);
    }
    // Bare `styled` identifier or `styled(Component)` → not a host tag.
    return null;
  }

  const tag = unwrap(node);
  return tag ? { tag, hasShouldForwardProp } : null;
}

const noNonTransientStyleProp = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow reading non-transient, non-valid-HTML style props inside a styled host element (styled-components v6 would forward them to the DOM)',
      category: 'Possible Errors',
      recommended: false,
    },
    schema: [],
    messages: {
      useTransient:
        "Style-only prop '{{name}}' read in a styled host element will be forwarded to the DOM in styled-components v6. " +
        "Rename it to a transient prop '${{name}}', or filter it with .withConfig({ shouldForwardProp }).",
    },
  },

  create(context) {
    function checkName(name, reportNode) {
      if (name.startsWith('$')) return;
      if (FRAMEWORK_PROPS.has(name)) return;
      if (isPropValid(name)) return;
      context.report({ node: reportNode, messageId: 'useTransient', data: { name } });
    }

    // Walk an interpolation expression, tracking which identifiers are the
    // "props" parameter of the enclosing arrow/function so that `props.foo`
    // reads and `({ foo }) => ...` destructures are attributed correctly.
    function walk(node, propParams) {
      if (!node || typeof node.type !== 'string') return;

      if (
        node.type === 'ArrowFunctionExpression' ||
        node.type === 'FunctionExpression'
      ) {
        const nextParams = new Set(propParams);
        for (const param of node.params) {
          if (param.type === 'Identifier') {
            nextParams.add(param.name);
          } else if (param.type === 'ObjectPattern') {
            for (const prop of param.properties) {
              if (prop.type === 'Property' && prop.key.type === 'Identifier') {
                checkName(prop.key.name, prop.key);
              }
            }
          }
        }
        walk(node.body, nextParams);
        return;
      }

      if (
        node.type === 'MemberExpression' &&
        !node.computed &&
        node.object.type === 'Identifier' &&
        propParams.has(node.object.name) &&
        node.property.type === 'Identifier'
      ) {
        checkName(node.property.name, node.property);
      }

      for (const key of Object.keys(node)) {
        if (key === 'parent') continue;
        const child = node[key];
        if (Array.isArray(child)) {
          for (const c of child) walk(c, propParams);
        } else if (child && typeof child.type === 'string') {
          walk(child, propParams);
        }
      }
    }

    return {
      TaggedTemplateExpression(node) {
        const host = resolveStyledHost(node.tag);
        if (!host || host.hasShouldForwardProp) return;
        for (const expr of node.quasi.expressions) {
          walk(expr, new Set());
        }
      },
    };
  },
};

export default noNonTransientStyleProp;
