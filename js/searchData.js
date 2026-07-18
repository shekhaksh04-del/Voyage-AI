/**
 * VoyageAI Curated Search & Autocomplete Database
 * Provides suggestions, search history templates, and metadata to power the premium search dropdown.
 */

export const searchData = {
  // Autocomplete Suggestions Array
  suggestions: [
    // --- GOA, INDIA ---
    {
      id: "goa",
      name: "Goa, India",
      category: "Cities",
      location: "Goa, India",
      rating: 4.7,
      distance: 650, // km from default start (Mumbai/Ahmedabad)
      budget: "₹8,000",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80",
      keywords: ["goa", "beach", "india", "sun", "sea", "party", "relax", "honeymoon"]
    },
    {
      id: "goa-beach",
      name: "Calangute Beach",
      category: "Tourist Destinations",
      location: "North Goa, India",
      rating: 4.3,
      distance: 652,
      budget: "₹2,500",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=150&q=80",
      keywords: ["goa", "beach", "calangute", "water sports"]
    },
    {
      id: "goa-hotel",
      name: "W Goa Resort",
      category: "Hotels",
      location: "Vagator, Goa",
      rating: 4.8,
      distance: 645,
      budget: "₹18,000 / Night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80",
      keywords: ["hotel", "w goa", "resort", "luxury", "vagator"]
    },
    {
      id: "goa-dining",
      name: "Gunpowder Restaurant",
      category: "Restaurants",
      location: "Assagao, Goa",
      rating: 4.6,
      distance: 648,
      budget: "₹1,200",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80",
      keywords: ["food", "restaurant", "dining", "gunpowder", "south indian", "curry"]
    },
    {
      id: "goa-attraction",
      name: "Fort Aguada",
      category: "Attractions",
      location: "Candolim, Goa",
      rating: 4.4,
      distance: 651,
      budget: "₹200",
      image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=150&q=80",
      keywords: ["fort", "aguada", "lighthouse", "history", "view"]
    },
    {
      id: "goa-gem",
      name: "Butterfly Beach",
      category: "Hidden Gems",
      location: "South Goa, India",
      rating: 4.7,
      distance: 690,
      budget: "₹1,500 (Boat ride)",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "butterfly beach", "south goa", "quiet", "dolphins"]
    },

    // --- AHMEDABAD, INDIA ---
    {
      id: "ahmedabad",
      name: "Ahmedabad, India",
      category: "Cities",
      location: "Gujarat, India",
      rating: 4.5,
      distance: 0,
      budget: "₹4,500",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=150&q=80",
      keywords: ["ahmedabad", "gujarat", "heritage", "food", "road trip", "near me"]
    },
    {
      id: "ahmedabad-dest",
      name: "Sabarmati Ashram",
      category: "Tourist Destinations",
      location: "Ahmedabad, India",
      rating: 4.8,
      distance: 5,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=150&q=80",
      keywords: ["gandhi", "ashram", "sabarmati", "history", "peace"]
    },
    {
      id: "ahmedabad-hotel",
      name: "Hyatt Regency Ahmedabad",
      category: "Hotels",
      location: "Ashram Road, Ahmedabad",
      rating: 4.6,
      distance: 3,
      budget: "₹6,500 / Night",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=150&q=80",
      keywords: ["hotel", "hyatt", "luxury", "stay", "ashram road"]
    },
    {
      id: "ahmedabad-dining",
      name: "Agashiye Rooftop Restaurant",
      category: "Restaurants",
      location: "Lal Darwaja, Ahmedabad",
      rating: 4.7,
      distance: 4,
      budget: "₹1,500 (Thali)",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=150&q=80",
      keywords: ["food", "gujarati", "thali", "agashiye", "rooftop", "dinner"]
    },
    {
      id: "ahmedabad-attraction",
      name: "Adalaj Stepwell",
      category: "Attractions",
      location: "Adalaj, Gujarat",
      rating: 4.7,
      distance: 18,
      budget: "₹50",
      image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=150&q=80",
      keywords: ["stepwell", "adalaj", "architecture", "carving", "history"]
    },
    {
      id: "ahmedabad-gem",
      name: "Sarkhej Roza Ruins",
      category: "Hidden Gems",
      location: "Makarba, Ahmedabad",
      rating: 4.5,
      distance: 10,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "sarkhej roza", "ruins", "mosque", "lake"]
    },

    // --- JAIPUR, INDIA ---
    {
      id: "jaipur",
      name: "Jaipur, India",
      category: "Cities",
      location: "Rajasthan, India",
      rating: 4.8,
      distance: 550,
      budget: "₹7,500",
      image: "https://images.unsplash.com/photo-1477584322813-ac21cf5728af?auto=format&fit=crop&w=150&q=80",
      keywords: ["jaipur", "pink city", "rajasthan", "palace", "fort", "royal", "historical"]
    },
    {
      id: "jaipur-dest",
      name: "Hawa Mahal (Wind Palace)",
      category: "Tourist Destinations",
      location: "Jaipur, Rajasthan",
      rating: 4.7,
      distance: 552,
      budget: "₹50",
      image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=150&q=80",
      keywords: ["hawa mahal", "palace", "pink", "windows", "facade"]
    },
    {
      id: "jaipur-hotel",
      name: "Rambagh Palace",
      category: "Hotels",
      location: "Bhawani Singh Rd, Jaipur",
      rating: 4.9,
      distance: 548,
      budget: "₹35,000 / Night",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=150&q=80",
      keywords: ["hotel", "rambagh", "palace", "taj", "luxury", "royal"]
    },
    {
      id: "jaipur-dining",
      name: "Chokhi Dhani Ethnic Resort",
      category: "Restaurants",
      location: "Tonk Road, Jaipur",
      rating: 4.5,
      distance: 565,
      budget: "₹1,000",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=150&q=80",
      keywords: ["food", "restaurant", "chokhi dhani", "rajasthani", "thali", "cultural"]
    },
    {
      id: "jaipur-attraction",
      name: "Amber Palace (Amer Fort)",
      category: "Attractions",
      location: "Amer, Jaipur",
      rating: 4.8,
      distance: 560,
      budget: "₹100",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=150&q=80",
      keywords: ["amber fort", "amer", "palace", "mirror", "sheesh mahal"]
    },
    {
      id: "jaipur-gem",
      name: "Panna Meena ka Kund",
      category: "Hidden Gems",
      location: "Amer, Jaipur",
      rating: 4.6,
      distance: 561,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=150&q=80",
      keywords: ["stepwell", "panna meena", "symmetrical", "hidden", "gem", "photo"]
    },

    // --- UDAIPUR, INDIA ---
    {
      id: "udaipur",
      name: "Udaipur, India",
      category: "Cities",
      location: "Rajasthan, India",
      rating: 4.8,
      distance: 260,
      budget: "₹9,000",
      image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=150&q=80",
      keywords: ["udaipur", "lakes", "romantic", "rajasthan", "palace", "venice of east"]
    },
    {
      id: "udaipur-dest",
      name: "Lake Pichola & Lake Palace",
      category: "Tourist Destinations",
      location: "Udaipur, Rajasthan",
      rating: 4.8,
      distance: 261,
      budget: "₹400 (Boat ride)",
      image: "https://images.unsplash.com/photo-1615460547219-ee413c6f1d2f?auto=format&fit=crop&w=150&q=80",
      keywords: ["lake pichola", "lake palace", "boat ride", "palace", "sunset"]
    },
    {
      id: "udaipur-hotel",
      name: "Taj Lake Palace",
      category: "Hotels",
      location: "Lake Pichola, Udaipur",
      rating: 4.9,
      distance: 261,
      budget: "₹40,000 / Night",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=150&q=80",
      keywords: ["hotel", "taj", "lake palace", "udaipur", "floating", "luxury"]
    },
    {
      id: "udaipur-dining",
      name: "Ambrai Restaurant",
      category: "Restaurants",
      location: "Ahar River Bank, Udaipur",
      rating: 4.6,
      distance: 260,
      budget: "₹1,800",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80",
      keywords: ["food", "restaurant", "ambrai", "lake view", "candlelight", "romantic"]
    },
    {
      id: "udaipur-gem",
      name: "Bahubali Hills (Badi Lake)",
      category: "Hidden Gems",
      location: "Badi, Udaipur",
      rating: 4.7,
      distance: 272,
      budget: "₹20",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "bahubali hills", "hiking", "lake badi", "viewpoint"]
    },

    // --- TOKYO, JAPAN ---
    {
      id: "tokyo",
      name: "Tokyo, Japan",
      category: "Cities",
      location: "Kanto, Japan",
      rating: 4.9,
      distance: 6000,
      budget: "$1,500",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=150&q=80",
      keywords: ["tokyo", "japan", "neon", "anime", "sushi", "shibuya", "temple", "asia", "adventure"]
    },
    {
      id: "tokyo-dest",
      name: "Shibuya Crossing",
      category: "Tourist Destinations",
      location: "Shibuya, Tokyo",
      rating: 4.7,
      distance: 6002,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1490806862339-d24b7ec717b2?auto=format&fit=crop&w=150&q=80",
      keywords: ["shibuya", "crossing", "tokyo", "lights", "intersection"]
    },
    {
      id: "tokyo-hotel",
      name: "Park Hyatt Tokyo",
      category: "Hotels",
      location: "Shinjuku, Tokyo",
      rating: 4.8,
      distance: 5998,
      budget: "$650 / Night",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=150&q=80",
      keywords: ["hotel", "park hyatt", "shinjuku", "tokyo", "luxury", "view"]
    },
    {
      id: "tokyo-dining",
      name: "Sukiyabashi Jiro",
      category: "Restaurants",
      location: "Ginza, Tokyo",
      rating: 4.9,
      distance: 6001,
      budget: "$300 (Omakase)",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=150&q=80",
      keywords: ["sushi", "jiro", "ginza", "omakase", "gourmet", "michelin"]
    },
    {
      id: "tokyo-gem",
      name: "Todoroki Valley",
      category: "Hidden Gems",
      location: "Setagaya, Tokyo",
      rating: 4.5,
      distance: 6010,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "todoroki", "valley", "green", "jungle", "nature", "quiet"]
    },

    // --- PARIS, FRANCE ---
    {
      id: "paris",
      name: "Paris, France",
      category: "Cities",
      location: "Île-de-France, France",
      rating: 4.8,
      distance: 7200,
      budget: "€1,800",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80",
      keywords: ["paris", "france", "romantic", "art", "croissant", "louvre", "eiffel", "honeymoon"]
    },
    {
      id: "paris-dest",
      name: "Eiffel Tower",
      category: "Tourist Destinations",
      location: "Champ de Mars, Paris",
      rating: 4.8,
      distance: 7201,
      budget: "€25",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=150&q=80",
      keywords: ["eiffel", "tower", "paris", "lights", "view"]
    },
    {
      id: "paris-hotel",
      name: "Ritz Paris",
      category: "Hotels",
      location: "Place Vendôme, Paris",
      rating: 4.9,
      distance: 7199,
      budget: "€1,100 / Night",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=150&q=80",
      keywords: ["hotel", "ritz", "paris", "vendome", "luxury", "historic"]
    },
    {
      id: "paris-gem",
      name: "Promenade Plantée (Coulée verte)",
      category: "Hidden Gems",
      location: "12th Arr., Paris",
      rating: 4.6,
      distance: 7204,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "promenade", "elevated", "garden", "walkway"]
    },

    // --- REYKJAVIK, ICELAND ---
    {
      id: "reykjavik",
      name: "Reykjavik, Iceland",
      category: "Cities",
      location: "Capital Region, Iceland",
      rating: 4.7,
      distance: 8500,
      budget: "$2,200",
      image: "https://images.unsplash.com/photo-1504829857797-ddff28127792?auto=format&fit=crop&w=150&q=80",
      keywords: ["reykjavik", "iceland", "nature", "waterfall", "aurora", "northern lights", "geothermal", "mountains"]
    },
    {
      id: "reykjavik-dest",
      name: "Blue Lagoon Spa",
      category: "Tourist Destinations",
      location: "Grindavik, Iceland",
      rating: 4.6,
      distance: 8545,
      budget: "$85",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=150&q=80",
      keywords: ["blue lagoon", "spa", "geothermal", "silica", "swimming", "hot springs"]
    },
    {
      id: "reykjavik-gem",
      name: "Bruarfoss Waterfall",
      category: "Hidden Gems",
      location: "Golden Circle, Iceland",
      rating: 4.8,
      distance: 8560,
      budget: "Free",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "bruarfoss", "waterfall", "blue water", "hike", "nature"]
    },

    // --- CAIRO, EGYPT ---
    {
      id: "cairo",
      name: "Cairo, Egypt",
      category: "Cities",
      location: "Greater Cairo, Egypt",
      rating: 4.6,
      distance: 4500,
      budget: "$800",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=150&q=80",
      keywords: ["cairo", "egypt", "pyramids", "history", "nile", "sphinx", "historical", "bazaar"]
    },
    {
      id: "cairo-dest",
      name: "Pyramids of Giza",
      category: "Tourist Destinations",
      location: "Giza, Cairo",
      rating: 4.9,
      distance: 4515,
      budget: "$20",
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=150&q=80",
      keywords: ["pyramids", "giza", "wonder", "ancient", "sphinx"]
    },
    {
      id: "cairo-gem",
      name: "The Nilometer on Rhoda Island",
      category: "Hidden Gems",
      location: "Manial, Cairo",
      rating: 4.5,
      distance: 4498,
      budget: "$5",
      image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=150&q=80",
      keywords: ["hidden", "gem", "nilometer", "manial", "rhoda", "history", "measure"]
    }
  ],

  // Preset Trending / Recently Searched templates to fill options
  trending: [
    { name: "Tokyo, JP", style: "Adventure", budget: "luxury", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=400&q=80" },
    { name: "Goa, IN", style: "Beaches", budget: "moderate", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
    { name: "Reykjavik, IS", style: "Nature", budget: "luxury", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80" },
    { name: "Paris, FR", style: "Romantic", budget: "luxury", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80" },
    { name: "Udaipur, IN", style: "Honeymoon", budget: "moderate", image: "https://images.unsplash.com/photo-1615460547219-ee413c6f1d2f?auto=format&fit=crop&w=400&q=80" },
    { name: "Cairo, EG", style: "Historical", budget: "budget", image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=400&q=80" }
  ],

  recentSearches: [
    "Weekend trip near me",
    "Hill stations under ₹10,000",
    "Best beaches in Goa",
    "Road trip from Ahmedabad",
    "Family trip for 5 days",
    "Adventure places within 300 km"
  ],

  // Coordinates mapping database for map plotting
  coordinates: {
    "goa": [15.2993, 74.1240],
    "goa, india": [15.2993, 74.1240],
    "calangute beach": [15.5435, 73.7551],
    "w goa resort": [15.5976, 73.7352],
    "gunpowder restaurant": [15.5982, 73.7436],
    "fort aguada": [15.4926, 73.7738],
    "butterfly beach": [15.0182, 74.0124],
    
    "ahmedabad": [23.0225, 72.5714],
    "ahmedabad, india": [23.0225, 72.5714],
    "sabarmati ashram": [23.0605, 72.5801],
    "hyatt regency ahmedabad": [23.0471, 72.5732],
    "agashiye rooftop restaurant": [23.0267, 72.5807],
    "adalaj stepwell": [23.1668, 72.5794],
    "sarkhej roza ruins": [22.9806, 72.5025],

    "jaipur": [26.9124, 75.7873],
    "jaipur, india": [26.9124, 75.7873],
    "hawa mahal (wind palace)": [26.9239, 75.8267],
    "rambagh palace": [26.8979, 75.8085],
    "chokhi dhani ethnic resort": [26.7663, 75.8361],
    "amber palace (amer fort)": [26.9855, 75.8513],
    "panna meena ka kund": [26.9882, 75.8539],

    "udaipur": [24.5854, 73.7125],
    "udaipur, india": [24.5854, 73.7125],
    "lake pichola & lake palace": [24.5756, 73.6791],
    "taj lake palace": [24.5756, 73.6791],
    "ambrai restaurant": [24.5786, 73.6806],
    "bahubali hills (badi lake)": [24.6225, 73.6261],

    "tokyo": [35.6762, 139.6503],
    "tokyo, japan": [35.6762, 139.6503],
    "shibuya crossing": [35.6595, 139.7005],
    "park hyatt tokyo": [35.6856, 139.6911],
    "sukiyabashi jiro": [35.6722, 139.7634],
    "todoroki valley": [35.6074, 139.6462],

    "paris": [48.8566, 2.3522],
    "paris, france": [48.8566, 2.3522],
    "eiffel tower": [48.8584, 2.2945],
    "ritz paris": [48.8681, 2.3294],
    "promenade plantée (coulée verte)": [48.8475, 2.3735],

    "reykjavik": [64.1466, -21.9426],
    "reykjavik, iceland": [64.1466, -21.9426],
    "blue lagoon spa": [63.8792, -22.4451],
    "bruarfoss waterfall": [64.2642, -20.5156],

    "cairo": [30.0444, 31.2357],
    "cairo, egypt": [30.0444, 31.2357],
    "pyramids of giza": [29.9792, 31.1342],
    "the nilometer on rhoda island": [30.0071, 31.2253]
  }
};
