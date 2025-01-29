import React from 'react'
import ExperienceCard from './ExpCard/ExperienceCard.js'

export default function Records(props) {
    const [records, setRecords] = React.useState([])
    React.useEffect(() => {
        console.log("Here's the backend URL ENV VAR:", process.env.REACT_APP_BACKEND_URL)
        console.log("loading data for the first time")
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/records`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("response is going to be JSON'd idk")
                return response.json()
            })
            .then(data => {
                console.log("Updating state with the data...")
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