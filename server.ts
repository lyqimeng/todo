// 静态文件服务（自动返回HTML/CSS/JS）
Deno.serve(async (req) => {
  const path = new URL(req.url).pathname;
  const file = path === "/" ? "./index.html" : `.${path}`;

  try {
    const content = await Deno.readFile(file);
    return new Response(content, {
      headers: { "Content-Type": getContentType(file) },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
});

// 根据文件后缀返回正确的 MIME 类型
function getContentType(file: string): string {
  if (file.endsWith(".html")) return "text/html";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".js")) return "application/javascript";
  return "text/plain";
}
