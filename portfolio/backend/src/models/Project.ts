/**
 * Project Model
 * Mongoose-Schema für Projekte
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  year: string;
  services: string;
  description: string;
  image: string;
  live: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    year: { type: String, required: true },
    services: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    live: { type: String, default: '#' },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
