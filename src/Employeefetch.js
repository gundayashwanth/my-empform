import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employeefetch = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [editableFields, setEditableFields] = useState({ id: null, Name: '', Email: '', Phone: '', EmployeeId: '', Company: '', Designation: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fetch-data');
      console.log('Response:', response);
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
      await axios.delete(`http://localhost:3001/delete-form/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting data for ID ${id}:`, error.message);
    }
  };

  const handleEdit = (id, Name, Email, Phone, EmployeeId, Company, Designation) => {
    setEditableFields({
      id,
      Name,
      Email,
      Phone,
      EmployeeId,
      Company,
      Designation,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3001/update-form/${id}`, {
        name: editableFields.name,
        email: editableFields.email,
        phone: editableFields.phone,
        employeeId: editableFields.employeeId,
        company: editableFields.company,
        designation: editableFields.designation
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
        <h1>Employee Details:</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Employee ID</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formSubmissions.map((submission) => (
            <tr key={submission._id}>
              <td>{editableFields.id === submission._id ? <input type="text" name="name" value={editableFields.Name} onChange={handleInputChange} /> : submission.name}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="email" value={editableFields.Email} onChange={handleInputChange} /> : submission.email}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="phone" value={editableFields.Phone} onChange={handleInputChange} /> : submission.phone}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="employeeId" value={editableFields.EmployeeId} onChange={handleInputChange} /> : submission.employeeId}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="company" value={editableFields.Company} onChange={handleInputChange} /> : submission.company}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="designation" value={editableFields.Designation} onChange={handleInputChange} /> : submission.designation}</td>
              <td>
                {editableFields.id === submission._id ? (
                  <button className='btn' onClick={() => handleUpdate(submission._id)}>Update</button>
                ) : (
                  <>
                    <button className='btn' onClick={() => handleEdit(submission._id, submission.Name, submission.Email, submission.Phone, submission.EmployeeId, submission.Company, submission.Designation)}>Edit</button>
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
}

export default Employeefetch;
