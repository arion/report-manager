import { get, put, post, destroy, postForm } from './fetch'

export function signIn(payload: object) {
  const path = '/api/v1/login'
  return post(path, payload)
}

export function signOut() {
  const path = '/api/v1/logout'
  return get(path)
}

export function fetchReports(page: number) {
  const path = `/api/v1/reports?page=${page}`
  return get(path)
}

export function createReport(payload: any) {
  const path = `/api/v1/reports`
  const formData = new FormData()
  formData.append('report[title]', payload.title)
  formData.append('report[description]', payload.description)
  formData.append('report[file]', payload.file)
  return postForm(path, formData)
}

export function updateReport(reportId: number, payload: object) {
  const path = `/api/v1/reports/${reportId}`
  return put(path, payload)
}

export function destroyReport(reportId: number) {
  const path = `/api/v1/reports/${reportId}`
  return destroy(path)
}
