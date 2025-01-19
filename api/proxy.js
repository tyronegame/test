import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();
const TARGET = 'https://www.datng.site';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    // Rewrite the URL to remove /api/proxy
    req.url = req.url.replace(/^\/api\/proxy/, '');

    proxy.web(req, res, {
      target: TARGET,
      changeOrigin: true,
      proxyTimeout: 30000,
      onProxyRes: (proxyRes, req, res) => {
        // Modify response headers if needed
        proxyRes.headers['access-control-allow-origin'] = '*';
      },
    }, (err) => {
      if (err) {
        console.error('Proxy error:', err);
        reject(err);
      }
      resolve();
    });
  });
} 