import { randomBytes } from 'crypto';

function generateSecret() {
    return randomBytes(32).toString('base64');
}

