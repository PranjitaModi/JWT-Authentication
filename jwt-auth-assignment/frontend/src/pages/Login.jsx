import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form);
      if (data.user.role === 'admin') navigate('/admin-dashboard');
      else if (data.user.role === 'manager') navigate('/manager-dashboard');
      else navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* small eyebrow label */}
      <p className="label-xs mb-2">Welcome back</p>
      <h1 className="font-serif text-[2rem] text-heading leading-tight mb-8">
        Sign in
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-heading mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-heading mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="form-input"
          />
        </div>

        {/* error appears inline, not as a banner */}
        {error && (
          <p className="text-rose-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2.5 mt-1 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="text-sm text-muted mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors duration-150">
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
