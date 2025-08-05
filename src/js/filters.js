/* ================================
   FILTERS.JS
   Purpose: Handle all filter and sorting functionality
   Usage: Import and call setupFilters()
   ================================ */

export function setupFilters(AppState, renderFoodCards) {
  const foodTypeSelect = document.getElementById("food-type");
  const priceSortSelect = document.getElementById("price-sort");

  if (!foodTypeSelect || !priceSortSelect) {
    console.warn("⚠️ Filter elements not found in DOM.");
    return;
  }

  // 1️⃣ Filter by food type (Veg / Non-Veg / All)
  foodTypeSelect.addEventListener("change", () => {
    applyFilters();
  });

  // 2️⃣ Sort by price (Low-High / High-Low)
  priceSortSelect.addEventListener("change", () => {
    applyFilters();
  });

  // Apply filters and sorting combined
  function applyFilters() {
    let filteredData = [...AppState.foodData];

    // Filter by Veg / Non-Veg
    const selectedType = foodTypeSelect.value;
    if (selectedType !== "all") {
      filteredData = filteredData.filter(item =>
        item.category.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    // Sort by Price
    const sortValue = priceSortSelect.value;
    if (sortValue === "low-high") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    // Re-render food cards
    renderFoodCards(filteredData);
  }
}
