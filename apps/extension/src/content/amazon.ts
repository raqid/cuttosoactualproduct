// Cuttoso Content Script - Amazon Product Pages
// Only activates on product pages (/dp/ or /gp/product/)

(async function main() {
  // Gate: only run on product pages
  if (!location.pathname.includes("/dp/") && !location.pathname.includes("/gp/product/")) {
    return;
  }

  // Extract ASIN from URL
  const asinMatch = location.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
  if (!asinMatch) {
    console.log("[Cuttoso] Could not extract ASIN from URL");
    return;
  }
  const asin = asinMatch[1];

  // Extract product title
  const titleEl = document.getElementById("productTitle");
  const title = titleEl?.textContent?.trim() ?? "";

  // Generate session ID
  const sessionId = crypto.randomUUID();

  // Get base URL from storage or use default
  const { baseUrl = "http://localhost:3000" } = await chrome.storage.sync.get("baseUrl");

  console.log("[Cuttoso] Detected product:", { asin, title, sessionId });

  try {
    // Call resolve API
    const res = await fetch(`${baseUrl}/api/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        asin,
        amazonUrl: location.href,
        title,
        sessionId,
      }),
    });

    const data = await res.json();
    console.log("[Cuttoso] Resolve result:", data);

    // Inject button
    injectButton(data.matched ? data.offerId : null, asin, baseUrl);

    // Store last result for popup
    await chrome.storage.local.set({
      lastResult: {
        asin,
        title,
        matched: data.matched,
        offerId: data.matched ? data.offerId : null,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error("[Cuttoso] Error resolving offer:", error);
    injectButton(null, asin, baseUrl);
  }
})();

function injectButton(offerId: string | null, asin: string, baseUrl: string) {
  // Find the buy box area
  const buyBox = document.getElementById("rightCol") || document.getElementById("buybox");
  if (!buyBox) {
    console.log("[Cuttoso] Buy box not found");
    return;
  }

  // Check if button already exists
  if (document.getElementById("cuttoso-btn")) {
    return;
  }

  // Create button container
  const container = document.createElement("div");
  container.id = "cuttoso-btn";
  container.style.cssText = `
    margin: 10px 0;
    padding: 10px;
    border: 2px solid #4f46e5;
    border-radius: 8px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    text-align: center;
  `;

  // Create button
  const button = document.createElement("a");
  button.style.cssText = `
    display: block;
    color: white;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    padding: 8px 16px;
  `;

  if (offerId) {
    button.href = `${baseUrl}/o/${offerId}`;
    button.textContent = "Buy Direct - Better Price";
    button.title = "Found manufacturer-direct offer!";
  } else {
    button.href = `${baseUrl}/request?asin=${asin}&url=${encodeURIComponent(location.href)}`;
    button.textContent = "Request Direct Source";
    button.title = "Help us find the manufacturer";
  }

  button.target = "_blank";
  button.rel = "noopener noreferrer";

  container.appendChild(button);

  // Insert at the top of buy box
  buyBox.insertBefore(container, buyBox.firstChild);
}
