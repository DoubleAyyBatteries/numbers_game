// PlayerInput.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PlayerInput = ({ onInput, existingNumbers }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '' && !existingNumbers.includes(parseInt(inputValue, 10))) {
      onInput(parseInt(inputValue, 10));
      setInputValue('');
    } else {
      // Handle invalid input (already exists or empty)
      setInputValue('');
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <TextField
        label="Enter a Number Between 0 and 1000"
        variant="outlined"
        type="number"
        InputProps={{ inputProps: { min: 0, max: 1000 } }}
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginBottom: '10px', width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ width: '200px' }}>
        Submit
      </Button>
    </form>
  );
};

export default PlayerInput;
