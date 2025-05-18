import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const BusinessList: React.FC<{ businesses: any[], onSelect: (tin: string) => void }> = ({ businesses, onSelect }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell>State</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {businesses.map(biz => (
          <TableRow key={biz.loannumber} hover onClick={() => onSelect(biz.loannumber)} style={{ cursor: 'pointer' }}>
            <TableCell>{biz.borrowername}</TableCell>
            <TableCell>{biz.borrowercity}</TableCell>
            <TableCell>{biz.borrowerstate}</TableCell>
            <TableCell>{biz.loanstatus}</TableCell>
            <TableCell>{biz.initialapprovalamount?.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default BusinessList;