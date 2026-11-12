import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/layouts/flux/page';
import { CodeBlockCommand } from './code-block-command';
import { DocsCodeBlock } from './docs-code-block';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: DocsCodeBlock,
    CodeBlockCommand,
    ...components,
  } satisfies MDXComponents;
}

export default getMDXComponents({ wrapper: DocsBody });
