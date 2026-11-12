// The Astro adapter's hidden code tag can be restored as an inner <pre>
// by Satteri. Restore the standard pre > code shape before highlighting.
export function normalizeCodeBlocks() {
  return {
    name: 'normalize-docs-code-blocks',
    element: {
      filter: ['pre'],
      visit(node, ctx) {
        const child = node.children[0];
        if (node.children.length === 1 && child?.type === 'element' && child.tagName === 'pre') {
          ctx.replaceNode(node, {
            ...node,
            children: [{ ...child, tagName: 'code' }],
          });
        }
      },
    },
  };
}
