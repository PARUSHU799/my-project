export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  image: string;
  available: boolean;
}

export interface Rental {
  id: string;
  equipmentId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  startDate: string;
  endDate: string;
  deliveryAddress: string;
  paymentMethod: 'online' | 'offline';
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'returned' | 'cancelled';
  createdAt?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}