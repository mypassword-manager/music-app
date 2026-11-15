import { useState, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { signUp, useSession } from '@/lib/auth/auth-client';
import { Shield, Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
import { signup } from 'virtual:content';

function RuleIcon({ met }: { met: boolean }) {
  return met
    ? <CheckCircle className="w-3 h-3 text-success shrink-0" />
    : <div className="w-3 h-3 rounded-full border border-muted-foreground/40 shrink-0" />;
}

export default function SignUpPage() {
  const { isAuthenticated, isPending } = useSession();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/`~]/.test(password),
  };
  const passwordValid = Object.values(rules).every(Boolean);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!passwordValid) {
      setError('Please meet all password requirements.');
      return;
    }
    setLoading(true);
    try {
      const result = await signUp.email({ email, password, name });
      if (result.error) {
        setError(result.error.message || 'Could not create account.');
        return;
      }
      navigate('/dashboard', { replace: true });
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Create Account — MyPersonal Vault</title>
        <meta name="description" content="Create your free secure vault account." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="auth-grid-up" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--vault-violet))" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid-up)" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(var(--vault-violet)) 0%, transparent 70%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-secondary/30 bg-secondary/10">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-xl font-bold text-foreground">{signup.brand}</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-1">{signup.headline}</h1>
            <p className="text-muted-foreground text-sm">{signup.subheadline}</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-card p-8"
            style={{ boxShadow: '0 0 40px hsl(var(--vault-violet) / 0.06)' }}>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-lg border border-destructive/30 bg-destructive/10 mb-6"
              >
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-destructive text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {signup.nameLabel}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    placeholder={signup.namePlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 disabled:opacity-50 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {signup.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    placeholder={signup.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 disabled:opacity-50 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  {signup.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    placeholder={signup.passwordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 disabled:opacity-50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password rules */}
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-2 gap-1.5 mt-1 p-3 rounded-lg bg-background border border-border"
                  >
                    <div className="flex items-center gap-1.5">
                      <RuleIcon met={rules.length} />
                      <span className={`text-xs ${rules.length ? 'text-success' : 'text-muted-foreground'}`}>{signup.rules.length}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RuleIcon met={rules.upper} />
                      <span className={`text-xs ${rules.upper ? 'text-success' : 'text-muted-foreground'}`}>{signup.rules.upper}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RuleIcon met={rules.number} />
                      <span className={`text-xs ${rules.number ? 'text-success' : 'text-muted-foreground'}`}>{signup.rules.number}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RuleIcon met={rules.special} />
                      <span className={`text-xs ${rules.special ? 'text-success' : 'text-muted-foreground'}`}>{signup.rules.special}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !passwordValid}
                className="w-full py-3 rounded-lg font-semibold text-sm text-primary-foreground disabled:opacity-50 transition-all duration-200 mt-1"
                style={{
                  background: (loading || !passwordValid)
                    ? 'hsl(var(--vault-violet) / 0.4)'
                    : 'linear-gradient(135deg, hsl(var(--vault-violet)) 0%, hsl(var(--vault-cyan)) 100%)',
                  boxShadow: (loading || !passwordValid) ? 'none' : '0 0 20px hsl(var(--vault-violet) / 0.3)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                    {signup.submittingButton}
                  </span>
                ) : (
                  <span>{signup.submitButton}</span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              <span>{signup.signinPrompt}</span>{' '}
              <Link to="/signin" className="text-secondary hover:underline font-medium">
                {signup.signinLink}
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            <span>{signup.securityNote}</span>
          </p>
        </motion.div>
      </div>
    </>
  );
}
