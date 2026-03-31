import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  MoreVertical,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  Edit,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useContacts } from '@/contexts/ContactsContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const COLUMNS = [
  { id: 'name', label: 'Nome', width: 'min-w-[250px]' },
  { id: 'email', label: 'E-mail', width: 'min-w-[200px]' },
  { id: 'phone', label: 'Número de telefone', width: 'min-w-[150px]' },
  { id: 'status', label: 'Status do lead', width: 'min-w-[150px]' },
  {
    id: 'topics',
    label: 'Tópicos de conteúdo favoritos',
    width: 'min-w-[200px]',
  },
  { id: 'channels', label: 'Canais preferidos', width: 'min-w-[150px]' },
]

export function ContactTable() {
  const { contacts, setEditingContact, setSheetOpen, setDeleteId } =
    useContacts()

  const handleEdit = (contact: any) => {
    setEditingContact(contact)
    setSheetOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white relative">
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <Table className="border-collapse w-full min-w-max">
          <TableHeader className="bg-[#f5f8fa] sticky top-0 z-10 shadow-sm">
            <TableRow className="hover:bg-[#f5f8fa] border-b border-gray-300">
              <TableHead className="w-[50px] text-center border-r border-gray-200 h-10 p-0">
                <div className="flex items-center justify-center h-full w-full">
                  <Checkbox className="border-gray-400 data-[state=checked]:bg-hubspot-orange data-[state=checked]:border-hubspot-orange rounded-[3px]" />
                </div>
              </TableHead>
              {COLUMNS.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    'h-10 border-r border-gray-200 px-4 text-xs font-bold text-gray-700 select-none group',
                    col.width,
                  )}
                >
                  <div className="flex items-center justify-between h-full w-full gap-2">
                    <span className="truncate">{col.label}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronsUpDown className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-sm border border-gray-300 bg-white hover:bg-gray-100"
                      >
                        <MoreVertical className="h-3 w-3 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[50px] h-10 p-0 sticky right-0 bg-[#f5f8fa] border-l border-gray-200 z-20 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className="hover:bg-gray-50 border-b border-gray-200 group"
              >
                <TableCell className="p-0 text-center border-r border-gray-100 group-hover:border-gray-200">
                  <div className="flex items-center justify-center h-12">
                    <Checkbox className="border-gray-300 data-[state=checked]:bg-hubspot-orange data-[state=checked]:border-hubspot-orange rounded-[3px]" />
                  </div>
                </TableCell>

                {/* Name Column */}
                <TableCell className="p-3 border-r border-gray-100 group-hover:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      {/* Placeholder logic for avatar if name exists, otherwise icon */}
                      {contact.name ? (
                        <div className="text-[10px] font-bold text-gray-600">
                          {contact.name.substring(0, 2).toUpperCase()}
                        </div>
                      ) : (
                        <img
                          src="https://img.usecurling.com/i?q=user&shape=circle&color=gray"
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-sm font-semibold text-[#0091ae] hover:text-[#007a86] hover:underline truncate text-left"
                    >
                      {contact.name}
                    </button>
                  </div>
                </TableCell>

                {/* Email Column */}
                <TableCell className="p-3 border-r border-gray-100 group-hover:border-gray-200">
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-semibold text-[#0091ae] hover:text-[#007a86] hover:underline truncate"
                    >
                      {contact.email}
                    </a>
                    {contact.isSample && (
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                </TableCell>

                {/* Other Columns */}
                <TableCell className="p-3 border-r border-gray-100 group-hover:border-gray-200 text-sm text-gray-500">
                  {contact.phone || '--'}
                </TableCell>
                <TableCell className="p-3 border-r border-gray-100 group-hover:border-gray-200 text-sm text-gray-500">
                  {contact.leadStatus || '--'}
                </TableCell>
                <TableCell className="p-3 border-r border-gray-100 group-hover:border-gray-200 text-sm text-gray-500">
                  {contact.favoriteTopics || '--'}
                </TableCell>
                <TableCell className="p-3 border-r border-gray-100 group-hover:border-gray-200 text-sm text-gray-500">
                  {contact.preferredChannels || '--'}
                </TableCell>

                {/* Actions Column */}
                <TableCell className="p-0 border-l border-gray-100 group-hover:border-gray-200 sticky right-0 bg-white group-hover:bg-gray-50 z-10 text-center w-[50px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={() => handleEdit(contact)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {/* Fill empty rows for visual structure */}
            {Array.from({ length: Math.max(0, 10 - contacts.length) }).map(
              (_, i) => (
                <TableRow
                  key={`empty-${i}`}
                  className="hover:bg-gray-50 border-b border-gray-200 h-12"
                >
                  <TableCell className="border-r border-gray-100" />
                  {COLUMNS.map((col) => (
                    <TableCell
                      key={col.id}
                      className="border-r border-gray-100"
                    />
                  ))}
                  <TableCell className="border-l border-gray-100 sticky right-0 bg-white z-10" />
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Pagination */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 py-3 px-4 flex items-center justify-center gap-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            disabled
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 px-2 font-semibold text-xs"
          >
            <ChevronLeft className="mr-1 h-3 w-3" />
            Voltar
          </Button>
          <div className="h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-[#e5f5f9] text-[#0091ae] font-bold text-sm shadow-sm">
            1
          </div>
          <Button
            variant="ghost"
            disabled
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 px-2 font-semibold text-xs"
          >
            Próximo
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            25 por página
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  )
}
