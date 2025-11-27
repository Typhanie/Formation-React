import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchPerson, setSearchPerson] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName) {
      alert('Le nom ne peut pas être vide !')
      return
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
   
    const personObject = { name: newName, number: newPhone };

    if (existingPerson) {
      if (existingPerson.number === newPhone) {
        alert(`${newName} est déjà dans le répertoire !`);
        return;
      }
      const confirmUpdate = window.confirm(
        `${newName} existe déjà. Voulez-vous remplacer l'ancien numéro par celui-ci ?`
      );  
      if (confirmUpdate) {
          handleUpdate(existingPerson.id, personObject);
          resetForm();
      }
      return;
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          resetForm();
      })
  }


  const resetForm = () => {
    setNewName('');
    setNewPhone('');
  };

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  };

  const handleAddPhone = (event) => {
    setNewPhone(event.target.value)
  };

  const handleSearchPerson = (event) => {
    setSearchPerson(event.target.value)
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

  const handleDelete = (id) => {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.error("Erreur lors de la suppression :", error);
        alert("Impossible de supprimer la personne !");
      });

  };

  const handleUpdate = (id, personbject) => {
    personsService
      .update(id, personbject)
      .then(returnedPerson => {
        setPersons(persons.map(person =>
          person.id === id ? returnedPerson : person
        ));
      })
      .catch(e =>console.error('Erreur lors de la mise à jour :', e))
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleAddPerson={handleAddPerson}
        newPhone={newPhone}
        handleAddPhone={handleAddPhone}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App