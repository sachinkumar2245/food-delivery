/* ================================
   CART.JS
   Purpose: Manage cart functionality
   Usage: Import and call setupCart()
   ================================ */

export function setupCart(AppState) {
  const cartBtn = document.querySelector('.cart-btn');
  const foodGrid = document.querySelector('.food-grid');

  // 1️⃣ Add to cart event listener (delegation)
  foodGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const itemId = e.target.dataset.id;
      addItemToCart(itemId);
    }
  });

  // 2️⃣ Show cart on button click
  cartBtn.addEventListener("click", () => {
    renderCart();
  });

  // === FUNCTIONS ===

  // Add item to cart
  function addItemToCart(id) {
    const item = AppState.foodData.find(food => food.id == id);
    if (!item) return;

    const existingItem = AppState.cart.find(cartItem => cartItem.id == id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      AppState.cart.push({ ...item, quantity: 1 });
    }

    console.log(`✅ ${item.name} added to cart`);
  }

  // Render cart popup or sidebar
  function renderCart() {
    if (AppState.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let cartDetails = "🛒 Your Cart:\n\n";
    let total = 0;

    AppState.cart.forEach(item => {
      cartDetails += `${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
      total += item.price * item.quantity;
    });

    cartDetails += `\nTotal: ₹${total}`;
    alert(cartDetails);  // For now, using alert (you can replace with a modal)
  }
}

// 3️⃣ Helper function to add buttons dynamically to each card
export function attachAddToCartButtons() {
  const cards = document.querySelectorAll('.food-card');

  cards.forEach(card => {
    if (!card.querySelector(".add-to-cart")) {
      const btn = document.createElement("button");
      btn.textContent = "Add to Cart";
      btn.classList.add("add-to-cart");
      btn.dataset.id = card.dataset.id; // Ensure data-id is set in renderFoodCards
      card.appendChild(btn);
    }
  });
}
