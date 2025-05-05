function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const method = request.method;

      console.log('Incoming request:', method, url.pathname);

      // ✅ CORS Preflight Handler
      if (method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      // ✅ GET all office hours
      if (method === 'GET' && url.pathname === '/api/office-hours') {
        const { results } = await env.DB.prepare(`SELECT * FROM office_hours`).all();
        return jsonResponse(results);
      }

      // ✅ POST new office hour
      if (method === 'POST' && url.pathname === '/api/office-hours') {
        const body = await request.json();
        const { professor, course, day, time, location, format, notes } = body;

        await env.DB.prepare(
          `INSERT INTO office_hours (professor, course, day, time, location, format, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(professor, course, day, time, location, format, notes).run();

        return jsonResponse({ success: true });
      }

      // ✅ DELETE office hour by ID
      if (method === 'DELETE' && url.pathname.startsWith('/api/office-hours/')) {
        const id = url.pathname.split('/').pop();
        await env.DB.prepare(`DELETE FROM office_hours WHERE id = ?`).bind(id).run();
        return jsonResponse({ success: true });
      }

      // ❌ Not Found
      return jsonResponse({ error: 'Not Found' }, 404);

    } catch (err) {
      console.error('Error in handler:', err);
      return jsonResponse({ error: 'Internal Server Error' }, 500);
    }
  }
};