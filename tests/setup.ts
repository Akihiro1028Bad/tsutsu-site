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
