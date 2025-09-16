type ScriptOptions = { id: string; src: string; async?: boolean; defer?: boolean };

export function loadScript({ id, src, async = false, defer = false }: ScriptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    if (async) s.async = true;
    if (defer) s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("script load error"));
    document.head.appendChild(s);
  });
}

export function removeScript(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
