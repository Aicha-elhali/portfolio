/**
 * Message Model
 * Mongoose-Schema für Kontaktformular-Nachrichten
 * Autor: Aicha El Hali
 * Webtechnologien WS 2025/26
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name ist erforderlich'],
      minlength: [2, 'Name muss mindestens 2 Zeichen haben'],
      maxlength: [100, 'Name darf maximal 100 Zeichen haben']
    },
    email: { 
      type: String, 
      required: [true, 'E-Mail ist erforderlich'],
      match: [/^\S+@\S+\.\S+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein']
    },
    message: { 
      type: String, 
      required: [true, 'Nachricht ist erforderlich'],
      minlength: [10, 'Nachricht muss mindestens 10 Zeichen haben'],
      maxlength: [5000, 'Nachricht darf maximal 5000 Zeichen haben']
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
