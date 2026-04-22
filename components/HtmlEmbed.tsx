"use client"

import { useEffect, useRef, useState } from "react"

interface HtmlEmbedProps {
  /** Raw HTML — may include <style> and <script> — rendered in a sandboxed iframe. */
  readonly html: string
  /** Initial and minimum iframe height in px. Grows to fit posted content height. */
  readonly minHeight?: number
  /** Accessible title for the iframe. */
  readonly title?: string
}

const HEIGHT_MESSAGE_TYPE = "tsutsu-embed-height"

/**
 * Renders untrusted HTML/CSS/JS inside a sandboxed iframe so it is isolated
 * from the host document. The embedded script is expected to post
 * `{ type: "tsutsu-embed-height", value: <px> }` messages so this frame can
 * grow to fit its content (an auto-resize loader is injected automatically).
 *
 * Sandbox: `allow-scripts allow-popups`. No `allow-same-origin` — the
 * iframe runs in a unique opaque origin with no parent-DOM, cookie, or
 * storage access.
 */
export default function HtmlEmbed({
  html,
  minHeight = 200,
  title = "Embedded content",
}: HtmlEmbedProps) {
  const [height, setHeight] = useState<number>(minHeight)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Only trust messages from our own iframe. Without this guard, any
      // other frame on the page (or a browser extension content script)
      // could post a spoofed height message and inflate this iframe's
      // height unboundedly. Mirrors the same guard in ProseContent.tsx.
      if (event.source !== iframeRef.current?.contentWindow) {
        return
      }
      const data = event.data
      if (
        !data ||
        typeof data !== "object" ||
        (data as { type?: unknown }).type !== HEIGHT_MESSAGE_TYPE
      ) {
        return
      }
      const value = (data as { value?: unknown }).value
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return
      }
      setHeight((current) => Math.max(current, Math.ceil(value)))
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  if (!html || html.trim() === "") {
    return null
  }

  return (
    <iframe
      ref={iframeRef}
      title={title}
      srcDoc={buildEmbedDocument(html)}
      sandbox="allow-scripts allow-popups"
      loading="lazy"
      style={{
        width: "100%",
        height: `${height}px`,
        border: 0,
        display: "block",
      }}
    />
  )
}

function buildEmbedDocument(userHtml: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
html,body{margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif;box-sizing:border-box}
*,*::before,*::after{box-sizing:inherit}
</style>
</head>
<body>
${userHtml}
<script>(function(){
  function send(){
    try{
      var h=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
      parent.postMessage({type:"${HEIGHT_MESSAGE_TYPE}",value:h},"*");
    }catch(e){}
  }
  if(typeof ResizeObserver==="function"){
    var ro=new ResizeObserver(send);
    ro.observe(document.body);
  }
  window.addEventListener("load",send);
  window.addEventListener("resize",send);
})();<\/script>
</body>
</html>`
}
