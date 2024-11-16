import client from '../apiClient';

export const getNetSales = (body) => {
  // return client.post('/data-router/data/mssql/search', body)
  return client.post('/api/search', body)
}
export const getNotes = (body) => {
  // return client.post('/data-router/data/mssql/filter', body)
  return client.post('/api/notes', body)
}
export const getFilters = (body) => {
  // return client.post('/data-router/data/mssql/filter', body)
  return client.post('/api/filter', body)
}