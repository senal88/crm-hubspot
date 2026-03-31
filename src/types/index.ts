export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  leadStatus: string
  favoriteTopics?: string | null
  preferredChannels?: string | null
  isSample?: boolean
  createdAt?: string
  company?: string
  lastContactDate?: string
  lastActivity?: { type: string; label: string }
  nextActivity?: { type: string; label: string }
}

export type ContactFormData = Omit<
  Contact,
  | 'id'
  | 'createdAt'
  | 'favoriteTopics'
  | 'preferredChannels'
  | 'isSample'
  | 'company'
  | 'lastContactDate'
  | 'lastActivity'
  | 'nextActivity'
>

export type ViewMode = 'table' | 'board'
