import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // UPDATED: Imported Link
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  // In your LoginForm.js component

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // ...
  try {
    setIsLoading(true);
    setError(null); // Clear previous errors

    // 1. We ATTEMPT to log in by calling this function from your store.
    await login(email, password);

    // 2. If login() is successful, we navigate to the dashboard.
    navigate('/dashboard');

  } catch (err: unknown) { // 3. If login() FAILS, the code jumps directly here!
    
    // 4. We catch the error that was thrown from your store.
    if (err instanceof Error) {
      // 5. We take its message and set it as the error to be displayed on screen.
      setError(err.message); 
    } else {
      setError('An unknown error occurred. Please try again.');
    }
  } finally {
    // This runs regardless of success or failure
    setIsLoading(false);
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          // UPDATED: Added aria-live for better accessibility
          <div
            className="p-3 rounded-lg bg-error-900/40 border border-error-700/50 text-error-300 text-sm"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-surface-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="your@email.com"
            required
            aria-invalid={!!error} // UPDATED: Accessibility improvement
            aria-describedby={error ? "error-message" : undefined}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-surface-300">
              Password
            </label>
            {/* UPDATED: Changed <a> to a functional <Link> */}
            <Link to="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
            aria-invalid={!!error} // UPDATED: Accessibility improvement
            aria-describedby={error ? "error-message" : undefined}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Log In'
            )}
          </button>
        </div>
        {/* Helper element for screen readers */}
        {error && <span id="error-message" className="sr-only">{error}</span>}
      </form>
    </motion.div>
  );
};

export default LoginForm;