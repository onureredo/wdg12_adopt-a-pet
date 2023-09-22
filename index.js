import express from 'express';
import pets from './petList.js';

const app = express();
const port = 8000;

app.get('/pets', (req, res) => res.json(pets));

app.get('/', (req, res) => {
  res.send(`
        <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend:</p>
        <ul>
            <li><a href='/animals/dogs'>Dogs</a></li>
            <li><a href='/animals/cats'>Cats</a></li>
            <li><a href='/animals/rabbits'>Rabbits</a></li>
            <li><a href='/animals/birds'>Birds</a></li>
        </ul>
    `);
});

app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type;
  const animalList = pets[petType];

  if (!animalList)
    return res.status(404).send(`<h1>No animals of this type found`);

  const animals = animalList
    .map((animal, index) => {
      return `<li><a href="/animals/${petType}/${index}">${animal.name}</a></li>`;
    })
    .join(' ');

  res.send(`
    <h1>List of ${petType}</h1>
    <ul>${animals}</ul>
  `);
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const petType = req.params.pet_type;
  const petId = req.params.pet_id;
  const animalList = pets[petType];

  if (!animalList || petId >= animalList.length)
    return res.status(404).send(`<h1>Pet not found</h1>`);

  const findPet = animalList[petId];
  res.send(`
        <h1>${findPet.name}</h1>
        <img src="${findPet.url}" />
        <p>${findPet.description}</p>
        <ul>
            <li>Age: ${findPet.age}</li>
            <li>Breed: ${findPet.breed}</li>
        </ul>
    `);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
