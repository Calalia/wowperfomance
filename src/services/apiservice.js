import axios from 'axios'
const baseUrl = '/api/'

const getAllCharacters = () => {
    const request = axios.get(`${baseUrl}characters`)
    return request.then(response => response.data)
}

const fetchCharacter = newObject => {
    const request = axios.post(`${baseUrl}characters`, newObject)
    return request.then(response => response.data)
}

const getAllZones = () => {
    const request = axios.get(`${baseUrl}zones`)
    return request.then(response => response.data)
}

export default {
    getAllCharacters,
    fetchCharacter,
    getAllZones
}