import * as React from "react"

import { createReport, updateReport } from "../utils/api"

import { useDispatch } from '../utils/state'

interface IForm {
  id: number | undefined,
  title: string,
  description: string,
  file: any
}

interface IProps {
  onSave: () => void,
  onCancel: () => void,
  report: IForm | {},
}

const ReportForm: React.FC<IProps> = (props) => {
  const dispatch = useDispatch()

  const [errors, setErrors] = React.useState([])

  const initialState = {
    id: undefined,
    title: '',
    description: '',
    file: undefined,
    ...props.report
  }

  const [form, setForm] = React.useState(initialState as IForm)

  function handleFileChange (e) {
    const file = e.target.files[0]
    if (!file) { return }
    setForm({ ...form, file })
  }

  function cancel() {
    props.onCancel()
  }

  function save() {
    form.id ? update() : create()
  }

  function create() {
    createReport(form).then((report) => {
      dispatch({ type: 'reports-created', report })
      props.onSave()
    }).catch((err) => {
      if (err.errors) {
        const keys = Object.keys(err.errors)
        setErrors(keys.map((k) => `${k}: ${err.errors[k].join(', ')}`))
      }
    })
  }

  function update() {
    updateReport(form.id, form).then((report) => {
      dispatch({ type: 'reports-updated', report })
      props.onSave()
    }).catch((err) => {
      if (err.errors) {
        const keys = Object.keys(err.errors)
        setErrors(keys.map((k) => `${k}: ${err.errors[k].join(', ')}`))
      }
    })
  }

  return (
    <div className="form py-5">
      <div className="form">
        <div className="form-group">Title</div>
        <input type="text" className="form-control" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}/>
      </div>
      <div className="form">
        <div className="form-group">Description</div>
        <input type="text" className="form-control" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}/>
      </div>
      { !form.id && (
        <div className="form">
          <div className="form-group">Description</div>
          <input type="file" onChange={handleFileChange}/>
        </div>
      )}
      <ul>
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
      <div className="buttons-group py-5 text-right">
        <button className="btn btn-success" onClick={() => save()}>Save</button>
        &nbsp;
        <button className="btn btn-default" onClick={() => cancel()}>Cancel</button>
      </div>
    </div>
  )
}

export default ReportForm
