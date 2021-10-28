import React from 'react'
import './coursesHeaderStyle.css'

const CoursesHeader = ({isInput, heading}) => {
    return (
        <div className="coursesHeader">
            <h3>{heading}</h3>
            {
                isInput && <input type="text" className={heading === "Length" && "disabledLength"} placeholder={`Enter ${heading}`} />
            }
        </div>
    )
}

export default CoursesHeader
