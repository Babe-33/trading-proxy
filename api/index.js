export default async function handler(req, res) {
  const path = req.url;
  const targetUrl = `https://testnet.binance.vision${path}`;
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
        'Content-Type': 'application/json'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
