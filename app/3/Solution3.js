import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Solution3() {

  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');
  const [deleteError, setDeleteError] = React.useState('');

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(
        'https://api.sampleapis.com/countries/countries',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        }
      );
      const data = await response.json();
      if (data.error != 200) {
        setDeleteError(data.message);
      }
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  React.useEffect(() => {
    fetchData('https://api.sampleapis.com/countries/countries');
  }, []);

  const deleteCountry = (id) => {
    deleteData(id);
  };

  return (
    <div>
      <h1 style={{margin: "20px 0"}}>Countries</h1>
      <h5 style={{ color: 'red', fontWeight: "300", margin: "20px 0" }}>{deleteError}</h5>

      <table
        border={13}
        cellPadding={5}
        cellSpacing={1}
        style={{ borderColor: '#fefefe', borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Currency</th>
            <th>Capital</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Array.isArray(data) &&
            data.map((country) => (
              <tr key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>{country.currency}</td>
                <td>{country.capital}</td>
                <td>
                  <IconButton aria-label="delete" onClick={() => deleteCountry(country.id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
