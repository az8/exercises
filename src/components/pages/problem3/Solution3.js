import React, { useEffect, useState } from "react";

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
      console.log(data);
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
      <h1>Countries</h1>
      <h6 style={{ color: 'red', fontWeight: "300" }}>{deleteError}</h6>

      <table
        border={1}
        cellPadding={5}
        cellSpacing={1}
        style={{ borderColor: '#fefefe', borderCollapse: "collapse" }}
      >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Currency</th>
          <th>Capital</th>
          <th>Action</th>
        </tr>
        {data &&
          Array.isArray(data) &&
          data.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>{country.currency}</td>
              <td>{country.capital}</td>
              <td>
                <button onClick={() => deleteCountry(country.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
