type AudioRouteContext = {
  params: Promise<{ path: string[] }>;
};

const serveAudio = async (request: Request, context: AudioRouteContext) => {
  const { path } = await context.params;
  if (
    path.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".." ||
        /[/\\\x00]/.test(segment)
    )
  ) {
    return new Response(null, { status: 400 });
  }

  try {
    const origin = new URL(process.env.WORDPRESS_URL?.trim() ?? "");
    if (!["http:", "https:"].includes(origin.protocol)) {
      return new Response(null, { status: 502 });
    }

    const url = new URL(
      `/wp-content/uploads/${path.map(encodeURIComponent).join("/")}`,
      origin.origin
    );
    const headers = new Headers({
      Accept: "audio/*",
      "Accept-Encoding": "identity",
    });
    for (const name of ["Range", "If-Range"]) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }

    const upstream = await fetch(url, {
      method: request.method,
      headers,
      cache: "no-store",
      redirect: "error",
      signal: request.signal,
    });
    const responseHeaders = new Headers();
    for (const name of [
      "Content-Type",
      "Content-Length",
      "Content-Range",
      "Accept-Ranges",
      "Cache-Control",
      "ETag",
      "Last-Modified",
    ]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }

    if (upstream.status === 416) {
      await upstream.body?.cancel();
      responseHeaders.delete("Content-Length");
      return new Response(null, { status: 416, headers: responseHeaders });
    }
    if (
      ![200, 206].includes(upstream.status) ||
      !upstream.headers.get("Content-Type")?.startsWith("audio/")
    ) {
      await upstream.body?.cancel();
      return new Response(null, { status: 502 });
    }

    return new Response(request.method === "HEAD" ? null : upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return new Response(null, { status: 502 });
  }
};

export { serveAudio as GET, serveAudio as HEAD };
