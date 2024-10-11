import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getRequests } from '../services/requestService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import '../css/ViewRequests.css';

const ViewRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />; 

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom align="center">
        View Requests
      </Typography>
      {requests.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.guestName}</TableCell>
                <TableCell>{request.requestId}</TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell>{request.service}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" align="center">
          No requests found.
        </Typography>
      )}
    </TableContainer>
  );
};

export default ViewRequests;
