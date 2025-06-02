import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../types';

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const navigate = useNavigate();

  const handleRentNow = () => {
    navigate('/rent', { state: { equipment } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <img
        src={equipment.image}
        alt={equipment.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{equipment.name}</h3>
        <p className="text-gray-600 mb-4">{equipment.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">
            ₹{equipment.pricePerDay.toLocaleString('en-IN')}/day
          </span>
          <button 
            onClick={handleRentNow}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}