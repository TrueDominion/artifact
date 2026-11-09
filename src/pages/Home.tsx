/**
 * src/pages/Home.tsx
 * The exhibition entrance. One scroll through every room, built on the Evenkeel section set:
 *
 *   Opening      big type hung on the rule, then a black screen that opens from a slit
 *   Floor        ledger of the six rooms (Evenkeel: services)
 *   Layers       the four layers of every argument, a ruler swept by a red marker (month)
 *   Objections   a turning sphere of Field Guide challenges (clients)
 *   Islam        the faultlines as a hairline table with severity (prices)
 *   Method       three steps in the Field Guide, each closing a red ring (switch)
 *   Traditions   four traditions dealt out as cards (team)
 *   Principle    one staggered line ending in a red full stop
 *   Foundations  Bedrock as questions and answers (faq)
 *   Worldviews   Gallery sheets that stack as you scroll (reviews)
 *   Contact      write to us (contact)
 */

import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { setVars, useMeasure, useTrack } from '@/lib/motion'
import {
  EMAIL, LAYERS, RELIGIONS, ROOMS, SEVERITY_LABEL, Word, args, bedrock, debates, fieldGuide, pad,
  religionCount, worldviews,
} from '@/lib/content'
import { Arrow, Plus, Severity } from '@/components/ui/Glyphs'

type Vars = CSSProperties & Record<`--${string}`, string | number>

const firstSentence = (text: string) => {
  const m = /^(.+?[.!?])(\s|$)/.exec(text)
  return m ? m[1] : text
}

// ── Opening ───────────────────────────────────────────────

