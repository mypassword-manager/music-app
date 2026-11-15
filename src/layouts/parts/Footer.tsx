import { Link } from 'react-router';
import { Shield, Lock, Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/airo-assets/images/logo/horizontal/dark"
                alt="MyPersonal Vault"
                className="h-auto max-h-9 w-auto max-w-[180px] object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <span className="hidden items-center gap-2 text-foreground font-bold">
                <Shield className="w-5 h-5 text-primary" />
                MyPersonal Vault
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Military-grade encryption for your most sensitive data. Passwords, cards, files — all secured in one impenetrable vault.
            </p>
            {/* Neon Database Badge */}
            <div
              className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded border border-border bg-card"
              style={{ boxShadow: 'var(--vault-cyan-glow)' }}
            >
              <Database className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-mono">Secured with Neon Database</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-foreground text-xs font-semibold mb-4 tracking-widest uppercase">Product</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Security', href: '#security' },
                { label: 'How It Works', href: '#how-it-works' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="text-foreground text-xs font-semibold mb-4 tracking-widest uppercase">Account</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Sign Up', href: '/signup' },
                { label: 'Log In', href: '/signin' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <Lock className="w-3 h-3 text-primary" />
            <span>256-bit AES Encryption · Zero-Knowledge Architecture</span>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} MyPersonal Vault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
