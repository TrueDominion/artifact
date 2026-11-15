/**
 * src/types/index.ts
 * Shared TypeScript interfaces for artiFACT.
 * All data shapes correspond to JSON files in /data/.
 */

// ── Bedrock ───────────────────────────────────────────────

export interface BedrockEntry {
  id: string
  title: string
  summary: string
  scripture: string
  scripture_text: string
  confession: string
  doctrine: string
  islamic_contrast: string
  /** The Islamic doctrine this foundation stands against. */
  counterpart: { term: string; gloss: string }
}

// ── Arguments (The Dig) ───────────────────────────────────

export interface ArgumentSource {
  author: string
  title: string
  year?: number
}

export interface Argument {
  id: string
  title: string
  category: string
  summary: string
  artifact_svg_key: string
  claim: string
  logic: string
  counterargument: string
  response: string
  sources: ArgumentSource[]
  /** 'common': Muslims largely agree; 'contested': the evidence divides the two faiths. */
  ground: 'common' | 'contested'
  /** How the argument works in a conversation with a Muslim. */
  islam_note: string
}

// ── Worldviews (The Gallery) ──────────────────────────────

export interface Worldview {
  id: string
  name: string
  tradition: string
  founded: string
  adherents: string
  adherents_count: number | null
  adherents_unit: string
  symbol_svg_key: string
  tagline: string
  overview: string
  core_claims: string[]
  key_texts: string[]
  christian_critique: string
  articles?: NamedText[]
  pillars?: NamedText[]
  sources?: NamedText[]
  branches?: NamedText[]
  schools?: NamedText[]
  why_it_matters?: string
}

export interface NamedText {
  name: string
  text: string
}

// ── Debates (Faultlines) ──────────────────────────────────

export type Difficulty = 'foundational' | 'intermediate' | 'advanced'

export type Strength = 'settled' | 'strong' | 'debated'

export interface Debate {
  id: string
  title: string
  category: string
  difficulty: Difficulty
  /** How firm the evidence behind the challenge is. */
  strength: Strength
  /** The Christian answer to the strongest Muslim reply (which is held in `challenge`). */
  rejoinder: string
  summary: string
  challenge: string
  response: string
  key_thinkers: string[]
  sources: string[]
}

// ── Field Guide ───────────────────────────────────────────

export type FieldGuideTag =
  | 'scripture'
  | 'jesus'
  | 'trinity'
  | 'salvation'
  | 'muhammad'
  | 'quran'
  | 'history'
  | 'logic'

export type FieldGuideReligion = 'islam'

export interface FieldGuideEntry {
  id: string
  challenge: string
  one_liner: string
  points: string[]
  anchor_verse?: string
  anchor_verse_ref?: string
  tag: FieldGuideTag
  religion: FieldGuideReligion
  priority?: number
}

// ── Thinkers (The Collection) ────────────────────────────

export interface Thinker {
  id: string
  name: string
  dates: string
  portrait_svg_key: string
  tradition: string
  summary: string
  key_works: string[]
  contribution: string
}

// ── The Strata (Historical Record) ───────────────────────

export interface StrataFigure {
  name: string
  role: string
}

export interface StrataPower {
  name: string
  description: string
}

export interface StrataFlashpoint {
  title: string
  description: string
}

export interface StrataEra {
  id: string
  number: number
  name: string
  dates: string
  summary: string
  key_figures: StrataFigure[]
  dominant_powers: StrataPower[]
  religious_flashpoint: StrataFlashpoint
  defining_moment: string
}

export interface StrataEmpire {
  id: string
  name: string
  dates: string
  impact: string
  gods: string
  era_peak: string
}

export interface StrataGod {
  id: string
  name: string
  origin: string
  represents: string
  confrontation: string
}

export interface StrataTribeEntry {
  name: string
  note: string
}

export interface JudaeaTier {
  id: string
  level: number
  name: string
  subtitle: string
  description: string
  figures: string[]
}

export interface JudaeaSurprise {
  title: string
  description: string
}

export interface ConversationEntry {
  year: string
  name: string
  place: string
  title: string
  text: string
  lesson: string
}

export interface StrataData {
  eras: StrataEra[]
  conversation: ConversationEntry[]
  empires: StrataEmpire[]
  gods: StrataGod[]
  tribes: {
    north: StrataTribeEntry[]
    south: StrataTribeEntry[]
    priestly: StrataTribeEntry[]
  }
  judaea: {
    tiers: JudaeaTier[]
    surprises: JudaeaSurprise[]
  }
}

// ── UI Utility Types ──────────────────────────────────────

export interface NavItem {
  label: string
  path: string
}

export interface SectionPreviewData {
  label: string
  path: string
  description: string
  icon: string
}

// ── Two Portraits ─────────────────────────────────────────

export interface PortraitSide {
  text: string
  refs: string
}

export interface Portrait {
  id: string
  topic: string
  verdict: 'shared' | 'partly' | 'divergent'
  gospels: PortraitSide
  quran: PortraitSide
  note: string
}

// ── Field Guide: questions to ask back ────────────────────

export interface AskBack {
  id: string
  question: string
  why: string
}
