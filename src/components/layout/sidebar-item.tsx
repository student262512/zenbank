export function SidebarItem({ title, href }: { title: string; href: string }) {
  return <a href={href} className='block py-2 px-4 hover:bg-muted rounded'>{title}</a>;
}
