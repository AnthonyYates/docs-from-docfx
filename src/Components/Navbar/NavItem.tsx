import Link from 'next/link';
import { ReactNode } from 'react';

interface NavItemProps {
  href: string;
  children: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => (
  <Link className="mx-4 cursor-pointer" href={href}>
    {children}
  </Link>
);

export default NavItem;
