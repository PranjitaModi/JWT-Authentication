import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

const adminActions = [
  { title: 'Manage Users',      desc: 'View, edit, and remove user accounts' },
  { title: 'System Settings',   desc: 'Configure application-wide settings'  },
  { title: 'View Logs',         desc: 'Monitor system activity and error logs' },
  { title: 'Security Settings', desc: 'Manage authentication and permissions' },
];

const recentActivities = [
  { text: 'New user account created',  time: '2 hours ago' },
  { text: 'System backup completed',   time: '5 hours ago' },
  { text: 'Security patch applied',    time: '1 day ago'   },
  { text: 'Database optimized',        time: '2 days ago'  },
];

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <PageHeader
          roleLabel="Admin Overview"
          title="Admin Dashboard"
          subtitle={`Welcome back, ${user?.name}. You have full system control.`}
        />

        {/* stat cards — 4 columns, rose accent. System Health uses green inline */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Users"    value="100" role="admin" />
          <StatCard label="Total Managers" value="15"  role="admin" />
          <StatCard label="Total Admins"   value="3"   role="admin" />
          {/* system health card — special case: green number */}
          <div
            className="card overflow-hidden"
            style={{ borderTopColor: '#16a34a', borderTopWidth: '3px' }}
          >
            <div className="px-6 py-5">
              <p className="label-xs mb-4">System Health</p>
              <p className="font-serif text-3xl leading-none text-green-600">Good</p>
            </div>
          </div>
        </div>

        {/* admin actions + recent activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* admin actions — rows with title, gray desc, and a nudging arrow */}
          <div className="card px-6 py-5">
            <h2 className="text-sm font-semibold text-heading mb-4">Admin Actions</h2>
            <ul>
              {adminActions.map((action, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-subtle last:border-0 group cursor-pointer"
                >
                  <div>
                    <p className="text-heading text-sm font-medium">{action.title}</p>
                    <p className="text-muted text-xs mt-0.5">{action.desc}</p>
                  </div>
                  <span className="text-muted text-sm ml-4 group-hover:text-primary group-hover:translate-x-1 transition-all duration-150 select-none">
                    &#8594;
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* recent activities — rose dot + timestamp */}
          <div className="card px-6 py-5">
            <h2 className="text-sm font-semibold text-heading mb-4">Recent Admin Activities</h2>
            <ul>
              {recentActivities.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 py-3 border-b border-subtle last:border-0"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-600 flex-shrink-0" />
                  <span className="text-heading text-sm flex-1">{item.text}</span>
                  <span className="text-muted text-xs whitespace-nowrap">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* admin information */}
        <div className="card px-6 py-5 mb-10">
          <h2 className="text-sm font-semibold text-heading mb-5">Admin Information</h2>
          <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 text-sm">
            <dt className="text-muted pt-0.5">Name</dt>
            <dd className="text-heading font-medium">{user?.name}</dd>
            <dt className="text-muted pt-0.5">Email</dt>
            <dd className="text-heading break-all">{user?.email}</dd>
            <dt className="text-muted pt-0.5">Role</dt>
            <dd>
              <span className="bg-rose-50 text-rose-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full capitalize">
                {user?.role}
              </span>
            </dd>
          </dl>
        </div>

        {/* access warning note */}
        <div className="pl-4 border-l-2 border-subtle bg-gray-50 py-4 pr-5 rounded-r-input text-sm text-muted leading-relaxed mb-10">
          <p className="font-semibold text-heading mb-1 text-[13px]">Admin Access Level</p>
          You have complete access to all system features, user management, and configurations.
          Use this power responsibly.
        </div>

        {/* navigation buttons */}
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => navigate('/user-dashboard')} className="btn-outline">
            View User Dashboard
          </button>
          <button onClick={() => navigate('/manager-dashboard')} className="btn-outline">
            View Manager Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
