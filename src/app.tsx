import { lazy, Suspense, type ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const ExplorePage = lazy(() => import('@/pages/ExplorePage/ExplorePage'));
const PoemPage = lazy(() => import('@/pages/PoemPage/PoemPage'));
const CreatePage = lazy(() => import('@/pages/CreatePage/CreatePage'));
const PreviewPage = lazy(() => import('@/pages/PreviewPage/PreviewPage'));
const CommunityPage = lazy(() => import('@/pages/CommunityPage/CommunityPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

function PageLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="size-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      <span className="sr-only">页面加载中</span>
    </div>
  );
}

function PageSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PageSuspense><HomePage /></PageSuspense>} />
        <Route path="explore" element={<PageSuspense><ExplorePage /></PageSuspense>} />
        <Route path="poem/:id" element={<PageSuspense><PoemPage /></PageSuspense>} />
        <Route path="create" element={<PageSuspense><CreatePage /></PageSuspense>} />
        <Route path="preview/:id" element={<PageSuspense><PreviewPage /></PageSuspense>} />
        <Route path="community" element={<PageSuspense><CommunityPage /></PageSuspense>} />
        <Route path="profile" element={<PageSuspense><ProfilePage /></PageSuspense>} />
      </Route>
      <Route path="*" element={<PageSuspense><NotFoundPage /></PageSuspense>} />
    </Routes>
  );
}
