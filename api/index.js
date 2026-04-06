export default async function handler(req, res) {
  // On détecte la destination selon l'URL
  let targetBase = "https://testnet.binance.vision";
  if (req.url.includes("discord.com")) targetBase = "https://discord.com";
  if (req.url.includes("mistral.ai")) targetBase = "https://api.mistral.ai";
  const url = targetBase + req.url.replace("/api-proxy", "");
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(targetBase).host // On change le host pour chaque destination
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    const text = await response.text();
    res.status(response.status).send(text || '{}');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
