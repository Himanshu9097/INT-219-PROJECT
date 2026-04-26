import app from "../Backend/src/app.js";

export default function(req, res) {
  // Fix Vercel legacy routing mutation
  if (req.url) {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathParam = urlObj.searchParams.get('path') || (req.query && req.query.path);
    if (pathParam && req.url.includes('/api/[...path].js')) {
      req.url = '/api/' + pathParam;
    }
  }
  return app(req, res);
}
