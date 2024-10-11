import express from 'express';
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  getRequestById
} from '../controllers/requestController';

const router = express.Router();

router.get('/getrequests', getRequests);
router.get('/getrequestsbyid/:id', getRequestById);
router.post('/postrequests', createRequest);
router.put('/updateRequest/:id', updateRequest);
router.delete('/deleterequests/:id', deleteRequest);

export default router;
