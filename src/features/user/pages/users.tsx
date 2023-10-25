import { useQuery } from '@apollo/client'
import { GET_EVENT_MEMBERS_DETAIL } from '../schema/eventMembers'
import { useRouter } from 'next/router'
import UserTable from '../components/UserTable'

const Users = () => {
  const router = useRouter()
  const eventId = router.query.pid

  const { loading: loadingEventMembers, data: dataEventMembers } = useQuery(
    GET_EVENT_MEMBERS_DETAIL,
    {
      variables: {
        eventId,
      },
    },
  )

  return (
    <>
      {!loadingEventMembers && (
        <UserTable users={dataEventMembers.eventMembers} />
      )}
    </>
  )
}

export default Users
