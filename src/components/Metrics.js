import React from 'react'
import Metric from './Metric/Metric.js'
import metricData from '../data/metrics.js'

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



    React.useEffect(() => {
        console.log("Loading metrics data...")
        setMetricsData(metricData)
        /*fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/records/metrics/${currentYear}`, {
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
                            title: data[0].count_illness
                        }
                    } else if (perMetric.subtitle===`Days of sickness in ${currentYear}`){ //Very weak code. Can break the whole system <3
                        console.log("days sick")
                        return{
                            ...perMetric,
                            title: data[0].days_sick
                        }
                    }
                }))
            })*/

        
    }, [props.submissionStatus])

    const metricDataMapped = metricsData.map((perMetric) => {
        return (
            <Metric
                title={perMetric.title}
                subtitle={perMetric.subtitle}
            />
        )
    })

    return (
        <div className="Metrics">
            {metricDataMapped}
        </div>
    )
}