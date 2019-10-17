import * as React from "react"
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom"

import { useGlobalState, useDispatch } from '../utils/state'

const ContentInner: React.FC<RouteComponentProps<{}>> = (props) => {
  const { user } = useGlobalState('account')
  const dispatch = useDispatch()

  function fetchUser() {
    if (user) { return }
    const rawUser = localStorage.getItem('account-user')
    if (!rawUser) { return }
    try {
      const storageUser = JSON.parse(rawUser)
      if (storageUser.id) {
        dispatch({type: 'account-signedIn', user: storageUser})
      }
    } catch {}
  }

  if (!user) { fetchUser() }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default withRouter(ContentInner)
