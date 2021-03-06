import React from 'react'
import './coursesHeaderStyle.css'

const CoursesHeader = ({isInput, heading,name,reference, searchValue, handleSearchChange}) => {
    return (
        <div className="coursesHeader">
            <h3>{heading}</h3>
            {
                isInput && <input 
                                type="text" 
                                className={heading === "Length" && "disabledLength"} 
                                placeholder={`Enter ${heading}`} 
                                name={name}
                                // value={searchValue[searchValue]}  
                                onChange={handleSearchChange} 
                                ref={reference} 
                            />
            }
        </div>
    )
}

export default CoursesHeader
