import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [notification, setNotification] = useState({ message: "", type: "" });

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
          setNotification({ message: `${newName} a été modifié!`, type: "success" });
          setTimeout(() => {
            setNotification({ message: "", type: "" })
          }, 5000)

          resetForm();
      }
      return;
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNotification({ message: `${newName} a été ajouté!`, type: "success" });
          setTimeout(() => {
            setNotification({ message: "", type: "" })
          }, 5000)
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
        const person = persons.find(person => person.id !== id)
        console.error("Erreur lors de la suppression :", error);
          setNotification({ message: `${person.name} a été supprimé du serveur`, type: "error" });
          setTimeout(() => {
            setNotification({ message: "", type: "" })
          }, 5000)
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
      <Notification message={notification.message} type={notification.type} />
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