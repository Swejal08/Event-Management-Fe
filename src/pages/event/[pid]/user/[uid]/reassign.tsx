import ReassignUser from '@/features/user/pages/reassign'
import { UserRole } from '@/types/membership'
import { ReactNode } from 'react'

const ReassignPage = () => {
  return <ReassignUser />
}

ReassignPage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

ReassignPage.allowedRoles = [UserRole.ADMIN, UserRole.CONTRIBUTOR]

export default ReassignPage
