import users from '../users.json';

export const buildUserPayload = (overrides = {}) => ({
  ...users.validUser,
  email: users.validUser.email.replace('@', `+${crypto.randomUUID()}@`),
  ...overrides,
});
