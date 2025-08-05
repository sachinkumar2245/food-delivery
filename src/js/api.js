/* ================================
   API.JS
   Purpose: Handle API requests to fetch
   food data (mock or real API)
   ================================ */

// Example base API URL (you can replace this with your backend URL)
const API_BASE_URL = "https://dummyjson.com";

// === Fetch Food Data (Mock Example) ===
export async function fetchFoodData() {
  try {
    // For now, using a placeholder API (you can replace this with your server endpoint)
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    const result = await response.json();

    // Map data to your structure
    return result.products.map(item => ({
      id: item.id,
      name: item.title,
      category: "Food", // API placeholder doesn't have category
      price: item.price
    }));

  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return []; // Return empty data if failed
  }
}
