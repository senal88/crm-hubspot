import { useContacts } from '@/contexts/ContactsContext'
import { ContactCard } from './ContactCard'
import { cn } from '@/lib/utils'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Contact } from '@/types'

const COLUMNS = [
  { id: 'assinante', label: 'Assinante' },
  { id: 'lead', label: 'Lead' },
  { id: 'marketing-qualified-lead', label: 'Lead qualificado para marketing' },
  { id: 'sales-qualified-lead', label: 'Lead qualificado para venda' },
  { id: 'opportunity', label: 'Oportunidade' },
  { id: 'customer', label: 'Cliente' },
]

export function ContactBoard() {
  const { contacts, updateContact } = useContacts()
  const [collapsedColumns, setCollapsedColumns] = useState<
    Record<string, boolean>
  >({})
  const [draggedContactId, setDraggedContactId] = useState<string | null>(null)
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null)

  // Map contacts to columns based on leadStatus
  const getContactsForColumn = (columnLabel: string) => {
    return contacts.filter((contact) => {
      // Normalize comparison (case insensitive, etc.)
      const status = contact.leadStatus?.toLowerCase()
      const label = columnLabel.toLowerCase()

      if (!status) return label === 'lead' // Default fallback

      if (status === label) return true

      // Handle specific mappings if needed (e.g. 'Novo' -> 'Lead')
      if (label === 'lead' && (status === 'novo' || status === 'em aberto'))
        return true

      return false
    })
  }

  const toggleColumn = (id: string) => {
    setCollapsedColumns((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleDragStart = (e: React.DragEvent, contactId: string) => {
    setDraggedContactId(contactId)
    // Set data for drag operation (required for Firefox)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', contactId)
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault() // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move'
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we are not entering a child element of the same column
    // But since this is tricky with native DnD, we rely on dragOver of other columns
    // or dropping/ending to clear.
    // However, if dragging out of the board, dragEnd will catch it.
  }

  const handleDrop = (e: React.DragEvent, columnLabel: string) => {
    e.preventDefault()
    setDragOverColumnId(null)

    if (draggedContactId) {
      const contact = contacts.find((c) => c.id === draggedContactId)
      // Only update if the status is actually different
      if (contact && contact.leadStatus !== columnLabel) {
        updateContact(draggedContactId, { leadStatus: columnLabel })
      }
      setDraggedContactId(null)
    }
  }

  const handleDragEnd = () => {
    setDraggedContactId(null)
    setDragOverColumnId(null)
  }

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-[#f5f8fa] p-4 h-full">
      <div className="flex h-full gap-4 min-w-max">
        {COLUMNS.map((column) => {
          const columnContacts = getContactsForColumn(column.label)
          const isCollapsed = collapsedColumns[column.id]
          const isDragOver = dragOverColumnId === column.id

          return (
            <div
              key={column.id}
              className={cn(
                'flex flex-col h-full transition-all duration-300 rounded-sm relative',
                isCollapsed ? 'w-12' : 'w-[300px]',
                isDragOver && !isCollapsed
                  ? 'bg-blue-100/50 ring-2 ring-blue-300 ring-inset'
                  : '',
              )}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={(e) => handleDrop(e, column.label)}
            >
              {/* Column Header */}
              <div
                className={cn(
                  'flex items-center justify-between mb-3 bg-[#eaf0f6] rounded-t-sm border-b border-gray-200 px-3 py-2 select-none group',
                  isDragOver && 'bg-blue-100',
                )}
              >
                {!isCollapsed && (
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-bold text-sm text-gray-700 truncate">
                      {column.label}
                    </span>
                    <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-medium text-gray-600 px-1">
                      {columnContacts.length}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => toggleColumn(column.id)}
                  className={cn(
                    'text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-sm hover:bg-gray-200',
                    isCollapsed && 'mx-auto rotate-180',
                  )}
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Column Content */}
              {!isCollapsed && (
                <div className="flex-1 overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div className="flex flex-col gap-3 min-h-full">
                    {columnContacts.map((contact) => (
                      <div
                        key={contact.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, contact.id)}
                        onDragEnd={handleDragEnd}
                        className={cn(
                          'cursor-grab active:cursor-grabbing transition-all duration-200',
                          draggedContactId === contact.id
                            ? 'opacity-40 rotate-2 scale-[1.02] shadow-xl grayscale-[0.5]'
                            : 'hover:-translate-y-0.5',
                        )}
                      >
                        <div
                          className={cn(
                            'pointer-events-none', // Prevent interactions within the card while dragging wrapper handles it
                            draggedContactId !== contact.id &&
                              'pointer-events-auto',
                          )}
                        >
                          <ContactCard contact={contact} />
                        </div>
                      </div>
                    ))}
                    {columnContacts.length === 0 && (
                      <div className="h-24 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs bg-white/50">
                        Arraste contatos aqui
                      </div>
                    )}
                    {/* Invisible drop zone extender to fill height */}
                    <div className="flex-1 min-h-[50px]" />
                  </div>
                </div>
              )}

              {/* Collapsed State Visual */}
              {isCollapsed && (
                <div className="flex-1 bg-gray-100/50 rounded-b-sm border border-t-0 border-gray-200 flex flex-col items-center py-4 gap-2">
                  <span className="text-xs font-medium text-gray-500 writing-mode-vertical rotate-180 whitespace-nowrap">
                    {column.label} ({columnContacts.length})
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
