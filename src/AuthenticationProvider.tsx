import React from 'react'

import AuthenticationContext from './AuthenticationContext'
import { AuthCredentials } from './types'

export interface AuthenticationProviderProps {
  loginPath: string
  whoamiPath: string
  children: React.ReactNode
}

interface AuthenticationProviderState {
  authCredentials: AuthCredentials
}

class AuthenticationProvider extends React.Component<
  AuthenticationProviderProps,
  AuthenticationProviderState
> {
  abortController: AbortController

  constructor(
    props: AuthenticationProviderProps | Readonly<AuthenticationProviderProps>
  ) {
    super(props)

    this.state = {
      authCredentials: {
        sub: '',
        iss: '',
        exp: '',
        iat: '',
        authorizations: []
      }
    }
    this.abortController = new AbortController()
    this.fetch = this.fetch.bind(this)
  }

  requestAuthentication = () => {
    const { loginPath } = this.props
    const { protocol, host, href } = window.location
    const url = `${protocol}//${host}${loginPath}?redirect=${href}`
    window.location.replace(url)
  }

  fetch(input: RequestInfo, init = {}) {
    return fetch(input, {
      ...init,
      redirect: 'manual',
      signal: this.abortController.signal
    }).then(response => {
      if (response.status === 401 || response.type === 'opaqueredirect') {
        this.requestAuthentication()
      }
      return response
    })
  }

  componentDidMount() {
    this.fetch(`${window.location.origin}${this.props.whoamiPath}`)
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json()
          default:
            throw Error('request failed')
        }
      })
      .then(authCredentials => {
        this.setState({ authCredentials })
        console.log(authCredentials)
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  render() {
    return (
      <AuthenticationContext.Provider
        value={{
          authFetch: this.fetch,
          authCredentials: this.state.authCredentials,
          authRedirect: this.requestAuthentication
        }}
      >
        {this.props.children}
      </AuthenticationContext.Provider>
    )
  }
}

export default AuthenticationProvider
