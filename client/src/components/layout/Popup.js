import React from 'react'

const Popup = (props) => {
    const { data, color, closeAlert } = props
    return (

        <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
            {data}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    )
}
export default Popup