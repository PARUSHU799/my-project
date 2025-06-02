import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, IndianRupee, Building2 } from 'lucide-react';
import { Equipment, Rental } from '../types';
import { createRental } from '../services/rentalService';

interface RentalFormData {
  startDate: string;
  endDate: string;
  deliveryAddress: string;
  contactName: string;
  contactPhone: string;
  paymentMethod: 'online' | 'offline';
  offlineMethod?: 'cash' | 'bank_transfer';
}

export default function RentNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const equipment = location.state?.equipment as Equipment;

  const [formData, setFormData] = useState<RentalFormData>({
    startDate: '',
    endDate: '',
    deliveryAddress: '',
    contactName: '',
    contactPhone: '',
    paymentMethod: 'online',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOfflineInstructions, setShowOfflineInstructions] = useState(false);

  if (!equipment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No equipment selected</h2>
          <button
            onClick={() => navigate('/equipment')}
            className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Browse Equipment
          </button>
        </div>
      </div>
    );
  }

  const calculateTotalCost = (): number => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * equipment.pricePerDay;
  };

  const handleOnlinePayment = async () => {
    try {
      // In a real application, this would interact with a payment processor
      // For demo purposes, we'll create the rental and mark it as pending payment
      const totalAmount = calculateTotalCost();
      
      const rentalData: Omit<Rental, 'id' | 'createdAt'> = {
        equipmentId: equipment.id,
        customerName: formData.contactName,
        customerPhone: formData.contactPhone,
        startDate: formData.startDate,
        endDate: formData.endDate,
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: 'online',
        paymentStatus: 'pending',
        totalAmount,
        status: 'pending',
      };
      
      const rental = await createRental(rentalData);
      
      if (rental) {
        navigate('/track', { 
          state: { 
            orderId: rental.id,
            message: 'Your rental request has been submitted! Please complete the payment to confirm your order.' 
          }
        });
      } else {
        throw new Error('Failed to create rental');
      }
    } catch (error) {
      console.error('Payment process failed:', error);
    }
  };

  const handleOfflinePayment = async () => {
    try {
      const totalAmount = calculateTotalCost();
      
      const rentalData: Omit<Rental, 'id' | 'createdAt'> = {
        equipmentId: equipment.id,
        customerName: formData.contactName,
        customerPhone: formData.contactPhone,
        startDate: formData.startDate,
        endDate: formData.endDate,
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: 'offline',
        paymentStatus: 'pending',
        totalAmount,
        status: 'pending',
      };
      
      const rental = await createRental(rentalData);
      
      if (rental) {
        setShowOfflineInstructions(true);
      } else {
        throw new Error('Failed to create rental');
      }
    } catch (error) {
      console.error('Offline payment process failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === 'online') {
        await handleOnlinePayment();
      } else {
        await handleOfflinePayment();
      }
    } catch (error) {
      console.error('Error processing request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmOfflineOrder = async () => {
    setShowOfflineInstructions(false);
    navigate('/track', {
      state: {
        orderId: Math.random().toString(36).substring(2, 15), // In real app, this would be the actual order ID
        message: 'Your rental request has been submitted! Our team will contact you for payment confirmation.'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Rent Equipment</h1>
            
            {/* Equipment Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{equipment.name}</h2>
                  <p className="text-gray-600">{equipment.category}</p>
                  <p className="text-orange-600 font-semibold">₹{equipment.pricePerDay.toLocaleString('en-IN')}/day</p>
                </div>
              </div>
            </div>

            {/* Rental Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <div className="mt-1 relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <div className="mt-1 relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      required
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
                  Delivery Address
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    rows={3}
                    required
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter complete delivery address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    required
                    pattern="[0-9]{10}"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'online' })}
                    className={`p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                      formData.paymentMethod === 'online'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-orange-600" />
                    <div className="text-left">
                      <p className="font-semibold">Online Payment</p>
                      <p className="text-sm text-gray-500">Pay securely with card</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'offline' })}
                    className={`p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                      formData.paymentMethod === 'offline'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Building2 className="h-6 w-6 text-orange-600" />
                    <div className="text-left">
                      <p className="font-semibold">Offline Payment</p>
                      <p className="text-sm text-gray-500">Cash or bank transfer</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Offline Payment Method Selection */}
              {formData.paymentMethod === 'offline' && (
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900">Select Offline Payment Method</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, offlineMethod: 'cash' })}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        formData.offlineMethod === 'cash'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Cash Payment
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, offlineMethod: 'bank_transfer' })}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        formData.offlineMethod === 'bank_transfer'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>
              )}

              {/* Cost Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rental Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate:</span>
                    <span className="font-semibold">₹{equipment.pricePerDay.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Days:</span>
                    <span className="font-semibold">
                      {formData.startDate && formData.endDate
                        ? Math.ceil(
                            (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        : 0}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total Cost:</span>
                      <span className="text-lg font-bold text-orange-600">
                        ₹{calculateTotalCost().toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offline Payment Instructions Modal */}
              {showOfflineInstructions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4">Payment Instructions</h3>
                    {formData.offlineMethod === 'cash' ? (
                      <div className="space-y-4">
                        <p>Please have the exact amount ready for payment upon delivery:</p>
                        <p className="font-bold">₹{calculateTotalCost().toLocaleString('en-IN')}</p>
                        <p>Our delivery team will provide a receipt upon payment.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p>Please transfer the amount to our bank account:</p>
                        <div className="bg-gray-50 p-4 rounded">
                          <p>Bank: HDFC Bank</p>
                          <p>Account Name: LAXMI INFRA</p>
                          <p>Account Number: XXXX XXXX XXXX 1234</p>
                          <p>IFSC Code: HDFC0001234</p>
                        </div>
                        <p>Amount: ₹{calculateTotalCost().toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-600">
                          Please share the payment confirmation screenshot with our team.
                        </p>
                      </div>
                    )}
                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowOfflineInstructions(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={confirmOfflineOrder}
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || (formData.paymentMethod === 'offline' && !formData.offlineMethod)}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : formData.paymentMethod === 'online' ? 'Pay Now' : 'Continue to Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}