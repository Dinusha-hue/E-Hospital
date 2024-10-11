import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import AddRequestForm from './AddRequsetForm';

const AddRequestPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a New Request
        </Typography>
        <AddRequestForm />
      </Paper>
    </Container>
  );
};

export default AddRequestPage;
