import { storage } from './storage.js';
import { simulation } from './simulation.js';
import { gemini } from './gemini.js';

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
let state = {
  activePlan: null,
  activeDay: 1,
  checklistItems: [], // Array of { id, category, item, checked }
  activeChecklistCategory: 'all',
  mode: 'simulated', // 'simulated' or 'live'
  apiKey: ''
};

// Colors for Budget Categories
const BUDGET_COLORS = {
  'Accommodation': '#49fcffff',
  'Food & Dining': '#ff33ad',
  'Food & Bistros': '#ff33ad',
  'Food & Drinks': '#ff33ad',
  'Local Food & Crafts': '#ff33ad',
  'Transit': '#00e5ff',
  'Car Rental / Transit': '#00e5ff',
  'Transport & Drivers': '#00e5ff',
  'Activities': '#00ff80',
  'Museums & Sights': '#00ff80',
  'Excursions & Spas': '#00ff80',
  'Tours & Guides': '#00ff80',
  'Default': '#a0aec0'
};

// ==========================================================================
// DOM NODE REFERENCES
// ==========================================================================
const DOM = {
  // Mode toggles
  modeSimulated: document.getElementById('mode-simulated'),
  modeLive: document.getElementById('mode-live'),

  // API credentials
  apiTrigger: document.getElementById('api-trigger'),
  apiModal: document.getElementById('api-modal'),
  apiCloseBtn: document.getElementById('api-close-btn'),
  apiDeleteBtn: document.getElementById('api-delete-btn'),
  apiSaveBtn: document.getElementById('api-save-btn'),
  apiKeyInput: document.getElementById('api-key-input'),

  // Cockpit Form
  plannerForm: document.getElementById('planner-form'),
  destInput: document.getElementById('dest-input'),
  durInput: document.getElementById('dur-input'),
  durVal: document.getElementById('dur-val'),
  styleInput: document.getElementById('style-input'),
  generateBtn: document.getElementById('generate-btn'),

  // Screen States
  welcomeState: document.getElementById('welcome-state'),
  loadingState: document.getElementById('loading-state'),
  resultsState: document.getElementById('results-state'),
  loaderMessage: document.getElementById('loader-message'),

  // Suggestions
  suggestionCards: document.querySelectorAll('.suggestion-card'),

  // Itinerary Output
  planDestTitle: document.getElementById('plan-dest-title'),
  planStyleSub: document.getElementById('plan-style-sub'),
  planDurationBadge: document.getElementById('plan-duration-badge'),
  dayTabsContainer: document.getElementById('day-tabs-container'),
  timelineItems: document.getElementById('timeline-items'),

  // Budget output
  budgetDonutSvg: document.getElementById('budget-donut-svg'),
  chartCenterTotal: document.getElementById('chart-center-total'),
  budgetProgressList: document.getElementById('budget-progress-list'),

  // Checklist output
  checklistProgressCircle: document.getElementById('checklist-progress-circle'),
  checklistPercentage: document.getElementById('checklist-percentage'),
  checklistRatio: document.getElementById('checklist-ratio'),
  checklistCategoryFilters: document.getElementById('checklist-category-filters'),
  checklistAddForm: document.getElementById('checklist-add-form'),
  checklistAddInput: document.getElementById('checklist-add-input'),
  checklistItemsBox: document.getElementById('checklist-items-box')
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Load settings and data from LocalStorage
  state.mode = storage.getMode();
  state.apiKey = storage.getApiKey();
  state.activePlan = storage.getActivePlan();

  // Hydrate Lucide Icons
  lucide.createIcons();

  // Setup interface elements
  initModeToggle();
  initApiModal();
  initFormControls();
  initChecklistFilters();
  initSuggestions();

  // Render active plan if available
  if (state.activePlan) {
    // Attempt to load existing checklist items
    const savedChecklist = storage.getChecklistItems();
    if (savedChecklist) {
      state.checklistItems = savedChecklist;
    } else {
      buildChecklistFromPlan(state.activePlan);
    }
    renderPlan(state.activePlan);
  }
});

// ==========================================================================
// CORE UI & FORM CONTROLS
// ==========================================================================
function initModeToggle() {
  const updateToggleUI = () => {
    if (state.mode === 'simulated') {
      DOM.modeSimulated.classList.add('active', 'sim-active');
      DOM.modeLive.classList.remove('active', 'live-active');
    } else {
      DOM.modeLive.classList.add('active', 'live-active');
      DOM.modeSimulated.classList.remove('active', 'sim-active');
    }
  };

  DOM.modeSimulated.addEventListener('click', () => {
    state.mode = 'simulated';
    storage.setMode('simulated');
    updateToggleUI();
  });

  DOM.modeLive.addEventListener('click', () => {
    state.mode = 'live';
    storage.setMode('live');
    updateToggleUI();

    // Proactively open credentials modal if they don't have a key saved
    if (!state.apiKey) {
      openApiModal();
    }
  });

  updateToggleUI();
}

