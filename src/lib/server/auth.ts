import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';

export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const adminPassword = env.ADMIN_PASSWORD;
const sessionSecret = env.SESSION_SECRET;
const passwordHash = adminPassword && sessionSecret
	? createHash('sha256').update(adminPassword).digest()
	: null;
// Bind sessions to both secrets so rotating either revokes existing sessions.
const sessionKey = adminPassword && sessionSecret
	? createHmac('sha256', sessionSecret).update('admin_session\0').update(adminPassword).digest()
	: null;

export function createAdminSession(password: string): string | null {
	if (!passwordHash || !sessionKey) return null;

	const submittedHash = createHash('sha256').update(password).digest();
	if (!timingSafeEqual(submittedHash, passwordHash)) return null;

	const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE;
	const payload = `v1.${expiresAt}.${randomBytes(16).toString('hex')}`;
	const signature = createHmac('sha256', sessionKey).update(payload).digest('hex');
	return `${payload}.${signature}`;
}

export function isValidAdminSession(token: string | undefined): boolean {
	if (!token || !sessionKey) return false;

	const match = /^v1\.([1-9]\d{0,15})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(token);
	if (!match) return false;

	const payload = `v1.${match[1]}.${match[2]}`;
	const expectedSignature = createHmac('sha256', sessionKey).update(payload).digest();
	const signature = Buffer.from(match[3], 'hex');
	const expiresAt = Number(match[1]);

	return timingSafeEqual(signature, expectedSignature)
		&& Number.isSafeInteger(expiresAt)
		&& expiresAt > Math.floor(Date.now() / 1000);
}
