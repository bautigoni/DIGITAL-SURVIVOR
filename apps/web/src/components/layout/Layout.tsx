import type { ReactNode } from 'react';
import { Header } from './Header';
import { ToastStack } from '@/components/ui/ToastStack';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-spider-grid bg-[length:40px_40px] opacity-30" />
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
      <footer className="mx-auto w-full max-w-7xl px-4 py-8 text-center text-xs text-white/40">
        Hecho con fines educativos · Aprendé a sobrevivir en Internet · v1.0
      </footer>
      <ToastStack />
    </div>
  );
};
