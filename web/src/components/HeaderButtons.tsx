import { Moon, Star, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { GithubLight } from './ui/svgs/githubLight';

export function HeaderButtons({ githubUrl, starsLabel }: { githubUrl: string; starsLabel: string }) {
  return (
    <>
      <Button variant="outline" nativeButton={false} className="header-button github-stars"
        render={<a href={githubUrl} target="_blank" rel="noreferrer" />}
        aria-label={`QRIS API di GitHub, ${starsLabel} bintang`}>
        <GithubLight className="github-mark" aria-hidden="true" />
        <span className="github-stars-divider" aria-hidden="true" />
        <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
        <span className="github-stars-count">{starsLabel}</span>
      </Button>
      <Button variant="outline" size="icon" className="header-button theme-toggle" type="button"
        data-theme-toggle="" aria-label="Aktifkan mode gelap" title="Aktifkan mode gelap">
        <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
        <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
      </Button>
    </>
  );
}
