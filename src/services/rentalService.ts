import { supabase } from '../lib/supabase';
import { Rental } from '../types';
import { getEquipmentById } from './equipmentService';

// Convert from Supabase format to our app format
const mapRental = (item: any): Rental => ({
  id: item.id,
  equipmentId: item.equipment_id,
  customerName: item.customer_name,
  customerPhone: item.customer_phone,
  customerEmail: item.customer_email,
  startDate: item.start_date,
  endDate: item.end_date,
  deliveryAddress: item.delivery_address,
  paymentMethod: item.payment_method,
  paymentStatus: item.payment_status,
  totalAmount: item.total_amount,
  status: item.status,
  createdAt: item.created_at,
});

const calculateTotalAmount = (startDate: string, endDate: string, pricePerDay: number): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return days * pricePerDay;
};

export const createRental = async (rental: Omit<Rental, 'id' | 'createdAt' | 'totalAmount'>): Promise<Rental | null> => {
  try {
    // Get equipment details to calculate total amount
    const equipment = await getEquipmentById(rental.equipmentId);
    if (!equipment) throw new Error('Equipment not found');

    const totalAmount = calculateTotalAmount(rental.startDate, rental.endDate, equipment.pricePerDay);

    // Convert to database format
    const rentalData = {
      equipment_id: rental.equipmentId,
      customer_name: rental.customerName,
      customer_phone: rental.customerPhone,
      customer_email: rental.customerEmail,
      start_date: rental.startDate,
      end_date: rental.endDate,
      delivery_address: rental.deliveryAddress,
      payment_method: rental.paymentMethod,
      payment_status: rental.paymentStatus,
      total_amount: totalAmount,
      status: rental.status,
    };

    const { data, error } = await supabase
      .from('rentals')
      .insert(rentalData)
      .select()
      .single();
      
    if (error) throw error;
    
    return mapRental(data);
  } catch (error) {
    console.error('Error creating rental:', error);
    
    // For mock data, calculate total amount using mock equipment price
    const mockPricePerDay = 15000; // Default mock price
    const totalAmount = calculateTotalAmount(rental.startDate, rental.endDate, mockPricePerDay);
    
    // Generate a mock id for fallback
    const mockId = Math.random().toString(36).substring(2, 15);
    return {
      ...rental,
      id: mockId,
      totalAmount,
      createdAt: new Date().toISOString(),
    };
  }
};

export const getRentalById = async (id: string): Promise<Rental | null> => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select(`
        *,
        equipment:equipment_id (
          name,
          category,
          image_url,
          price_per_day
        )
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return {
      ...mapRental(data),
      equipmentName: data.equipment?.name,
      equipmentCategory: data.equipment?.category,
      equipmentImage: data.equipment?.image_url,
    };
  } catch (error) {
    console.error(`Error fetching rental with id ${id}:`, error);
    
    // Return mock data for demo with calculated total amount
    const mockStartDate = '2025-05-01';
    const mockEndDate = '2025-05-05';
    const mockPricePerDay = 15000;
    const totalAmount = calculateTotalAmount(mockStartDate, mockEndDate, mockPricePerDay);
    
    return {
      id,
      equipmentId: '1',
      customerName: 'Demo Customer',
      customerPhone: '9999999999',
      customerEmail: 'demo@example.com',
      startDate: mockStartDate,
      endDate: mockEndDate,
      deliveryAddress: '123 Construction Site, Mumbai, Maharashtra',
      paymentMethod: 'online',
      paymentStatus: 'paid',
      totalAmount,
      status: 'in_transit',
      createdAt: new Date().toISOString(),
    };
    
    
  }
};

export const updateRentalStatus = async (id: string, status: Rental['status']): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('rentals')
      .update({ status })
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error updating rental status for id ${id}:`, error);
    return false;
  }
};