import React, { Component } from 'react'

import AuthenticationConsumer from './AuthenticationConsumer'
import AuthenticationProvider from './AuthenticationProvider'
import { AuthenticationContextProps } from './AuthenticationContext'

export interface AuthenticatedAppProps {
  loginPath: string
  whoamiPath: string
  renderer: (props: AuthenticationContextProps) => JSX.Element
}

const AuthenticatedApp = ({
  loginPath,
  whoamiPath,
  renderer
}: AuthenticatedAppProps) => (
  <AuthenticationProvider loginPath={loginPath} whoamiPath={whoamiPath}>
    <AuthenticationConsumer>{renderer}</AuthenticationConsumer>
  </AuthenticationProvider>
)

export default AuthenticatedApp
