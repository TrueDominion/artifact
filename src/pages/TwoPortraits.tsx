/**
 * src/pages/TwoPortraits.tsx
 * TWO PORTRAITS: Jesus in the Gospels and in the Quran, topic by topic. The two accounts face each
 * other across a hairline; each row ends with a short note on where they meet or part.
 */

import { Link } from 'react-router-dom'
import { PageHead } from '@/components/ui/Page'
import { PortraitHead, PortraitRow } from '@/components/ui/Portraits'
import { Word, portraits } from '@/lib/content'

export default function TwoPortraits() {
  const parted = portraits.filter(p => p.verdict === 'divergent').length
  return (
    <>
      <PageHead
        kicker="Section VI · Two Portraits"
        meta={`${portraits.length} topics · ${parted} where they cannot both be true`}
        lines={['One Jesus,', 'two', 'portraits.']}
        side="The Gospels: first century. The Quran: seventh century."
        lede="Muslims and Christians both honour Jesus, and the two faiths agree about more of his life than either side often realises. They part on the questions that matter most: whether he died, whether he rose, and who he is. Here the two accounts stand side by side, with the references to check them."
      />
      <div className="tp-list">
        <PortraitHead />
        {portraits.map(p => <PortraitRow key={p.id} p={p} />)}
        <p className="m-text tp-more">
          <span style={{ maxWidth: '52ch' }}>
            {Word(portraits.length)} topics, one question: which portrait comes from the people who knew him? The Gospels were written within living memory of Jesus; the Quran about six centuries later.
          </span>
          <Link className="m-link" to="/the-dig#crucifixion">The crucifixion as historical fact</Link>
        </p>
      </div>
    </>
  )
}
