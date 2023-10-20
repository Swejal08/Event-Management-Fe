import client from '@/services/graphqlClient'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import type { AppPropsWithLayout } from '../../next-layout'
import { useRouter } from 'next/router'
import RBAC from '@/components/RBAC/RBAC'
import React from 'react'

const Noop: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <>{children}</>
)

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page)
  const RBACGuard = router.query.pid ? RBAC : Noop

  return (
    <ApolloProvider client={client}>
      <RBACGuard allowedRoles={Component.allowedRoles ?? []}>
        {getLayout(<Component {...pageProps} />)}
      </RBACGuard>
      <Toaster position="top-right" />
    </ApolloProvider>
  )
}
