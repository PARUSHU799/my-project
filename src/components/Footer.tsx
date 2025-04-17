import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BuildRent</h3>
            <p className="text-gray-400">
              Your trusted partner in construction equipment rental across India.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                +91 98765 43210
              </p>
              <p className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                contact@buildrent.in
              </p>
              <p className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                Mumbai, Maharashtra
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Working Hours</h3>
            <p className="text-gray-400">Monday - Saturday</p>
            <p className="text-gray-400">9:00 AM - 6:00 PM</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BuildRent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}