import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserForm() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: ""
  });


  const API = "http://localhost:3004/users";

  const fetchData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const Change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const Submit = async (e) => {
    e.preventDefault();

    if (editId) 
    {
      await axios.put(`${API}/${editId}`, formData);
      setEditId(null);
    } 
    else 
    {
      await axios.post(API, formData);
    }

    setFormData({ name: "", email: "", password: "" });
    fetchData();
  };

  const Delete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
  };

  const Edit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  return (
    <div className="container mt-4">
      <h2>Axios Form</h2>

      <form onSubmit={Submit}>

        <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={Change} className="form-control mb-2"/>
        <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={Change} className="form-control mb-2"/>
        <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={Change} className="form-control mb-2"/>
       <div className="mb-2">
  <label className="me-2">Gender:</label>

  <input
    type="radio"
    name="gender"
    value="Male"
    checked={formData.gender === "Male"}
    onChange={Change}
  /> Male

  <input
    type="radio"
    name="gender"
    value="Female"
    className="ms-3"
    checked={formData.gender === "Female"}
    onChange={Change}
  /> Female
</div>
       <br />
        <button className="btn btn-outline-primary">
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <br />
      <hr/>

      <h3>Save Data</h3>

      <table className="table">
        <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.gender}</td>

              <td>
                <button className="btn btn-outline-success me-2" onClick={() => Edit(item)}> Edit</button>
                <button className="btn btn-outline-danger" onClick={() => Delete(item.id)}> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}