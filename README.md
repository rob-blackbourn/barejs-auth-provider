# @barejs/auth-provider

An authentication provider for bareASGI-auth-server.

When the component is mounted it attempts to gather credentials for the `whoamiPath` link.
If this fails the app is redirected to the `loginPath` link with the current url passed
as the query arg to allow the login app to redirect back to this page.

On success the `renderer` prop is called with `authFetch` (a fetch implementation
that will redirect if the app server responds with 401 - unauthenticated) and
`authCredentials` (the authentication credentials provided by a `GET` to `whoamiPath`).

## Example

```javascript
import React, { Component } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AuthenticatedApp } from '@barejs/auth-provider'

const Site = (authFetch, authCredentials) => <div>An authenticated site</div>

const theme = createTheme()

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthenticatedApp
          loginPath="/auth/ui/login"
          whoamiPath="/auth/api/whoami"
          renderer={props => <Site {...props} />}
        />
      </ThemeProvider>
    )
  }
}

export default App
```
