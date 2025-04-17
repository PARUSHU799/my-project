export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  image: string;
  available: boolean;
}

export interface BookingDetails {
  equipmentId: string;
  startDate: string;
  endDate: string;
  deliveryAddress: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'returned';
}