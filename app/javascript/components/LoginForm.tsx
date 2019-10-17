import * as React from "react"

import { signIn } from '../utils/api'
import { useDispatch } from '../utils/state'
import history from '../utils/history'

interface IForm {
    email: string,
    password: string,
}

const Reports: React.FC = () => {
  const dispatch = useDispatch()

  const initialState = {
    email: '',
    password: ''
  }

  const [form, setForm] = React.useState(initialState as IForm)

  const submit = () => {
    signIn(form)
      .then((user) => {
        dispatch({ type: 'account-signedIn', user })
        history.push('/reports')
      })
  }

  return (
    <div>
      <div className="form-group">
        <label>E-mail</label>
        <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({...form, email: (e.target.value ? e.target.value : '')})}/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({...form, password: (e.target.value ? e.target.value : '')})}/>
      </div>
      <button className="btn btn-success" onClick={() => submit()}>Sign In</button>
    </div>
  )
}

export default Reports
