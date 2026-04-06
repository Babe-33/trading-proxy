export default async function handler(req, res) {
  // On détecte la destination selon l'URL
  let targetBase = "https://testnet.binance.vision";
  if (req.url.includes("discord.com")) targetBase = "https://discord.com";
  if (req.url.includes("mistral.ai")) targetBase = "https://api.mistral.ai";
  if (req.url.includes("cryptopanic.com")) targetBase = "https://cryptopanic.com";
  const url = targetBase + req.url;
  try {
    const response = await fetch(url, {
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
