// accent color lookup by role
const accents = {
  user:    '#0F766E',
  manager: '#B45309',
  admin:   '#BE123C',
};

// StatCard: white card with colored 3px top border, label above, big serif number
function StatCard({ label, value, role }) {
  const color = accents[role] || accents.user;

  return (
    <div
      className="card overflow-hidden"
      style={{ borderTopColor: color, borderTopWidth: '3px' }}
    >
      <div className="px-6 py-5">
        <p className="label-xs mb-4">{label}</p>
        <p className="font-serif text-5xl leading-none" style={{ color }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default StatCard;