function initApiModal() {
  const updateTriggerBtn = () => {
    if (state.apiKey) {
      DOM.apiTrigger.classList.add('key-saved');
      DOM.apiTrigger.innerHTML = `<i data-lucide="shield-check"></i> Connected`;
    } else {
      DOM.apiTrigger.classList.remove('key-saved');
      DOM.apiTrigger.innerHTML = `<i data-lucide="key"></i> API Settings`;
    }
    lucide.createIcons();
  };

  const openApiModal = () => {
    DOM.apiKeyInput.value = state.apiKey;
    DOM.apiModal.classList.add('open');
  };

  const closeApiModal = () => {
    DOM.apiModal.classList.remove('open');
  };

  DOM.apiTrigger.addEventListener('click', openApiModal);
  DOM.apiCloseBtn.addEventListener('click', closeApiModal);

  DOM.apiDeleteBtn.addEventListener('click', () => {
    state.apiKey = '';
    storage.clearApiKey();
    DOM.apiKeyInput.value = '';
    updateTriggerBtn();
    closeApiModal();
  });

  DOM.apiSaveBtn.addEventListener('click', () => {
    const key = DOM.apiKeyInput.value.trim();
    state.apiKey = key;
    storage.setApiKey(key);
    updateTriggerBtn();
    closeApiModal();
  });

  updateTriggerBtn();
}

function initFormControls() {
  // Duration slider event
  DOM.durInput.addEventListener('input', (e) => {
    const val = e.target.value;
    DOM.durVal.textContent = `${val} Day${val > 1 ? 's' : ''}`;
  });

  // Main Form Submit
  DOM.plannerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await generateItinerary();
  });
}

function initSuggestions() {
  DOM.suggestionCards.forEach(card => {
    card.addEventListener('click', async () => {
      const city = card.getAttribute('data-city');
      const travelStyle = card.getAttribute('data-style');

      DOM.destInput.value = city;
      DOM.styleInput.value = travelStyle;

      // Select budget tier (default moderate for suggestions)
      document.getElementById('budget-tier-2').checked = true;

      // Auto-trigger plan generation
      await generateItinerary();
    });
  });
}

// ==========================================================================
// PLAN GENERATION ENGINE
// ==========================================================================
async function generateItinerary() {
  const destination = DOM.destInput.value.trim();
  const duration = parseInt(DOM.durInput.value);
  const style = DOM.styleInput.value;
  const budgetTier = document.querySelector('input[name="budget-tier"]:checked').value;

  if (!destination) {
    alert("Please enter a travel destination.");
    return;
  }

  // Live Mode validations
  if (state.mode === 'live' && !state.apiKey) {
    alert("Live Mode requires a Gemini API Key. Opening credentials settings.");
    DOM.apiTrigger.click();
    return;
  }

  // Shift UI to loading state
  DOM.welcomeState.style.display = 'none';
  DOM.resultsState.style.display = 'none';
  DOM.loadingState.style.display = 'flex';
  DOM.generateBtn.disabled = true;

  // Cyberspace loading texts sequence
  const messages = [
    "Consulting spatial neural coordinates...",
    "Optimizing local transit linkages...",
    "Aggregating cultural attractions...",
    "Finalizing packing checkpoints..."
  ];
  let msgIdx = 0;
  DOM.loaderMessage.textContent = messages[0];
  const interval = setInterval(() => {
    msgIdx = (msgIdx + 1) % messages.length;
    DOM.loaderMessage.textContent = messages[msgIdx];
  }, 2500);

  try {
    let plan;
    if (state.mode === 'simulated') {
      // Simulate artificial delay
      await new Promise(r => setTimeout(r, 2000));
      plan = simulation.generatePlan(destination, duration, style, budgetTier);
    } else {
      plan = await gemini.generatePlan(destination, duration, style, budgetTier, state.apiKey);
    }

    clearInterval(interval);

    // Save generated plan to state & storage
    state.activePlan = plan;
    state.activeDay = 1;
    storage.setActivePlan(plan);

    // Setup and save checklist from plan
    buildChecklistFromPlan(plan);
    storage.setChecklistItems(state.checklistItems);

    // Render results
    renderPlan(plan);

    // Reveal results state
    DOM.loadingState.style.display = 'none';
    DOM.resultsState.style.display = 'grid';

  } catch (error) {
    clearInterval(interval);
    console.error(error);
    alert(`Generation Error: ${error.message}`);

    // Restore states
    DOM.loadingState.style.display = 'none';
    if (state.activePlan) {
      DOM.resultsState.style.display = 'grid';
    } else {
      DOM.welcomeState.style.display = 'flex';
    }
  } finally {
    DOM.generateBtn.disabled = false;
  }
}

