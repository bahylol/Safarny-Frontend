import React, { useState } from 'react';
import axios from 'axios';
import NileImage from '../../assets/Images/NileImage.jpg';

const CompanySignUp = () => {
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/signup/company', {
        password,
        companyName,
        phone
      });
      setSuccessMessage(response.data[0]);
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{flex: 1, padding: '20px'}}>
        <form onSubmit={handleSubmit}>
          <label>
            Password:
            <input style={{fontSize: '1.5em', padding: '10px'}} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <label>
            Company Name:
            <input style={{fontSize: '1.5em', padding: '10px'}} type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
          </label>
          <label>
            Phone:
            <input style={{fontSize: '1.5em', padding: '10px'}} type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
          </label>
          <input type="submit" value="Sign Up" />
        </form>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div style={{flex: 1}}>
        <img src={NileImage} alt="Nile" style={{width: '100%'}} />
      </div>
    </div>
  );
}

export default CompanySignUp;