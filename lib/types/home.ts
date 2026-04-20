/**
 * Shared types for the editorial (home) Route Group.
 */

export interface HomeService {
  readonly id: string
  readonly nameJa: string
  readonly meta: string
  readonly tagline: string
  readonly body: string
}

export type AboutSegment =
  | { readonly kind: "text"; readonly value: string }
  | { readonly kind: "mark"; readonly value: string }

export type AboutParagraph = ReadonlyArray<AboutSegment>

export interface AboutPayload {
  readonly name: {
    readonly ja: string
    readonly romanised: string
  }
  readonly paragraphs: ReadonlyArray<AboutParagraph>
}

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
