import React from 'react'

export default function Skills(props) {
    const skillsMapped = props.skillsData.map((perSkill)=>{
        return(
            <h3 className="ExpCard--perskill">{perSkill}</h3>
        )
    })
    return (
        <div className="ExpCard--skills">
            {skillsMapped}
        </div>
    )
}