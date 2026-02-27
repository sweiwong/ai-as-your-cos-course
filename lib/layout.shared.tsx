import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { type ReactNode } from 'react';

export const gitConfig = {
  user: 'sweiwong',
  repo: 'ai-as-your-cos',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'AI as Your CoS',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: 'custom',
        children: (
          <span className="text-xs text-fd-muted-foreground">
            by Wei Wong
          </span>
        ) as ReactNode,
      },
    ],
  };
}
