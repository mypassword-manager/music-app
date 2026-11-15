import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X, Shield } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/airo-assets/images/logo/horizontal/dark"
            alt="MyPersonal Vault"
            className="h-auto max-h-10 w-auto max-w-[200px] object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <span
            className="hidden items-center gap-2 text-foreground font-bold text-lg"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Shield className="w-6 h-6 text-primary" />
            MyPersonal Vault
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide">
            How It Works
          </a>
          <a href="#security" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide">
            Security
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 px-4 py-2 tracking-wide"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold px-5 py-2.5 rounded border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 tracking-wide"
            style={{ boxShadow: 'var(--vault-cyan-glow)' }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border px-6 py-6 flex flex-col gap-5">
          <a href="#features" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>How It Works</a>
          <a href="#security" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Security</a>
          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            <Link to="/signin" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Sign In</Link>
            <Link
              to="/signup"
              className="text-center font-semibold px-5 py-2.5 rounded border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
