import React, { useRef } from 'react';
import { TextField, MenuItem, Button, Box, InputLabel, Select, FormControl } from '@mui/material';

const AddRequestForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!); // Get form data using the form ref

    try {
      const response = await fetch('http://localhost:5000/api/requests/postrequests', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Request added successfully');
        formRef.current?.reset(); // Reset the form after submission
      } else {
        alert('Error adding request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
      <TextField label="Location" name="location" defaultValue="Kandy" required fullWidth />
      <TextField label="Service" name="service" required fullWidth />
      
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select name="status" defaultValue="NEW">
          <MenuItem value="NEW">New</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="ON_HOLD">On Hold</MenuItem>
          <MenuItem value="REJECTED">Rejected</MenuItem>
          <MenuItem value="CANCELLED">Cancelled</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select name="priority" defaultValue="LOW">
          <MenuItem value="HIGH">High</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
        </Select>
      </FormControl>
      
      <TextField label="Department" name="department" required fullWidth />
      <TextField label="Assigned To" name="assignedTo" required fullWidth />
      <TextField label="Floor" name="floor" required fullWidth />
      <TextField label="Room" name="room" required fullWidth />
      <TextField label="Block" name="block" required fullWidth />
      <TextField label="Guest Name" name="guestName" required fullWidth />
      <TextField label="Phone Number" name="phoneNumber" required fullWidth />
      
      <input type="file" name="files" multiple />
      
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default AddRequestForm;
