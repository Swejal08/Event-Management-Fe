import Table from '@/components/Tables/Table'
import { useState } from 'react'
import UserTableRow from './UserTableRow'
import { IMembershipDetails, UserRole } from '@/types/membership'
import UserDeleteModal from './UserDeleteModal'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useToasts } from '@/hooks/useToasts'
import RBACInline from '@/components/RBAC/RBACInline'
import { IsAdmin } from '@/lib/utils'
import { MY_USER_DETAILS, REMOVE_USER } from '../schema/user'
import { GET_EVENT_MEMBERS_DETAIL } from '../schema/eventMembers'
import { DASHBOARD_URL } from '@/consts/route'

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
  ]

  const router = useRouter()
  const eventId = router.query.pid as string
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

  const { loading, error, data } = useQuery(MY_USER_DETAILS, {
    variables: { eventId },
  })

  if (loading || error) {
    return null
  }

  if (IsAdmin(data.myUserDetail.role)) {
    USER_COLUMNS.push({
      key: 'action',
      label: 'Action',
    })
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const renderActionButtons = (user: IMembershipDetails) => (
    <RBACInline allowedRoles={[UserRole.ADMIN]} eventId={eventId}>
      <button
        onClick={() =>
          router.push(DASHBOARD_URL.USER.REASSIGN(eventId, user.id))
        }
        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
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
    </RBACInline>
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
