/**
 * VoyageAI Live Gemini API Client
 * Requests structured JSON travel plans directly from the client browser.
 */

export const gemini = {
  generatePlan: async (destination, duration, style, budgetTier, apiKey) => {
    if (!apiKey) {
      throw new Error("Gemini API key is required. Enter it in the header settings.");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `You are a world-class luxury travel planner and local guide. Your job is to create a detailed, highly curated, premium day-by-day travel plan. 
    Ensure times are provided for activities, and transition transport details (like mode of travel, travel duration, and cost) are estimated and filled out for all steps.
    Make the descriptions engaging, premium, and specific to the destination.`;

    const userPrompt = `Create a custom ${duration}-day travel plan for "${destination}".
    Travel Style: ${style}
    Budget Category: ${budgetTier}
    
    You must output a single JSON object. Ensure that the total budget is realistic for the duration and category. Categories must sum to the total.
    
    Response JSON Schema:
    {
      "destination": "Name of destination (string)",
      "duration": number of days (integer),
      "style": "Active travel style, e.g. Adventure (string)",
      "startCoords": [latitude_number, longitude_number],
      "destCoords": [latitude_number, longitude_number],
      "routeInfo": {
        "distance": "e.g., 450 km (string)",
        "duration": "e.g., 6 hours (string)",
        "vehicle": "Recommended vehicle e.g. Tesla Model 3 (string)",
        "options": ["Route Option 1", "Route Option 2"]
      },
      "weatherForecast": [
        { "day": "Day 1", "temp": "28°C (string)", "condition": "Sunny (string)", "icon": "sun or cloud or cloud-rain or snowflake or wind (string)" },
        { "day": "Day 2", "temp": "26°C", "condition": "Cloudy", "icon": "cloud" },
        { "day": "Day 3", "temp": "27°C", "condition": "Sunny", "icon": "sun" }
      ],
      "hotels": [
        { "name": "Hotel Name (string)", "rating": 4.8, "budget": "Price, e.g. $120/night (string)", "location": "General Area (string)", "image": "Use a relevant travel unsplash image URL or empty string" }
      ],
      "restaurants": [
        { "name": "Restaurant Name (string)", "rating": 4.6, "budget": "Price, e.g. $30 (string)", "specialty": "Specialty dish (string)", "image": "Use a relevant food unsplash image URL or empty string" }
      ],
      "attractions": [
        { "name": "Attraction Name (string)", "rating": 4.7, "location": "General Area (string)", "image": "Use a relevant travel unsplash image URL or empty string" }
      ],
      "budget": {
        "total": total estimated budget (integer),
        "currency": "USD or INR (string)",
        "categories": [
          { "category": "Accommodation", "amount": number, "percentage": number },
          { "category": "Food & Dining", "amount": number, "percentage": number },
          { "category": "Transit", "amount": number, "percentage": number },
          { "category": "Activities", "amount": number, "percentage": number }
        ]
      },
      "itinerary": [
        {
          "day": day number (integer, starting at 1),
          "title": "Captivating theme/focus of the day (string)",
          "activities": [
            {
              "time": "Time stamp, e.g., 09:00 AM (string)",
              "activity": "Highly descriptive sentence explaining the activity, highlighting details, sights, and names of spots (string, at least 15 words)",
              "transport": {
                "mode": "Subway, Walking, Taxi, Train, Bus, or Flight (string)",
                "duration": "Estimated duration, e.g. 15 min or 2 hrs (string)",
                "cost": "Estimated cost, e.g. $2.50 or Free (string)"
              }
            }
          ]
        }
      ],
      "packingChecklist": [
        {
          "category": "Essentials, Electronics, Clothing, or Toiletries & Meds (string)",
          "items": ["Item 1", "Item 2", "Item 3", "Item 4"]
        }
      ]
    }`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `HTTP error! Status: ${response.status}`;
        throw new Error(`Gemini API Error: ${errorMessage}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response generated from Gemini. Check API status.");
      }

      const rawText = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON string
      const parsedPlan = JSON.parse(rawText.trim());
      
      // Basic schema validations
      if (!parsedPlan.destination || !parsedPlan.itinerary || !Array.isArray(parsedPlan.itinerary)) {
        throw new Error("Received response, but the structure is invalid. Please retry.");
      }
      
      return parsedPlan;

    } catch (error) {
      console.error("Gemini API Client Error:", error);
      throw error;
    }
  }
};
