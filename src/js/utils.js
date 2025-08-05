/* ================================
   UTILS.JS
   Purpose: Common reusable utility functions
   ================================ */

// ✅ Format number as Indian currency
export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(value);
}

// ✅ Capitalize the first letter of any string
export function capitalize(str) {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ✅ Generate a random unique ID (for temporary items)
export function generateID(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

// ✅ Debounce function (useful for input events like search)
export function debounce(func, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// ✅ Local storage utils (optional - for cart or wishlist)
export const storage = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  remove: (key) => {
    localStorage.removeItem(key);
  }
};
