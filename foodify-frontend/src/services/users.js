import axios from 'axios'
// Deploy URL
// const baseUrl = '/api/users'
const baseUrl = 'http://localhost:3001/api/users'

const getUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createUser = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { 
    getUser,
    createUser
}