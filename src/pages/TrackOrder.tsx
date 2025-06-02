import React, { useState } from 'react';
import { Search, Package, Truck, Calendar, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getRentalById } from '../services/rentalService';

const orderStatuses = {
  'pending': { label: 'Pending Confirmation', color: 'bg-yellow-500' },
  'confirmed': { label: 'Confirmed', color: 'bg-blue-500' },
  'in_transit': { label: 'In Transit', color: 'bg-indigo-500' },
  'delivered': { label: 'Delivered', color: 'bg-green-500' },
  'returned': { label: 'Returned', color: 'bg-purple-500' },
  'cancelled': { label: 'Cancelled', color: 'bg-red-500' },
};

export default function TrackOrder() {
  const location = useLocation();
  const [orderId, setOrderId] = useState(location.state?.orderId || '');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(location.state?.message || null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const order = await getRentalById(orderId);
      
      if (order) {
        setOrderStatus(order);
      } else {
        setError('Order not found. Please check the order ID and try again.');
      }
    } catch (err) {
      setError('Failed to retrieve order information. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            disabled={loading || !orderId.trim()}
            className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        {/* Notification Messages */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-8">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Order Status */}
        {orderStatus && (
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className={`p-3 rounded-full ${orderStatus.status && orderStatuses[orderStatus.status]?.color || 'bg-gray-500'}`}>
                {orderStatus.status === 'in_transit' ? (
                  <Truck className="h-8 w-8 text-white" />
                ) : (
                  <Package className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-center mb-2">
              Order Status: {orderStatus.status && orderStatuses[orderStatus.status]?.label || 'Processing'}
            </h2>
            
            <p className="text-center text-gray-600 mb-6">
              Order ID: {orderStatus.id}
            </p>
            
            {/* Status Timeline */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                {['pending', 'confirmed', 'in_transit', 'delivered', 'returned'].map((status, index) => {
                  const isActive = ['pending', 'confirmed', 'in_transit', 'delivered', 'returned'].indexOf(orderStatus.status) >= index;
                  return (
                    <div key={status} className="flex flex-col items-center">
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                        isActive ? 'bg-orange-600' : 'bg-gray-300'
                      }`}>
                        <span className="text-white text-sm">{index + 1}</span>
                      </div>
                      <span className={`text-xs mt-2 ${isActive ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                        {orderStatuses[status].label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Equipment</h3>
                <p className="text-lg text-gray-900">{orderStatus.equipmentName || 'JCB 3DX Backhoe Loader'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-lg text-gray-900">{orderStatus.startDate}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-lg text-gray-900">{orderStatus.endDate}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-1" />
                  <p className="text-lg text-gray-900">{orderStatus.deliveryAddress}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="text-xl font-bold text-orange-600">
                  ₹{orderStatus.totalAmount?.toLocaleString('en-IN') || '75,000'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Payment Status: <span className={`font-medium ${
                    orderStatus.paymentStatus === 'paid' ? 'text-green-600' : 
                    orderStatus.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {orderStatus.paymentStatus === 'paid' ? 'Paid' : 
                     orderStatus.paymentStatus === 'pending' ? 'Pending' : 'Cancelled'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}