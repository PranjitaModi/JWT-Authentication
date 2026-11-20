import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-warm flex flex-col items-center justify-center text-center px-6">
      <p className="font-serif text-[7rem] leading-none text-subtle select-none">404</p>
      <h1 className="font-serif text-2xl text-heading mt-4 mb-2">Page not found</h1>
      <p className="text-muted text-sm mb-8">The page you are looking for doesn't exist.</p>
      <Link to="/login" className="btn-primary px-6 py-2.5">
        Back to Login
      </Link>
    </div>
  );
}

export default NotFound;
