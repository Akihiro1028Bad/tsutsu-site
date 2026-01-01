import "@testing-library/jest-dom"

if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin: string = ""
    readonly thresholds: ReadonlyArray<number> = []

    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}

    disconnect(): void {}
    observe(_target: Element): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
    unobserve(_target: Element): void {}
  }

  globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
}

// window.matchMedia のモック
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => {
    const mediaQuery = {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }
    return mediaQuery
  },
})

// ResizeObserver のモック
if (!("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = class ResizeObserver {
    constructor(_callback: ResizeObserverCallback) {}
    observe(_target: Element) {}
    unobserve(_target: Element) {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
