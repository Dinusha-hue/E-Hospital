import mongoose, { Document, Schema } from 'mongoose';

export interface IRequest extends Document {
  requestId: string;
  createdOn: Date;
  location: string;
  service: string;
  status: 'NEW' | 'IN_PROGRESS' | 'ON_HOLD' | 'REJECTED' | 'CANCELLED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  department: string;
  // requestedBy: string;
  assignedTo: string;
  floor: string;
  room: string;
  block: string;
  guestName: string;
  phoneNumber: string;
  files: string[]; 
}

const requestSchema: Schema = new Schema({
  requestId: { type: String, required: true, default: '123456' },
  createdOn: { type: Date, required: true, default: Date.now },
  location: { type: String, required: true, default: 'Kandy' },
  service: { type: String, required: true },
  status: { type: String, required: true, default: 'NEW'},
  priority: { type: String, required: true },
  department: { type: String, required: true },
  assignedTo: { type: String, required: true, default: 'Jane Smith' },
  floor: { type: String, required: true },
  room: { type: String, required: true },
  block: { type: String, required: true },
  guestName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  files: { type: [String], default: [] }, 
});


const Request = mongoose.model<IRequest>('Request', requestSchema);

export default Request;
