import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Construction, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import RentNow from './pages/RentNow';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Construction className="h-8 w-8 text-orange-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">LAXMI INFRA</span>
                </Link>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-orange-600 transition-colors">Home</Link>
                <Link to="/equipment" className="text-gray-600 hover:text-orange-600 transition-colors">Equipment</Link>
                <Link to="/track" className="text-gray-600 hover:text-orange-600 transition-colors">Track Order</Link>
                <Link to="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</Link>
              </nav>
              
              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-orange-600 focus:outline-none"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  to="/" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/equipment" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Equipment
                </Link>
                <Link 
                  to="/track" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Track Order
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/rent" element={<RentNow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">LAXMI INFRA</h3>
                <p className="text-gray-400">
                  Providing high-quality construction equipment rental services across India.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                  </li>
                  <li>
                    <Link to="/equipment" className="text-gray-400 hover:text-white transition-colors">Equipment</Link>
                  </li>
                  <li>
                    <Link to="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-400">
                  123 Construction Hub,<br />
                  Andheri East, Mumbai,<br />
                  Maharashtra - 400069
                </p>
                <p className="text-gray-400 mt-2">
                  Phone: +91 8688883489<br />
                  Email: Ramorsu293@gmail.com
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} LAXMI INFRA. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;