import type { ReactNode } from 'react';
import { CopyButton, type CopyButtonProps } from './copy-button';

type CodeBlockFrameProps = Pick<CopyButtonProps, 'text' | 'onCopySuccess' | 'onCopyError'> & {
  children: ReactNode;
};

/** Shared chrome for commands, source examples, signatures and API responses. */
export function CodeBlockFrame({ children, ...copyProps }: CodeBlockFrameProps) {
  return (
    <div className="docs-code not-prose relative my-4 overflow-hidden rounded-xl border border-border bg-code text-code-foreground">
      {children}
      <CopyButton
        {...copyProps}
        className="docs-code-copy absolute right-0 top-0 z-10 min-h-11 min-w-11 rounded-lg border-none [&_svg]:size-4"
        variant="ghost"
        size="icon-lg"
        aria-label="Salin kode"
      />
    </div>
  );
}
