export type NextPageWithLayout = NextPage & {
  getLayout: (page: React.ReactNode) => void
  allowedRoles?: string[]
}

export type NextComponentWithLayout = NextComponentType & {
  getLayout: (page: React.ReactNode) => React.ReactNode
  allowedRoles?: string[]
}

export type AppPropsWithLayout = AppProps & {
  Component: NextComponentWithLayout
}
