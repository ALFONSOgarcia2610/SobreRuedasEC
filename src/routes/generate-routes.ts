import { lazy, type JSX } from 'react';

export const componentMap: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  landing: lazy(() => import('@/pages/landing/landing-page')),
};
