import { Fragment, useEffect, useState } from 'react';
import personService from './services/person';
import './index.css';

const Persons = ({ persons, search, handleOnDelete }) => {
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
          <Person
            key={person.id}
            person={person}
            handleOnDelete={handleOnDelete}
          />
        ))}
      </ul>
    </Fragment>
  );
};

const Person = ({ person, handleOnDelete }) => (
  <li key={person.id}>
    <span>
      {person.name} - {person.number}
      <button onClick={handleOnDelete(person)}>delete</button>
    </span>
  </li>
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
      const res = await personService.getAll();
      setPersons(res.data);
    };

    fetchPersons();
  }, []);

  const addPhoneBook = async (e) => {
    e.preventDefault();

    const duplicatedPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const newData = {
      name: newName,
      number: newNumber,
    };

    if (duplicatedPerson) {
      const warningMsg = `${newName} is already added to Phone Book, replace the old number with a new one?`;
      if (confirm(warningMsg)) {
        personService
          .updateOne(duplicatedPerson.id, newData)
          .then((returnPerson) => {
            setPersons(
              persons.map((p) =>
                p.id != duplicatedPerson.id ? p : returnPerson.data
              )
            );
          })
          .catch((error) => {
            alert(
              `the person '${duplicatedPerson.name}' was already deleted from server`
            );
          });
        return;
      } else {
        return;
      }
    }

    const newPerson = {
      ...newData,
      id: persons.length,
    };

    setPersons(persons.concat(newPerson));

    await personService.create(newPerson);
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

  const handleOnDelete = (person) => (e) => {
    e.preventDefault();

    if (confirm(`Delete ${person.name} ?`)) {
      personService.deleteOne(person.id);

      const leftPersons = persons.filter((p) => p.id != person.id);
      setPersons(leftPersons);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <PersonSearch handleSearch={handleSearch} />
      <PersonForm
        addPhoneBook={addPhoneBook}
        handleNameOnChange={handleNameOnChange}
        handleNumberOnChange={handleNumberOnChange}
      />
      <Persons
        persons={persons}
        search={search}
        handleOnDelete={handleOnDelete}
      />
    </div>
  );
};

export default App;
