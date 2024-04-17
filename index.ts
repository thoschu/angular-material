console.log("Hello via Bun!");

const  server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;

    // respond with text/html
    if (path === "/") return new Response("Welcome to Bun!");

    // redirect
    if (path === "/abc") return Response.redirect("/source", 301);

    // send back a file (in this case, *this* file)
    if (path === "/source") return new Response(Bun.file(import.meta.file));

    // respond with JSON
    if (path === "/api") return Response.json({some: "buns", for: "you"}, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    // 404s
    return new Response("Page not found", {status: 404});
  }
});

console.log(`Listening on ${server.url}`);
