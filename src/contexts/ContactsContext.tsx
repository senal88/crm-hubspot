import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Contact, ContactFormData, ViewMode } from '@/types'
import { useToast } from '@/hooks/use-toast'

interface ContactsContextType {
  contacts: Contact[]
  addContact: (data: ContactFormData) => void
  updateContact: (id: string, data: Partial<ContactFormData>) => void
  deleteContact: (id: string) => void
  isSheetOpen: boolean
  setSheetOpen: (open: boolean) => void
  editingContact: Contact | null
  setEditingContact: (contact: Contact | null) => void
  deleteId: string | null
  setDeleteId: (id: string | null) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined,
)

const INITIAL_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Brian Halligan (Sample Contact)',
    email: 'bh@adaptacrm.com',
    phone: '',
    leadStatus: 'Lead',
    favoriteTopics: null,
    preferredChannels: null,
    isSample: true,
    company: 'ADAPTΔCRM',
    lastContactDate: '22/01/2026',
    lastActivity: { type: 'call', label: 'Chamada há 5 horas' },
    nextActivity: { type: 'meeting', label: 'Reunião em 3 dias' },
  },
  {
    id: '2',
    name: 'Maria Johnson (Sample Contact)',
    email: 'emailmaria@adaptacrm.com',
    phone: '',
    leadStatus: 'Lead',
    favoriteTopics: null,
    preferredChannels: null,
    isSample: true,
    company: 'ADAPTΔCRM',
    lastContactDate: '22/01/2026',
    lastActivity: { type: 'task', label: 'Tarefa há 3 horas' },
  },
]

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const { toast } = useToast()

  const addContact = (data: ContactFormData) => {
    const newContact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      leadStatus: data.leadStatus || 'Lead',
      company: 'ADAPTΔCRM',
    }
    setContacts((prev) => [newContact, ...prev])
    toast({
      title: 'Contato criado',
      description: `O contato ${data.name} foi criado com sucesso.`,
    })
    setSheetOpen(false)
  }

  const updateContact = (id: string, data: Partial<ContactFormData>) => {
    const currentContact = contacts.find((c) => c.id === id)
    if (!currentContact) return

    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...data } : contact,
      ),
    )

    if (data.leadStatus && data.leadStatus !== currentContact.leadStatus) {
      toast({
        title: 'Status atualizado',
        description: `O status de ${currentContact.name} foi atualizado para ${data.leadStatus}.`,
      })
    } else {
      toast({
        title: 'Contato atualizado',
        description: `O contato ${data.name || currentContact.name} foi atualizado com sucesso.`,
      })
    }

    setSheetOpen(false)
    setEditingContact(null)
  }

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
    toast({
      title: 'Contato excluído',
      description: 'O contato foi removido com sucesso.',
    })
    setDeleteId(null)
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        isSheetOpen,
        setSheetOpen,
        editingContact,
        setEditingContact,
        deleteId,
        setDeleteId,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
  const context = useContext(ContactsContext)
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider')
  }
  return context
}
