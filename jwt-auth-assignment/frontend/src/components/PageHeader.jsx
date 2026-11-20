// PageHeader: role label (uppercase), serif h1, gray subtitle, divider
function PageHeader({ roleLabel, title, subtitle }) {
  return (
    <div className="mb-10">
      <p className="label-xs mb-2">{roleLabel}</p>
      <h1 className="font-serif text-[2rem] text-heading leading-tight mb-1">{title}</h1>
      <p className="text-muted text-sm">{subtitle}</p>
      <hr className="mt-6 border-subtle" />
    </div>
  );
}

export default PageHeader;
