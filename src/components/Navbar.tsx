import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Construction className="h-8 w-8 text-orange-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">BuildRent</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600">Home</Link>
            <Link to="/equipment" className="text-gray-700 hover:text-orange-600">Equipment</Link>
            <Link to="/track" className="text-gray-700 hover:text-orange-600">Track Order</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/equipment"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Equipment
            </Link>
            <Link
              to="/track"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Track Order
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}