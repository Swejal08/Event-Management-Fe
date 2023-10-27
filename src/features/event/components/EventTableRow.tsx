import { IEvent } from '@/types/event'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface IProps {
  event: IEvent
  children: ReactNode
}

const EventTableRow: React.FC<IProps> = ({ event, children }) => {
  const router = useRouter()
  return (
    <tr
      className="cursor-pointer"
      onClick={() => router.push(`event/${event.id}`)}
    >
      <td className="px-6 py-4 whitespace-normal break-all">{event.name}</td>
      <td className="px-6 py-4 whitespace-normal break-all">
        {event.description}
      </td>
      <td className="px-6 py-4 whitespace-normal break-all">
        {event.location}
      </td>

      <td>{children}</td>
    </tr>
  )
}

export default EventTableRow
