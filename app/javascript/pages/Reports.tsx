import * as React from "react"

import ReportForm from '../components/ReportForm'
import { useDispatch, useGlobalState } from "../utils/state";
import { fetchReports } from "../utils/api";

const Reports: React.FC = () => {
  const reports = useGlobalState('reports')

  const [showNewForm, setShowNewForm] = React.useState(false)
  const [editReportId, setEditReportId] = React.useState(undefined as number | undefined)
  const [page, setPage] = React.useState(1)
  const dispatch = useDispatch()

  React.useEffect(() => {
    fetchReports(page)
      .then((reports) => dispatch({ type: 'reports-loaded', reports, page }))
  },[page, dispatch])

  return (
    <div className="container">
      { showNewForm ? (
        <ReportForm onCancel={() => setShowNewForm(false)} onSave={() => setShowNewForm(false)} report={{}}/>
      ) : (
        <div className="text-right py-5">
          <button className="btn btn-success" onClick={() => setShowNewForm(true)}>Add New +</button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Size</th>
            <th>File</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              {editReportId === report.id ? (
                <td colSpan={4}>
                  <ReportForm onCancel={() => setEditReportId(undefined)} onSave={() => setEditReportId(undefined)} report={report}/>
                </td>
              ) : (
                <React.Fragment>
                  <td>
                    <b>{report.title}</b>
                    <br/>
                    {report.description}
                  </td>
                  <td>{report.file_data.size}</td>
                  <td>
                    <a href={report.file.url} target='_blank'>{report.file_data.original_filename}</a>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => setEditReportId(report.id)}>Edit</button>
                  </td>
                </React.Fragment>
              )}
              </tr>
          ))}
          <tr>
            <td colSpan={4}>
              <div className="text-right">
                {page > 1 && (<button onClick={() => setPage(page - 1)}>prev</button>)}
                &nbsp;
                {reports.length >= 5 && (<button onClick={() => setPage(page + 1)}>next</button>)}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Reports
