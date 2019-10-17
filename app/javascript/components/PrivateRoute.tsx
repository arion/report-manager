import * as React from "react"
import { Redirect, Route } from "react-router-dom"

interface IProps {
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FunctionComponent<IProps> = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('account-user')
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute
