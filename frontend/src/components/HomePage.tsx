import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getRequests, deleteRequest } from '../services/requestService';
import { io } from 'socket.io-client';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  MenuItem,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

// Define a type for request status
type RequestStatus = 'NEW' | 'IN_PROGRESS' | 'ON_HOLD' | 'REJECTED' | 'CANCELLED';

interface Request {
  _id: string;
  requestId: string;
  createdAt: string;
  location: string;
  service: string;
  status: RequestStatus; // Use the defined type here
  department: string;
  guestName: string;
  assignedTo: string;
  priority: string;
}

const HomePage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [statusCounts, setStatusCounts] = useState<Record<RequestStatus, number>>({
    NEW: 0,
    IN_PROGRESS: 0,
    ON_HOLD: 0,
    REJECTED: 0,
    CANCELLED: 0,
  });

  useEffect(() => {
    const socket = io('http://localhost:5000/');

    socket.on('connect', () => {
      console.log('Connected to the server:', socket.id);
      loadRequests();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
      updateStatusCounts(data); // Update counts when requests are loaded
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

  const updateStatusCounts = (data: Request[]) => {
    const counts: Record<RequestStatus, number> = {
      NEW: 0,
      IN_PROGRESS: 0,
      ON_HOLD: 0,
      REJECTED: 0,
      CANCELLED: 0,
    };
    
    data.forEach((request) => {
      if (request.status in counts) {
        counts[request.status as keyof typeof counts]++; // Type assertion here
      }
    });

    setStatusCounts(counts);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRequest(id);
        const updatedRequests = requests.filter((request) => request._id !== id);
        setRequests(updatedRequests);
        updateStatusCounts(updatedRequests); // Update counts after deletion
        Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Requests
        </Typography>
        <Button
          component={Link}
          to="/add-request"
          variant="contained"
          color="primary"
          size="large"
        >
          + New Request
        </Button>
      </Box>

      <Box mb={2}>
        <Typography variant="h6">Status Counts:</Typography>
        <Box display="flex" justifyContent="space-between">
          <MenuItem>
            <Typography>New: {statusCounts.NEW}</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>In Progress: {statusCounts.IN_PROGRESS}</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>On Hold: {statusCounts.ON_HOLD}</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>Rejected: {statusCounts.REJECTED}</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>Cancelled: {statusCounts.CANCELLED}</Typography>
          </MenuItem>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL. No</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Requested By</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell sx={{ width: '150px', minWidth: '150px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={request._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{request.requestId}</TableCell>
                <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell>{request.service}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      request.status === 'NEW'
                        ? 'primary'
                        : request.status === 'IN_PROGRESS'
                        ? 'secondary'
                        : request.status === 'ON_HOLD'
                        ? 'warning.main'
                        : request.status === 'REJECTED' || request.status === 'CANCELLED'
                        ? 'error'
                        : 'default'
                    }
                  >
                    {request.status}
                  </Typography>
                </TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{request.guestName}</TableCell>
                <TableCell>{request.assignedTo}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      request.priority === 'HIGH'
                        ? 'error'
                        : request.priority === 'MEDIUM'
                        ? 'warning.main'
                        : 'success.main'
                    }
                  >
                    {request.priority}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/show-requests/${request._id}`}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/edit-request/${request._id}`}
                    color="secondary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(request._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HomePage;
