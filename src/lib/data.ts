// lib/data.ts

export type RegionType = 'coastal' | 'hill' | 'central' | 'north' | 'east' | 'south';

export interface Destination {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  attractions: string[];
  bestTimeToVisit: string;
  recommendedDuration: number; // in hours
  region: RegionType;
  img: string;
}

export const destinationsList: Destination[] = [
  // WESTERN PROVINCE
  {
    id: 'colombo',
    name: 'Colombo',
    latitude: 6.9271,
    longitude: 79.8612,
    attractions: ['Gangaramaya Temple', 'Galle Face Green', 'National Museum', 'Pettah Market'],
    bestTimeToVisit: 'Early morning (6 AM - 10 AM) or evening (4 PM - 8 PM)',
    recommendedDuration: 6,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mount-lavinia',
    name: 'Mount Lavinia',
    latitude: 6.8382,
    longitude: 79.8637,
    attractions: ['Mount Lavinia Beach', 'Historic Hotel', 'Seafood Restaurants', 'Sunset Views'],
    bestTimeToVisit: 'Evening (4 PM - 8 PM) for sunset',
    recommendedDuration: 3,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dehiwala',
    name: 'Dehiwala Zoo',
    latitude: 6.8562,
    longitude: 79.8742,
    attractions: ['National Zoo', 'Aquarium', 'Elephant Shows', 'Botanical Gardens'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 4,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'negombo',
    name: 'Negombo',
    latitude: 7.2008,
    longitude: 79.8358,
    attractions: ['Negombo Beach', 'Fish Market', 'Dutch Fort', 'Lagoon'],
    bestTimeToVisit: 'Morning (6 AM - 10 AM) for fish market',
    recommendedDuration: 4,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kelaniya',
    name: 'Kelaniya',
    latitude: 6.9553,
    longitude: 79.9219,
    attractions: ['Kelaniya Raja Maha Vihara', 'Ancient Paintings', 'Sacred Site', 'River Views'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 2,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kalutara',
    name: 'Kalutara',
    latitude: 6.5854,
    longitude: 79.9607,
    attractions: ['Kalutara Temple', 'Richmond Castle', 'Beach', 'Thudugala Ella Falls'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'beruwala',
    name: 'Beruwala',
    latitude: 6.4790,
    longitude: 79.9829,
    attractions: ['Beach', 'Kechimalai Mosque', 'Diving Spots', 'Water Sports'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bentota',
    name: 'Bentota',
    latitude: 6.4260,
    longitude: 79.9957,
    attractions: ['Bentota Beach', 'River Safari', 'Water Sports', 'Turtle Hatchery'],
    bestTimeToVisit: 'Morning (8 AM - 1 PM)',
    recommendedDuration: 4,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'aluthgama',
    name: 'Aluthgama',
    latitude: 6.4298,
    longitude: 79.9989,
    attractions: ['Brief Garden', 'Kande Vihara Temple', 'Beach', 'Market'],
    bestTimeToVisit: 'Morning (9 AM - 1 PM)',
    recommendedDuration: 3,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },

  // CENTRAL PROVINCE
  {
    id: 'kandy',
    name: 'Kandy',
    latitude: 7.2906,
    longitude: 80.6337,
    attractions: ['Temple of the Tooth', 'Royal Botanical Gardens', 'Kandy Lake', 'Cultural Dance Show'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM) for temple visit',
    recommendedDuration: 5,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'peradeniya',
    name: 'Peradeniya',
    latitude: 7.2653,
    longitude: 80.5955,
    attractions: ['Royal Botanical Gardens', 'Orchid Collection', 'Giant Bamboo', 'Spice Garden'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'digana',
    name: 'Digana',
    latitude: 7.2667,
    longitude: 80.7833,
    attractions: ['Victoria Dam', 'Reservoir', 'Scenic Views', 'Hiking Trails'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'matale',
    name: 'Matale',
    latitude: 7.4675,
    longitude: 80.6234,
    attractions: ['Aluvihare Temple', 'Spice Gardens', 'Sembuwatta Lake', 'Knuckles Range'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 4,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    latitude: 7.9570,
    longitude: 80.7603,
    attractions: ['Sigiriya Rock Fortress', 'Frescoes', 'Mirror Wall', 'Royal Gardens'],
    bestTimeToVisit: 'Early morning (6 AM - 9 AM) to avoid heat',
    recommendedDuration: 4,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dambulla',
    name: 'Dambulla',
    latitude: 7.8731,
    longitude: 80.6514,
    attractions: ['Cave Temples', 'Golden Temple', 'Rock Paintings', 'Buddha Statues'],
    bestTimeToVisit: 'Morning (8 AM - 11 AM)',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'nalanda',
    name: 'Nalanda',
    latitude: 7.6833,
    longitude: 80.6333,
    attractions: ['Nalanda Gedige', 'Ancient Architecture', 'Reservoir', 'Historic Site'],
    bestTimeToVisit: 'Morning (9 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    latitude: 6.9497,
    longitude: 80.7891,
    attractions: ['Tea Plantations', 'Gregory Lake', 'Victoria Park', 'Horton Plains'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM) for tea tours',
    recommendedDuration: 5,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'horton-plains',
    name: 'Horton Plains',
    latitude: 6.8103,
    longitude: 80.7981,
    attractions: ['Worlds End', 'Bakers Falls', 'Cloud Forest', 'Wildlife'],
    bestTimeToVisit: 'Very early morning (5 AM - 9 AM)',
    recommendedDuration: 5,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'haputale',
    name: 'Haputale',
    latitude: 6.7679,
    longitude: 80.9599,
    attractions: ['Lipton Seat', 'Dambatenne Tea Factory', 'Adisham Monastery', 'Views'],
    bestTimeToVisit: 'Early morning (6 AM - 10 AM)',
    recommendedDuration: 4,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },

  // SOUTHERN PROVINCE
  {
    id: 'galle',
    name: 'Galle',
    latitude: 6.0535,
    longitude: 80.2210,
    attractions: ['Galle Fort', 'Dutch Reformed Church', 'Lighthouse', 'Maritime Museum'],
    bestTimeToVisit: 'Late afternoon (3 PM - 6 PM) for sunset',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'hikkaduwa',
    name: 'Hikkaduwa',
    latitude: 6.1408,
    longitude: 80.1031,
    attractions: ['Coral Reef', 'Beach', 'Turtle Hatchery', 'Water Sports'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM) for snorkeling',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'unawatuna',
    name: 'Unawatuna',
    latitude: 6.0100,
    longitude: 80.2490,
    attractions: ['Beach', 'Japanese Peace Pagoda', 'Jungle Beach', 'Yatagala Temple'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM) or evening (4 PM - 7 PM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'koggala',
    name: 'Koggala',
    latitude: 5.9892,
    longitude: 80.3308,
    attractions: ['Koggala Lake', 'Stilt Fishermen', 'Martin Wickramasinghe Museum', 'Beach'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ahangama',
    name: 'Ahangama',
    latitude: 5.9682,
    longitude: 80.3673,
    attractions: ['Surfing Beaches', 'Stilt Fishing', 'Yoga Retreats', 'Cafes'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'matara',
    name: 'Matara',
    latitude: 5.9485,
    longitude: 80.5353,
    attractions: ['Matara Fort', 'Parevi Duwa Temple', 'Beach', 'Weherahena Temple'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    latitude: 5.9467,
    longitude: 80.4686,
    attractions: ['Whale Watching', 'Mirissa Beach', 'Coconut Hill', 'Parrot Rock'],
    bestTimeToVisit: 'Early morning (6 AM) for whale watching',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'weligama',
    name: 'Weligama',
    latitude: 5.9722,
    longitude: 80.4292,
    attractions: ['Surfing Beach', 'Stilt Fishermen', 'Taprobane Island', 'Kushtarajagala'],
    bestTimeToVisit: 'Morning (7 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dondra',
    name: 'Dondra',
    latitude: 5.9209,
    longitude: 80.5885,
    attractions: ['Southernmost Point', 'Dondra Lighthouse', 'Temple', 'Beach'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'hambantota',
    name: 'Hambantota',
    latitude: 6.1429,
    longitude: 81.1212,
    attractions: ['Hambantota Port', 'Salt Pans', 'Bird Sanctuary', 'Bundala National Park'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'tangalle',
    name: 'Tangalle',
    latitude: 6.0232,
    longitude: 80.7969,
    attractions: ['Pristine Beaches', 'Rekawa Turtle Beach', 'Mulkirigala Temple', 'Blow Holes'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    latitude: 6.3725,
    longitude: 81.5185,
    attractions: ['Wildlife Safari', 'Leopard Spotting', 'Bird Watching', 'Beach Areas'],
    bestTimeToVisit: 'Early morning (5 AM - 9 AM) or late afternoon (3 PM - 6 PM)',
    recommendedDuration: 5,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bundala',
    name: 'Bundala National Park',
    latitude: 6.1844,
    longitude: 81.2036,
    attractions: ['Bird Sanctuary', 'Migratory Birds', 'Elephants', 'Wetlands'],
    bestTimeToVisit: 'Early morning (6 AM - 10 AM)',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'tissamaharama',
    name: 'Tissamaharama',
    latitude: 6.2744,
    longitude: 81.2869,
    attractions: ['Tissa Tank', 'Ancient Stupas', 'Yala Gateway', 'Bird Watching'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kataragama',
    name: 'Kataragama',
    latitude: 6.4134,
    longitude: 81.3344,
    attractions: ['Sacred Site', 'Multi-faith Temple', 'Pilgrimage', 'Festival Grounds'],
    bestTimeToVisit: 'Morning (6 AM - 10 AM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },

  // NORTHERN PROVINCE
  {
    id: 'jaffna',
    name: 'Jaffna',
    latitude: 9.6615,
    longitude: 80.0255,
    attractions: ['Jaffna Fort', 'Nallur Kandaswamy Temple', 'Jaffna Library', 'Casuarina Beach'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 5,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'point-pedro',
    name: 'Point Pedro',
    latitude: 9.8167,
    longitude: 80.2333,
    attractions: ['Northernmost Point', 'Lighthouse', 'Beach', 'Fishing Village'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'delft-island',
    name: 'Delft Island',
    latitude: 9.5000,
    longitude: 79.7500,
    attractions: ['Wild Horses', 'Baobab Trees', 'Dutch Fort Ruins', 'Coral Walls'],
    bestTimeToVisit: 'Full day trip (8 AM - 4 PM)',
    recommendedDuration: 6,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kilinochchi',
    name: 'Kilinochchi',
    latitude: 9.3961,
    longitude: 80.3847,
    attractions: ['War Memorial', 'Water Tank Monument', 'Buddhist Temples', 'Historical Sites'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mannar',
    name: 'Mannar',
    latitude: 8.9810,
    longitude: 79.9044,
    attractions: ['Adams Bridge', 'Baobab Tree', 'Mannar Fort', 'Thiruketheeswaram Temple'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 4,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'talaimannar',
    name: 'Talaimannar',
    latitude: 9.1167,
    longitude: 79.7167,
    attractions: ['Railway Pier', 'Beach', 'Church Ruins', 'India Views'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'vavuniya',
    name: 'Vavuniya',
    latitude: 8.7542,
    longitude: 80.4982,
    attractions: ['Vavuniya Tank', 'Archaeological Sites', 'Churches', 'Local Markets'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mullaitivu',
    name: 'Mullaitivu',
    latitude: 9.2671,
    longitude: 80.8142,
    attractions: ['War Memorials', 'Beaches', 'Nanthi Kadal Lagoon', 'Lighthouse'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 3,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },

  // EASTERN PROVINCE
  {
    id: 'batticaloa',
    name: 'Batticaloa',
    latitude: 7.7170,
    longitude: 81.6929,
    attractions: ['Batticaloa Fort', 'Lagoon', 'Singing Fish', 'Kallady Beach'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM) or evening (5 PM - 7 PM)',
    recommendedDuration: 4,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pasikudah',
    name: 'Pasikudah',
    latitude: 7.9333,
    longitude: 81.5500,
    attractions: ['Bay Beach', 'Water Sports', 'Calm Waters', 'Coral Reefs'],
    bestTimeToVisit: 'Morning (8 AM - 1 PM)',
    recommendedDuration: 4,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kalkudah',
    name: 'Kalkudah',
    latitude: 7.8833,
    longitude: 81.5333,
    attractions: ['Beach', 'Swimming', 'Snorkeling', 'Resorts'],
    bestTimeToVisit: 'Morning (8 AM - 1 PM)',
    recommendedDuration: 3,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    latitude: 6.8408,
    longitude: 81.8358,
    attractions: ['Surfing Beach', 'Pottuvil Point', 'Muhudu Maha Viharaya', 'Lagoon Safari'],
    bestTimeToVisit: 'Morning (6 AM - 10 AM) for surfing',
    recommendedDuration: 5,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ampara',
    name: 'Ampara',
    latitude: 7.2978,
    longitude: 81.6722,
    attractions: ['Buddhist Temple', 'Hindu Temples', 'Agricultural Areas', 'Reservoir'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pottuvil',
    name: 'Pottuvil',
    latitude: 6.8700,
    longitude: 81.8333,
    attractions: ['Surfing', 'Lighthouse', 'Lagoon', 'Beach'],
    bestTimeToVisit: 'Morning (6 AM - 11 AM)',
    recommendedDuration: 3,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    latitude: 8.5874,
    longitude: 81.2152,
    attractions: ['Nilaveli Beach', 'Pigeon Island', 'Koneswaram Temple', 'Hot Springs'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM) for beach activities',
    recommendedDuration: 5,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'nilaveli',
    name: 'Nilaveli',
    latitude: 8.7000,
    longitude: 81.1833,
    attractions: ['Beach', 'Pigeon Island National Park', 'Snorkeling', 'Diving'],
    bestTimeToVisit: 'Morning (8 AM - 1 PM)',
    recommendedDuration: 4,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'uppuveli',
    name: 'Uppuveli',
    latitude: 8.6333,
    longitude: 81.2000,
    attractions: ['Beach', 'War Cemetery', 'Water Sports', 'Velgam Vehera'],
    bestTimeToVisit: 'Morning (7 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'east',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },

  // NORTH WESTERN PROVINCE
  {
    id: 'kurunegala',
    name: 'Kurunegala',
    latitude: 7.4867,
    longitude: 80.3647,
    attractions: ['Elephant Rock', 'Athugala Rock', 'Ridi Viharaya', 'Lakes'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kurunegala-ridi-vihara',
    name: 'Ridi Viharaya',
    latitude: 7.3333,
    longitude: 80.4833,
    attractions: ['Ancient Temple', 'Silver Cave', 'Murals', 'Historic Site'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'puttalam',
    name: 'Puttalam',
    latitude: 8.0362,
    longitude: 79.8283,
    attractions: ['Kalpitiya Beach', 'Dolphin Watching', 'Wilpattu National Park', 'Lagoon'],
    bestTimeToVisit: 'Early morning (6 AM - 10 AM)',
    recommendedDuration: 5,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kalpitiya',
    name: 'Kalpitiya',
    latitude: 8.2333,
    longitude: 79.7667,
    attractions: ['Kitesurfing', 'Dolphin Watching', 'Bar Reef', 'Islands'],
    bestTimeToVisit: 'Morning (6 AM - 11 AM)',
    recommendedDuration: 5,
    region: 'coastal',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wilpattu',
    name: 'Wilpattu National Park',
    latitude: 8.4333,
    longitude: 80.0167,
    attractions: ['Wildlife Safari', 'Leopards', 'Sloth Bears', 'Natural Lakes'],
    bestTimeToVisit: 'Early morning (5 AM - 9 AM)',
    recommendedDuration: 5,
    region: 'north',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },

  // NORTH CENTRAL PROVINCE
  {
    id: 'anuradhapura',
    name: 'Anuradhapura',
    latitude: 8.3114,
    longitude: 80.4037,
    attractions: ['Sri Maha Bodhi', 'Ruwanwelisaya', 'Jetavanaramaya', 'Abhayagiri Dagaba'],
    bestTimeToVisit: 'Early morning (6 AM - 10 AM) to avoid heat',
    recommendedDuration: 6,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mihintale',
    name: 'Mihintale',
    latitude: 8.3510,
    longitude: 80.5097,
    attractions: ['Sacred Mountain', 'Ancient Monastery', 'Mahaseya Dagoba', 'Hospital Ruins'],
    bestTimeToVisit: 'Early morning (6 AM - 9 AM)',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa',
    latitude: 7.9403,
    longitude: 81.0188,
    attractions: ['Gal Vihara', 'Royal Palace', 'Parakrama Samudra', 'Vatadage'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 5,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'minneriya',
    name: 'Minneriya National Park',
    latitude: 8.0333,
    longitude: 80.8833,
    attractions: ['Elephant Gathering', 'Wildlife Safari', 'Bird Watching', 'Tank'],
    bestTimeToVisit: 'Late afternoon (3 PM - 6 PM)',
    recommendedDuration: 4,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kaudulla',
    name: 'Kaudulla National Park',
    latitude: 8.1500,
    longitude: 80.8500,
    attractions: ['Elephants', 'Safari', 'Bird Watching', 'Reservoir'],
    bestTimeToVisit: 'Afternoon (3 PM - 6 PM)',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },

  // UVA PROVINCE
  {
    id: 'ella',
    name: 'Ella',
    latitude: 6.8667,
    longitude: 81.0467,
    attractions: ['Nine Arch Bridge', 'Little Adams Peak', 'Ravana Falls', 'Ella Rock'],
    bestTimeToVisit: 'Early morning (5 AM - 9 AM) for hiking',
    recommendedDuration: 6,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'badulla',
    name: 'Badulla',
    latitude: 6.9934,
    longitude: 81.0550,
    attractions: ['Muthiyangana Temple', 'Dunhinda Falls', 'Dhowa Temple', 'Tea Estates'],
    bestTimeToVisit: 'Morning (7 AM - 11 AM)',
    recommendedDuration: 4,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bandarawela',
    name: 'Bandarawela',
    latitude: 6.8333,
    longitude: 80.9833,
    attractions: ['Dowa Temple', 'Tea Estates', 'Cool Climate', 'Hiking Trails'],
    bestTimeToVisit: 'Morning (8 AM - 1 PM)',
    recommendedDuration: 3,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ella-gap',
    name: 'Ella Gap',
    latitude: 6.8500,
    longitude: 81.0333,
    attractions: ['Scenic Views', 'Photography', 'Tea Estates', 'Valley Views'],
    bestTimeToVisit: 'Early morning (6 AM - 9 AM)',
    recommendedDuration: 2,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'monaragala',
    name: 'Monaragala',
    latitude: 6.8728,
    longitude: 81.3507,
    attractions: ['Maligawila Buddha Statue', 'Buduruwagala', 'Wellawaya', 'Yala Access'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'wellawaya',
    name: 'Wellawaya',
    latitude: 6.7333,
    longitude: 81.1000,
    attractions: ['Buduruwagala', 'Ancient Sculptures', 'Scenic Route', 'Rock Carvings'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 2,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },

  // SABARAGAMUWA PROVINCE
  {
    id: 'ratnapura',
    name: 'Ratnapura',
    latitude: 6.7056,
    longitude: 80.3847,
    attractions: ['Gem Mines', 'Maha Saman Devalaya', 'Adams Peak Base', 'Sinharaja Forest'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 4,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sinharaja',
    name: 'Sinharaja Rainforest',
    latitude: 6.4006,
    longitude: 80.4006,
    attractions: ['Rainforest Trek', 'Endemic Species', 'Bird Watching', 'Waterfalls'],
    bestTimeToVisit: 'Early morning (6 AM - 10 AM)',
    recommendedDuration: 5,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'adams-peak',
    name: 'Adams Peak (Sri Pada)',
    latitude: 6.8096,
    longitude: 80.4989,
    attractions: ['Sacred Mountain', 'Pilgrimage', 'Sunrise View', 'Footprint'],
    bestTimeToVisit: 'Night climb (2 AM - 6 AM) for sunrise',
    recommendedDuration: 8,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kitulgala',
    name: 'Kitulgala',
    latitude: 6.9894,
    longitude: 80.4178,
    attractions: ['White Water Rafting', 'Kelani River', 'Bridge on River Kwai Location', 'Bird Watching'],
    bestTimeToVisit: 'Morning (8 AM - 1 PM)',
    recommendedDuration: 4,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'kegalle',
    name: 'Kegalle',
    latitude: 7.2523,
    longitude: 80.3436,
    attractions: ['Pinnawala Elephant Orphanage', 'Ambuluwawa Tower', 'Dedigama Ruins', 'Rubber Plantations'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 4,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pinnawala',
    name: 'Pinnawala',
    latitude: 7.2986,
    longitude: 80.3886,
    attractions: ['Elephant Orphanage', 'Bathing Time', 'Baby Elephants', 'River'],
    bestTimeToVisit: 'Morning (10 AM - 12 PM) for bathing time',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ambuluwawa',
    name: 'Ambuluwawa',
    latitude: 7.3333,
    longitude: 80.5500,
    attractions: ['Tower', 'Panoramic Views', 'Biodiversity', 'Temple Complex'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'hill',
    img: 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop'
  },

  // ADDITIONAL POPULAR DESTINATIONS
  {
    id: 'pidurangala',
    name: 'Pidurangala Rock',
    latitude: 7.9667,
    longitude: 80.7500,
    attractions: ['Rock Climbing', 'Ancient Temple', 'Sigiriya Views', 'Sunrise Point'],
    bestTimeToVisit: 'Early morning (5 AM - 8 AM) for sunrise',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ritigala',
    name: 'Ritigala',
    latitude: 8.0833,
    longitude: 80.6500,
    attractions: ['Ancient Monastery', 'Forest Reserve', 'Meditation Platforms', 'Archaeological Site'],
    bestTimeToVisit: 'Morning (8 AM - 12 PM)',
    recommendedDuration: 3,
    region: 'central',
    img: 'https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'udawalawe',
    name: 'Udawalawe National Park',
    latitude: 6.4333,
    longitude: 80.8833,
    attractions: ['Elephant Safari', 'Wildlife', 'Reservoir', 'Transit Home'],
    bestTimeToVisit: 'Morning (6 AM - 10 AM)',
    recommendedDuration: 4,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'uda-walawe-elephant-transit',
    name: 'Elephant Transit Home',
    latitude: 6.4500,
    longitude: 80.8833,
    attractions: ['Baby Elephants', 'Feeding Time', 'Conservation', 'Viewing Platform'],
    bestTimeToVisit: 'Feeding times (9 AM, 12 PM, 3 PM, 6 PM)',
    recommendedDuration: 2,
    region: 'south',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop'
  }
];

export function getDestinationByName(name: string): Destination | undefined {
  return destinationsList.find(d => d.name.toLowerCase() === name.toLowerCase());
}
