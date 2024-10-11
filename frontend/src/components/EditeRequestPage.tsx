import React, { useEffect, useState } from 'react';
import { getRequestById } from '../services/requestService';
import RequestForm from './RequestForm';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const EditRequestPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [request, setRequest] = useState<any>(null); // `any` type for simplicity, can be replaced with a Request type
    const [loading, setLoading] = useState<boolean>(true); // Track loading state

    useEffect(() => {
        const fetchRequest = async () => {
            if (id) {
                const data = await getRequestById(id);
                setRequest(data);
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id]);

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Request
                </Typography>
                
                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : request ? (
                    <RequestForm existingRequest={request} onSubmit={() => window.location.href = '/'} />
                ) : (
                    <Typography variant="body1">Request not found.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default EditRequestPage;
