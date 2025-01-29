import React from 'react'
import Metric from './Metric/Metric.js'

export default function Metrics(props) {
    const currentYear = new Date().getFullYear();
    const [metricsData, setMetricsData] = React.useState([
        {
            title: "Loading...",
            subtitle: `Illnesses in ${currentYear}` 
        },
        {
            title: "Loading...",
            subtitle: `Days of sickness in ${currentYear}`
        }
    ])

    const metricDataMapped = metricsData.map((perMetric) => {
        return (
            <Metric
                title={perMetric.title}
                subtitle={perMetric.subtitle}
            />
        )
    })

    React.useEffect(() => {
        console.log("Loading metrics data...")
        
        fetch(`/api/v1/records/metrics/${currentYear}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success", data)
                setMetricsData(metricsData.map((perMetric) =>{
                    if (perMetric.subtitle===`Illnesses in ${currentYear}`){ //Very weak code. Can break the whole system <3
                        console.log("illness")
                        return{
                            ...perMetric,
                            title: data.count_illness
                        }
                    } else if (perMetric.subtitle===`Days of sickness in ${currentYear}`){ //Very weak code. Can break the whole system <3
                        console.log("days sick")
                        return{
                            ...perMetric,
                            title: data.days_sick
                        }
                    }
                }))
            })

        
    }, [props.submissionStatus])


    return (
        <div className="Metrics">
            {metricDataMapped}
        </div>
    )
}