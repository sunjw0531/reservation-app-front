import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CheckPeople = ({ setPeople, maxPeopleNumber }) => {
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    setNumber(e.target.value);
    setPeople(e.target.value);
  };

  const makeArray = () => {
    const people = [];
    for (let i = 2; i <= maxPeopleNumber; i++) {
      people.push(i);
    }
    return people;
  };
  return (
    <FormControl
      variant="standard"
      style={{ marginRight: '100px', width: '150px' }}
    >
      <InputLabel id="checkPeopleNumber" style={{ color: '#a9a9a9' }}>
        인원수
      </InputLabel>
      <Select
        labelId="checkPeopleNumber"
        id="peopleNumber"
        value={number}
        label="peopleNumber"
        onChange={handleChange}
      >
        {makeArray().map((peopleNum) => {
          return (
            <MenuItem key={`인원수-${peopleNum}`} value={peopleNum}>
              {peopleNum}인
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CheckPeople;
