/**
 * src/pages/Bedrock.tsx
 * BEDROCK — the immovable foundation. Each doctrine is an entry: confession left of the rule,
 * the doctrine and its scripture right of it; opened, what we believe beside how Islam differs.
 */

import { PageHead, PageBody, Entry, Prose } from '@/components/ui/Page'
import { Word, bedrock, pad } from '@/lib/content'

export default function Bedrock() {
  return (
    <>
      <PageHead
        kicker="Section I · Bedrock"
        meta={`${bedrock.length} foundations`}
        lines={['Bedrock,', 'the immovable', 'foundation.']}
        side="Open any foundation to read the full explanation"
        lede={`${Word(bedrock.length)} foundational doctrines of Christian faith: what each one means, what is at stake if it is denied, and where Islamic theology directly contradicts it.`}
      />
      <PageBody>
        {bedrock.map((entry, i) => (
          <Entry
            key={entry.id}
            id={entry.id}
            side={<>
              <span className="m-text-3 is-accent">Foundation {pad(i + 1)}</span>
              <span className="m-text-3">{entry.confession}</span>
            </>}
            title={entry.title}
            sub={entry.summary}
          >
            <blockquote className="m-verse">
              <p className="m-text-4">“{entry.scripture_text}”</p>
              <cite className="m-label is-accent" style={{ fontStyle: 'normal' }}>{entry.scripture}</cite>
            </blockquote>
            <div className="ex-split">
              <div className="m-panel m-surface-2">
                <p className="m-label">What we believe</p>
                <Prose text={entry.doctrine} />
              </div>
              <div className="m-panel m-surface">
                <p className="m-label">How Islam differs</p>
                <Prose text={entry.islamic_contrast} />
              </div>
            </div>
          </Entry>
        ))}
      </PageBody>
    </>
  )
}
