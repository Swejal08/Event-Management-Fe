import InviteUser from '@/features/user/pages/invite'
import { UserRole } from '@/types/membership'
import { ReactNode } from 'react'

const InvitePage = () => {
  return <InviteUser />
}

InvitePage.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>
}

InvitePage.allowedRoles = [UserRole.ADMIN, UserRole.CONTRIBUTOR]

export default InvitePage
