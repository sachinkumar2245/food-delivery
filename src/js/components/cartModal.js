/* ================================
   CARTMODAL.JS
   Purpose: Manage cart modal popup
   Usage: Import and call setupCartModal()
   ================================ */

export function setupCartModal(AppState) {
  const cartBtn = document.querySelector('.cart-btn');
  const modal = createCartModal();

  // Append modal to body
  document.body.appendChild(modal);

  // Open modal on button click
  cartBtn.addEventListener("click", () => {
    renderCartItems();
    modal.classList.add("active");
  });

  // Close modal
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // === FUNCTIONS ===

  // Create modal structure dynamically
  function createCartModal() {
    const modalDiv = document.createElement("div");
    modalDiv.className = "cart-modal-overlay";
    modalDiv.innerHTML = `
      <div class="cart-modal">
        <div class="cart-header">
          <h2>🛒 Your Cart</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="cart-body"></div>
        <div class="cart-footer">
          <h3>Total: ₹<span id="cart-total">0</span></h3>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    `;
    return modalDiv;
  }

  // Render cart items dynamically
  function renderCartItems() {
    const cartBody = modal.querySelector(".cart-body");
    const totalDisplay = modal.querySelector("#cart-total");

    cartBody.innerHTML = "";

    if (AppState.cart.length === 0) {
      cartBody.innerHTML = `<p>Your cart is empty.</p>`;
      totalDisplay.textContent = "0";
      return;
    }

    let total = 0;

    AppState.cart.forEach(item => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <div class="cart-controls">
          <button class="qty-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}">+</button>
          <span>₹${item.price * item.quantity}</span>
        </div>
      `;
      cartBody.appendChild(cartItem);
    });

    totalDisplay.textContent = total;

    // Handle quantity changes
    cartBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("increase")) {
        changeQuantity(e.target.dataset.id, 1);
      } else if (e.target.classList.contains("decrease")) {
        changeQuantity(e.target.dataset.id, -1);
      }
    });
  }

  // Update quantity and re-render
  function changeQuantity(id, change) {
    const item = AppState.cart.find(food => food.id == id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      AppState.cart = AppState.cart.filter(cartItem => cartItem.id != id);
    }
    renderCartItems();
  }
}
