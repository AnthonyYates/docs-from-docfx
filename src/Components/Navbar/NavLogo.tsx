import Link from 'next/link';

interface NavLogoProps {
  href: string;
}

const NavLogo: React.FC<NavLogoProps> = ({ href }) => (
  <Link href={href}>
    MyLogo
  </Link>
);

export default NavLogo;
