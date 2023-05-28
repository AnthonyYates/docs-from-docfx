import { FC, useState } from 'react';
import NavLogo from './NavLogo';
import NavItem from './NavItem';
import NavButton from './NavButton';

interface NavbarProps {
}

const Navbar: FC<NavbarProps> = ({ }) => {

    // Use state to toggle the mobile menu

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    return (
        <nav className="flex justify-between items-center p-4 bg-white">
            <NavLogo href="/" />
            <div className="hidden sm:flex items-center">
                <NavItem href="/page1">Page 1</NavItem>
                <NavItem href="/page2">Page 2</NavItem>
                <NavButton onClick={() => alert('Login')}>Login</NavButton>
                <NavButton onClick={() => alert('Register')}>Register</NavButton>
            </div>
            <div className="sm:hidden">
                <button onClick={toggleMobileMenu} className="focus:outline-none">
                    ☰
                </button>
            </div>
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white p-4 sm:hidden flex flex-col items-start">
                    <NavItem href="/page1">Page 1</NavItem>
                    <NavItem href="/page2">Page 2</NavItem>
                    <NavButton onClick={() => alert('Login')}>Login</NavButton>
                    <NavButton onClick={() => alert('Register')}>Register</NavButton>
                </div>
            )}
        </nav>
    );
}
export default Navbar;