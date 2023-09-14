import React, { useState } from 'react';
import axios from 'axios';

const GuideSignUp = () => {
    const [formData, setFormData] = useState({
        password: '',
        fname: '',
        lname: '',
        phone: '',
        birthdate: '',
        gender: '',
        price: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/signup/localGuide', formData);
            console.log(response.data);
            alert("You've signed up successfully!");
        } catch (error) {
            console.error(error);
            alert("Sign up failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="password" onChange={handleChange} placeholder="Password" type="password" />
            <input name="fname" onChange={handleChange} placeholder="First Name" />
            <input name="lname" onChange={handleChange} placeholder="Last Name" />
            <input name="phone" onChange={handleChange} placeholder="Phone Number" />
            <input name="birthdate" onChange={handleChange} placeholder="Birth Date" type="date" />
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '200px' }}>
                <label>
                    <input type="radio" name="gender" value="Male" onChange={handleChange} />
                    Male
                </label>
                <label>
                    <input type="radio" name="gender" value="Female" onChange={handleChange} />
                    Female
                </label>
            </div>
            <input name="price" onChange={handleChange} placeholder="Price" type="number" />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default GuideSignUp;