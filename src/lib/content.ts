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
import portraitsData from '@/data/portraits.json'
import questionsData from '@/data/questions.json'
import type {
  Argument, AskBack, BedrockEntry, Debate, FieldGuideEntry, FieldGuideReligion, FieldGuideTag, Portrait, StrataData, Strength, Worldview,
} from '@/types'

export const bedrock = bedrockData as unknown as BedrockEntry[]
export const args = argumentsData as unknown as Argument[]
export const worldviews = worldviewsData as unknown as Worldview[]
export const debates = debatesData as unknown as Debate[]
export const fieldGuide = fieldGuideData as unknown as FieldGuideEntry[]
export const strata = strataData as unknown as StrataData
export const portraits = portraitsData as unknown as Portrait[]
export const askBack = questionsData as unknown as AskBack[]

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
    description: 'The objections Muslims most often raise, each with a one-line answer you can give in the moment, the evidence behind it, and an anchor verse.',
    count: `${fieldGuide.length} challenges`,
  },
  {
    path: '/two-portraits',
    name: 'Two Portraits',
    kicker: 'Jesus',
    question: 'Is the Jesus of the Quran the Jesus of the Gospels?',
    description: `Jesus in the Gospels and in the Quran, side by side across ${word(portraits.length)} topics: where the two portraits agree, and where they cannot both be true.`,
    count: `${portraits.length} topics`,
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
    question: 'What evidence settles the disagreement?',
    description: `${Word(args.length)} lines of evidence for the conversation with Muslims, from common ground about God to the history that divides: each examined through claim, logic, strongest objection, and response.`,
    count: `${args.length} arguments`,
  },
  {
    path: '/the-gallery',
    name: 'Gallery',
    kicker: 'Islam',
    question: 'What does Islam actually teach?',
    description: 'Islam presented fairly on its own terms: what Muslims believe, the texts it rests on, and where the Christian account differs.',
    count: `${worldviews[0]?.core_claims.length ?? 0} core claims`,
  },
  {
    path: '/the-strata',
    name: 'Strata',
    kicker: 'History',
    question: 'What world was Scripture written into?',
    description: `${Word(strata.eras.length)} eras from Abraham to the rise of Islam, ${word(strata.empires.length)} empires, the gods Israel kept chasing, and the long conversation between Christians and Muslims.`,
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
    description: "Challenges from Islamic theology: the Quran, Muhammad's credentials, the Trinity, tahrif, and the nature of God. Written for real conversations with Muslims.",
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

/** How firm the evidence is: settled facts, a strong case, or a matter scholars still debate. */
export const STRENGTH: Record<Strength, { label: string; level: number; text: string }> = {
  settled: { label: 'Settled', level: 3, text: 'The facts are not in dispute; the argument is about what they mean.' },
  strong: { label: 'Strong', level: 2, text: 'A strong case, with a serious Muslim reply that it answers.' },
  debated: { label: 'Debated', level: 1, text: 'The evidence is contested; present it with care.' },
}

// ── The Dig: four layers of every argument ────────────────

export const LAYERS = [
  { key: 'claim', label: 'Claim', sublabel: 'The proposition' },
  { key: 'logic', label: 'Logic', sublabel: 'The structure' },
  { key: 'counterargument', label: 'Objection', sublabel: 'The challenge' },
  { key: 'response', label: 'Response', sublabel: 'The rebuttal' },
] as const

/** Split prose into paragraphs on blank lines. */
export const paragraphs = (text: string) => text.split('\n\n').map(p => p.trim()).filter(Boolean)
