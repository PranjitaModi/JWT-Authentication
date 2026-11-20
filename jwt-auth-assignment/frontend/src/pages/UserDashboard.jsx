import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <PageHeader
          roleLabel="User Overview"
          title="Your Dashboard"
          subtitle={`Welcome back, ${user?.name}.`}
        />

        {/* stat cards — 2 columns, teal accent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <StatCard label="My Tasks" value="5" role="user" />
          <StatCard label="Notifications" value="3" role="user" />
        </div>

        {/* info + access note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* your information */}
          <div className="card px-6 py-5">
            <h2 className="text-sm font-semibold text-heading mb-5">Your Information</h2>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 text-sm">
              <dt className="text-muted pt-0.5">Name</dt>
              <dd className="text-heading font-medium">{user?.name}</dd>
              <dt className="text-muted pt-0.5">Email</dt>
              <dd className="text-heading break-all">{user?.email}</dd>
              <dt className="text-muted pt-0.5">Role</dt>
              <dd>
                <span className="bg-teal-50 text-teal-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full capitalize">
                  {user?.role}
                </span>
              </dd>
            </dl>
          </div>

          {/* access note */}
          <div className="flex flex-col justify-center">
            <div className="pl-4 border-l-2 border-subtle bg-gray-50 py-4 pr-5 rounded-r-input text-sm text-muted leading-relaxed">
              <p className="font-semibold text-heading mb-1 text-[13px]">User Access Level</p>
              You have basic access to view your profile and tasks.
            </div>
          </div>
        </div>

        {/* navigation buttons */}
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate('/manager-dashboard')} className="btn-outline">
            Go to Manager Dashboard
          </button>
          <button onClick={() => navigate('/admin-dashboard')} className="btn-outline">
            Go to Admin Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
