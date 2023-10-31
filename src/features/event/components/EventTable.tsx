import Table from '@/components/Tables/Table'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useToasts } from '@/hooks/useToasts'
import { IEvent } from '@/types/event'
import EventTableRow from './EventTableRow'
import EventDeleteModal from './EventDeleteModal'
import { GET_EVENTS_QUERY, REMOVE_EVENT } from '@/graphql/event'
import { useRouter } from 'next/router'
import RBACInline from '@/components/RBAC/RBACInline'
import { UserRole } from '@/types/membership'
import { DASHBOARD_URL } from '@/consts/route'

interface IProps {
  events: IEvent[]
}

const EventTable: React.FC<IProps> = ({ events }) => {
  const USER_COLUMNS = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'action',
      label: 'Action',
    },
  ]

  const router = useRouter()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)

  const { showSuccessMessage, showErrorMessage } = useToasts()

  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: [
      {
        query: GET_EVENTS_QUERY,
      },
    ],
  })

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const renderActionButtons = (event: IEvent) => (
    <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={event.id}>
      <button
        onClick={() => router.push(DASHBOARD_URL.EVENT.EDIT(event.id))}
        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Edit
      </button>
      <button
        onClick={() => {
          setActiveEventId(event.id)
          setDeleteModalOpen(true)
        }}
        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Remove
      </button>
    </RBACInline>
  )

  const handleEventDeletion = async (id: string | null) => {
    if (!id) {
      return
    }

    try {
      const { data } = await removeEvent({
        variables: { input: { id } },
      })
      if (data) {
        showSuccessMessage('Event removed')
      }
    } catch (err: any) {
      showErrorMessage(
        err.response?.data ? err.response.data.error : err.message,
      )
    }
  }

  return (
    <>
      <Table
        columns={USER_COLUMNS}
        rows={events.map(event => (
          <EventTableRow key={event.id} event={event}>
            {renderActionButtons(event)}
          </EventTableRow>
        ))}
      />
      <EventDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        eventId={activeEventId}
        onDelete={handleEventDeletion}
      />
    </>
  )
}

export default EventTable
