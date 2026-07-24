export function SidebarAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className='font-medium py-2'>{title}</div>
      <div className='pl-4'>{children}</div>
    </div>
  );
}
