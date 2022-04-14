import React from 'react'

import AuthenticationContext from './AuthenticationContext'
import { AuthenticationContextProps } from './AuthenticationContext'

export interface AuthenticationConsumerProps {
  children: (props: AuthenticationContextProps) => JSX.Element
}

const AuthenticationConsumer = ({ children }: AuthenticationConsumerProps) => (
  <AuthenticationContext.Consumer>
    {authenticator => children(authenticator)}
  </AuthenticationContext.Consumer>
)

export default AuthenticationConsumer
