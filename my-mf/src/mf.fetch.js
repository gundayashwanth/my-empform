import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FormDataTable = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [editableFields, setEditableFields] = useState({ id: null, firstName: '', lastName: '', age: '', gender: '', medicalHistory: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetch-data');
      setFormSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDelete = async (id) => {
    console.log('Deleting form with ID:', id);
    try {
      await axios.delete(`http://localhost:3000/delete-form/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting data for ID ${id}:`, error.message);
    }
  };

  const handleEdit = (id, firstName, lastName, age, gender, medicalHistory) => {
    setEditableFields({
      id,
      firstName: editableFields.id === id ? editableFields.firstName : firstName,
      lastName: editableFields.id === id ? editableFields.lastName : lastName,
      age: editableFields.id === id ? editableFields.age : age,
      gender: editableFields.id === id ? editableFields.gender : gender,
      medicalHistory: editableFields.id === id ? editableFields.medicalHistory : medicalHistory,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/update-form/${id}`, {
        firstName: editableFields.firstName,
        lastName: editableFields.lastName,
        age: editableFields.age,
        gender: editableFields.gender,
        medicalHistory: editableFields.medicalHistory,
      });
      setEditableFields({ ...editableFields, id: null });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setEditableFields({ ...editableFields, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className='tbh2'>Form Submissions:</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Medical History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formSubmissions.map((submission) => (
            <tr key={submission._id}>
              <td>{editableFields.id === submission._id ? <input type="text" name="firstName" value={editableFields.firstName} onChange={handleInputChange} /> : submission.firstName}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="lastName" value={editableFields.lastName} onChange={handleInputChange} /> : submission.lastName}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="age" value={editableFields.age} onChange={handleInputChange} /> : submission.age}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="gender" value={editableFields.gender} onChange={handleInputChange} /> : submission.gender}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="medicalHistory" value={editableFields.medicalHistory} onChange={handleInputChange} /> : submission.medicalHistory}</td>
              <td>
                {editableFields.id === submission._id ? (
                  <button className='btn' onClick={() => handleUpdate(submission._id)}>Update</button>
                ) : (
                  <>
                    <button className='btn' onClick={() => handleEdit(submission._id, submission.firstName, submission.lastName, submission.age, submission.gender, submission.medicalHistory)}>Edit</button>
                    <button className='btn2' onClick={() => handleDelete(submission._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormDataTable;
