import UserHeadingButtons from '@/features/user/components/UserHeadingButtons'
import Users from '@/features/user/pages/users'
import EventLayout from '@/layouts/eventLayout'
import { ReactNode } from 'react'

const UsersPage = () => {
  return <Users />
}

UsersPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <EventLayout
      header="Users"
      activeSideBar="members"
      actionItems={<UserHeadingButtons />}
    >
      {page}
    </EventLayout>
  )
}

export default UsersPage
