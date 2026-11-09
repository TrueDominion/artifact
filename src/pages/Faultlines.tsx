/**
 * src/pages/Faultlines.tsx
 * FAULTLINES — the hardest Islamic challenges. Severity and ground sit left of the rule;
 * opened, the claim (grey) stands beside the Christian response (white), then thinkers and sources.
 */

import { PageHead, PageBody, Entry, Prose, Sources } from '@/components/ui/Page'
import { Severity } from '@/components/ui/Glyphs'
import { SEVERITY_LABEL, Word, debates, pad } from '@/lib/content'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Faultlines() {
  return (
    <>
      <PageHead
        kicker="Section V · Faultlines"
        meta="The primary excavation: Islam & the Christian faith"
        lines={['The hardest', 'Islamic', 'challenges.']}
        side={<span style={{ display: 'grid', gap: 8, justifyItems: 'inherit' }}>
          <Severity level={5} />
          <span>Five bars: the ones most commonly raised in real conversations</span>
        </span>}
        lede={`${Word(debates.length)} Islamic challenges to Christian belief, each stated in its strongest form and answered with historical evidence, textual analysis, and logical argument.`}
      />
      <PageBody>
        {debates.map((d, i) => (
          <Entry
            key={d.id}
            id={d.id}
            group="faultlines"
            side={<>
              <span className="m-text-3 is-accent">Fault {pad(i + 1)}</span>
              <Severity level={d.severity} />
              <span className="m-text-3">{SEVERITY_LABEL[d.severity]} · {d.category} · {cap(d.difficulty)}</span>
            </>}
            title={d.title}
            sub={d.summary}
          >
            <div className="ex-split">
              <div className="m-panel m-surface">
                <p className="m-label">The Islamic claim</p>
                <Prose text={d.challenge} />
              </div>
              <div className="m-panel m-surface-2">
                <p className="m-label is-accent">The Christian response</p>
                <Prose text={d.response} />
                {d.key_thinkers.length > 0 && (
                  <div className="ex-meta">
                    <p className="m-label">Key thinkers</p>
                    <p className="m-text-3">{d.key_thinkers.join(' · ')}</p>
                  </div>
                )}
                <Sources items={d.sources} />
              </div>
            </div>
          </Entry>
        ))}
      </PageBody>
    </>
  )
}
