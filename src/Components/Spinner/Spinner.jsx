import React from 'react'
import spinnerImg from'../../Assests/Image/loader.gif'
const Spinner = () => {
    return (
        <React.Fragment>
            <div>
                <img src={spinnerImg} alt="" className='d-block m-auto' style={{width:'200px'}}/>
            </div>
        </React.Fragment>
    )
}

export default Spinner
