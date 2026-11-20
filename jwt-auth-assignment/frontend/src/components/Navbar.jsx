import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// role pill styling — small colored badge next to the user's name
const rolePill = {
  user:    'bg-teal-50   text-teal-700',
  manager: 'bg-amber-50  text-amber-700',
  admin:   'bg-rose-50   text-rose-700',
};

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : '';

  return (
    <nav className="bg-white border-b border-subtle px-6 py-3.5 flex items-center justify-between">

      {/* brand */}
      <span className="font-serif text-xl text-primary tracking-tight">
        JWT Auth
      </span>

      {/* right side: name + role pill + logout */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-sm text-muted hidden sm:inline truncate">
          {user?.name}
        </span>
        <span
          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${
            rolePill[user?.role] || rolePill.user
          }`}
        >
          {displayRole}
        </span>
        <button
          onClick={handleLogout}
          className="btn-outline text-xs px-3 py-1.5 whitespace-nowrap"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
