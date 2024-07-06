import { StreamChat } from 'stream-chat';
import jwt from 'jsonwebtoken';
import { STREAM_API_KEY_ENV, STREAM_API_SECRET_ENV } from '@env';

const STREAM_API_KEY = STREAM_API_KEY_ENV;
const STREAM_API_SECRET = STREAM_API_SECRET_ENV;

export const chatClient = StreamChat.getInstance(STREAM_API_KEY);

export const generateToken = (userId) => {
    const payload = { user_id: userId };
    const token = jwt.sign(payload, STREAM_API_SECRET, { expiresIn: '1h' });
    return token;
};