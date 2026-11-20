// AuthLayout: two-column split used by both Login and Register.
// Left: solid teal panel. Right: off-white form area.
// On mobile: teal strip on top, form below.
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* left teal panel */}
      <div className="bg-primary text-white flex flex-col justify-center px-10 py-10 md:w-[42%] md:min-h-screen">
        <div className="max-w-xs">
          <p className="font-serif text-3xl mb-2 tracking-tight">JWT Auth</p>
          <p className="text-teal-200 text-sm mb-10 leading-relaxed">
            Secure role-based access, simplified.
          </p>
          <ul className="space-y-4 text-sm text-teal-100">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-teal-300 select-none">—</span>
              Register with your role and get instant dashboard access
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-teal-300 select-none">—</span>
              JWT tokens keep your session stateless and secure
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-teal-300 select-none">—</span>
              Role-based views for user, manager and admin
            </li>
          </ul>
        </div>
      </div>

      {/* right form area */}
      <div className="flex-1 flex items-center justify-center bg-warm px-6 py-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

    </div>
  );
}

export default AuthLayout;
