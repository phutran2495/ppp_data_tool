import React, { useState } from 'react';
import LoadDataButton from '../components/LoadDataButton';
import BusinessSearch from '../components/BusinessSearch';
import BusinessList from '../components/BusinessList';
import BusinessDetails from '../components/BusinessDetails';
import { Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedTin, setSelectedTin] = useState<string | null>(null);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>PPP Data Tool</Typography>
      <LoadDataButton />
      <BusinessSearch onResults={setResults} />
      <BusinessList businesses={results} onSelect={setSelectedTin} />
      <BusinessDetails tin={selectedTin} onClose={() => setSelectedTin(null)} />
    </Container>
  );
};

export default Home;