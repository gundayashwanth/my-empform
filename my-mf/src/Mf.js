import React, { useState } from 'react';
import './Mf.css';
import axios from 'axios';

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    medicalHistory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the form data to the backend
      await axios.post('http://localhost:3000/submit-form', formData); // Update the URL
      console.log('Form submitted successfully!',formData);
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };
  return (
  
    <div className="Form-container">
      <div></div>
      <form className="medical-form" onSubmit={handleSubmit}>
        <h2 className='formh2'>Medical Form</h2>
        <label className='inputs' htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label className='inputs' htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label className='inputs' htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label className='inputs' htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className='inputs' htmlFor="medicalHistory">Medical History:</label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          rows="4"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
};

export default MedicalForm;
