import React, { useState } from 'react';
import { searchBusinesses, getBusinessByTin, loadPppData } from '../api/pppApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const BusinessSearch: React.FC<{ onResults: (results: any[]) => void }> = ({ onResults }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchBusinesses(name, state, city);
    onResults(results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField label="Business Name" value={name} onChange={e => setName(e.target.value)} required fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="State" value={state} onChange={e => setState(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="City" value={city} onChange={e => setCity(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button type="submit" variant="contained" color="secondary" fullWidth>Search</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BusinessSearch;