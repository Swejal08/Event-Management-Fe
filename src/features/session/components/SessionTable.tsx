import Table from '@/components/Tables/Table'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useToasts } from '@/hooks/useToasts'
import { ISession } from '@/types/session'
import SessionTableRow from './SessionTableRow'
import SessionDeleteModal from './SessionDeleteModal'
import { REMOVE_EVENT_SESSION } from '@/graphql/session'
import { GET_EVENT_DETAILS } from '@/graphql/event'
import { IsAttendee } from '@/lib/utils'
import { MY_USER_DETAILS } from '@/features/user/schema/user'

interface IProps {
  sessions: ISession[]
}

const UserTable: React.FC<IProps> = ({ sessions }) => {
  const SESSION_COLUMNS = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'startDate',
      label: 'Start Date',
    },
    {
      key: 'endDate',
      label: 'End Date',
    },
    { key: 'action', label: 'Action' },
  ]

  const router = useRouter()
  const eventId = router.query.pid
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [removeSession] = useMutation(REMOVE_EVENT_SESSION, {
    refetchQueries: [
      {
        query: GET_EVENT_DETAILS,
        variables: { eventId },
      },
    ],
  })
  const { showSuccessMessage, showErrorMessage } = useToasts()

  const { loading, error, data } = useQuery(MY_USER_DETAILS, {
    variables: { eventId },
  })

  if (loading || error) {
    return null
  }

  if (!IsAttendee(data.myUserDetail.role)) {
    SESSION_COLUMNS.push({
      key: 'action',
      label: 'Action',
    })
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const renderActionButtons = (session: ISession) => (
    <>
      <button
        onClick={() =>
          router.push(`/event/${eventId}/session/${session.id}/edit`)
        }
        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Edit
      </button>
      <button
        onClick={() => {
          setActiveSessionId(session.id)
          setDeleteModalOpen(true)
        }}
        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Remove
      </button>
    </>
  )

  const handleSessionRemoval = async (id: string | null) => {
    if (!id) {
      return
    }

    try {
      const { data } = await removeSession({
        variables: { input: { id, eventId } },
      })

      if (data) {
        showSuccessMessage('Session removed')
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
        columns={SESSION_COLUMNS}
        rows={sessions.map(session => (
          <SessionTableRow key={session.id} session={session}>
            {renderActionButtons(session)}
          </SessionTableRow>
        ))}
      />
      <SessionDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        sessionId={activeSessionId}
        onDelete={handleSessionRemoval}
      />
    </>
  )
}

export default UserTable
