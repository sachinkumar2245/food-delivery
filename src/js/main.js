/* ================================
   MAIN.JS
   Purpose: Entry point for the app
   Handles initialization, navigation,
   state management, and imports.
   ================================ */

// === IMPORT MODULES ===
// Import only what you need from other JS files (ES6 Modules)
// Example (uncomment when these files exist):
import { fetchFoodData } from './api.js';
// import { renderFoodCards } from './dom.js';
import { setupCarousel } from './carousel.js';
import { setupFilters } from './filters.js';
import { setupCart, attachAddToCartButtons } from './cart.js';
import { setupCartModal } from './components/cartModal.js';
import { fetchFoodData } from './api.js';
import { renderFoodCards, updateLocation, showLoading } from './dom.js';
import { formatPrice, capitalize, debounce, storage } from './utils.js';



// === GLOBAL APP STATE ===
const AppState = {
  location: null,
  selectedCategory: "all",
  foodData: [],
  cart: []
};

// === DOM ELEMENTS ===
const locationBtn = document.querySelector('.location-btn');
const searchInput = document.querySelector('.search-bar');
const categoryList = document.querySelector('.categories ul');
const foodGrid = document.querySelector('.food-grid')
;

// === INITIALIZATION FUNCTION ===
document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ App initialized");

  
  // Show loading state
  showLoading();

  // Fetch and render food data
  const data = await fetchFoodData();
  AppState.foodData = data;
  renderFoodCards(data);

  // Update location
  document.querySelector(".location-btn").addEventListener("click", () => {
    const loc = prompt("Enter your delivery location:");
    if (loc) {
      AppState.location = loc;
      updateLocation(loc);
    }
  });
  
  // 1. Load user location
  initLocation();

  // 2. Load food data (mock or API call)
  loadFoodItems();

  // 3. Setup carousel
  setupCarousel();

  // 4. Setup filter listeners
  setupFilters(AppState, renderFoodCards);

  // 5. Setup cart functionality
    setupCart(AppState);
    setupCartModal(AppState);



});

// === FUNCTIONS ===

// 1️⃣ Initialize location
function initLocation() {
  locationBtn.addEventListener('click', () => {
    const userLocation = prompt("Enter your delivery location:");
    if (userLocation) {
      AppState.location = userLocation;
      document.getElementById("location").textContent = userLocation;
    }
  });
}

// 2️⃣ Load food data (placeholder data for now)
function loadFoodItems() {
  // Example static data
  AppState.foodData = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299 },
    { id: 2, name: "Veg Burger", category: "Burger", price: 149 },
    { id: 3, name: "Butter Chicken", category: "Indian", price: 399 },
    { id: 4, name: "Noodles", category: "Chinese", price: 199 }
  ];

  renderFoodCards(AppState.foodData);
  attachAddToCartButtons();
}

// 3️⃣ Render food cards dynamically
function renderFoodCards(data) {
  foodGrid.innerHTML = "";

  if (data.length === 0) {
    foodGrid.innerHTML = "<p>No food items available.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("food-card");
    card.textContent = `${item.name} - ₹${item.price}`;
    foodGrid.appendChild(card);
  });
}

// 4️⃣ Setup search, filters, and category listeners
function setupEventListeners() {
  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = AppState.foodData.filter(item =>
      item.name.toLowerCase().includes(query)
    );
    renderFoodCards(filtered);
  });

  // Category selection
  categoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      AppState.selectedCategory = e.target.textContent;
      filterByCategory(AppState.selectedCategory);
    }
  });
}

// 5️⃣ Filter by category
function filterByCategory(category) {
  if (category === "all") {
    renderFoodCards(AppState.foodData);
    return;
  }
  const filtered = AppState.foodData.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
  renderFoodCards(filtered);
}


// Saving cart to localStorage
// storage.set("cart", AppState.cart);
// const savedCart = storage.get("cart");

(() => {
  const searchInput = document.querySelector(".search-bar");

  if (searchInput) {
    searchInput.addEventListener("input", debounce((e) => {
      const query = e.target.value;
      console.log("Searching:", query);
    }, 400));
  }
})();

