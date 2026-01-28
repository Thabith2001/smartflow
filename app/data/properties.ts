export interface Property {
  id: number;
  category: 'House' | 'Apartment' | 'Land';
  title: string;
  description: string;
  location: string;    // City, State
  address: string;     // Full Street Address
  price: number;
  landSize: number;
  beds: number;
  baths: number;
  status: 'Sale' | 'Rent';
  date: string;
  isFeatured: boolean;
  image: string;       // Primary Thumbnail
  images: string[];    // Gallery of 3 images
  features: string[];  // Property highlights
}

export const portfolioData: Property[] = [
  {
    id: 1,
    category: 'House',
    title: 'Bel Air Mansion',
    description: 'A massive architectural masterpiece with panoramic views of the city.',
    location: 'Los Angeles, CA',
    address: '1230 Bel Air Rd, Los Angeles, CA 90077',
    price: 12500000,
    landSize: 8500,
    beds: 6,
    baths: 8,
    status: 'Sale',
    date: '2024-01-20',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800'
    ],
    features: ['CCTV Security', 'Modern Kitchen', 'Infinity Pool', 'Home Theater']
  },
  {
    id: 2,
    category: 'Land',
    title: 'Vineyard Estate',
    description: 'Prime agricultural land with rich soil in the heart of wine country.',
    location: 'Napa Valley, CA',
    address: '455 Silverado Trail, Napa, CA 94558',
    price: 4200000,
    landSize: 45000,
    beds: 0,
    baths: 0,
    status: 'Sale',
    date: '2024-01-15',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1523348830342-d51c8855239d?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1560742896-7a074081d636?auto=format&fit=crop&w=800'
    ],
    features: ['Irrigation System', 'Security Gate', 'Storage Barn', 'Private Access']
  },
  {
    id: 3,
    category: 'Apartment',
    title: 'Penthouse 54',
    description: 'Sky-high luxury living overlooking the Manhattan skyline.',
    location: 'New York, NY',
    address: '721 5th Ave, New York, NY 10022',
    price: 8900000,
    landSize: 2400,
    beds: 3,
    baths: 4,
    status: 'Rent',
    date: '2024-01-18',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800'
    ],
    features: ['Modern Kitchen', '24/7 Concierge', 'Private Gym', 'Rooftop Garden']
  },
  {
    id: 4,
    category: 'House',
    title: 'Modernist Glass Villa',
    description: 'Minimalist design featuring open floor plans and smart tech.',
    location: 'Austin, TX',
    address: '4502 Scenic Dr, Austin, TX 78703',
    price: 3400000,
    landSize: 5200,
    beds: 4,
    baths: 3,
    status: 'Sale',
    date: '2024-01-22',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1613977255092-14471776ceb1?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1613490900233-141c5520d75a?auto=format&fit=crop&w=800'
    ],
    features: ['Solar Panels', 'Smart Home Hub', 'Modern Kitchen', 'CCTV Security']
  }
  
];