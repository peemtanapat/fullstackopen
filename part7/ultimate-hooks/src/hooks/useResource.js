import { useEffect, useState } from 'react'
import apiService from '../services/notes'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [newResource, setNewResource] = useState(null)

  useEffect(() => {
    const getAllResourcesFn = async () => {
      const allResources = await apiService.getAll(baseUrl)
      setResources(allResources)
    }

    getAllResourcesFn()
  }, [baseUrl, newResource])

  const create = async (resource) => {
    const createdResource = await apiService.create(baseUrl, resource)
    setNewResource(createdResource)
  }

  const service = {
    create,
  }

  return [resources, service]
}

export default useResource
