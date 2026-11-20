import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

const activities = [
  { text: 'Approved a project proposal',         time: '1 hour ago'  },
  { text: 'Reviewed performance reports',         time: '3 hours ago' },
  { text: 'Scheduled a team meeting',             time: '5 hours ago' },
  { text: 'Assigned new tasks to team members',   time: 'Yesterday'   },
];

function ManagerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <PageHeader
          roleLabel="Manager Overview"
          title="Manager Dashboard"
          subtitle={`Welcome back, ${user?.name}. Manage your team efficiently.`}
        />

        {/* stat cards — 3 columns, amber accent */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <StatCard label="Team Members"    value="10" role="manager" />
          <StatCard label="Active Projects" value="8"  role="manager" />
          <StatCard label="Pending Approvals" value="4" role="manager" />
        </div>

        {/* recent activities + manager info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* recent activities — hairline rows with amber dot */}
          <div className="card px-6 py-5">
            <h2 className="text-sm font-semibold text-heading mb-4">Recent Activities</h2>
            <ul>
              {activities.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 py-3 border-b border-subtle last:border-0"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0" />
                  <span className="text-heading text-sm flex-1">{item.text}</span>
                  <span className="text-muted text-xs whitespace-nowrap">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* manager information */}
          <div className="card px-6 py-5">
            <h2 className="text-sm font-semibold text-heading mb-5">Manager Information</h2>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 text-sm">
              <dt className="text-muted pt-0.5">Name</dt>
              <dd className="text-heading font-medium">{user?.name}</dd>
              <dt className="text-muted pt-0.5">Email</dt>
              <dd className="text-heading break-all">{user?.email}</dd>
              <dt className="text-muted pt-0.5">Role</dt>
              <dd>
                <span className="bg-amber-50 text-amber-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full capitalize">
                  {user?.role}
                </span>
              </dd>
            </dl>
          </div>
        </div>

        {/* access note */}
        <div className="pl-4 border-l-2 border-subtle bg-gray-50 py-4 pr-5 rounded-r-input text-sm text-muted leading-relaxed mb-10">
          <p className="font-semibold text-heading mb-1 text-[13px]">Manager Access Level</p>
          You can manage team members, approve requests, and oversee projects.
        </div>

        {/* navigation buttons */}
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate('/user-dashboard')} className="btn-outline">
            View User Dashboard
          </button>
          <button onClick={() => navigate('/admin-dashboard')} className="btn-outline">
            Go to Admin Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default ManagerDashboard;
