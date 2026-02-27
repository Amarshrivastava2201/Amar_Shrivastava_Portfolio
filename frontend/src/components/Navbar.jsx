import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Amar Shrivastava
        </Link>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/projects" className="hover:text-primary transition">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>
<button
  onClick={toggleTheme}
  className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
>
  {/* Sun Icon */}
  <div
    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out
      ${
        theme === 'dark'
          ? 'opacity-100 translate-x-0 translate-y-0'
          : 'opacity-0 -translate-x-4 -translate-y-4'
      }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-6.95l-1.414 1.414M6.464 17.536l-1.414 1.414m0-12.95l1.414 1.414M17.536 17.536l1.414 1.414"
      />
    </svg>
  </div>

  {/* Moon Icon */}
  <div
    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out
      ${
        theme === 'light'
          ? 'opacity-100 translate-x-0 translate-y-0'
          : 'opacity-0 translate-x-4 translate-y-4'
      }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-800 dark:text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 0111.21 3c0-.34.02-.67.05-1A9 9 0 1021 12.79z" />
    </svg>
  </div>
</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar