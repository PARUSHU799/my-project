import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<null | {
    status: string;
    equipment: string;
    startDate: string;
    endDate: string;
    address: string;
  }>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated order data
    setOrderStatus({
      status: 'In Transit',
      equipment: 'JCB 3DX Backhoe Loader',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      address: '123 Construction Site, Mumbai, Maharashtra',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>
        
        {/* Search Form */}
        <form onSubmit={handleTrack} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your order ID"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Track Order
          </button>
        </form>

        {/* Order Status */}
        {orderStatus && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-orange-600" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6">Order Status: {orderStatus.status}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Equipment</h3>
                <p className="text-lg text-gray-900">{orderStatus.equipment}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                  <p className="text-lg text-gray-900">{orderStatus.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                  <p className="text-lg text-gray-900">{orderStatus.endDate}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                <p className="text-lg text-gray-900">{orderStatus.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}