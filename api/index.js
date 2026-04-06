export default async function handler(req, res) {
  const urlPath = req.url;
  let targetBase = "";
  // Détection de la destination via le "Panneau de Signalisation"
  if (urlPath.includes("/api-binance")) {
    targetBase = "https://testnet.binance.vision";
  } else if (urlPath.includes("/api-discord")) {
    targetBase = "https://discord.com";
  } else if (urlPath.includes("/api-mistral")) {
    targetBase = "https://api.mistral.ai";
  } else if (urlPath.includes("/api-news")) {
    targetBase = "https://cryptopanic.com";
  }
  if (!targetBase) {
    return res.status(404).json({ error: "Destination non reconnue" });
  }
  // On nettoie l'URL pour la destination finale
  const finalUrl = targetBase + urlPath.replace(/\/api-(binance|discord|mistral|news)/, "");
  try {
    const response = await fetch(finalUrl, {
      method: req.method,
      headers: {
        'Authorization': req.headers['authorization'] || '',
        'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    const text = await response.text();
    res.status(response.status).send(text || '{}');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
