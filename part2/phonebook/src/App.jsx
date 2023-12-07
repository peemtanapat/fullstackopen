import { Fragment, useState } from 'react';

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
          <Person person={person} />
        ))}
      </ul>
    </Fragment>
  );
};

const Person = ({ person }) => (
  <li key={person.id}>
    {person.name} - {person.number}
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
            name: <input onChange={handleNameOnChange} />
          </li>
          <li style={{ padding: '5px 0px 5px 0px' }}>
            number: <input onChange={handleNumberOnChange} />
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
  const [persons, setPersons] = useState([
    { name: 'Tanapat Choochot', number: '099-35-42459', id: 0 },
    { name: 'Arto Hellas', number: '40-12-3456111', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'Harry Potter', number: '11-21-3134512', id: 5 },
  ]);
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPhoneBook = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
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
