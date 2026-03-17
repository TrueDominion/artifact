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
}

// ── Debates (Faultlines) ──────────────────────────────────

export type Difficulty = 'foundational' | 'intermediate' | 'advanced'

export interface Debate {
  id: string
  title: string
  category: string
  difficulty: Difficulty
  severity: number
  summary: string
  challenge: string
  response: string
  key_thinkers: string[]
  sources: string[]
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
