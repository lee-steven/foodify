import axios from 'axios'
// Deploy URL
const baseUrl = '/api/groceries'
// const baseUrl = 'http://localhost:3001/api/groceries'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken, getById }