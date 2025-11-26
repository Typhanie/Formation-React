
const PersonForm = ({ addPerson, newName, handleAddPerson, newPhone, handleAddPhone }) => {
  return (
      <form onSubmit={addPerson}>
        <div>name: 
          <input 
            value={newName} 
            onChange={handleAddPerson}
          />
        </div>
        <div>number: 
          <input 
            value={newPhone} 
            onChange={handleAddPhone}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

export default PersonForm