// ==========================================================================
// RENDERERS (ITINERARY TIMELINE & CHARTS)
// ==========================================================================
function renderPlan(plan) {
  // Update header text titles
  DOM.planDestTitle.textContent = plan.destination;
  DOM.planStyleSub.textContent = `${plan.style} Expedition`;
  DOM.planDurationBadge.textContent = `${plan.duration} Day${plan.duration > 1 ? 's' : ''}`;

  // 1. Render Tabs
  renderDayTabs(plan);

  // 2. Render Active Day Timeline
  renderDayTimeline();

  // 3. Render Budget Donut & Bars
  renderBudgetVisuals(plan.budget);

  // 4. Render Checklist Box
  renderChecklistRows();

  // Initialize Lucide Icons for new DOM elements
  lucide.createIcons();
}

function renderDayTabs(plan) {
  DOM.dayTabsContainer.innerHTML = '';
  for (let i = 1; i <= plan.duration; i++) {
    const tab = document.createElement('button');
    tab.className = `day-tab ${i === state.activeDay ? 'active' : ''}`;
    tab.textContent = `Day ${i}`;
    tab.addEventListener('click', () => {
      // Toggle tabs
      document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeDay = i;
      renderDayTimeline();
      lucide.createIcons();
    });
    DOM.dayTabsContainer.appendChild(tab);
  }
}

