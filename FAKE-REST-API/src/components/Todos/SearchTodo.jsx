import React from 'react'

function SearchTodo({setSearchTerm, searchTerm, setSortParam}) {
    return (

        <div>

            <label htmlFor='search'>חיפוש משימה:</label>
            <input
                id='search'
                type="text"
                placeholder="חפש משימה..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select onChange={(e) => setSortParam(e.target.value)}>
                <option value="default">ללא מיון</option>
                <option value="alphabetical">מיון לפי אותיות</option>
                <option value="completed">מיון לפי הושלם</option>
                <option value="idSort">מיון לפי מזהה יחודי</option>
            </select>
        </div>
    )
}
export default SearchTodo