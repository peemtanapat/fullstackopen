const express = require('express');
const cors = require('cors');
const { getRandomInt } = require('./utils');
const app = express();

// takes the JSON data of a request, transforms it into a JavaScript object
// then attaches it to the body property of the request object
app.use(express.json());
app.use(cors());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
  {
    id: 5,
    name: 'Harry Potter',
    number: '01823848854',
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Backend Home</h1>');
});

app.get('/info', (req, res) => {
  const phoneBookCount = `Phonebook has info for ${persons.length} people`;
  const dateTime = new Date().toISOString();
  const result = `<div>
      <p>${phoneBookCount}</p>
      <p>${dateTime}</p>
    </div>`;

  res.send(result);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const foundPerson = persons.find((p) => p.id === parseInt(id));
  if (!foundPerson) {
    res.sendStatus(404);
    return;
  }

  res.json(foundPerson);
});

app.post('/api/persons', (req, res) => {
  const newData = req.body;

  if (!newData.name || !newData.number) {
    return res.sendStatus(400);
  }

  const duplicatedName = persons.find(
    (p) => p.name.toLowerCase() === newData.name.toLowerCase()
  );

  if (duplicatedName) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const newId = getRandomInt(100000);
  const newPerson = {
    id: newId,
    name: newData.name,
    number: newData.number,
  };

  persons.push(newPerson);
  res.json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const beforeCount = persons.length;
  const leftPersons = persons.filter((p) => p.id !== parseInt(id));

  if (beforeCount === leftPersons.length) {
    res.sendStatus(404);
    return;
  }

  persons = leftPersons;
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
