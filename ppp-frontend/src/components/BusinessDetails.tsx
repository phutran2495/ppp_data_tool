import React, { useEffect, useState } from 'react';
import { getBusinessByTin } from '../api/pppApi';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const BusinessDetails: React.FC<{ tin: string | null, onClose: () => void }> = ({ tin, onClose }) => {
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    if (tin) getBusinessByTin(tin).then(setDetails);
  }, [tin]);

  if (!tin || !details) return null;

  return (
    <Dialog open={!!tin} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{details.borrowername}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Business Info</Typography>
        <Typography><b>Address:</b> {details.borroweraddress}</Typography>
        <Typography><b>City:</b> {details.borrowercity}</Typography>
        <Typography><b>State:</b> {details.borrowerstate}</Typography>
        <Typography><b>Zip:</b> {details.borrowerzip}</Typography>
        <Typography><b>Business Type:</b> {details.businesstype}</Typography>
        <Typography><b>NAICS Code:</b> {details.naicscode}</Typography>
        <Typography><b>Franchise Name:</b> {details.franchisename}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Loan Info</Typography>
        <Typography><b>Loan Number (TIN):</b> {details.loannumber}</Typography>
        <Typography><b>Status:</b> {details.loanstatus}</Typography>
        <Typography><b>Status Date:</b> {details.loanstatusdate}</Typography>
        <Typography><b>Approval Amount:</b> {details.initialapprovalamount?.toLocaleString()}</Typography>
        <Typography><b>Current Approval Amount:</b> {details.currentapprovalamount?.toLocaleString()}</Typography>
        <Typography><b>Forgiveness Amount:</b> {details.forgivenessamount?.toLocaleString()}</Typography>
        <Typography><b>Forgiveness Date:</b> {details.forgivenessdate}</Typography>
        <Typography><b>Term:</b> {details.term}</Typography>
        <Typography><b>Jobs Reported:</b> {details.jobsreported}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Demographics</Typography>
        <Typography><b>Gender:</b> {details.gender}</Typography>
        <Typography><b>Veteran:</b> {details.veteran}</Typography>
        <Typography><b>Race:</b> {details.race}</Typography>
        <Typography><b>Ethnicity:</b> {details.ethnicity}</Typography>
        <Typography><b>Nonprofit:</b> {details.nonprofit ? 'Yes' : 'No'}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessDetails;