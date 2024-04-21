const server = Bun.serve({
  async fetch(req: Request) {
    const path: string = new URL(req.url).pathname;

    // respond with text/html
    if (path === "/") return new Response("Welcome!!!");

    // redirect
    if (path === "/abc") return Response.redirect("/source", 301);

    // send back a file (in this case, *this* file)
    if (path === "/source") return new Response(Bun.file(import.meta.file));

    // respond with JSON
    if (path === "/api") return Response.json({id: 13, name: "Tom S."}, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    // 404s
    return new Response("Page not found", {status: 404});
  }
});

console.log(`Listening on ${server.url}`);
