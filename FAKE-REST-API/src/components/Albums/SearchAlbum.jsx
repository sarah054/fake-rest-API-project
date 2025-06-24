const SearchAlbum = ({ searchValue, setSearchValue, setSearchCriterion, searchCriterion }) => {

    return (
      <div>
        <h2>חיפוש אלבומים לפי קריטריון</h2>
  
        <div>
          <label>בחר קריטריון לחיפוש: </label>
          <select
            value={searchCriterion}
            onChange={(e) => setSearchCriterion(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="title">כותרת</option>
          </select>
        </div>
  
        <div>
          <label>הזן ערך לחיפוש: </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="חפש אלבום..."
          />
        </div>
      </div>
    );
  };
  
  export default SearchAlbum;
  