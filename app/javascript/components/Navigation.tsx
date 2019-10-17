import * as React from "react"
import { Link, withRouter, RouteComponentProps } from "react-router-dom"

import { signOut } from "../utils/api";
import { useDispatch, useGlobalState } from '../utils/state'
import history from '../utils/history'

const Navigation: React.FC<RouteComponentProps<{}>> = (props) => {
  const { user } = useGlobalState('account')
  const dispatch = useDispatch()

  const logout = () => {
    signOut().then(() => {
      dispatch({ type: 'account-signedOut' })
      history.push('/')
    })
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Report Manager</a>
      <div className="collapse navbar-collapse" id="navbarsExample06">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${props.location.pathname === '/' ? 'active' : ''}`}>
            <Link className="nav-link" to='/'>Home</Link>
          </li>
          <li className={`nav-item ${props.location.pathname === '/reports' ? 'active' : ''}`}>
            <Link className="nav-link" to='/reports'>Reports</Link>
          </li>
        </ul>
        { user && (
          <ul className="navbar-nav my-2 my-md-0">
            <li className="nav-item">
              <a className="nav-link">{user.email}</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => logout()}>Sign Out</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default withRouter(Navigation)
