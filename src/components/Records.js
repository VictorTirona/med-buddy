import React from 'react'
import ExperienceCard from './ExpCard/ExperienceCard.js'

export default function Records(props) {
    const [records, setRecords] = React.useState([])
    React.useEffect(() => {
        console.log("loading data for the first time")
        fetch('/api/v1/records', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data)
                setRecords(data)
            })
    }, [props.submissionStatus])
    

    const experienceCardsMapped = records.map((perCard) => {
        console.log("perCard", perCard)
        return (
            <ExperienceCard
                perCardData={perCard}
            />
        )
    });

    return (
        <div className="Records">
            <h2 className="Records--title">My Records</h2>
            {experienceCardsMapped}
        </div>
    )
}