import * as React from 'react'
import { Router, Route } from "react-router-dom"

import { Provider } from '../utils/state'
import history from '../utils/history'

import Home from '../pages/Home'
import Reports from '../pages/Reports'

import PrivateRoute from '../components/PrivateRoute'
import ContentInner from '../components/ContentInner'
import Navigation from '../components/Navigation'

const App = React.FC = () => {
  return (
    <Router history={history}>
      <Provider>
        <Navigation/>
        <div className="page-content d-flex">
          <ContentInner>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/reports" component={Reports} />
          </ContentInner>
        </div>
      </Provider>
    </Router>
  )
}

export default App
