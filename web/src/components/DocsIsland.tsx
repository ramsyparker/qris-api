import { navigate } from 'astro:transitions/client';
import { RootProvider } from 'fumadocs-ui/provider/astro';
import { useFumadocsLoader, type SerializedPageTree } from 'fumadocs-core/source/client';
import type { TOCItemType } from 'fumadocs-core/toc';
import { DocsLayout } from 'fumadocs-ui/layouts/flux';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  type SidebarProviderProps,
} from 'fumadocs-ui/layouts/flux/slots/sidebar';
import { DocsPage, DocsTitle, DocsDescription } from 'fumadocs-ui/layouts/flux/page';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore, type ReactNode } from 'react';

interface DocsIslandProps {
  pathname: string;
  params: Record<string, string | undefined>;
  tree: SerializedPageTree;
  title: string;
  description?: string;
  toc: TOCItemType[];
  children: ReactNode;
  locale: 'id' | 'en';
}

function SharedSidebarProvider({ children }: SidebarProviderProps) {
  return <>{children}</>;
}

const sharedSidebarSlots = {
  provider: SharedSidebarProvider,
  root: Sidebar,
  trigger: SidebarTrigger,
  useSidebar,
};

const subscribe = () => () => {};

function ThemeControls() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div className="docs-theme-switch" role="group" aria-label="Theme">
      <button type="button" aria-label="Light theme" aria-pressed={mounted && resolvedTheme === 'light'} onClick={() => setTheme('light')}>
        <Sun aria-hidden="true" />
      </button>
      <button type="button" aria-label="Dark theme" aria-pressed={mounted && resolvedTheme === 'dark'} onClick={() => setTheme('dark')}>
        <Moon aria-hidden="true" />
      </button>
    </div>
  );
}

export function DocsIsland({
  pathname,
  params,
  tree,
  title,
  description,
  toc,
  children,
  locale,
}: DocsIslandProps) {
  const data = useFumadocsLoader({ tree });
  const slug = pathname.replace(/^\/(?:en\/)?docs\/?/, '').replace(/\/$/, '');
  const idUrl = `/docs/${slug}`;
  const enUrl = `/en/docs/${slug}`;

  return (
    <RootProvider
      pathname={pathname}
      params={params}
      navigate={navigate}
      theme={{ defaultTheme: 'light', enableSystem: false, disableTransitionOnChange: true }}
    >
      <SidebarProvider>
        <DocsLayout
          tree={data.tree}
          themeSwitch={{ enabled: true, mode: 'light-dark' }}
          nav={{ title: 'QRIS API', url: '/' }}
          githubUrl="https://github.com/ramsyparker/qris-api"
          slots={{ sidebar: sharedSidebarSlots, themeSwitch: ThemeControls }}
          tabs={[
            { title: 'Bahasa Indonesia', description: 'Dokumentasi bahasa Indonesia', url: idUrl, icon: <Languages aria-hidden="true" /> },
            { title: 'English', description: 'Documentation in English', url: enUrl, icon: <Languages aria-hidden="true" /> },
          ]}
          links={[
            { text: 'Playground', url: '/app' },
            { text: locale === 'id' ? 'Referensi API' : 'API reference', url: '/api-reference' },
          ]}
        >
          <DocsPage toc={toc}>
            <DocsTitle>{title}</DocsTitle>
            <DocsDescription>{description}</DocsDescription>
            {children}
          </DocsPage>
        </DocsLayout>
      </SidebarProvider>
    </RootProvider>
  );
}
