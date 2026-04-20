"use client"

/**
 * Tiny client island that renders the current year.
 * Cache Components mode forbids reading the current time in a Server
 * Component without binding to request data — this island sidesteps that.
 */
export default function FooterYear() {
  return <>{new Date().getFullYear()}</>
}