function Opening() {
  const section = useRef<HTMLElement>(null)
  const two = useRef<HTMLDivElement>(null)
  const rule = useRef<HTMLSpanElement>(null)
  const level = useRef<HTMLDivElement>(null)

  useMeasure(() => {
    const s = section.current, t = two.current, r = rule.current
    if (!s || !t || !r) return
    setVars(s, { '--opening-run': `${t.offsetTop}px`, '--opening-slit': `${r.offsetLeft}px` })
    s.querySelectorAll<HTMLElement>('.op-say > .l-a').forEach((row, i) => {
      setVars(row.firstElementChild as HTMLElement, { '--opening-row': `${r.offsetLeft - row.offsetLeft}px`, '--opening-step': i })
    })
  })

  // The level's bubble rocks forever; pause it while it is off screen.
  useEffect(() => {
    const el = level.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => el.classList.toggle('is-paused', !entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const tiles: { from: number; content: JSX.Element }[] = [
    { from: 150, content: <img className="m-photo" src="/images/statue.webp" alt="A broken marble head, struck through with a black brushstroke" width="800" height="800" /> },
    { from: 240, content: <img className="m-photo" src="/images/tile-sphere.webp" alt="An antique armillary sphere, struck through with a black brushstroke" width="800" height="800" /> },
    { from: 190, content: <img className="m-photo" src="/images/tile-scales.webp" alt="An ancient bronze balance scale, struck through with a black brushstroke" width="800" height="800" /> },
    { from: 280, content: <img className="m-photo" src="/images/tile-lamp.webp" alt="A first century clay oil lamp, struck through with a black brushstroke" width="800" height="800" /> },
  ]

  return (
    <section ref={section} className="op" id="opening">
      <div className="op-one">
        <span ref={rule} className="l-rule op-rule" aria-hidden="true" />
        <p className="m-text-3 op-where l-b"><span>Christian apologetics</span><span>A modern museum of ancient arguments</span></p>
        <div className="op-head">
          <div className="op-name">
            <p className="m-text-3 op-what">Arguments, answers &amp; history</p>
            <h1 className="m-text-2 op-h1">
              <span className="ln"><span className="ln__i">arti<span className="op-fact">FACT</span></span></span>
            </h1>
          </div>
          <p className="m-text-2 op-sub">
            <span className="ln l-a op-a"><span className="ln__i">The foundations</span></span>
            <span className="ln l-a op-a"><span className="ln__i">of Christian</span></span>
            <span className="ln l-b"><span className="ln__i">belief,</span></span>
            <span className="ln l-b op-in"><span className="ln__i">examined.</span></span>
          </p>
          <div className="op-foot">
            <div ref={level} className="op-level" aria-hidden="true"><span className="op-level__bubble" /></div>
            <div className="op-actions">
              <Link className="m-btn" to="/field-guide"><span className="m-btn__label">Open the Field Guide</span></Link>
              <Link className="m-link" to="/bedrock">Explore Bedrock</Link>
            </div>
          </div>
        </div>
      </div>

      <div ref={two} className="op-two">
        <ul className="op-tiles">
          {tiles.map((t, i) => (
            <li key={i} className="op-tile" style={{ '--opening-li-op-tile-translate-from-2': `${t.from}px` } as Vars}>{t.content}</li>
          ))}
        </ul>
        <p className="m-text op-para l-b">
          Truth can withstand examination. Equip yourself with clear, historically grounded answers to the hardest questions Christians face.{' '}
          <a className="m-link-2" href="#floor">Walk the exhibition floor</a>
        </p>
        <p className="m-text-2 op-say">
          <span className="ln"><span className="ln__i l-left">truth</span><span className="ln__i">can</span></span>
          <span className="ln l-a"><span className="ln__i">withstand</span></span>
          <span className="ln l-a"><span className="ln__i">examination.</span></span>
        </p>
      </div>
    </section>
  )
}

// ── The exhibition floor (ledger of rooms) ────────────────

function Floor() {
  return (
    <section className="sv" id="floor">
      <h2 className="m-text-2 sv-h"><span className="l-a">The exhibition</span><span className="l-b sv-in">floor.</span></h2>
      <div className="sv-ledger">
        <span className="l-rule sv-rule" aria-hidden="true" data-motion="rule" data-enter="90%" style={{ '--rule-from': '1 0', '--rule-origin': '50% 0%' } as Vars} />
        <div className="l-ledger sv-head m-text-3" aria-hidden="true"><span>Room</span><span>The question</span><span>What you will find</span><span>Exhibits</span></div>
        <ul className="sv-rows">
          {ROOMS.map(room => (
            <li key={room.path} className="l-ledger sv-row">
              <h3 className="m-text-4 sv-name"><Link className="sv-link" to={room.path}>{room.name}<Arrow /></Link></h3>
              <p className="m-text sv-send" data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '-36px' } as Vars}>
                <span className="sr-only">The question: </span>{room.question}
              </p>
              <p className="m-text sv-return" data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '36px', '--post-delay': '0.12s' } as Vars}>
                <span className="sr-only">What you will find: </span>{room.description}
              </p>
              <p className="m-text-3 sv-often">{room.count}</p>
              <span className="sv-line" aria-hidden="true" data-motion="rule" data-enter="90%" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Four layers of every argument (ruler) ─────────────────

const LAYER_COPY: Record<(typeof LAYERS)[number]['key'], string> = {
  claim: 'What the argument asserts is true, stated plainly before anything is defended.',
  logic: 'How each premise carries the weight, step by step, to the conclusion.',
  counterargument: 'The strongest case against it, put in its own best words.',
  response: 'Why the objection does not overturn the argument, with sources to check.',
}

function Layers() {
  const section = useRef<HTMLElement>(null)
  const board = useRef<HTMLDivElement>(null)
  const [reached, setReached] = useState<number>(LAYERS.length)

  useMeasure(() => {
    const s = section.current, b = board.current
    if (!s || !b) return
    setVars(s, { '--month-board-w': `${b.clientWidth}px`, '--month-board-h': `${b.clientHeight}px` })
  })

  useTrack(section, p => {
    const n = [0.012, 0.262, 0.512, 0.762].filter(x => p >= x).length
    setReached(prev => (prev === n ? prev : n))
  })

  return (
    <section ref={section} className="mo" id="layers">
      <div className="mo-stage">
        <h2 className="m-text-2 mo-h"><span className="l-a">Every argument,</span><span className="l-b">four layers deep.</span></h2>
        <div ref={board} className="mo-board">
          <div className="mo-scale" aria-hidden="true"><span className="mo-fill" /></div>
          <span className="mo-marker" aria-hidden="true" />
          <ol className="mo-tasks">
            {LAYERS.map((layer, i) => (
              <li key={layer.key} className={`mo-task${i < reached ? ' is-on' : ''}`}>
                <p className="m-text-3 mo-day">Layer {pad(i + 1)} · {layer.sublabel}</p>
                <h3 className="m-text-4">{layer.label}</h3>
                <p className="m-text">{LAYER_COPY[layer.key]}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="m-text-3 mo-note l-b">
          {Word(args.length)} arguments in The Dig, each excavated the same way. <Link className="m-link" to="/the-dig">Open The Dig</Link>
        </p>
      </div>
    </section>
  )
}

// ── Objections sphere ─────────────────────────────────────

const SPHERE: [number, number][] = [
  [74.6, 0.0], [63.2, 137.5], [55.2, 275.0], [48.6, 52.5], [42.7, 190.0], [37.4, 327.5], [32.4, 105.0],
  [27.7, 242.6], [23.1, 20.1], [18.7, 157.6], [14.5, 295.1], [10.3, 72.6], [6.2, 210.1], [2.0, 347.6],
  [-2.0, 125.1], [-6.2, 262.6], [-10.3, 40.1], [-14.5, 177.6], [-18.7, 315.1], [-23.1, 92.7], [-27.7, 230.2],
  [-32.4, 7.7], [-37.4, 145.2], [-42.7, 282.7], [-48.6, 60.2], [-55.2, 197.7], [-63.2, 335.2], [-74.6, 112.7],
]

const RELIGION_SHORT: Record<string, string> = {
  islam: 'Islam', atheism: 'Atheism', mormonism: 'Mormonism', 'jehovahs-witnesses': "Jehovah's Witnesses",
}

function Objections() {
  const title = useRef<HTMLHeadingElement>(null)
  const a = useRef<HTMLSpanElement>(null)
  const b = useRef<HTMLSpanElement>(null)

  // The 28 shortest challenges fit a card; keep their data order so traditions mix around the sphere.
  const cards = useMemo(() => {
    const short = new Set([...fieldGuide].sort((x, y) => x.challenge.length - y.challenge.length).slice(0, SPHERE.length).map(e => e.id))
    return fieldGuide.filter(e => short.has(e.id))
  }, [])

  useMeasure(() => {
    const t = title.current, ha = a.current, hb = b.current
    if (!t || !ha || !hb) return
    const cx = t.clientWidth / 2
    if (matchMedia('(min-width: 701px)').matches) {
      const gap = parseFloat(getComputedStyle(t).fontSize) * 0.26
      const start = cx - (ha.offsetWidth + gap + hb.offsetWidth) / 2
      setVars(ha, { '--clients-x': `${start - ha.offsetLeft}px`, '--clients-y': '0px' })
      setVars(hb, { '--clients-x': `${start + ha.offsetWidth + gap - hb.offsetLeft}px`, '--clients-y': '0px' })
    } else {
      const cy = t.clientHeight / 2
      setVars(ha, { '--clients-x': `${cx - ha.offsetWidth / 2 - ha.offsetLeft}px`, '--clients-y': `${cy - ha.offsetHeight - ha.offsetTop}px` })
      setVars(hb, { '--clients-x': `${cx - hb.offsetWidth / 2 - hb.offsetLeft}px`, '--clients-y': `${cy - hb.offsetTop}px` })
    }
  })

  return (
    <section className="cl" id="objections">
      <div className="cl-stage">
        <h2 ref={title} className="m-text-2 cl-title">
          <span ref={a} className="cl-half cl-half--a">Questions</span> <span ref={b} className="cl-half cl-half--b">you will hear</span>
        </h2>
        <ul className="cl-globe" aria-label="Some of the challenges answered in the Field Guide">
          {cards.map((entry, i) => (
            <li key={entry.id} className="cl-card" style={{ '--lat': `${SPHERE[i][0]}deg`, '--lon': `${SPHERE[i][1]}deg` } as Vars}>
              <div className={`cl-face ${i % 3 === 1 ? 'm-surface-3' : 'm-surface'}`}>
                <span className="m-text-3">“{entry.challenge}”</span>
                <span className="m-text-3 cl-trade">{RELIGION_SHORT[entry.religion]}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="m-text-3 cl-note">
          {fieldGuide.length} challenges in the Field Guide. Twenty-eight of them are here. <Link className="m-link" to="/field-guide">Answer them</Link>
        </p>
      </div>
    </section>
  )
}

// ── Islam & the Christian faith (faultlines table) ────────

function Faultlines() {
  return (
    <section className="pr" id="islam">
      <h2 className="m-text-2 pr-h"><span className="pr-l1"><span className="l-left">Islam</span>&amp; the</span><span className="l-a">Christian faith.</span></h2>
      <div className="pr-table">
        <div className="l-ledger pr-cols m-text-3" aria-hidden="true"><span>Faultline</span><span>Ground</span><span>The challenge</span><span>Severity</span></div>
        <ul className="pr-plans">
          {debates.map((d, i) => (
            <li key={d.id} className="l-ledger pr-plan">
              <h3 className="m-text-4 pr-name">
                <Link className="pr-link" to={`/faultlines#${d.id}`}><span className="pr-num m-text-3">Fault {pad(i + 1)}</span>{d.title}</Link>
              </h3>
              <p className="m-text pr-for">{d.category}<br />{d.difficulty.charAt(0).toUpperCase() + d.difficulty.slice(1)}</p>
              <p className="m-text pr-items">{firstSentence(d.summary)}</p>
              <p className="m-text-4 pr-fee" data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '36px', '--post-delay': '0.12s' } as Vars}>
                <Severity level={d.severity} />
                <span className="m-text-3">{SEVERITY_LABEL[d.severity]}</span>
              </p>
              <span className="pr-rule" aria-hidden="true" data-motion="rule" data-enter="90%" />
            </li>
          ))}
        </ul>
        <p className="m-text pr-note l-b">
          The most pressing theological conversation of our time. Each challenge is stated in its strongest form, then answered with historical evidence, textual analysis, and logical argument.{' '}
          <Link className="m-link" to="/faultlines">Enter Faultlines</Link>
        </p>
      </div>
    </section>
  )
}

// ── Method: three steps in the Field Guide ────────────────

const STEPS = [
  { title: 'Pick the tradition', text: 'Islam, atheism, Mormonism, or Jehovah’s Witnesses: start where the conversation is.' },
  { title: 'Find the challenge', text: 'Search for what was said, or filter by Scripture, Jesus, the Trinity, salvation and more.' },
  { title: 'Give the answer', text: 'A one-line response, the evidence behind it, and an anchor verse to stand on.' },
]

function Method() {
  const section = useRef<HTMLElement>(null)
  const [done, setDone] = useState(STEPS.length)

  useTrack(section, p => {
    const n = [0.30333, 0.63667, 0.97].filter(x => p >= x).length
    setDone(prev => (prev === n ? prev : n))
  })

  return (
    <section ref={section} className="sw" id="method">
      <div className="sw-stage">
        <h2 className="m-text-2 sw-h"><span className="l-a">Ready for the</span><span className="l-b">conversation</span><span className="l-b">in three steps.</span></h2>
        <div className="sw-body">
          <span className="l-rule sw-rule" aria-hidden="true" />
          <div className="sw-old">
            <p className="m-text-3">In the Field Guide</p>
            <p className="m-text">Select the worldview you are engaging with. You will see clear, concise responses to the challenges you are most likely to encounter.</p>
            <p className="m-text-3"><Link className="m-link" to="/field-guide">Open the Field Guide</Link></p>
          </div>
          <ol className="sw-tiles">
            {STEPS.map((step, i) => (
              <li key={step.title} className={`sw-tile m-surface-3${i < done ? ' is-done' : ''}`} style={{ '--i': i } as Vars}>
                <svg className="sw-ring" viewBox="0 0 40 40" aria-hidden="true">
                  <circle className="sw-ring__track" cx="20" cy="20" r="17" />
                  <circle className="sw-ring__arc" cx="20" cy="20" r="17" pathLength={1} />
                </svg>
                <h3 className="m-text-4">{step.title}</h3>
                <p className="m-text sw-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ── Four traditions (cards dealt from a pile) ─────────────

const TILTS = [-7, 5, -3, 8]

function Traditions() {
  const row = useRef<HTMLUListElement>(null)

  useMeasure(() => {
    const r = row.current
    if (!r) return
    const cards = [...r.children] as HTMLElement[]
    const middle = (cards.length - 1) / 2
    cards.forEach((card, i) => setVars(card, {
      '--team-x': `${r.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2) + (i - middle) * 16}px`,
      '--team-y': `${r.clientHeight / 2 - (card.offsetTop + card.offsetHeight / 2) + (i % 2 ? -12 : 12)}px`,
    }))
  })

  return (
    <section className="tm" id="traditions">
      <h2 className="m-text-2 tm-h"><span className="l-a">{Word(RELIGIONS.length)} traditions,</span><span className="l-b">one guide.</span></h2>
      <ul ref={row} className="tm-row">
        {RELIGIONS.map((r, i) => (
          <li key={r.id} className="tm-card" style={{ '--team-tilt': `${TILTS[i % TILTS.length]}deg`, '--i': i, '--n': RELIGIONS.length } as Vars}>
            <Link className="tm-link" to={`/field-guide?tradition=${r.id}`}>
              <div className="tm-photo tm-count m-surface-3">
                <span className="m-text-2">{religionCount(r.id)}</span>
                <span className="m-text-3">challenges answered</span>
              </div>
              <h3 className="m-text-4">{r.label}</h3>
              <p className="m-text-3 tm-role">{r.sublabel}</p>
              <p className="m-text">{firstSentence(r.description)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── Principle ─────────────────────────────────────────────

function Principle() {
  return (
    <section className="pc" id="principle">
      <p className="m-text-3 pc-cap l-b">Built to inform conversations that dig for Truth</p>
      <blockquote className="m-text-2 pc-q">
        <span className="pc-l l-a" data-motion="weigh" data-enter="69%">The</span>
        <span className="pc-l l-b" data-motion="weigh" data-enter="69%">excavation</span>
        <span className="pc-l l-b pc-in" data-motion="weigh" data-enter="69%">continues<span className="pc-dot">.</span></span>
      </blockquote>
    </section>
  )
}

// ── Foundations (Bedrock as questions and answers) ────────

function Foundations() {
  return (
    <section className="fq" id="foundations">
      <h2 className="m-text-2 fq-h"><span className="l-a">{Word(bedrock.length)} foundations</span><span className="l-b">that do not</span><span className="l-b">move.</span></h2>
      <div className="fq-list">
        {bedrock.map((entry, i) => (
          <div key={entry.id} className="fq-item">
            <span className="fq-line" aria-hidden="true" data-motion="rule" data-enter="90%" />
            <details name="foundations">
              <summary className="m-text-4 fq-q"><span><span className="fq-num m-text-3">{pad(i + 1)}</span>{entry.title}</span><Plus /></summary>
              <div className="fq-a">
                <p className="m-text-3 fq-ref">{entry.scripture}</p>
                <p className="m-text-4 fq-verse">“{entry.scripture_text}”</p>
                <p className="m-text">{entry.summary}</p>
                <p className="m-text-3 fq-more"><Link className="m-link" to={`/bedrock#${entry.id}`}>Read the full explanation</Link></p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Worldviews (stacking sheets) ──────────────────────────

const SHEETS = ['islam', 'atheism', 'hinduism', 'buddhism']

function Worldviews() {
  const stack = useRef<HTMLOListElement>(null)
  const sheets = useMemo(() => SHEETS.map(id => worldviews.find(w => w.id === id)).filter(Boolean) as typeof worldviews, [])

  useMeasure(() => {
    const s = stack.current
    if (!s) return
    const items = [...s.children] as HTMLElement[]
    let at = 0
    items.slice(0, -1).forEach((sheet, i) => {
      at += sheet.offsetHeight + parseFloat(getComputedStyle(sheet).marginBottom)
      setVars(sheet, { '--reviews-at': `${at}px`, '--reviews-top': `${parseFloat(getComputedStyle(items[i + 1]).top) || 0}px` })
    })
  })

  return (
    <section className="rv" id="worldviews">
      <h2 className="m-text-2 rv-h"><span className="l-a">{Word(worldviews.length)} worldviews,</span><span className="l-b">examined honestly.</span></h2>
      <ol ref={stack} className="rv-stack">
        {sheets.map((w, i) => (
          <li key={w.id} className={`rv-sheet ${i % 2 ? 'm-surface-2' : 'm-surface'}`} style={{ '--i': i } as Vars}>
            <p className="m-text-3 rv-kicker">Exhibit {pad(worldviews.indexOf(w) + 1)} · {w.tradition}</p>
            <p className="m-text-4 rv-quote">{w.tagline}</p>
            <p className="m-text-3 rv-who">
              <span>{w.name}</span>
              <span>Founded {w.founded}</span>
              <Link className="m-link" to={`/the-gallery#${w.id}`}>Enter the exhibit</Link>
            </p>
          </li>
        ))}
      </ol>
      <p className="m-text rv-more l-b">
        Each tradition presented on its own terms, then examined from a Reformed Christian perspective. <Link className="m-link" to="/the-gallery">Enter the Gallery</Link>
      </p>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────

function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) { form.reportValidity(); return }
    const data = new FormData(form)
    const body = [
      String(data.get('message') || ''),
      '',
      data.get('context') ? `Where I heard it: ${data.get('context')}` : '',
      `From: ${data.get('name')}`,
    ].filter((line, i) => i < 2 || line).join('\n')
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('A question for artiFACT')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="ct" id="contact">
      <p className="m-text-2 ct-clock">
        <span aria-hidden="true">(</span>
        <span>Ask</span>
        <span className="ct-frame"><img className="m-photo" src="/images/contact-hand.webp" alt="" width="598" height="800" loading="lazy" /></span>
        <span>anything</span>
        <span aria-hidden="true">)</span>
      </p>
      <p className="m-text-3 ct-days">Write to us · {EMAIL}</p>
      <div className="ct-grid">
        <span className="l-rule ct-rule" aria-hidden="true" />
        <dl className="ct-lines">
          <div data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '-36px' } as Vars}>
            <dt className="m-text-3">Email</dt>
            <dd className="m-text"><a className="m-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
          </div>
          <div data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '-36px' } as Vars}>
            <dt className="m-text-3">Best for</dt>
            <dd className="m-text">An objection you heard and could not answer.</dd>
          </div>
          <div data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '-36px' } as Vars}>
            <dt className="m-text-3">Also welcome</dt>
            <dd className="m-text">Corrections. If an answer here is weak, say so.</dd>
          </div>
        </dl>
        <div className="ct-right">
          <h2 className="m-text-2 ct-h"><span>Send us</span> <span className="ct-h2">the question.</span></h2>
          <form className="ct-form" onSubmit={onSubmit} noValidate>
            <label className="m-field"><span className="m-field__label">Your name</span><input className="m-field__input" name="name" type="text" autoComplete="name" required /></label>
            <label className="m-field"><span className="m-field__label">Where you heard it (optional)</span><input className="m-field__input" name="context" type="text" /></label>
            <label className="m-field ct-wide"><span className="m-field__label">The question you were asked</span><textarea className="m-field__input" name="message" rows={3} required /></label>
            <div className="ct-send">
              <button className="m-btn" type="submit"><span className="m-btn__label">Write the email</span></button>
              <p className="m-text-3 ct-thanks" role="status" hidden={!sent}>Your email app should open with the message ready to send.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Opening />
      <Floor />
      <Layers />
      <Objections />
      <Faultlines />
      <Method />
      <Traditions />
      <Principle />
      <Foundations />
      <Worldviews />
      <Contact />
    </>
  )
}
