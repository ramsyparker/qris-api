import { useRef, type ComponentProps } from 'react';
import { Braces, Code2, Terminal } from 'lucide-react';
import { CodeBlockFrame } from './code-block-frame';

type Props = ComponentProps<'pre'> & { 'data-language'?: string };
const languageNames: Record<string, string> = {
  ts: 'TypeScript', tsx: 'TSX', js: 'JavaScript', jsx: 'JSX',
  bash: 'Terminal', sh: 'Terminal', shell: 'Terminal', json: 'JSON',
  html: 'HTML', css: 'CSS', text: 'Teks',
};

export function DocsCodeBlock({ children, title, className, ref: _ref, ...props }: Props) {
  const contentRef = useRef<HTMLPreElement>(null);
  const language = props['data-language'] ?? 'text';
  const Icon = ['bash', 'sh', 'shell'].includes(language) ? Terminal : language === 'json' ? Braces : Code2;

  return (
    <CodeBlockFrame text={() => {
      const code = contentRef.current?.cloneNode(true) as HTMLElement | undefined;
      code?.querySelectorAll('.nd-copy-ignore').forEach((node) => node.remove());
      return code?.textContent ?? '';
    }}>
      <div className="docs-code-header">
        <Icon aria-hidden="true" />
        <span className="truncate">{title || languageNames[language] || language}</span>
      </div>
      <pre {...props} ref={contentRef} tabIndex={0} aria-label={title || `${languageNames[language] || language} code`} className={`docs-code-pre ${className ?? ''}`}>
        {children}
      </pre>
    </CodeBlockFrame>
  );
}
