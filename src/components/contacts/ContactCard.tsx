import { Contact } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Star, Mail, History, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactCardProps {
  contact: Contact
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <Card className="shadow-sm border-gray-200 bg-white hover:shadow-md transition-shadow duration-200 group">
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div>
          <h3 className="text-sm font-bold text-[#0091ae] hover:underline cursor-pointer flex items-center gap-1">
            {contact.name}
          </h3>
          {contact.lastContactDate && (
            <p className="text-xs text-gray-500 mt-1">
              Último contato: {contact.lastContactDate}
            </p>
          )}
        </div>

        {/* Company / Brand */}
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-hubspot-orange/10 flex items-center justify-center">
            <span className="text-[8px] text-hubspot-orange font-bold">Δ</span>
          </div>
          <span className="text-xs text-gray-600 hover:text-[#0091ae] cursor-pointer hover:underline">
            {contact.company || 'ADAPTΔCRM'}
          </span>
        </div>

        {/* Activities */}
        {(contact.lastActivity || contact.nextActivity) && (
          <div className="flex flex-col gap-1 mt-1">
            {contact.lastActivity && (
              <div className="text-xs text-gray-700">
                <span className="text-[#0091ae] hover:underline cursor-pointer">
                  {contact.lastActivity.label.split(' ').slice(0, 1)}
                </span>{' '}
                {contact.lastActivity.label.split(' ').slice(1).join(' ')}
              </div>
            )}
            {contact.nextActivity && (
              <div className="text-xs text-gray-700">
                <span className="text-[#0091ae] hover:underline cursor-pointer">
                  {contact.nextActivity.label.split(' ').slice(0, 1)}
                </span>{' '}
                {contact.nextActivity.label.split(' ').slice(1).join(' ')}
              </div>
            )}
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-transparent group-hover:border-gray-100 transition-colors">
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-sm hover:bg-gray-100">
            <FileText className="h-3.5 w-3.5" />
          </button>
          <button className="text-gray-400 hover:text-yellow-400 p-1 rounded-sm hover:bg-gray-100">
            <Star className="h-3.5 w-3.5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-sm hover:bg-gray-100">
            <Mail className="h-3.5 w-3.5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-sm hover:bg-gray-100">
            <History className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
