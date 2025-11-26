
const Filter = ({ searchPerson, handleSearchPerson }) => {
  return (
    <div>
      <input
        placeholder="Rechercher un nom..."
        value={searchPerson}
        onChange={handleSearchPerson}
      />
    </div>
  )
}

export default Filter
