import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Music4 } from 'lucide-react';
import SignUpForm from '../components/auth/SignUpForm';

const SignUp = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'Sign Up - MoodHarmony';
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center text-primary-500 font-display font-bold text-3xl">
            <Music4 size={36} className="text-accent-500 mr-2" />
            <span>MoodHarmony</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-surface-400">Join MoodHarmony to discover your perfect sound</p>
        </div>
        
        <div className="glass-card p-8">
          <SignUpForm />
          
          <div className="mt-6 text-center text-sm">
            <p className="text-surface-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;