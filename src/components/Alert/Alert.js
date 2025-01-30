import React from 'react'

export default function Alert(props) {

    const alertStyle = {
        background: { backgroundColor: props.type === "error" ? "#ffc5c4" : "#B0F5CC",
            border: props.type === "error"? "1px solid #8b2821":"1px solid #22944c",
            paddingTop: props.type === "error" ? "10px" : "5px",
            paddingBottom: props.type === "error" ? "10px" : "5px",
        },
        imgColor: {
            filter: props.type === "error"
                ? "invert(60%) sepia(96%) saturate(4833%) hue-rotate(335deg) brightness(90%) contrast(106%)"
                : "invert(50%) sepia(59%) saturate(6098%) hue-rotate(135deg) brightness(99%) contrast(101%)"
        },
        contentsColor: { color: props.type === "error" ? "#ED4337" : "#00AB64" }
    }

    const alertIcon = props.type === "error" ? "error.svg" : "success.svg"
    const alertsMapped = Object.values(props.bullets).map((perTitle)=>{
        if (perTitle !== "") {
            return(
                <li>{perTitle}</li>
            )
        }
        
    })

    return (
        <div className="Alert" style={alertStyle.background}>
            <div className="Alert--container">
                <img src={`./images/${alertIcon}`} style={alertStyle.imgColor} className="Alert--logo" />
                <h2 className="Alert--title" style={alertStyle.contentsColor}>{props.title}</h2>
            </div>
            {(Object.values(props.bullets).length !== 0) && <ul className="Alert--bullets" style={alertStyle.contentsColor}>
                {alertsMapped}
            </ul>}
        </div>
    )
}