import React, { useState } from 'react';
import { loadPppData } from '../api/pppApi';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

const LoadDataButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const res = await loadPppData();
      setMsg(res.message || 'Data loaded!');
    } catch (e: any) {
      setMsg(e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleLoad} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Load PPP Data'}
      </Button>
      <Snackbar open={!!msg} autoHideDuration={4000} onClose={() => setMsg(null)} message={msg} />
    </>
  );
};

export default LoadDataButton;