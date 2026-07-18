/**
 * Storage utility for VoyageAI client-side persistence
 */

const KEYS = {
  GEMINI_API_KEY: 'voyageai_gemini_api_key',
  USER_MODE: 'voyageai_user_mode', // 'simulated' or 'live'
  SAVED_PLANS: 'voyageai_saved_plans',
  ACTIVE_PLAN: 'voyageai_active_plan',
  CHECKLIST_ITEMS: 'voyageai_checklist_items',
  TRAVEL_PREFERENCES: 'voyageai_travel_preferences'
};

export const storage = {
  // API Key management
  getApiKey: () => {
    return localStorage.getItem(KEYS.GEMINI_API_KEY) || '';
  },
  setApiKey: (key) => {
    localStorage.setItem(KEYS.GEMINI_API_KEY, key.trim());
  },
  clearApiKey: () => {
    localStorage.removeItem(KEYS.GEMINI_API_KEY);
  },

  // Mode management
  getMode: () => {
    return localStorage.getItem(KEYS.USER_MODE) || 'simulated';
  },
  setMode: (mode) => {
    if (mode === 'simulated' || mode === 'live') {
      localStorage.setItem(KEYS.USER_MODE, mode);
    }
  },

  // Active Travel Plan management
  getActivePlan: () => {
    const data = localStorage.getItem(KEYS.ACTIVE_PLAN);
    return data ? JSON.parse(data) : null;
  },
  setActivePlan: (plan) => {
    localStorage.setItem(KEYS.ACTIVE_PLAN, JSON.stringify(plan));
    // Also save it to our historical list if not already present
    if (plan) {
      storage.savePlanToHistory(plan);
    }
  },

  // Plan History
  getPlanHistory: () => {
    const data = localStorage.getItem(KEYS.SAVED_PLANS);
    return data ? JSON.parse(data) : [];
  },
  savePlanToHistory: (plan) => {
    const history = storage.getPlanHistory();
    // Prevent duplicates by checking destination and duration
    const index = history.findIndex(p => 
      p.destination.toLowerCase() === plan.destination.toLowerCase() && 
      p.duration === plan.duration &&
      p.style === plan.style
    );
    
    if (index !== -1) {
      history[index] = plan; // Update existing
    } else {
      history.unshift(plan); // Add to top
    }
    
    // Limit to last 10 entries to keep storage lightweight
    localStorage.setItem(KEYS.SAVED_PLANS, JSON.stringify(history.slice(0, 10)));
  },
  deletePlanFromHistory: (destination, duration, style) => {
    let history = storage.getPlanHistory();
    history = history.filter(p => 
      !(p.destination.toLowerCase() === destination.toLowerCase() && 
        p.duration === duration && 
        p.style === style)
    );
    localStorage.setItem(KEYS.SAVED_PLANS, JSON.stringify(history));
  },

  // Checklist management
  getChecklistItems: () => {
    const data = localStorage.getItem(KEYS.CHECKLIST_ITEMS);
    return data ? JSON.parse(data) : null;
  },
  setChecklistItems: (items) => {
    localStorage.setItem(KEYS.CHECKLIST_ITEMS, JSON.stringify(items));
  },
  clearChecklist: () => {
    localStorage.removeItem(KEYS.CHECKLIST_ITEMS);
  }
};
