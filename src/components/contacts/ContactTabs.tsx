import { X, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useContacts } from '@/contexts/ContactsContext'

const TABS = [
  {
    id: 'my-contacts',
    label: 'Meus contatos',
    count: 2,
    active: true,
    closable: true,
  },
  {
    id: 'subscribers',
    label: 'Assinantes do informativo',
    active: false,
    closable: false,
  },
  {
    id: 'cancelled',
    label: 'Assinatura cancelada',
    active: false,
    closable: false,
  },
  { id: 'all', label: 'Todos os clientes', active: false, closable: false },
]

export function ContactTabs() {
  const { setSheetOpen, contacts } = useContacts()

  // Update the count for "Meus contatos" dynamically
  const tabsWithCount = TABS.map((tab) =>
    tab.id === 'my-contacts' ? { ...tab, count: contacts.length } : tab,
  )

  return (
    <div className="flex items-end justify-between border-b border-gray-300 bg-gray-100/50 pt-2 px-4 shrink-0">
      <div className="flex items-end overflow-x-auto no-scrollbar">
        {tabsWithCount.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'group relative flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer transition-colors border-t border-x rounded-t-sm -mb-px select-none whitespace-nowrap min-w-fit',
              tab.active
                ? 'bg-white border-gray-300 text-gray-900 z-10'
                : 'bg-transparent border-transparent text-gray-600 hover:bg-gray-200/50 hover:text-gray-900',
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs',
                  tab.active
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-300 text-gray-700',
                )}
              >
                {tab.count}
              </span>
            )}
            {tab.active && (
              <button className="ml-1 rounded-sm p-0.5 hover:bg-gray-200 text-gray-500">
                <X className="h-3 w-3" />
              </button>
            )}
            {!tab.active && tab.closable && (
              <button className="ml-1 rounded-sm p-0.5 hover:bg-gray-300 text-gray-500 opacity-0 group-hover:opacity-100">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-1 rounded-full hover:bg-gray-200"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <div className="flex items-center gap-2 pb-2 pl-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-gray-300 bg-white hover:bg-gray-50"
        >
          <MoreHorizontal className="h-4 w-4 text-gray-600" />
        </Button>
        <Button
          id="tour-add-contact"
          onClick={() => setSheetOpen(true)}
          className="h-8 bg-hubspot-orange hover:bg-hubspot-orange-hover text-white border-none font-semibold px-4 rounded-sm shadow-sm text-sm"
        >
          Adicionar contatos
        </Button>
      </div>
    </div>
  )
}
