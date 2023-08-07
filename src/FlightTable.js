
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import flightData from './flightData.json';
import { TextField } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setData(flightData);
    setFilteredData(flightData);
  }, []);

  const columns = [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Flight Number', accessor: 'flight_number' },
    { Header: 'Name', accessor: 'first_name' },
    { Header: 'Origin', accessor: 'departure_airport' },
    { Header: 'Destination', accessor: 'arrival_airport' },
    { Header: 'Departure Time', accessor: 'departure_time' },
    { Header: 'Arrival Time', accessor: 'arrival_time' },
    { Header: 'Departure Date', accessor: 'departure_date' },
    { Header: 'Arrival Date', accessor: 'arrival_date' },
    { Header: 'Departure Airport', accessor: 'departure_airport' },
    { Header: 'Arrival Airport', accessor: 'arrival_airport' },
    { Header: 'Passenger Count', accessor: 'passenger_count' },
  ];

  const handleRowFilterChange = (filterText) => {
    const filtered = flightData.filter(row => {
      return Object.values(row).some(value =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const handleColumnFilterChange = (filterText, columnId) => {
    const filtered = flightData.filter(row => {
      return row[columnId].toString().toLowerCase().includes(filterText.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}><u>Flight Information</u></h1>
      <TextField
        label="Search"
        variant="outlined"
        onChange={e => handleRowFilterChange(e.target.value)}
        style={{ marginLeft: '30px', marginBottom: '10px' }}
        
      />
      <ReactTable
        data={filteredData}
        columns={columns.map(column => ({
          ...column,
          Filter: ({ filter, onChange }) => (
            <TextField
            label={`Filter ${column.Header}`}
            variant="outlined"
            value={filter ? filter.value : ''}
            onChange={e => {
              onChange(e.target.value);
              handleColumnFilterChange(e.target.value, column.accessor);
            }}
          />
          ),
        }))}
      />
    </div>
  );
}

export default App;
