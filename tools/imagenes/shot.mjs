// Captura una página con Chrome por CDP (Chrome ya escuchando en el puerto CDP_PORT, por defecto 9333).
// Uso: node shot.mjs <url> <salida.png> <escritorio|movil> [ancho] [alto]
//   escritorio: 1280×800 CSS px, deviceScaleFactor 2, mobile:false  -> PNG de 2560×1600
//   movil:      390×844  CSS px, deviceScaleFactor 2, mobile:true, UA de iPhone -> PNG de 780×1688
// TEMA=light|dark (opcional) fuerza prefers-color-scheme; DSF=1 cambia la densidad (por defecto 2).
// Espera a load + document.fonts.ready + todas las <img> completas + 1,5 s de margen.
import fs from 'node:fs';

const [url, out, modo = 'escritorio', aw, ah] = process.argv.slice(2);
const movil = modo === 'movil';
const w = +(aw || (movil ? 390 : 1280));
const h = +(ah || (movil ? 844 : 800));
const port = process.env.CDP_PORT || '9333';

const t = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0;
const pend = new Map();
const eventos = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result ?? m.error); pend.delete(m.id); }
  else if (m.method) eventos.push(m.method);
};
await new Promise((r) => (ws.onopen = r));
const send = (method, params = {}) => new Promise((r) => {
  const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params }));
});
const evalJS = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }))?.result?.value;

await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: +(process.env.DSF || 2), mobile: movil });
if (movil) {
  await send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
}
if (process.env.TEMA) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: process.env.TEMA }] });
await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url });

// Espera al evento load (máx. 30 s).
for (let i = 0; i < 300 && !eventos.includes('Page.loadEventFired'); i++) await new Promise((r) => setTimeout(r, 100));
const estado = await evalJS(`(async () => {
  await document.fonts.ready;
  const imgs = [...document.images];
  await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 8000); })));
  return { fuentes: document.fonts.status, imgs: imgs.length, rotas: imgs.filter(i => i.complete && !i.naturalWidth && i.src).length, titulo: document.title };
})()`);
await new Promise((r) => setTimeout(r, 1500));
const s = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(out, Buffer.from(s.data, 'base64'));
await fetch(`http://127.0.0.1:${port}/json/close/${t.id}`);
ws.close();
console.log('ok', out, JSON.stringify(estado));
