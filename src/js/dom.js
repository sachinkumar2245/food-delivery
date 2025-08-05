/* ================================
   DOM.JS
   Purpose: Handle all DOM-related
   operations like creating food cards,
   updating UI dynamically, etc.
   ================================ */

import { attachAddToCartButtons } from './cart.js';

// === Render Food Cards ===
export function renderFoodCards(data) {
  const foodGrid = document.querySelector('.food-grid');
  foodGrid.innerHTML = "";

  if (!data || data.length === 0) {
    foodGrid.innerHTML = "<p>No food items available.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("food-card");
    card.dataset.id = item.id;

    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>Category: ${item.category}</p>
      <p>Price: ₹${item.price}</p>
    `;

    foodGrid.appendChild(card);
  });

  // Add "Add to Cart" buttons dynamically
  attachAddToCartButtons();
}

// === Update Location in Navbar ===
export function updateLocation(location) {
  const locationDisplay = document.getElementById("location");
  if (locationDisplay) {
    locationDisplay.textContent = location;
  }
}

// === Show Loading State ===
export function showLoading() {
  const foodGrid = document.querySelector('.food-grid');
  foodGrid.innerHTML = "<p>Loading food items...</p>";
}
