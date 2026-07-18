/**
 * VoyageAI Simulation Engine
 * Provides pre-curated premium itineraries for popular cities and dynamic fallbacks for custom inputs.
 */
import { searchData } from './searchData.js';

const CURATED_PLANS = {
  tokyo: {
    destination: "Tokyo, Japan",
    budget: {
      total: 1500,
      currency: "USD",
      categories: [
        { category: "Accommodation", amount: 650, percentage: 43 },
        { category: "Food & Dining", amount: 400, percentage: 27 },
        { category: "Transit", amount: 150, percentage: 10 },
        { category: "Activities", amount: 300, percentage: 20 }
      ]
    },
    packingChecklist: [
      {
        category: "Essentials",
        items: ["Passport & Visa docs", "Cash (Yen is highly preferred)", "Universal power adapter (Type A)", "Suica/Pasmo transit card (digital or physical)"]
      },
      {
        category: "Electronics",
        items: ["Pocket Wi-Fi or eSIM QR code", "Power bank", "Camera & extra SD card"]
      },
      {
        category: "Clothing",
        items: ["Slip-on shoes (for temple visits)", "Light jacket", "Comfortable walking sneakers"]
      },
      {
        category: "Toiletries & Meds",
        items: ["Personal medication", "Hand sanitizer", "Travel tissues (many public restrooms lack towels)"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Neon Grids & High Tech Realms",
        activities: [
          {
            time: "09:00 AM",
            activity: "Explore the futuristic digital installations at teamLab Planets in Toyosu. Cross boundary lines between art, physical space, and water.",
            transport: { mode: "Train", duration: "25 min", cost: "$3.50" }
          },
          {
            time: "12:30 PM",
            activity: "Fresh Sushi Lunch at Tsukiji Outer Market. Savor direct catch sashimi, tamagoyaki (sweet omelet), and wagyu skewers.",
            transport: { mode: "Metro", duration: "15 min", cost: "$2.00" }
          },
          {
            time: "03:00 PM",
            activity: "Dive into Akihabara Electric Town. Explore multi-story retro game centers, anime shops, and glowing neon facades.",
            transport: { mode: "Walking", duration: "10 min", cost: "Free" }
          },
          {
            time: "07:30 PM",
            activity: "Gourmet Ramen dinner at a subterranean dining alley in Tokyo Station, followed by cocktails at a high-elevation bar in Shinjuku overlooking the glowing skyline.",
            transport: { mode: "Train", duration: "20 min", cost: "$3.00" }
          }
        ]
      },
      {
        day: 2,
        title: "Tranquil Paths & Historic Gates",
        activities: [
          {
            time: "08:30 AM",
            activity: "Beat the crowds at Meiji Jingu Shrine. Walk through the giant wooden torii gate and experience the tranquil cedar forest.",
            transport: { mode: "Train", duration: "18 min", cost: "$2.50" }
          },
          {
            time: "11:00 AM",
            activity: "Explore Harajuku's Takeshita Street for quirky street fashion, followed by luxury window shopping and architectural sightseeing on Omotesando Avenue.",
            transport: { mode: "Walking", duration: "5 min", cost: "Free" }
          },
          {
            time: "01:30 PM",
            activity: "Enjoy bento boxes or street food in Yoyogi Park, taking in the urban greenery.",
            transport: { mode: "Walking", duration: "12 min", cost: "Free" }
          },
          {
            time: "04:30 PM",
            activity: "Navigate the iconic Shibuya Crossing. Witness the simultaneous flow of thousands of pedestrians from the glass observatory at Shibuya Sky.",
            transport: { mode: "Train", duration: "8 min", cost: "$2.00" }
          },
          {
            time: "08:00 PM",
            activity: "Intimate dining experience at a traditional Izakaya in Nonbei Yokocho (Drunkard's Alley) - tiny, atmosphere-rich bar cubicles.",
            transport: { mode: "Walking", duration: "5 min", cost: "Free" }
          }
        ]
      },
      {
        day: 3,
        title: "Legacy Districts & Cyber-Skies",
        activities: [
          {
            time: "09:00 AM",
            activity: "Step back in time at Senso-ji Temple in Asakusa, Tokyo's oldest Buddhist temple. Walk through Kaminarimon (Thunder Gate) and shop along Nakamise-dori.",
            transport: { mode: "Metro", duration: "35 min", cost: "$3.00" }
          },
          {
            time: "12:30 PM",
            activity: "Lunch featuring traditional Tempura or Monjayaki in the historic quarters.",
            transport: { mode: "Walking", duration: "5 min", cost: "Free" }
          },
          {
            time: "03:00 PM",
            activity: "Catch a futuristic river cruise on the Sumida River toward Odaiba, enjoying panoramic bridge views.",
            transport: { mode: "River Bus", duration: "50 min", cost: "$12.00" }
          },
          {
            time: "06:00 PM",
            activity: "Watch the sunset behind the Rainbow Bridge in Odaiba. Take photos with the giant Unicorn Gundam statue and explore the deck walkway.",
            transport: { mode: "Walking", duration: "10 min", cost: "Free" }
          },
          {
            time: "08:30 PM",
            activity: "Indulge in a premium Teppanyaki wagyu dinner, cooked live on steel plates before your eyes.",
            transport: { mode: "Taxi", duration: "15 min", cost: "$22.00" }
          }
        ]
      }
    ]
  },
  paris: {
    destination: "Paris, France",
    budget: {
      total: 1800,
      currency: "EUR",
      categories: [
        { category: "Accommodation", amount: 800, percentage: 44 },
        { category: "Food & Bistros", amount: 500, percentage: 28 },
        { category: "Transit", amount: 100, percentage: 6 },
        { category: "Museums & Sights", amount: 400, percentage: 22 }
      ]
    },
    packingChecklist: [
      {
        category: "Essentials",
        items: ["Passport", "Schengen visa documents (if applicable)", "Credit cards (contactless is everywhere)", "Euros (small bills)"]
      },
      {
        category: "Electronics",
        items: ["Europlug adapter (Type C/E)", "Phone charger & backup battery"]
      },
      {
        category: "Clothing",
        items: ["Smart-casual dining wear (Parisian chic)", "Comfortable walking boots or flats", "Rain trench coat or compact umbrella"]
      },
      {
        category: "Toiletries & Meds",
        items: ["Moisturizer (dry air)", "Sunscreen", "Personal health supplies"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Artistic Heights & River Flows",
        activities: [
          {
            time: "09:00 AM",
            activity: "Ascend the winding streets of Montmartre. Visit the Sacré-Cœur Basilica and look out over the entire Parisian sprawl.",
            transport: { mode: "Metro", duration: "30 min", cost: "$2.10" }
          },
          {
            time: "11:30 AM",
            activity: "Wander around Place du Tertre to see local painters at work. Duck into a corner bistro for a fresh croissant and cafe au lait.",
            transport: { mode: "Walking", duration: "5 min", cost: "Free" }
          },
          {
            time: "02:00 PM",
            activity: "Walk down toward the Palais Garnier opera house to admire the breathtaking Beaux-Arts architecture.",
            transport: { mode: "Metro", duration: "15 min", cost: "$2.10" }
          },
          {
            time: "06:00 PM",
            activity: "Board an evening glass-canopied Seine River cruise near the Eiffel Tower, watching the iron monument sparkle with thousands of lights as dusk settles.",
            transport: { mode: "Metro", duration: "25 min", cost: "$2.10" }
          },
          {
            time: "08:30 PM",
            activity: "Classic French dinner (duck confit, escargots, creme brulee) at a historic Latin Quarter brasserie.",
            transport: { mode: "Walking", duration: "10 min", cost: "Free" }
          }
        ]
      },
      {
        day: 2,
        title: "Palaces of Culture & Regal Gardens",
        activities: [
          {
            time: "09:00 AM",
            activity: "Fast-track entry into the Louvre Museum. Marvel at the Mona Lisa, Winged Victory, and Venus de Milo in the historic fortress halls.",
            transport: { mode: "Metro", duration: "10 min", cost: "$2.10" }
          },
          {
            time: "01:00 PM",
            activity: "Stroll through the manicured Tuileries Garden and enjoy a casual, gourmet lunch of crepes and cider at an outdoor garden stall.",
            transport: { mode: "Walking", duration: "10 min", cost: "Free" }
          },
          {
            time: "03:00 PM",
            activity: "Explore the Musee de l'Orangerie, sitting in the oval rooms dedicated entirely to Claude Monet's massive Water Lilies series.",
            transport: { mode: "Walking", duration: "8 min", cost: "Free" }
          },
          {
            time: "05:30 PM",
            activity: "Cross the Pont Neuf to Île de la Cité to see the external Gothic architecture of Notre-Dame Cathedral.",
            transport: { mode: "Walking", duration: "15 min", cost: "Free" }
          },
          {
            time: "08:00 PM",
            activity: "Fine dining experience featuring a curated wine pairing menu in the elegant Saint-Germain-des-Prés district.",
            transport: { mode: "Metro", duration: "12 min", cost: "$2.10" }
          }
        ]
      },
      {
        day: 3,
        title: "Chic Avenues & Royal Resonances",
        activities: [
          {
            time: "09:30 AM",
            activity: "Walk down the glamorous Avenue des Champs-Élysées. Ascend the Arc de Triomphe for panoramic views radiating outwards in 12 avenues.",
            transport: { mode: "Metro", duration: "20 min", cost: "$2.10" }
          },
          {
            time: "12:30 PM",
            activity: "Indulge in afternoon tea and colorful macarons at Laduree's opulent flagship salon.",
            transport: { mode: "Walking", duration: "5 min", cost: "Free" }
          },
          {
            time: "02:30 PM",
            activity: "Wander through the stunning Luxembourg Gardens. Relax on the famous green metal chairs surrounding the Grand Bassin pond.",
            transport: { mode: "RER Train", duration: "18 min", cost: "$3.50" }
          },
          {
            time: "06:00 PM",
            activity: "Explore the Marais district, shopping at independent boutiques and viewing the beautiful Place des Vosges.",
            transport: { mode: "Metro", duration: "15 min", cost: "$2.10" }
          },
          {
            time: "08:00 PM",
            activity: "Farewell dinner of modern bistro gastronomy in a candlelit courtyard.",
            transport: { mode: "Walking", duration: "10 min", cost: "Free" }
          }
        ]
      }
    ]
  },
  reykjavik: {
    destination: "Reykjavik, Iceland",
    budget: {
      total: 2200,
      currency: "USD",
      categories: [
        { category: "Lodging & Cabins", amount: 1000, percentage: 45 },
        { category: "Excursions & Spas", amount: 600, percentage: 27 },
        { category: "Car Rental / Transit", amount: 350, percentage: 16 },
        { category: "Food & Drinks", amount: 250, percentage: 12 }
      ]
    },
    packingChecklist: [
      {
        category: "Essentials",
        items: ["Passport", "Drivers license (for rental car)", "Credit card (Iceland is nearly 100% cashless)", "Travel insurance cards"]
      },
      {
        category: "Electronics",
        items: ["Type C/F adapter", "GoPro/Action camera", "Waterproof phone pouch"]
      },
      {
        category: "Clothing",
        items: ["Thermal base layers (wool/merino)", "Windproof and waterproof shell jacket", "Sturdy hiking boots with good grip", "Swimwear (for hot springs)"]
      },
      {
        category: "Toiletries & Meds",
        items: ["High-strength lip balm", "Moisture cream", "Conditioner (essential before entering geothermal pools)"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Geothermal Waters & Volcanic Ridges",
        activities: [
          {
            time: "09:00 AM",
            activity: "Arrive at the world-famous Blue Lagoon geothermal spa. Soak in the mineral-rich silica mud waters surrounded by black basalt lava fields.",
            transport: { mode: "Shuttle", duration: "45 min", cost: "$45.00" }
          },
          {
            time: "01:00 PM",
            activity: "Head into Reykjavik city center. Grab a famous Icelandic hot dog at Bæjarins Beztu Pylsur.",
            transport: { mode: "Bus", duration: "45 min", cost: "$15.00" }
          },
          {
            time: "03:00 PM",
            activity: "Walk to Hallgrimskirkja Church. Take the elevator to the top of the tower for a 360-degree view of Reykjavik's colorful corrugated iron roofs.",
            transport: { mode: "Walking", duration: "10 min", cost: "Free" }
          },
          {
            time: "07:30 PM",
            activity: "Dine on fresh Atlantic cod or arctic char at a rustic harbor restaurant, followed by a local craft beer tasting.",
            transport: { mode: "Walking", duration: "12 min", cost: "Free" }
          }
        ]
      },
      {
        day: 2,
        title: "Tectonic Troughs & Thundering Falls",
        activities: [
          {
            time: "08:30 AM",
            activity: "Embark on the Golden Circle road trip. First stop: Þingvellir National Park, where the North American and Eurasian tectonic plates drift apart.",
            transport: { mode: "Rental Car", duration: "45 min", cost: "$50.00" }
          },
          {
            time: "11:30 AM",
            activity: "Visit the Haukadalur Geothermal Valley to witness Strokkur geysir erupt boiling water 30 meters into the air every 8 minutes.",
            transport: { mode: "Rental Car", duration: "50 min", cost: "$10.00" }
          },
          {
            time: "01:30 PM",
            activity: "Admire the raw power of Gullfoss (Golden Falls), a massive double-tiered waterfall plunging into a deep rugged canyon.",
            transport: { mode: "Rental Car", duration: "15 min", cost: "Free" }
          },
          {
            time: "04:30 PM",
            activity: "Relax at the Secret Lagoon, a natural hot spring in Fludir, with steam rising into the cold sky.",
            transport: { mode: "Rental Car", duration: "30 min", cost: "$25.00" }
          },
          {
            time: "08:00 PM",
            activity: "Drive back to Reykjavik and search the dark outskirts for the elusive Aurora Borealis (Northern Lights).",
            transport: { mode: "Rental Car", duration: "40 min", cost: "$10.00" }
          }
        ]
      },
      {
        day: 3,
        title: "Black Sands & Glacial Basalt",
        activities: [
          {
            time: "08:00 AM",
            activity: "Head down the South Coast. Walk behind the roaring curtain of water at Seljalandsfoss waterfall (wear waterproof gear!).",
            transport: { mode: "Rental Car", duration: "1 hr 45 min", cost: "$40.00" }
          },
          {
            time: "11:00 AM",
            activity: "Explore Skogafoss waterfall, climbing the 527 wooden steps for a view from the top of the cliff.",
            transport: { mode: "Rental Car", duration: "25 min", cost: "Free" }
          },
          {
            time: "01:30 PM",
            activity: "Walk along the black volcanic sands of Reynisfjara beach. Marvel at the hexagonal basalt columns (Reynisdrangar) towering out of the sea.",
            transport: { mode: "Rental Car", duration: "30 min", cost: "Free" }
          },
          {
            time: "06:30 PM",
            activity: "Return to Reykjavik, stopping for a hearty dinner of traditional lamb soup at a small village diner along the Ring Road.",
            transport: { mode: "Rental Car", duration: "2 hr 15 min", cost: "$35.00" }
          }
        ]
      }
    ]
  },
  cairo: {
    destination: "Cairo, Egypt",
    budget: {
      total: 800,
      currency: "USD",
      categories: [
        { category: "Lodging & Views", amount: 350, percentage: 44 },
        { category: "Tours & Guides", amount: 200, percentage: 25 },
        { category: "Transport & Drivers", amount: 130, percentage: 16 },
        { category: "Local Food & Crafts", amount: 120, percentage: 15 }
      ]
    },
    packingChecklist: [
      {
        category: "Essentials",
        items: ["Passport & printed e-Visa", "Egyptian Pounds (cash is vital for tipping/markets)", "Sunglasses & high UV protect sunscreen"]
      },
      {
        category: "Electronics",
        items: ["Type C/G power adapter", "Camera with telephoto lens", "Heavy-duty power bank"]
      },
      {
        category: "Clothing",
        items: ["Modest, lightweight cotton clothes", "Wide-brimmed sun hat", "Breathable walking shoes"]
      },
      {
        category: "Toiletries & Meds",
        items: ["Hand sanitizer & wet wipes", "Dehydration salts", "Insect repellent"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Monuments of Eternity",
        activities: [
          {
            time: "08:00 AM",
            activity: "Stand before the Great Pyramids of Giza and the Sphinx. Marvel at the last surviving wonder of the ancient world.",
            transport: { mode: "Private Car", duration: "35 min", cost: "$15.00" }
          },
          {
            time: "12:00 PM",
            activity: "Traditional lunch of Koshary (Egypt's national dish: lentils, pasta, rice, chickpeas, tomato sauce, crispy onions).",
            transport: { mode: "Walking", duration: "8 min", cost: "$3.00" }
          },
          {
            time: "02:00 PM",
            activity: "Visit the Grand Egyptian Museum (GEM) or Egyptian Museum at Tahrir Square to see the golden treasures of King Tutankhamun.",
            transport: { mode: "Uber", duration: "25 min", cost: "$6.00" }
          },
          {
            time: "06:30 PM",
            activity: "Take a sunset Felucca (traditional wooden sailboat) ride down the Nile River, watching the city lights flicker on.",
            transport: { mode: "Walking", duration: "10 min", cost: "$20.00" }
          },
          {
            time: "08:30 PM",
            activity: "Dinner at a Nile-side restaurant featuring grilled kofta, kebab, and freshly baked aish baladi (flatbread).",
            transport: { mode: "Walking", duration: "5 min", cost: "Free" }
          }
        ]
      },
      {
        day: 2,
        title: "Bazaars & Medieval Fortresses",
        activities: [
          {
            time: "09:00 AM",
            activity: "Explore the Citadel of Saladin and the beautiful alabaster Mosque of Muhammad Ali. Look down over the historic skyline.",
            transport: { mode: "Uber", duration: "20 min", cost: "$5.00" }
          },
          {
            time: "12:30 PM",
            activity: "Lunch in the historic, green Al-Azhar Park, offering panoramic vistas of Islamic Cairo's minarets.",
            transport: { mode: "Taxi", duration: "10 min", cost: "$3.00" }
          },
          {
            time: "03:00 PM",
            activity: "Get lost in the maze-like alleys of Khan El-Khalili bazaar. Shop for copper plates, spices, and glass perfume bottles.",
            transport: { mode: "Walking", duration: "15 min", cost: "Free" }
          },
          {
            time: "06:00 PM",
            activity: "Sip mint tea and smoke shisha (optional) at El Fishawy cafe, Cairo's oldest continuous coffee house.",
            transport: { mode: "Walking", duration: "2 min", cost: "$4.00" }
          },
          {
            time: "08:00 PM",
            activity: "Attend a traditional Sufi dance (Tanoura) show in the beautifully restored Wikala of Al-Ghouri.",
            transport: { mode: "Walking", duration: "10 min", cost: "$10.00" }
          }
        ]
      },
      {
        day: 3,
        title: "Coptic Roots & Synagogues",
        activities: [
          {
            time: "09:30 AM",
            activity: "Visit Old Cairo (Coptic Cairo). See the historic Hanging Church (Al-Muallaqa), Ben Ezra Synagogue, and Abu Serga Church.",
            transport: { mode: "Metro", duration: "30 min", cost: "$0.50" }
          },
          {
            time: "01:00 PM",
            activity: "Enjoy a lunch of falafel (Ta'ameya), ful mudammas, and pickled eggplant at a popular local street stall.",
            transport: { mode: "Walking", duration: "5 min", cost: "$2.00" }
          },
          {
            time: "03:00 PM",
            activity: "Wander around the Coptic Museum to view rare Christian antiquities, textiles, and manuscripts.",
            transport: { mode: "Walking", duration: "2 min", cost: "$5.00" }
          },
          {
            time: "08:00 PM",
            activity: "Experience a luxury dining cruise with a belly dancing performance and live music under the Cairo stars.",
            transport: { mode: "Uber", duration: "20 min", cost: "$8.00" }
          }
        ]
      }
    ]
  }
};

// General fallback templates for travel styles
const FALLBACK_STYLES = {
  adventure: {
    title: "High-Energy Exploration",
    activities: [
      { time: "08:30 AM", activity: "Scenic early morning hike or bike trail to the area's highest peak/overlook.", transport: "Walking (Free)" },
      { time: "12:00 PM", activity: "Quick refuel lunch at a popular local vendor or active-travel cafe.", transport: "Transit ($3.00)" },
      { time: "02:00 PM", activity: "High-adrenaline guided excursion (ziplining, water sports, or obstacle climbing).", transport: "Shuttle ($35.00)" },
      { time: "06:30 PM", activity: "Sunset viewpoint photo session followed by a hearty grill or BBQ house dinner.", transport: "Walking (Free)" }
    ]
  },
  cultural: {
    title: "Heritage & Local Legacy",
    activities: [
      { time: "09:00 AM", activity: "Guided historic walking tour of the old quarter, architectural sites, and monuments.", transport: "Walking (Free)" },
      { time: "12:30 PM", activity: "Lunch at a traditional heritage cafe featuring family-recipe local food.", transport: "Metro ($2.00)" },
      { time: "02:30 PM", activity: "Visit to the municipal history museum or art gallery housing local masterpieces.", transport: "Walking (Free)" },
      { time: "07:30 PM", activity: "Enjoy a classical live music show or theater performance in a historic auditorium.", transport: "Taxi ($12.00)" }
    ]
  },
  romantic: {
    title: "Serenade & Scenic Vistas",
    activities: [
      { time: "09:30 AM", activity: "Private boutique tour of botanical gardens or quiet local canals.", transport: "Cab ($10.00)" },
      { time: "01:00 PM", activity: "Intimate lunch at a flower-draped terrace cafe with gourmet options.", transport: "Walking (Free)" },
      { time: "03:30 PM", activity: "Couples spa session or stroll through vintage shopping lanes.", transport: "Walking (Free)" },
      { time: "07:30 PM", activity: "Candlelit fine dining featuring locally sourced ingredients and premium wine.", transport: "Taxi ($15.00)" }
    ]
  },
  solo: {
    title: "Self-Discovery & Social Hubs",
    activities: [
      { time: "09:00 AM", activity: "Join a group city walking tour to meet fellow travelers and learn the layout.", transport: "Walking (Free)" },
      { time: "12:30 PM", activity: "Casual dining at a communal food hall or open market hub.", transport: "Metro ($2.50)" },
      { time: "03:00 PM", activity: "Explore hidden backalleys, independent record stores, and local bookstores.", transport: "Walking (Free)" },
      { time: "08:00 PM", activity: "Social hostel meet-up event or pub crawl to sample regional craft brews.", transport: "Walking (Free)" }
    ]
  },
  foodie: {
    title: "Gastronomic Expeditions",
    activities: [
      { time: "09:00 AM", activity: "Gourmet pastry and coffee pairing tour at legendary local bakeries.", transport: "Walking (Free)" },
      { time: "11:30 AM", activity: "Hands-on regional culinary cooking class led by local chefs.", transport: "Transit ($4.00)" },
      { time: "03:30 PM", activity: "Street food tasting tour in the bustling bazaar or market alleys.", transport: "Walking (Free)" },
      { time: "07:30 PM", activity: "Multi-course chef's tasting dinner at a leading fine-dining establishment.", transport: "Taxi ($14.00)" }
    ]
  },
  family: {
    title: "Generational Delights & Parks",
    activities: [
      { time: "09:30 AM", activity: "Interactive visit to the local science center, zoo, or marine park.", transport: "Bus ($8.00)" },
      { time: "01:00 PM", activity: "Family-friendly pizza, burger, or local buffet lunch with outdoor seating.", transport: "Walking (Free)" },
      { time: "03:00 PM", activity: "Scenic park picnic, playground run, and ice cream tasting.", transport: "Walking (Free)" },
      { time: "07:00 PM", activity: "Casual dinner followed by a light show or musical fountain performance.", transport: "Tram ($4.00)" }
    ]
  }
};

function calculateDistance(coords1, coords2) {
  const R = 6371; // Earth's radius in km
  const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
  const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coords1[0] * Math.PI / 180) * Math.cos(coords2[0] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const simulation = {
  generatePlan: (destination, duration, style, budgetTier, startLocation = "Ahmedabad, India", startCoords = [23.0225, 72.5714], departureDate = "", returnDate = "", travelers = 1, vehiclePreference = "Self Drive Car", filters = {}) => {
    const key = destination.toLowerCase().trim();
    
    // Resolve Coordinates
    let destCoords = null;
    for (const place in searchData.coordinates) {
      if (key.includes(place) || place.includes(key)) {
        destCoords = searchData.coordinates[place];
        break;
      }
    }
    if (!destCoords) {
      // Deterministic fallback based on string length & characters
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i) + ((hash << 5) - hash);
      }
      const latOffset = ((hash % 100) / 100) * 6 - 3; // offset up to +-3 deg
      const lonOffset = (((hash >> 8) % 100) / 100) * 6 - 3;
      destCoords = [startCoords[0] + latOffset, startCoords[1] + lonOffset];
    }

    const distanceKm = Math.round(calculateDistance(startCoords, destCoords));
    let travelTime = "2h 15m";
    let recommendedVehicle = vehiclePreference;
    
    if (distanceKm < 20) {
      travelTime = `${Math.round(distanceKm * 2)} mins`;
      recommendedVehicle = vehiclePreference === "Self Drive Car" ? "Electric Hatchback" : vehiclePreference;
    } else if (distanceKm < 300) {
      const hrs = (distanceKm / 60).toFixed(1);
      travelTime = `${hrs} hrs drive`;
      recommendedVehicle = vehiclePreference === "Self Drive Car" ? "Premium Sedan" : vehiclePreference;
    } else if (distanceKm > 1000) {
      const hrs = Math.round(distanceKm / 750 + 1);
      travelTime = `${hrs} hrs flight`;
      recommendedVehicle = "Commercial Jet Flight";
    } else {
      const hrs = (distanceKm / 75).toFixed(1);
      travelTime = `${hrs} hrs road trip`;
      recommendedVehicle = vehiclePreference === "Self Drive Car" ? "All-Wheel SUV" : vehiclePreference;
    }

    // Weather builder
    let weatherTemp = "28°C";
    let weatherCond = "Sunny & Clear";
    let weatherIcon = "sun";
    if (filters.weather === "Cool/Snowy" || key.includes("reykjavik")) {
      weatherTemp = "-2°C";
      weatherCond = "Snowy Breezes";
      weatherIcon = "snowflake";
    } else if (filters.weather === "Monsoon") {
      weatherTemp = "23°C";
      weatherCond = "Heavy Rain Shower";
      weatherIcon = "cloud-rain";
    } else if (style.toLowerCase() === "beaches" || key.includes("goa")) {
      weatherTemp = "31°C";
      weatherCond = "Coastal Sunshine";
      weatherIcon = "sun";
    }

    const weatherForecast = [
      { day: "Day 1", temp: weatherTemp, condition: weatherCond, icon: weatherIcon },
      { day: "Day 2", temp: (parseInt(weatherTemp) - 1) + "°C", condition: "Partly Cloudy", icon: "cloud-sun" },
      { day: "Day 3", temp: (parseInt(weatherTemp) + 1) + "°C", condition: "Mild Breezes", icon: "wind" }
    ];

    // Query recommended listings from database or generate fallbacks
    const matchedRecommendations = searchData.suggestions.filter(s => 
      s.keywords && s.keywords.some(k => key.includes(k))
    );

    const hotels = matchedRecommendations.filter(s => s.category === "Hotels").slice(0, 3);
    const restaurants = matchedRecommendations.filter(s => s.category === "Restaurants").slice(0, 3);
    const attractions = matchedRecommendations.filter(s => s.category === "Attractions" || s.category === "Tourist Destinations").slice(0, 3);

    // Fallbacks if no database recommendations matched
    if (hotels.length === 0) {
      hotels.push(
        { name: `Grand ${destination} Resort & Spa`, rating: 4.8, budget: budgetTier === "luxury" ? "₹22,000 / Night" : budgetTier === "budget" ? "₹2,500 / Night" : "₹6,800 / Night", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80", location: "Central Promenade" },
        { name: `The Glasshouse Boutique Stay`, rating: 4.6, budget: budgetTier === "luxury" ? "₹18,000 / Night" : budgetTier === "budget" ? "₹1,800 / Night" : "₹5,200 / Night", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=150&q=80", location: "Downtown Heights" }
      );
    }
    if (restaurants.length === 0) {
      restaurants.push(
        { name: `${destination} Heritage Bistro`, rating: 4.5, budget: budgetTier === "luxury" ? "₹3,500" : budgetTier === "budget" ? "₹300" : "₹1,200", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80", specialty: "Regional delicacies & local thali" },
        { name: "Neon Spice Tavern", rating: 4.4, budget: budgetTier === "luxury" ? "₹2,200" : budgetTier === "budget" ? "₹200" : "₹800", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=150&q=80", specialty: "Fusion street eats" }
      );
    }
    if (attractions.length === 0) {
      attractions.push(
        { name: `${destination} Golden Citadel`, rating: 4.7, budget: "₹100 Entry", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=150&q=80", location: "Old Fort Hill" },
        { name: "Pine Whispers Nature Trail", rating: 4.6, budget: "Free", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=150&q=80", location: "Scenic Reserve" }
      );
    }

    // Check if we have a direct curated match for this city for itinerary content
    let finalItinerary = null;
    let finalChecklist = null;
    let finalBudget = null;

    for (const city in CURATED_PLANS) {
      if (key.includes(city)) {
        const plan = JSON.parse(JSON.stringify(CURATED_PLANS[city]));
        
        // Scale duration
        if (duration < plan.itinerary.length) {
          plan.itinerary = plan.itinerary.slice(0, duration);
        } else if (duration > plan.itinerary.length) {
          const baseLength = plan.itinerary.length;
          for (let i = baseLength; i < duration; i++) {
            const index = i % baseLength;
            const extraDay = JSON.parse(JSON.stringify(plan.itinerary[index]));
            extraDay.day = i + 1;
            extraDay.title = `Expedition Loop: ${extraDay.title}`;
            plan.itinerary.push(extraDay);
          }
        }
        
        // Scale budget
        let multiplier = 1.0;
        if (budgetTier === 'budget') {
          multiplier = 0.5;
        } else if (budgetTier === 'luxury') {
          multiplier = 2.2;
        }
        
        plan.budget.total = Math.round(plan.budget.total * multiplier);
        plan.budget.categories = plan.budget.categories.map(c => ({
          ...c,
          amount: Math.round(c.amount * multiplier)
        }));

        finalItinerary = plan.itinerary;
        finalChecklist = plan.packingChecklist;
        finalBudget = plan.budget;
        break;
      }
    }

    // Create dynamic plan if not matched
    if (!finalItinerary) {
      const dynamic = simulation.createDynamicPlan(destination, duration, style, budgetTier);
      finalItinerary = dynamic.itinerary;
      finalChecklist = dynamic.packingChecklist;
      finalBudget = dynamic.budget;
    }

    // Generate Route Options
    const routeOptions = [
      `Expressway via National Highway (Fastest - ${distanceKm} km)`,
      `Scenic Country Trail route (Scenic - ${Math.round(distanceKm * 1.15)} km)`
    ];
    if (distanceKm > 100) {
      routeOptions.push(`Secondary Bypass NH Route (Alternate - ${Math.round(distanceKm * 1.08)} km)`);
    }

    return {
      destination: destination.trim(),
      duration: parseInt(duration),
      style,
      startCoords,
      destCoords,
      routeInfo: {
        distance: `${distanceKm.toLocaleString()} km`,
        duration: travelTime,
        vehicle: recommendedVehicle,
        options: routeOptions
      },
      weatherForecast,
      hotels,
      restaurants,
      attractions,
      budget: finalBudget,
      itinerary: finalItinerary,
      packingChecklist: finalChecklist
    };
  },

  createDynamicPlan: (destination, duration, style, budgetTier) => {
    const cleanDest = destination.trim() || "Unexplored Territory";
    
    // Determine budget scale
    let baseTotal = 300 * duration;
    let currency = "USD";
    if (budgetTier === 'budget') baseTotal = 120 * duration;
    if (budgetTier === 'luxury') baseTotal = 750 * duration;

    const categories = [
      { category: "Accommodation", amount: Math.round(baseTotal * 0.45), percentage: 45 },
      { category: "Food & Dining", amount: Math.round(baseTotal * 0.25), percentage: 25 },
      { category: "Transit", amount: Math.round(baseTotal * 0.15), percentage: 15 },
      { category: "Activities", amount: Math.round(baseTotal * 0.15), percentage: 15 }
    ];

    const styleKey = style.toLowerCase();
    const styleTemplate = FALLBACK_STYLES[styleKey] || FALLBACK_STYLES.adventure;

    const itinerary = [];
    for (let day = 1; day <= duration; day++) {
      const activities = styleTemplate.activities.map((act, idx) => {
        let mode = "Transit";
        let cost = "Free";
        let dur = "15 min";
        
        if (act.transport.includes("Walking")) {
          mode = "Walking";
          cost = "Free";
          dur = "10 min";
        } else if (act.transport.includes("Taxi") || act.transport.includes("Cab")) {
          mode = "Taxi";
          cost = budgetTier === 'budget' ? "$5.00" : budgetTier === 'luxury' ? "$30.00" : "$12.00";
          dur = "15 min";
        } else if (act.transport.includes("Metro") || act.transport.includes("Transit") || act.transport.includes("Bus")) {
          mode = "Subway";
          cost = "$2.50";
          dur = "20 min";
        } else {
          mode = "Shuttle";
          cost = "$25.00";
          dur = "30 min";
        }

        let activityText = act.activity;
        if (idx === 0) {
          activityText = `Start Day ${day} in ${cleanDest}: ${activityText}`;
        } else if (idx === 3) {
          activityText = `${activityText} Settle down for your final night of day ${day} in ${cleanDest}.`;
        }

        return {
          time: act.time,
          activity: activityText,
          transport: { mode, duration: dur, cost }
        };
      });

      itinerary.push({
        day,
        title: `Explore ${cleanDest} - ${styleTemplate.title} (Day ${day})`,
        activities
      });
    }

    const packingChecklist = [
      {
        category: "Essentials",
        items: ["Passport & IDs", "Credit card / Local cash", "Mobile phone with roaming/eSIM", "Printed booking receipts"]
      },
      {
        category: "Electronics",
        items: ["Universal wall adapter", "High capacity charger/cords", "Bluetooth headphones"]
      },
      {
        category: "Clothing",
        items: [
          styleStyleItems(style),
          "Layered climate clothing",
          "Worn-in walking sneakers"
        ]
      },
      {
        category: "Toiletries & Meds",
        items: ["Travel toothbrush kit", "Sunscreen protection", "Basic pain relievers & band-aids"]
      }
    ];

    return {
      destination: cleanDest,
      duration: parseInt(duration),
      style,
      budget: {
        total: baseTotal,
        currency,
        categories
      },
      itinerary,
      packingChecklist
    };
  }
};

function styleStyleItems(style) {
  switch (style.toLowerCase()) {
    case 'adventure':
      return 'Moisture-wicking activewear';
    case 'romantic':
      return 'Elegant formal attire';
    case 'beach':
    case 'beaches':
      return 'Swimsuits & beach towels';
    case 'cultural':
    case 'historical':
      return 'Modest temple/church clothing';
    case 'foodie':
    case 'food':
      return 'Comfortable loose-fitting pants';
    default:
      return 'Casual coordinates';
  }
}
