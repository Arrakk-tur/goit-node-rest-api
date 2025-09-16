import gravatar from 'gravatar';

export const createAvatar = email => gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
