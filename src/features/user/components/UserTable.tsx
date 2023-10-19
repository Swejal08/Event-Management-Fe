import Table from '@/components/Tables/Table'
import { useState } from 'react'
import UserTableRow from './UserTableRow'
import { IMembershipDetails } from '@/types/membership'
import UserDeleteModal from './UserDeleteModal'
import { useMutation } from '@apollo/client'
import { REMOVE_USER } from '@/graphql/user'
import { useRouter } from 'next/router'
import { useToasts } from '@/hooks/useToasts'
import { GET_EVENT_MEMBERS_DETAIL } from '@/graphql/eventMembers'

interface IProps {
  users: IMembershipDetails[]
}

const UserTable: React.FC<IProps> = ({ users }) => {
  const USER_COLUMNS = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'Role',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'action',
      label: 'Action',
    },
  ]

  const router = useRouter()
  const eventId = router.query.pid
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeUserId, setActiveUserId] = useState<string | null>(null)
  const [removeUser] = useMutation(REMOVE_USER, {
    refetchQueries: [
      {
        query: GET_EVENT_MEMBERS_DETAIL,
        variables: { eventId },
      },
    ],
  })
  const { showSuccessMessage, showErrorMessage } = useToasts()

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const renderActionButtons = (user: IMembershipDetails) => (
    <>
      <button className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
        Edit
      </button>
      <button
        onClick={() => {
          setActiveUserId(user.user.id)
          setDeleteModalOpen(true)
        }}
        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Remove
      </button>
    </>
  )

  const handleMemberDismissal = async (id: string | null) => {
    if (!id) {
      return
    }

    try {
      const { data } = await removeUser({
        variables: { input: { eventId, userId: id } },
      })

      if (data) {
        showSuccessMessage('User removed')
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
        rows={users.map(user => (
          <UserTableRow key={user.id} user={user}>
            {renderActionButtons(user)}
          </UserTableRow>
        ))}
      />
      <UserDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        userId={activeUserId}
        onDelete={handleMemberDismissal}
      />
    </>
  )
}

export default UserTable
