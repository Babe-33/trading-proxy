export default async function handler(req, res) {
  const path = req.url;
  const targetUrl = `https://testnet.binance.vision${path}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0' // Important pour Binance
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    const text = await response.text();
    
    // On renvoie exactement ce que Binance a dit, ou un JSON vide {} pour pas faire planter le robot
    res.status(response.status).send(text || '{}');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
