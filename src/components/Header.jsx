import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import QualtyLogo from '../assets/QualtyLogo.png';
import { useSelector } from "react-redux";
import useFetchUser from '../hooks/useFetchUser';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useFetchUser()
  const user = useSelector((state) => state?.user?.user);
  
  const handleAuthClick = () => navigate('/login');


  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white shadow-lg backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <img src={QualtyLogo} alt="Qualty.AI Logo" className="h-9 w-9 rounded-full shadow-md" />
          <span className="text-2xl font-extrabold tracking-wide text-white bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
            Qualty.AI
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative text-lg font-medium text-white hover:text-blue-700 transition duration-300"
            >
              {label}
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-gradient-to-r from-blue-700 to-blue-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}

          {user ? (
            <button
              onClick={() => navigate(`/${user.role}/dashboard`)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-800 hover:to-blue-500 text-white rounded-md text-sm font-semibold shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={handleAuthClick}
              className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-md text-lg cursor-pointer font-semibold shadow-md transition-transform hover:scale-105"
            >
              Login
            </button>
          )}
        </nav>

        <button
          className="md:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-gray-900 transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] py-4 px-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 animate-fade-in">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-white hover:text-blue-700 transition-colors"
            >
              {label}
            </a>
          ))}

          {user ? (
            <button
              onClick={() => {
                navigate(`/${user.role}/dashboard`);
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-800 hover:to-blue-500 rounded-md text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => {
                handleAuthClick();
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 rounded-md text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;