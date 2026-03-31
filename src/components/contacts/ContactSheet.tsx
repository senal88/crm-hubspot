import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ContactForm } from './ContactForm'
import { useContacts } from '@/contexts/ContactsContext'

export function ContactSheet() {
  const {
    isSheetOpen,
    setSheetOpen,
    editingContact,
    addContact,
    updateContact,
    setEditingContact,
  } = useContacts()

  const handleOpenChange = (open: boolean) => {
    setSheetOpen(open)
    if (!open) {
      setEditingContact(null)
    }
  }

  const handleSubmit = (data: any) => {
    if (editingContact) {
      updateContact(editingContact.id, data)
    } else {
      addContact(data)
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {editingContact ? 'Editar contato' : 'Criar contato'}
          </SheetTitle>
          <SheetDescription>
            {editingContact
              ? 'Faça alterações nas informações do contato abaixo.'
              : 'Preencha as informações abaixo para adicionar um novo contato.'}
          </SheetDescription>
        </SheetHeader>
        <ContactForm
          defaultValues={editingContact}
          onSubmit={handleSubmit}
          onCancel={() => handleOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
