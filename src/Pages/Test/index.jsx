import React from 'react'
import Container from '../../Components/Container'
import Form from '../../Components/Form'
import NileImage from '../../assets/Images/NileImage.jpg';

const test = () => {
    return (
        <div>
            <Container
                Content={
                    <>
                        <div className='mt-10'>
                            <Form />
                        </div>
                        <div className='mt-10'>
                            <Form />
                        </div>
                    </>
                }
                Image={NileImage} />
        </div>
    )
}

export default test