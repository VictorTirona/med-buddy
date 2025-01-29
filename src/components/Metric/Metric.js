import React from 'react'

export default function Metric(props) {
    return(
        <div className="Metric">
            <h2 className="Metric--title">{props.title}</h2>
            <h3 className="Metric--subtitle">{props.subtitle}</h3>
        </div>
    )
}