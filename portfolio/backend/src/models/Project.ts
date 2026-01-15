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
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Titel ist erforderlich'],
      minlength: [2, 'Titel muss mindestens 2 Zeichen haben'],
      maxlength: [100, 'Titel darf maximal 100 Zeichen haben']
    },
    slug: { 
      type: String, 
      required: [true, 'Slug ist erforderlich'], 
      unique: true,
      lowercase: true,
      trim: true
    },
    year: { 
      type: String, 
      required: [true, 'Jahr ist erforderlich'],
      match: [/^\d{4}(\/\d{2})?$/, 'Jahr muss im Format YYYY oder YYYY/YY sein']
    },
    services: { 
      type: String, 
      required: [true, 'Services sind erforderlich']
    },
    description: { 
      type: String, 
      required: [true, 'Beschreibung ist erforderlich'],
      minlength: [10, 'Beschreibung muss mindestens 10 Zeichen haben'],
      maxlength: [1000, 'Beschreibung darf maximal 1000 Zeichen haben']
    },
    image: { type: String, default: '' },
    live: { type: String, default: '#' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
