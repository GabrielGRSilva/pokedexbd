export interface Location {
  id: number
  name: string
  region: Region
  names: Name[]
  game_indices: Index[]
  areas: Area[]
}

export interface Region {
  name: string
  url: string
}

export interface Name {
  name: string
  language: Language
}

export interface Language {
  name: string
  url: string
}

export interface Index {
  game_index: number
  generation: Generation
}

export interface Generation {
  name: string
  url: string
}

export interface Area {
  name: string
  url: string
}
