import { ContactTabs } from '@/components/contacts/ContactTabs'
import { ContactToolbar } from '@/components/contacts/ContactToolbar'
import { ContactTable } from '@/components/contacts/ContactTable'
import { ContactBoard } from '@/components/contacts/ContactBoard'
import { ContactsProvider, useContacts } from '@/contexts/ContactsContext'
import { ContactSheet } from '@/components/contacts/ContactSheet'
import { DeleteContactDialog } from '@/components/contacts/DeleteContactDialog'

function ContactsPageContent() {
  const { viewMode } = useContacts()

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <ContactTabs />
      <ContactToolbar />
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'table' ? <ContactTable /> : <ContactBoard />}
      </div>
      <ContactSheet />
      <DeleteContactDialog />
    </div>
  )
}

export default function ContactsPage() {
  return (
    <ContactsProvider>
      <ContactsPageContent />
    </ContactsProvider>
  )
}
