export interface Property {
  id: number;
  category: 'House' | 'Apartment' | 'Land';
  title: string;
  shortDescription: string; 
  longDescription: string;  
  location: string;
  address: string;
  price: number;
  landSize: number;
  beds: number;
  baths: number;
  status: 'Sale' | 'Rent';
  date: string;
  isFeatured: boolean;
  image: string;
  images: string[];
  features: string[];
}


export const portfolioData: Property[] = [
  {
    id: 1,
    category: 'House',
    title: 'Bel Air Mansion',
    shortDescription: 'A massive architectural masterpiece with panoramic views of the city.',
    longDescription: `Luxurious 6-Bedroom Architectural Masterpiece in Bel Air, Los Angeles\n\nDiscover the pinnacle of California living in this sprawling hillside estate!\n\nKey Features:\n- Prime Location: Situated in the prestigious Bel Air enclave\n- Panaromic Views: 270-degree views of the LA skyline and Pacific Ocean\n- Massive Space: 8,500 Sq.Ft of ultra-luxury living area\n- 6 Bedrooms: Each featuring en-suite designer bathrooms\n- 8 Bathrooms: Including a spa-inspired master retreat\n- Chef's Kitchen: Professional-grade Wolf and Sub-Zero appliances\n- Smart Home: Fully automated Crestron system for security and climate\n\nCommon Facilities:\n- Infinity Pool & Spa: Overlooking the city lights\n- Home Theater: 12-seat private cinema with 4K projection\n- 24-Hr Gated Security: Absolute privacy and peace of mind\n- 5-Car Gallery: Temperature-controlled showroom parking\n\nSchedule a private viewing today to experience this masterpiece!`,
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
    shortDescription: 'Prime agricultural land with rich soil in the heart of wine country.',
    longDescription: `Prime 45,000 Sq.Ft Vineyard Land for Sale in Napa Valley\n\nSecure your place in the heart of California’s world-renowned wine country!\n\nKey Features:\n- Agricultural Gold: Rich volcanic soil ideal for premium viticulture\n- Massive Acreage: 45,000 Sq.Ft of cleared, usable land\n- Water Rights: High-capacity well and irrigation system installed\n- Development Potential: Approved for a private winery or luxury manor\n- Scenic Vistas: Uninterrupted views of the Silverado Trail hills\n\nInfrastructure Details:\n- Perimeter Security: Full perimeter fencing with private gate access\n- Utilities: Electricity and water connections ready at the boundary\n- Storage: Includes a 1,200 Sq.Ft rustic storage barn\n\nDon't miss this rare opportunity for prime vineyard ownership. Call for a site visit today.`,
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
    shortDescription: 'Sky-high luxury living overlooking the Manhattan skyline.',
    longDescription: `Exclusive 3-Bedroom Penthouse for Rent at Manhattan Sky Tower\n\nElevate your lifestyle in this 54th-floor residential masterpiece!\n\nKey Features:\n- Iconic Location: Situated in the heart of New York City (5th Ave)\n- Sky-High Living: Panoramic 360-degree skyline views\n- Spacious Layout: 2,400 Sq.Ft of modern open-concept space\n- 3 Bedrooms: Featuring floor-to-ceiling soundproof windows\n- 4 Bathrooms: Finished in Italian Carrara marble\n- Gourmet Kitchen: Sub-Zero fridge and custom oak cabinetry\n\nCommon Facilities:\n- Rooftop Garden: Private outdoor space for residents\n- 24/7 White-Glove Concierge: Dedicated service and security\n- Fitness Center: State-of-the-art gym and private yoga studio\n- Wine Cellar: Secure temperature-controlled storage\n- Private Elevator: Secure, high-speed access to the 54th floor\n\nLive above the world. Schedule your private tour today.`,
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
    shortDescription: 'Minimalist design featuring open floor plans and smart tech.',
    longDescription: `Eco-Friendly Modernist Glass Villa for Sale in Austin, TX\n\nWhere sustainable technology meets high-end minimalist design!\n\nKey Features:\n- Smart Design: Open floor plan centered around a natural courtyard\n- Energy Efficient: Equipped with full solar panels and Tesla Powerwall\n- Spacious Living: 5,200 Sq.Ft of seamless indoor-outdoor living\n- 4 Bedrooms: Including a detached guest suite\n- 3 Bathrooms: Minimalist design with Hansgrohe fixtures\n- Modern Kitchen: Integrated smart appliances and hidden pantry\n\nHome Facilities:\n- Outdoor Pool Deck: Sustainable saltwater pool system\n- Smart Home Hub: Control lighting, sound, and security via smartphone\n- CCTV Security: 24/7 monitoring and perimeter infrared sensors\n- EV Charging: High-speed charging station in the 2-car garage\n\nOwn the future of living. Contact us today for a private viewing.`,
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