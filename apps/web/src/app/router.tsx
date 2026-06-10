import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const WorldMapPage = lazy(() =>
  import('@/pages/WorldMapPage').then((m) => ({ default: m.WorldMapPage })),
);
const StoryPage = lazy(() => import('@/pages/StoryPage').then((m) => ({ default: m.StoryPage })));
const SurvivalPage = lazy(() =>
  import('@/pages/SurvivalPage').then((m) => ({ default: m.SurvivalPage })),
);
const SchoolPage = lazy(() =>
  import('@/pages/SchoolPage').then((m) => ({ default: m.SchoolPage })),
);
const MultiplayerPage = lazy(() =>
  import('@/pages/MultiplayerPage').then((m) => ({ default: m.MultiplayerPage })),
);
const AchievementsPage = lazy(() =>
  import('@/pages/AchievementsPage').then((m) => ({ default: m.AchievementsPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

const Fallback = () => <div className="grid place-items-center py-32 text-white/60">Cargando…</div>;

const wrap = (node: React.ReactNode) => <Layout>{node}</Layout>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <HomePage />
      </Suspense>,
    ),
  },
  {
    path: '/play',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <WorldMapPage />
      </Suspense>,
    ),
  },
  {
    path: '/story',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <StoryPage />
      </Suspense>,
    ),
  },
  {
    path: '/survival',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <SurvivalPage />
      </Suspense>,
    ),
  },
  {
    path: '/school',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <SchoolPage />
      </Suspense>,
    ),
  },
  {
    path: '/multiplayer',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <MultiplayerPage />
      </Suspense>,
    ),
  },
  {
    path: '/achievements',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <AchievementsPage />
      </Suspense>,
    ),
  },
  {
    path: '*',
    element: wrap(
      <Suspense fallback={<Fallback />}>
        <NotFoundPage />
      </Suspense>,
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