function renderDayTimeline() {
  DOM.timelineItems.innerHTML = '';
  if (!state.activePlan) return;

  const dayData = state.activePlan.itinerary.find(d => d.day === state.activeDay);
  if (!dayData) return;

  dayData.activities.forEach((act, idx) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    let transportHTML = '';
    if (act.transport) {
      const icon = getTransportIcon(act.transport.mode);
      transportHTML = `
        <div class="transport-link">
          <span class="transport-badge">
            <i data-lucide="${icon}"></i> ${act.transport.mode}
          </span>
          <span>Transit: ${act.transport.duration}</span>
          <span class="transport-cost">${act.transport.cost}</span>
        </div>
      `;
    }

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-time">${act.time}</div>
        <div class="timeline-activity">${act.activity}</div>
        ${transportHTML}
      </div>
    `;

    DOM.timelineItems.appendChild(item);
  });
}

function getTransportIcon(mode) {
  const m = mode.toLowerCase();
  if (m.includes('walk') || m.includes('foot')) return 'footprints';
  if (m.includes('train') || m.includes('rail') || m.includes('shinkansen')) return 'train';
  if (m.includes('metro') || m.includes('subway') || m.includes('tube')) return 'train';
  if (m.includes('car') || m.includes('taxi') || m.includes('cab') || m.includes('uber')) return 'car';
  if (m.includes('bus')) return 'bus';
  if (m.includes('plane') || m.includes('flight')) return 'plane';
  if (m.includes('boat') || m.includes('ferry') || m.includes('ship') || m.includes('cruise')) return 'ship';
  return 'navigation';
}

function renderBudgetVisuals(budget) {
  DOM.chartCenterTotal.textContent = `${budget.currency === 'EUR' ? '€' : '$'}${budget.total.toLocaleString()}`;

  // Donut values calculations
  // Circle radius = 45, Circumference C = 2 * PI * r = 282.74
  const radius = 45;
  const C = 2 * Math.PI * radius;

  DOM.budgetDonutSvg.innerHTML = '';
  DOM.budgetProgressList.innerHTML = '';

  let runningPercent = 0;

  // Map categories to bars and donut segments
  budget.categories.forEach((cat, idx) => {
    const color = BUDGET_COLORS[cat.category] || BUDGET_COLORS['Default'];

    // Donut Stroke Segment
    const strokeDash = (cat.percentage / 100) * C;
    const strokeOffset = C - strokeDash + (runningPercent / 100) * C;

    const segment = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    segment.setAttribute('cx', '70');
    segment.setAttribute('cy', '70');
    segment.setAttribute('r', radius.toString());
    segment.setAttribute('class', 'chart-donut-segment');
    segment.setAttribute('stroke', color);
    segment.setAttribute('stroke-dasharray', `${strokeDash} ${C}`);
    segment.setAttribute('stroke-dashoffset', (-strokeOffset).toString());
    segment.setAttribute('style', `--segment-color: ${color}`);

    // Hover details on chart segment
    segment.addEventListener('mouseenter', () => {
      DOM.chartCenterTotal.textContent = `${budget.currency === 'EUR' ? '€' : '$'}${cat.amount.toLocaleString()}`;
      document.querySelector('.chart-center-lbl').textContent = cat.category;
    });

    segment.addEventListener('mouseleave', () => {
      DOM.chartCenterTotal.textContent = `${budget.currency === 'EUR' ? '€' : '$'}${budget.total.toLocaleString()}`;
      document.querySelector('.chart-center-lbl').textContent = 'Total';
    });

    DOM.budgetDonutSvg.appendChild(segment);
    runningPercent += cat.percentage;

    // Budget List Bars
    const bar = document.createElement('div');
    bar.className = 'budget-item';
    bar.innerHTML = `
      <div class="budget-item-header">
        <span class="budget-item-lbl">
          <span class="color-dot" style="background-color: ${color};"></span>
          ${cat.category}
        </span>
        <span class="budget-item-val">${budget.currency === 'EUR' ? '€' : '$'}${cat.amount.toLocaleString()} (${cat.percentage}%)</span>
      </div>
      <div class="budget-progress-bg">
        <div class="budget-progress-fill" style="background-color: ${color}; width: ${cat.percentage}%"></div>
      </div>
    `;

    DOM.budgetProgressList.appendChild(bar);
  });
}

// ==========================================================================
// CHECKLIST SYSTEM
// ==========================================================================
function buildChecklistFromPlan(plan) {
  state.checklistItems = [];
  let index = 1;
  plan.packingChecklist.forEach(cat => {
    cat.items.forEach(item => {
      state.checklistItems.push({
        id: index++,
        category: cat.category,
        item: item,
        checked: false
      });
    });
  });
}

function initChecklistFilters() {
  const filterBtns = DOM.checklistCategoryFilters.querySelectorAll('.checklist-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeChecklistCategory = btn.getAttribute('data-category');
      renderChecklistRows();
    });
  });

  // Handle adding custom items
  DOM.checklistAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = DOM.checklistAddInput.value.trim();
    if (!val) return;

    // Define category based on active filter, fallback to Essentials
    let category = state.activeChecklistCategory;
    if (category === 'all') {
      category = 'Essentials';
    }

    const newItem = {
      id: Date.now(),
      category: category,
      item: val,
      checked: false
    };

    state.checklistItems.push(newItem);
    storage.setChecklistItems(state.checklistItems);

    DOM.checklistAddInput.value = '';
    renderChecklistRows();
  });
}

function renderChecklistRows() {
  DOM.checklistItemsBox.innerHTML = '';

  // Filter checklist array
  const filtered = state.checklistItems.filter(item => {
    if (state.activeChecklistCategory === 'all') return true;
    return item.category.toLowerCase() === state.activeChecklistCategory.toLowerCase();
  });

  if (filtered.length === 0) {
    const emptyRow = document.createElement('div');
    emptyRow.style.fontSize = '0.75rem';
    emptyRow.style.color = 'var(--text-muted)';
    emptyRow.style.textAlign = 'center';
    emptyRow.style.padding = '1rem 0';
    emptyRow.textContent = "No items in this category.";
    DOM.checklistItemsBox.appendChild(emptyRow);
  } else {
    filtered.forEach(item => {
      const row = document.createElement('div');
      row.className = `checklist-row ${item.checked ? 'checked' : ''}`;

      row.innerHTML = `
        <div class="checkbox-glow">
          <i data-lucide="check"></i>
        </div>
        <span class="checklist-row-text">${item.item}</span>
        <button class="checklist-row-delete">
          <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
        </button>
      `;

      // Toggle click handler on check trigger
      const toggleCheck = () => {
        item.checked = !item.checked;
        storage.setChecklistItems(state.checklistItems);
        renderChecklistRows();
      };

      row.querySelector('.checkbox-glow').addEventListener('click', toggleCheck);
      row.querySelector('.checklist-row-text').addEventListener('click', toggleCheck);

      // Delete handler
      row.querySelector('.checklist-row-delete').addEventListener('click', () => {
        state.checklistItems = state.checklistItems.filter(i => i.id !== item.id);
        storage.setChecklistItems(state.checklistItems);
        renderChecklistRows();
      });

      DOM.checklistItemsBox.appendChild(row);
    });
  }

  updateChecklistProgress();
  lucide.createIcons();
}

function updateChecklistProgress() {
  const total = state.checklistItems.length;
  const checked = state.checklistItems.filter(i => i.checked).length;
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

  DOM.checklistRatio.textContent = `${checked} / ${total} Items Packed`;
  DOM.checklistPercentage.textContent = `${percentage}%`;

  // Update SVG Progress Ring
  // Circumference = 2 * PI * r = 2 * PI * 18 = 113.1
  const radius = 18;
  const C = 2 * Math.PI * radius;
  const offset = C - (percentage / 100) * C;

  DOM.checklistProgressCircle.setAttribute('stroke-dasharray', C.toString());
  DOM.checklistProgressCircle.setAttribute('stroke-dashoffset', offset.toString());
}
