/**
 * Shared types for the editorial (home) Route Group.
 */

export interface FeaturedWorkMeta {
  readonly label: string
  readonly value: string
}

export interface FeaturedWorkImage {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export interface FeaturedWork {
  readonly id: string
  /** Three-digit display index e.g. "001" */
  readonly indexNumber: string
  readonly title: string
  readonly titleJa: string
  readonly description: string
  readonly stack: ReadonlyArray<string>
  readonly meta: ReadonlyArray<FeaturedWorkMeta>
  readonly image: FeaturedWorkImage
}
