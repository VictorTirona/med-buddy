import React from 'react'

export default function ExpLink(props) {
    
    const linksMapped = props.attachedLinks.map((perLink) => {
        return (
            <a href={perLink.link} className="ExpCard--perlink">&#x260D; {perLink.title}</a>
        )
    })

    return (
        <div className="ExpCard--attachedlinks">
            {linksMapped}
        </div>
    )
}