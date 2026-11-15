import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import React from 'react';
import { useSession, LogoutButton } from '@/lib/auth/auth-client';
import {
  Shield,
  Key,
  CreditCard,
  FileText,
  Image,
  User,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';
import { dashboard } from 'virtual:content';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  passwords: Key,
  cards: CreditCard,
  notes: FileText,
  media: Image,
  identities: User,
  settings: Settings,
};

const categoryStyles: Record<string, { color: string; bg: string }> = {
  passwords: { color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  cards: { color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20' },
  notes: { color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  media: { color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20' },
  identities: { color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  settings: { color: 'text-muted-foreground', bg: 'bg-muted/50 border-border' },
};

export default function DashboardPage() {
  const { user } = useSession();

  return (
    <>
      <Helmet>
        <title>Dashboard — MyPersonal Vault</title>
        <meta name="description" content="Your secure personal vault dashboard." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-foreground text-sm">{dashboard.brand}</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user?.email ?? ''}
                </span>
              </div>
              <LogoutButton className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-border/80">
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </LogoutButton>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold text-foreground mb-1">
              {dashboard.headline}
            </h1>
            <p className="text-muted-foreground">
              {user?.name ? `${dashboard.welcomePrefix} ${user.name}.` : 'Welcome back.'}{' '}{dashboard.subheadline}
            </p>
          </motion.div>

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">{dashboard.statusLabel}</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>{dashboard.statusNote}</span>
            </div>
          </motion.div>

          {/* Category grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboard.categories.map((cat, i) => {
              const Icon = categoryIcons[cat.id] ?? Shield;
              const style = categoryStyles[cat.id] ?? { color: 'text-muted-foreground', bg: 'bg-muted/50 border-border' };
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    to={`/dashboard/${cat.id}`}
                    className="block p-6 rounded-xl border bg-card hover:border-primary/30 transition-all duration-200 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${style.bg}`}>
                      <Icon className={`w-5 h-5 ${style.color}`} />
                    </div>
                    <h2 className="text-foreground font-semibold mb-1">{cat.label}</h2>
                    <p className="text-muted-foreground text-sm">{cat.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
