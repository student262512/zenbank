export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className='flex gap-2 text-sm text-muted-foreground mb-4'>
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          {i < items.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}
