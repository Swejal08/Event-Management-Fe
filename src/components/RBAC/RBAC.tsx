import { MY_USER_DETAILS } from '@/features/user/schema/user'
import NotAuthorized from '@/pages/NotAuthorized'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactElement } from 'react'

interface IProps {
  allowedRoles?: string[]
}

const RBAC = ({ children, allowedRoles }: PropsWithChildren<IProps>) => {
  const router = useRouter()
  const eventId = router.query.pid as string

  const { loading, data } = useQuery(MY_USER_DETAILS, {
    variables: { eventId },
  })

  if (loading) {
    return null
  }

  if (allowedRoles?.length && !allowedRoles.includes(data.myUserDetail.role)) {
    return <NotAuthorized />
  }

  return children as ReactElement
}

export default RBAC
