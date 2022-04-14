import React from 'react'

import { AuthCredentials } from './types'

export interface AuthenticationContextProps {
  authFetch: (input: RequestInfo, init: object) => Promise<Response>
  authCredentials: AuthCredentials
  authRedirect: () => void
}

const AuthenticationContext = React.createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps
)

export default AuthenticationContext
