function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API health check
    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({
        status: "online",
        application: "Eppotch",
        backend: "Cloudflare Workers",
        database: "D1"
      });
    }

    // Submit a new client enquiry
    if (url.pathname === "/api/leads" && request.method === "POST") {
      try {
        const contentType = request.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          return json({ error: "Content-Type must be application/json" }, 415);
        }

        const length = Number(request.headers.get("content-length") || 0);

        if (length > 10000) {
          return json({ error: "Request is too large" }, 413);
        }

        const body = await request.json();

        const name = typeof body.name === "string" ? body.name.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        const phone = typeof body.phone === "string" ? body.phone.trim() : "";
        const company = typeof body.company === "string" ? body.company.trim() : "";
        const service = typeof body.service === "string" ? body.service.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";

        if (!name || !email) {
          return json({ error: "Name and email are required" }, 400);
        }

        if (name.length > 120 || email.length > 254 ||
            phone.length > 40 || company.length > 120 ||
            service.length > 120 || message.length > 3000) {
          return json({ error: "One or more fields are too long" }, 400);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json({ error: "Please provide a valid email address" }, 400);
        }

        const result = await env.eppotch_db
          .prepare(`
            INSERT INTO leads (name, email, phone, company, service, message)
            VALUES (?, ?, ?, ?, ?, ?)
          `)
          .bind(name, email, phone, company, service, message)
          .run();

        return json({
          success: true,
          message: "Your enquiry has been received.",
          leadId: result.meta.last_row_id
        }, 201);

      } catch (error) {
        return json({
          error: "Unable to process your enquiry right now."
        }, 500);
      }
    }

    return json({ error: "Not Found" }, 404);
  }
};
