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
        image: 'https://constructionopportunities.in/wp-content/uploads/2023/09/JCB-August-2023.jpg',
        available: true,
      },
      {
        id: '2',
        name: 'Excavator',
        category: 'Earth Moving',
        description: 'High demand machine for efficient excavation work.',
        pricePerDay: 18000,
        image: 'https://www.constructionweekonline.com/cloud/2021/07/06/Komatsu-PC200-8MO_0.jpg',
        available: true,
      },
      {
        id: '3',
        name: 'Dumper',
        category: 'Earth Moving',
        description: 'Loading and unloading the price depending in trips not one day.',
        pricePerDay: 6000,
        image: 'https://5.imimg.com/data5/IOS/Default/2023/4/304438167/IQ/WP/DF/152653515/product-jpeg-1000x1000.png',
        available: true,
      },
       {
        id: '4',
        name: 'Tractor compressor',
        category: 'Earth Moving',
        description: 'Versatile backhoe loader perfect for digging, loading, and material handling.',
        pricePerDay: 5000,
        image: 'https://3.imimg.com/data3/NS/JW/MY-1714762/tractor-air-compressor-500x500.jpeg',
        available: true,
      },
       {
        id: '5',
        name: 'Tower crane',
        category: 'lifting Equipment',
        description: 'Heavy-duty tower crane for high-rise construction projects.',
        pricePerDay: 15000,
        image: 'https://wallpapercave.com/wp/wp1915969.jpg',
        available: true,
      },
       {
        id: '6',
        name: 'Concrete mixer',
        category: 'Concrete equipment',
        description: 'Heavy-duty conrete mixer for high-rise construction projects.',
        pricePerDay: 15000,
        image: 'https://th.bing.com/th/id/OIP.nJ7m_S1JPieZioVhsP9JbQHaHa?rs=1&pid=ImgDetMain',
        available: true,
      },
       {
        id: '7',
        name: 'Drilling machine',
        category: 'Earth moving equipment',
        description: 'Heavy-duty drilling machine for high-rise construction projects.',
        pricePerDay: 15000,
        image: 'https://as1.ftcdn.net/v2/jpg/01/34/35/16/1000_F_134351604_PhlLLMglKdLrnIDNjUOjACLNBbtsdOVs.jpg',
        available: true,
      },
 {
        id: '8',
        name: 'Slab core cutting machine ',
        category: 'Earth moving Equipment',
        description: 'Heavy-duty slap cutting core machine for high-rise construction projects.',
        pricePerDay: 5000,
        image: 'https://i.ytimg.com/vi/HZk1iPZ4uw8/maxresdefault.jpg',
        available: true,
      },
       {
        id: '9',
        name: 'Pipe laying',
        category: 'earth movig Equipment',
        description: 'Heavy-duty  ground water for high-rise construction projects.',
        pricePerDay: 0,
        image: 'https://media.sciencephoto.com/image/t8260084/800wm/T8260084-Laying_water_pipes.jpg',
        available: true,
      },
       {
        id: '10',
        name: 'Demolition equipment',
        category: 'Earth moving Equipment',
        description: 'Heavy-duty earth moving for high-rise construction projects.',
        pricePerDay: 15000,
        image: 'https://c8.alamy.com/comp/FY10PP/demolition-of-old-industrial-building-FY10PP.jpg'
,
        available: true,
      },
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