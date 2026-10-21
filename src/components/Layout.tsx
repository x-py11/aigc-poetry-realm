import { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MoodModal from '@/components/MoodModal';
import { Toaster } from '@/components/ui/sonner';
import { getModalShown, setModalShown } from '@/lib/store';

export const Layout = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // 首次访问：进入首页时展示意境选择弹窗，选择或关闭后不再打扰
  useEffect(() => {
    if (pathname === '/' && !getModalShown()) {
      const timer = window.setTimeout(() => setOpen(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  const closeModal = () => {
    setModalShown(true);
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn('flex-1', pathname === '/' ? '' : 'pt-16')}>
        <Outlet />
        <MoodModal open={open} onClose={closeModal} />
        <Toaster position="top-center" richColors />
      </main>
      <Footer />
    </div>
  );
};
