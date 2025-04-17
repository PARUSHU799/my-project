import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const equipmentData = [
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
    name: 'excavator',
    category: 'Earth Moving',
    description: 'high demand  mechine .',
    pricePerDay: 18000,
    image: 'https://www.constructionweekonline.com/cloud/2021/07/06/Komatsu-PC200-8MO_0.jpg',
    available: true,
  },
  {
    id: '3',
    name: 'dumper',
    category: 'Earth Moving',
    description: 'loading and unloading the price denpending in tripes not one day .',
    pricePerDay: 4000,
    image: 'https://5.imimg.com/data5/IOS/Default/2023/4/304438167/IQ/WP/DF/152653515/product-jpeg-1000x1000.png',
    available: true,
  },
  {
    id: '4',
    name: 'tractor compressor',
    category: 'Earth Moving',
    description: 'Heavy-duty rock driller for high-rise construction projects.',
    pricePerDay: 4000,
    image: 'https://3.imimg.com/data3/NS/JW/MY-1714762/tractor-air-compressor-500x500.jpeg',
    available: true,
  },
  {
    id: '5',
    name: 'Tower Crane',
    category: 'Lifting Equipment',
    description: 'Heavy-duty tower crane for high-rise construction projects.',
    pricePerDay: 25000,
    image: 'https://wallpapercave.com/wp/wp1915969.jpg',
    available: true,
  },
  {
    id: '6',
    name: 'concret mixer',
    category: 'Concrete Equipment',
    description: 'Heavy-duty concret mixer for high-rise construction projects.',
    pricePerDay: 10000,
    image: 'https://th.bing.com/th/id/R.1851ae07813c1ed9fbe879e98b899d66?rik=iX1GfspsbOcSuA&riu=http%3a%2f%2fwww.lynnhuff.com%2fwp-content%2fuploads%2f2019%2f07%2fSelf-loading-concrete-mixer10.jpg&ehk=RwTtWUDI5SbEWs5yzvwQdcnXBUAQ6rTDZ7NQlw8ficQ%3d&risl=&pid=ImgRaw&r=0',
    available: true,
  },
  {
    id: '7',
    name: 'drillind machine',
    category: 'Earth Moving',
    description: 'Heavy-duty tower crane for high-rise construction projects.',
    pricePerDay: 3000,
    image: 'https://as1.ftcdn.net/v2/jpg/01/34/35/16/1000_F_134351604_PhlLLMglKdLrnIDNjUOjACLNBbtsdOVs.jpg',
    available: true,
  },
  {
    id: '8',
    name: ' slab core cutting machine',
    category: '',
    description: 'Heavy-duty slab coring cutiing  for high-rise construction projects.',
    pricePerDay: 25000,
    image: 'https://i.ytimg.com/vi/HZk1iPZ4uw8/maxresdefault.jpg',
    available: true,
  },
  {
    id: '9',
    name: 'pipe line laying',
    category: 'all',
    description: 'denpending on work site laying water line and sewage line.',
    pricePerDay: 0,
    image: 'https://media.sciencephoto.com/image/t8260084/800wm/T8260084-Laying_water_pipes.jpg',
    available: true,
  },
  {
    id: '10',
    name: 'demolition',
    category: 'Lifting Equipment',
    description: 'depending on construction projects.',
    pricePerDay: 0,
    image: 'https://c8.alamy.com/comp/FY10PP/demolition-of-old-industrial-building-FY10PP.jpg',
    available: true,
  },
];

const categories = ['All', 'Earth Moving', 'Concrete Equipment', 'Lifting Equipment',];

export default function Equipment() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipment = equipmentData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRentNow = (equipment: any) => {
    navigate('/rent', { state: { equipment } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Construction Equipment</h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search equipment..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">
                    ₹{item.pricePerDay.toLocaleString('en-IN')}/day
                  </span>
                  <button 
                    onClick={() => handleRentNow(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}