import { supabase } from '../lib/supabase';
import { Equipment } from '../types';

// Convert from Supabase format to our app format
const mapEquipment = (item: any): Equipment => ({
  id: item.id,
  name: item.name,
  category: item.category,
  description: item.description,
  pricePerDay: item.price_per_day,
  image: item.image_url,
  available: item.available,
});

export const getEquipment = async (): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .order('name');
      
    if (error) throw error;
    
    return data.map(mapEquipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    // Return mock data if database is not yet set up
    return [
      {
        id: '1',
        name: 'JCB 3DX Backhoe Loader',
        category: 'Earth Moving',
        description: 'Versatile backhoe loader perfect for digging, loading, and material handling.',
        pricePerDay: 15000,
        image: 'https://wallpapercave.com/wp/wp2100882.jpg',
        available: true,
      },
      {
        id: '2',
        name: 'Excavator',
        category: 'Earth Moving',
        description: 'High demand machine for efficient excavation work.',
        pricePerDay: 18000,
        image: 'https://s7d2.scene7.com/is/image/Caterpillar/CM20210704-2b32f-358fd',
        available: true,
      },
      {
        id: '3',
        name: 'Dumper',
        category: 'Earth Moving',
        description: 'Loading and unloading the price depending in trips not one day.',
        pricePerDay: 6000,
        image: 'https://www.onelap.in/news/wp-content/uploads/2020/04/pngfittp.png',
        available: true,
      },
      {
        id: '4',
        name: 'Tractor Compressor',
        category: 'Earth Moving',
        description: 'Versatile tractor-mounted compressor for various construction applications.',
        pricePerDay: 5000,
        image: 'https://5.imimg.com/data5/SELLER/Default/2022/6/WE/TM/GB/3808557/farmtrac-attached-tractor-mounted-air-compressor-500x500.jpg',
        available: true,
      },
      {
        id: '5',
        name: 'Tower Crane',
        category: 'Lifting Equipment',
        description: 'Heavy-duty tower crane for high-rise construction projects.',
        pricePerDay: 15000,
        image:'https://www.marketresearchintellect.com/images/blogs/construction-tower-cranes-revolutionizing-vertical-construction.webp',
        available: true,
      },
      {
        id: '6',
        name: 'Concrete Mixer',
        category: 'Concrete Equipment',
        description: 'Industrial concrete mixer for efficient concrete preparation.',
        pricePerDay: 15000,
        image: 'https://5.imimg.com/data5/ANDROID/Default/2022/9/FD/XK/GA/131147753/product-jpeg-500x500.jpg',
        available: true,
      },
      {
        id: '7',
        name: 'Drilling Machine',
        category: 'Earth Moving Equipment',
        description: 'Professional drilling machine for construction and mining applications.',
        pricePerDay: 15000,
        image: 'https://as1.ftcdn.net/v2/jpg/01/34/35/16/1000_F_134351604_PhlLLMglKdLrnIDNjUOjACLNBbtsdOVs.jpg',
        available: true,
      },
      {
        id: '8',
        name: 'Slab Core Cutting Machine',
        category: 'Earth Moving Equipment',
        description: 'Precision slab core cutting machine for construction projects.',
        pricePerDay: 5000,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/10/12070910/CORE-CUTTER-METHOD-FEATURE-compressed-686x400.jpg',
        available: true,
      },
      {
        id: '9',
        name: 'Pipe Laying Equipment',
        category: 'Earth Moving Equipment',
        description: 'Specialized equipment for efficient pipe laying operations.',
        pricePerDay: 8000,
        image: 'https://tse3.mm.bing.net/th/id/OIP.W20vrYgcuKX37Ljy_7DSLAHaHf?rs=1&pid=ImgDetMain&o=7&rm=3',
        available: true,
      },
      {
        id: '10',
        name: 'Demolition Equipment',
        category: 'Earth Moving Equipment',
        description: 'Professional equipment for controlled demolition projects.',
        pricePerDay: 15000,
        image: 'https://c8.alamy.com/comp/FY10PP/demolition-of-old-industrial-building-FY10PP.jpg',
        available: true,
      }
    ];
  }
};

export const getEquipmentById = async (id: string): Promise<Equipment | null> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return mapEquipment(data);
  } catch (error) {
    console.error(`Error fetching equipment with id ${id}:`, error);
    return null;
  }
};

export const getEquipmentByCategory = async (category: string): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('category', category)
      .order('name');
      
    if (error) throw error;
    
    return data.map(mapEquipment);
  } catch (error) {
    console.error(`Error fetching equipment in category ${category}:`, error);
    return [];
  }
};

export const searchEquipment = async (query: string): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');
      
    if (error) throw error;
    
    return data.map(mapEquipment);
  } catch (error) {
    console.error(`Error searching equipment with query ${query}:`, error);
    return [];
  }
};