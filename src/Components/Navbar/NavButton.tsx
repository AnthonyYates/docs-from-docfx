interface NavButtonProps {
    onClick: () => void;
    children: React.ReactNode;
  }
  
  const NavButton: React.FC<NavButtonProps> = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="mx-2 py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
    >
      {children}
    </button>
  );
  
  export default NavButton;
  