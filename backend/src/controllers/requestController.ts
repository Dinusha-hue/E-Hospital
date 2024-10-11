import { Request, Response } from 'express';
import RequestModel from '../models/requestModel';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find();
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  try {
    const request = await RequestModel.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createRequest = [
  upload.array('files', 10),
  async (req: Request, res: Response) => {
   
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    const newRequest = new RequestModel({
      ...req.body,
      files: files ? files.map((file: Express.Multer.File) => file.filename) : []
    });
    try {
      const savedRequest = await newRequest.save();
      res.status(201).json(savedRequest);
    } catch (error: any) {
      let errorMessage: string;

  if (error.name === 'ValidationError' && error.errors) {
   
    const validationErrors = Object.values(error.errors)
      .map((val: any) => val.message)
      .join(', ');
    
    errorMessage = `Validation failed for: ${validationErrors}`;
  } else {
    errorMessage = error.message || 'An error occurred while saving the request.';
  }
  
  console.error(`Error name: ${error.name}`);
  console.error(`Error message: ${errorMessage}`);
  
  res.status(400).json({ message: errorMessage });
    }
  }
];

export const updateRequest = [
  upload.array('files', 10),
  async (req: Request, res: Response) => {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    try {
      const updatedRequest = await RequestModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          files: files ? files.map((file: Express.Multer.File) => file.filename) : []
        },
        { new: true }
      );
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.json(updatedRequest);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
];

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const deletedRequest = await RequestModel.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json({ message: 'Request deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
