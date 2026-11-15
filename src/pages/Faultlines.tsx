/**
 * src/pages/Faultlines.tsx
 * FAULTLINES: the hardest Christian challenges to Islam, argued honestly. Each entry states the
 * challenge, then the strongest Muslim reply (grey), then the Christian response (white), which
 * opens by answering that reply. Evidence strength sits left of the rule.
 */

import { PageHead, PageBody, Entry, Prose, Sources } from '@/components/ui/Page'
import { Strength } from '@/components/ui/Glyphs'
import { STRENGTH, Word, debates, pad } from '@/lib/content'
import type { Strength as StrengthKey } from '@/types'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Faultlines() {
  return (
    <>
      <PageHead
        kicker="Section V · Faultlines"
        meta="The primary excavation: Islam & the Christian faith"
        lines={['The hardest', 'questions', 'for Islam.']}
        side={<span style={{ display: 'grid', gap: 10, justifyItems: 'inherit' }}>
          {(Object.keys(STRENGTH) as StrengthKey[]).map(k => (
            <span key={k} style={{ display: 'grid', gap: 4, justifyItems: 'inherit' }}>
              <Strength value={k} />
              <span>{STRENGTH[k].text}</span>
            </span>
          ))}
        </span>}
        lede={`${Word(debates.length)} challenges Christians put to Islam, each paired with the strongest Muslim reply and an answer to that reply. Marked by how firm the evidence is, so you know which to lead with and which to handle with care.`}
      />
      <PageBody>
        {debates.map((d, i) => (
          <Entry
            key={d.id}
            id={d.id}
            group="faultlines"
            side={<>
              <span className="m-text-3 is-accent">Fault {pad(i + 1)}</span>
              <Strength value={d.strength} />
              <span className="m-text-3">{d.category} · {cap(d.difficulty)}</span>
            </>}
            title={d.title}
            sub={d.summary}
          >
            <div className="ex-split">
              <div className="m-panel m-surface">
                <p className="m-label">The strongest Muslim reply</p>
                <Prose text={d.challenge} />
              </div>
              <div className="m-panel m-surface-2">
                <p className="m-label is-accent">The Christian response</p>
                <div className="fl-rejoinder">
                  <p className="m-label">Answering the reply</p>
                  <Prose text={d.rejoinder} />
                </div>
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
