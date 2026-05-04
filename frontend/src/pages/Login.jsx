import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../hooks/useDashboardStore';

/**
 * Login Page Component
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { initialize } = useDashboardStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate email format
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Store email in localStorage for persistence
      localStorage.setItem('userEmail', email);

      // Initialize app with user email
      const success = await initialize(email);
      
      if (success) {
        navigate('/dashboard');
      } else {
        throw new Error('Failed to initialize. Please check your email.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-logo">🧬 Redcliffe x MediBuddy</h1>
          <p className="login-subtitle">Drop-off Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@redcliffelabs.com"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Enterprise Dashboard for Redcliffe Labs</p>
        </div>
      </div>
    </div>
  );
}
