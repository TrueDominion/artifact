/**
 * src/lib/content.ts
 * Typed access to the JSON content plus the small amount of shared copy and config.
 * Counts shown anywhere on the site are derived here, so copy never drifts from the data.
 */

import bedrockData from '@/data/bedrock.json'
import argumentsData from '@/data/arguments.json'
import worldviewsData from '@/data/worldviews.json'
import debatesData from '@/data/debates.json'
import fieldGuideData from '@/data/fieldguide.json'
import strataData from '@/data/strata.json'
import type {
  Argument, BedrockEntry, Debate, FieldGuideEntry, FieldGuideReligion, FieldGuideTag, StrataData, Worldview,
} from '@/types'

export const bedrock = bedrockData as unknown as BedrockEntry[]
export const args = argumentsData as unknown as Argument[]
export const worldviews = worldviewsData as unknown as Worldview[]
export const debates = debatesData as unknown as Debate[]
export const fieldGuide = fieldGuideData as unknown as FieldGuideEntry[]
export const strata = strataData as unknown as StrataData

export const EMAIL = 'info@artifacttruth.org'

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

/** "eight" for 8; digits above twelve. */
export const word = (n: number) => WORDS[n] ?? String(n)
export const Word = (n: number) => {
  const w = word(n)
  return w.charAt(0).toUpperCase() + w.slice(1)
}
export const pad = (n: number) => String(n).padStart(2, '0')

// ── Sections (the rooms of the museum) ────────────────────

export interface Room {
  path: string
  name: string
  kicker: string
  question: string
  description: string
  count: string
}

export const ROOMS: Room[] = [
  {
    path: '/field-guide',
    name: 'Field Guide',
    kicker: 'Quick reference',
    question: 'What do I say when someone raises it face to face?',
    description: 'Real objections from Islam, atheism, and other worldviews. Select a tradition and get direct answers to the challenges you are most likely to hear in conversation.',
    count: `${fieldGuide.length} challenges`,
  },
  {
    path: '/faultlines',
    name: 'Faultlines',
    kicker: 'Challenges',
    question: 'What are the hardest Islamic challenges?',
    description: `${Word(debates.length)} Islamic challenges to Christian faith, each stated in its strongest form and answered with historical evidence, textual analysis, and logical argument.`,
    count: `${debates.length} faultlines`,
  },
  {
    path: '/bedrock',
    name: 'Bedrock',
    kicker: 'Foundation',
    question: 'What can never be given up?',
    description: `${Word(bedrock.length)} non-negotiable foundations of Christian faith: what each means, why it cannot be abandoned, and where it stands in direct contrast to Islamic theology.`,
    count: `${bedrock.length} foundations`,
  },
  {
    path: '/the-dig',
    name: 'The Dig',
    kicker: 'Arguments',
    question: 'Is there a case for God?',
    description: `${Word(args.length)} arguments for God's existence and the truth of Christianity, examined through claim, logic, strongest objection, and response.`,
    count: `${args.length} arguments`,
  },
  {
    path: '/the-gallery',
    name: 'Gallery',
    kicker: 'Worldviews',
    question: 'What do other worldviews actually teach?',
    description: `${Word(worldviews.length)} worldviews examined fairly on their own terms: what each teaches, where it has genuine insight, and where the Christian account is more coherent.`,
    count: `${worldviews.length} worldviews`,
  },
  {
    path: '/the-strata',
    name: 'Strata',
    kicker: 'History',
    question: 'What world was Scripture written into?',
    description: `${Word(strata.eras.length)} eras, ${word(strata.empires.length)} empires, twelve tribes, and the gods Israel kept chasing: the historical world Scripture was written into, mapped layer by layer.`,
    count: `${strata.eras.length} eras`,
  },
]

// ── Field Guide config ────────────────────────────────────

export interface ReligionConfig {
  id: FieldGuideReligion
  label: string
  sublabel: string
  description: string
}

export const RELIGIONS: ReligionConfig[] = [
  {
    id: 'islam',
    label: 'Islam',
    sublabel: '1.9 billion adherents',
    description: "Challenges from Islamic theology — the Quran, Muhammad's credentials, the Trinity, tahrif, and the nature of God. Written for real conversations with Muslims.",
  },
  {
    id: 'atheism',
    label: 'Atheism & Naturalism',
    sublabel: '~1.2 billion',
    description: 'Objections from scientific naturalism and secular skepticism — evolution, the problem of evil, evidence for God, and moral grounding. Written for conversations with atheists and skeptics.',
  },
  {
    id: 'mormonism',
    label: 'Mormonism',
    sublabel: '~17 million',
    description: 'Challenges from Latter-day Saint theology — the nature of God, eternal progression, the restoration narrative, and the Book of Mormon. Written for conversations with LDS members.',
  },
  {
    id: 'jehovahs-witnesses',
    label: "Jehovah's Witnesses",
    sublabel: '~8.7 million',
    description: "Challenges from Watch Tower theology — the deity of Christ, the Trinity as alleged pagan invention, and the New World Translation. Written for conversations with Jehovah's Witnesses.",
  },
]

export const religionCount = (id: FieldGuideReligion) => fieldGuide.filter(e => e.religion === id).length

export const TAG_LABELS: Record<FieldGuideTag, string> = {
  scripture: 'Scripture',
  jesus: 'Jesus',
  trinity: 'Trinity',
  salvation: 'Salvation',
  muhammad: 'Muhammad',
  quran: 'Quran',
  history: 'History',
  logic: 'Logic',
}

export const ALL_TAGS = Object.keys(TAG_LABELS) as FieldGuideTag[]

// ── Faultlines ────────────────────────────────────────────

export const SEVERITY_LABEL: Record<number, string> = { 1: 'Minor', 2: 'Moderate', 3: 'Serious', 4: 'Critical', 5: 'Fatal' }

// ── The Dig: four layers of every argument ────────────────

export const LAYERS = [
  { key: 'claim', label: 'Claim', sublabel: 'The proposition' },
  { key: 'logic', label: 'Logic', sublabel: 'The structure' },
  { key: 'counterargument', label: 'Objection', sublabel: 'The challenge' },
  { key: 'response', label: 'Response', sublabel: 'The rebuttal' },
] as const

/** Split prose into paragraphs on blank lines. */
export const paragraphs = (text: string) => text.split('\n\n').map(p => p.trim()).filter(Boolean)
