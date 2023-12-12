import axios from 'axios';

const PERSON_API = '/api/persons/';

const getAll = async () => {
  return await axios.get(PERSON_API);
};

const create = async (newPerson) => {
  return await axios.post(PERSON_API, newPerson);
};

const updateOne = async (id, newData) => {
  return await axios.put(PERSON_API + id, newData);
};

const deleteOne = async (id) => {
  return await axios.delete(PERSON_API + id);
};

export default { getAll, create, updateOne, deleteOne };
