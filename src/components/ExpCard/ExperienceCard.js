import React from 'react'
import Skills from './Skills.js'

export default function ExperienceCard(props) {
    const data = props.perCardData;

    const [showHighlight, setShowHighlight] = React.useState(false)

    function handleEnter() {
        setShowHighlight(true)
    }

    function handleLeave() {
        setShowHighlight(false)
    }

    const showDiagnosisContent = data.diagnosis && <span>  {data.diagnosis}</span>


    return (
        <div className="ExpCard" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className="ExpCard--container">
                <div className="ExpCard--subcontent"><h4 className="ExpCard--date">{data.start_date}{data.end_date && <span> &mdash; </span> }{data.end_date}</h4></div>
                <div className="ExpCard--content">
                    <h2 className="ExpCard--title">
                        {data.symptoms}</h2>
                    <h3 className="ExpCard--subtitle">{showDiagnosisContent}</h3>
                    <h3 className="ExpCard--description">{data.other_notes}</h3>
                    <Skills
                        skillsData={data.medicine}
                    />
                </div>
            </div>
        </div>
    )
}