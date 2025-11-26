import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '1234' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchPerson, setSearchPerson] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName) {
      alert('Le nom ne peut pas être vide !')
      return
    }

    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameExists) {
      alert(`${newName} est déjà dans le répertoire !`)
      return
    }

    const personbject = {
      name: newName,
      phone: newPhone
    }

    setPersons(persons.concat(personbject))
    setNewName('')
    setNewPhone('')
  }
  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  }
  const handleAddPhone = (event) => {
    setNewPhone(event.target.value)
  }
  const handleSearchPerson = (event) => {
    console.log(event.target.value)
    setSearchPerson(event.target.value)
  }
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  )
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App