import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

const Persons = ({ persons, search }) => {
  if (search) {
    persons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Fragment>
      <h3>Numbers</h3>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </Fragment>
  );
};

const Person = ({ person }) => (
  <p key={person.id}>
    {person.name} - {person.number}
  </p>
);

const PersonForm = ({
  addPhoneBook,
  handleNameOnChange,
  handleNumberOnChange,
}) => {
  return (
    <Fragment>
      <h3>Add a new</h3>
      <form onSubmit={addPhoneBook}>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            name: <input onChange={handleNameOnChange} required />
          </li>
          <li style={{ padding: '5px 0px 5px 0px' }}>
            number: <input onChange={handleNumberOnChange} required />
          </li>
          <li>
            <button type="submit">add</button>
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

const PersonSearch = ({ handleSearch }) => (
  <span>
    Filter shown with: <input onChange={handleSearch} />
  </span>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    const fetchPersons = async () => {
      const res = await axios.get('http://localhost:3001/persons');
      setPersons(res.data);
    };

    fetchPersons();
  }, []);

  const addPhoneBook = (e) => {
    e.preventDefault();

    const duplicatedPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (duplicatedPerson) {
      const warningMsg = `${newName} is already added to Phone Book`;
      return alert(warningMsg);
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length,
    };
    setPersons(persons.concat(newPerson));
  };

  const handleNameOnChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberOnChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonSearch handleSearch={handleSearch} />
      <PersonForm
        addPhoneBook={addPhoneBook}
        handleNameOnChange={handleNameOnChange}
        handleNumberOnChange={handleNumberOnChange}
      />
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
