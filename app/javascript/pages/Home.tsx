import * as React from "react"
import LoginForm from '../components/LoginForm'

const Home: React.FC = () => {
  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Reports Management</h1>
          <p className="lead">
            Login with next credentials: admin@example.com/passwordPlease
          </p>
          <hr className="my-4"/>
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

export default Home
