import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequestById } from '../services/requestService';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';

const RequestDetails = () => {
    const params = useParams();
    const id = params.id as string;
    const [request, setRequest] = useState<any>(null); 
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const fetchRequestDetails = async () => {
        try {
          const data = await getRequestById(id);
          console.log(data);
          setRequest(data);
        } catch (error) {
          console.error('Error fetching request details:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRequestDetails();
    }, [id]);
  
    if (loading) return <CircularProgress />; 
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Request Details
        </Typography>
        {request ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Field</strong></TableCell>
                  <TableCell><strong>Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{request._id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>{request.requestId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created On</TableCell>
                  <TableCell>{new Date(request.createdOn).toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>{request.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>{request.service}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Priority</TableCell>
                  <TableCell>{request.priority}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>{request.department}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>{request.assignedTo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Floor</TableCell>
                  <TableCell>{request.floor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Room</TableCell>
                  <TableCell>{request.room}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Block</TableCell>
                  <TableCell>{request.block}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>{request.guestName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>{request.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>
                    {request.files && request.files.length > 0 ? (
                      <img
                        src={`http://localhost:5000/uploads/${request.files}`}
                        alt="Uploaded"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    ) : (
                      'No photo uploaded'
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No details available for this request.</Typography>
        )}
      </Container>
    );
  };
  
export default RequestDetails;
