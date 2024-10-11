import React, { useRef } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Input,
} from '@mui/material';

interface IRequestData {
  _id?: string;
  requestId?: string;
  location: string;
  service: string;
  status: 'NEW' | 'IN_PROGRESS' | 'ON_HOLD' | 'REJECTED' | 'CANCELLED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  department: string;
  assignedTo: string;
  floor: string;
  room: string;
  block: string;
  guestName: string;
  phoneNumber: string;
  files: FileList | null;
  existingFilesUrl?: string[];
}

interface RequestFormProps {
  existingRequest?: IRequestData;
  onSubmit: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ existingRequest, onSubmit }) => {
  const requestIdRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);
  const assignedToRef = useRef<HTMLInputElement>(null);
  const floorRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const blockRef = useRef<HTMLInputElement>(null);
  const guestNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all values from refs
    formData.append('requestId', requestIdRef.current?.value || '');
    formData.append('location', locationRef.current?.value || '');
    formData.append('service', serviceRef.current?.value || '');
    formData.append('status', statusRef.current?.value || '');
    formData.append('priority', priorityRef.current?.value || '');
    formData.append('department', departmentRef.current?.value || '');
    formData.append('assignedTo', assignedToRef.current?.value || '');
    formData.append('floor', floorRef.current?.value || '');
    formData.append('room', roomRef.current?.value || '');
    formData.append('block', blockRef.current?.value || '');
    formData.append('guestName', guestNameRef.current?.value || '');
    formData.append('phoneNumber', phoneNumberRef.current?.value || '');

    if (filesRef.current?.files) {
      Array.from(filesRef.current.files).forEach((file) => {
        formData.append('files', file);
      });
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/updateRequest/${existingRequest?._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        alert('Request updated successfully');
        onSubmit();
      } else {
        alert('Error updating request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Request
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Request ID"
          inputRef={requestIdRef}
          defaultValue={existingRequest?.requestId || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Location"
          inputRef={locationRef}
          defaultValue={existingRequest?.location || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Service"
          inputRef={serviceRef}
          defaultValue={existingRequest?.service || ''}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select inputRef={statusRef} defaultValue={existingRequest?.status || 'NEW'} required>
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="ON_HOLD">ON_HOLD</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select inputRef={priorityRef} defaultValue={existingRequest?.priority || 'LOW'} required>
            <MenuItem value="HIGH">HIGH</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="LOW">LOW</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Department"
          inputRef={departmentRef}
          defaultValue={existingRequest?.department || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Assigned To"
          inputRef={assignedToRef}
          defaultValue={existingRequest?.assignedTo || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Floor"
          inputRef={floorRef}
          defaultValue={existingRequest?.floor || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Room"
          inputRef={roomRef}
          defaultValue={existingRequest?.room || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Block"
          inputRef={blockRef}
          defaultValue={existingRequest?.block || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Guest Name"
          inputRef={guestNameRef}
          defaultValue={existingRequest?.guestName || ''}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Phone Number"
          inputRef={phoneNumberRef}
          defaultValue={existingRequest?.phoneNumber || ''}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <Input type="file" inputRef={filesRef} inputProps={{ multiple: true }} />
        </FormControl>

        {existingRequest?.existingFilesUrl && existingRequest.existingFilesUrl.length > 0 && (
          <Box>
            <Typography>Existing Files:</Typography>
            <ul>
              {existingRequest.existingFilesUrl.map((fileUrl, index) => (
                <li key={index}>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    {`File ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default RequestForm;
