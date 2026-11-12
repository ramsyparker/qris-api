import type { ReactNode } from 'react';
import { Button, type buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
};

export function LinkButton({
  href,
  children,
  className,
  target,
  rel,
  ariaLabel,
  variant = 'default',
  size = 'default',
}: LinkButtonProps) {
  return (
    <Button
      render={<a href={href} target={target} rel={rel} aria-label={ariaLabel} />}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
