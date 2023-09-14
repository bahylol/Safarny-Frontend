import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

// Import your background image
import NileImage from '../../assets/Images/NileImage.jpg';

function CompanyRequestPage() {
  const [formData, setFormData] = useState({
    about: '',
    request_email: '',
    country: '',
    city: '',
    documents: '',
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!Object.values(formData).every((value) => value.trim() !== '')) {
      setError('Please fill all the fields.');
      setResponse(null);
      return;
    }

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL+'/company-requests', formData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  // Style for the form and responses part
  const formStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  // Style for the background part
  const imageStyle = {
    flex: 1,
    backgroundImage: `url(${NileImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  // Style for the container
  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          <label>
            About:
            <input name="about" value={formData.about} onChange={handleChange} placeholder="About" />
          </label>
          <label>
          Company Email:
            <input name="request_email" value={formData.request_email} onChange={handleChange} placeholder="Company Email" />
          </label>
          <label>
            Country:
            <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          </label>
          <label>
            City:
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          </label>
          <label>
            Documents:
            <input name="documents" value={formData.documents} onChange={handleChange} placeholder="Documents" />
          </label>
          <button type="submit">Submit</button>
        </form>
        
        {response && <pre className="response">{JSON.stringify(response, null, 2)}</pre>}
        {error && <div className="error">Error: {error}</div>}
      </div>

      <div style={imageStyle}></div>
    </div>
  );
}

export default CompanyRequestPage;