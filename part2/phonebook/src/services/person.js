import axios from 'axios';

const PERSON_API = 'http://localhost:3001/persons/';

const getAll = async () => {
  return await axios.get(PERSON_API);
};

const create = async (newPerson) => {
  return await axios.post(PERSON_API, newPerson);
};

const deleteOne = async (id) => {
  return await axios.delete(PERSON_API + id);
};

export default { getAll, create, deleteOne };
