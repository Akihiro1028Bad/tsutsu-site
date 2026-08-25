import { Fragment } from "react"
import SectionShell from "@/components/home/business/SectionShell"
import { BUSINESS_OVERVIEW } from "@/lib/home/business-data"

/** 事業者概要 — the only place personal details appear. */
export default function BusinessProfile() {
  return (
    <SectionShell id="about" title="事業者概要" caption="Profile">
      <dl className="biz-overview">
        {BUSINESS_OVERVIEW.map((row) => (
          <Fragment key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </Fragment>
        ))}
      </dl>
    </SectionShell>
  )
}
