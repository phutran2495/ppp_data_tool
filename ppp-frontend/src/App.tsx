import React, { useState } from 'react';
import BusinessSearch from './components/BusinessSearch';
import BusinessDetails from './components/BusinessDetails';
import LoadDataButton from './components/LoadDataButton';
import BusinessList from './components/BusinessList';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PAGE_SIZE = 10;

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedTin, setSelectedTin] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const handleCloseDetails = () => setSelectedTin(null);

  const handleResults = (newResults: any[]) => {
    setResults(newResults);
    setPage(1);
  };

  const pageCount = Math.ceil(results.length / PAGE_SIZE);
  const pagedResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
      {/* Logo left, title centered */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <img
          src="/logo.png"
          alt="PPP Data Tool Logo"
          style={{ height: 112, width: 112, objectFit: 'contain', flexShrink: 0 }}
        />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: 'primary.main', fontWeight: 'bold', lineHeight: 1 }}
          >
            PPP Data Tool
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Search, explore, and analyze Paycheck Protection Program (PPP) loan data.<br />
          Built with FastAPI, React, and Docker.
        </Typography>
        <LoadDataButton />
      </Box>
      <BusinessSearch onResults={handleResults} />
      {selectedTin ? (
        <BusinessDetails tin={selectedTin} onClose={handleCloseDetails} />
      ) : (
        <>
          <BusinessList businesses={pagedResults} onSelect={setSelectedTin} />
          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default App;