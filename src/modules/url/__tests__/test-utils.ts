export const host = `http://localhost:3000`;

export const uid = `abc123`;

export const generateUrlPayload = ({
  description,
}: {
  description?: null;
}) => ({
  id: 1,
  title: 'Google',
  description: description === null ? null : 'A search engine',
  redirect: 'https://google.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  url: `${host}/${uid}`,
});

export const generateUrlArray = () => [
  {
    id: 1,
    title: 'Google',
    description: 'A search engine',
    redirect: 'https://google.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: `${host}/${uid}`,
  },
  {
    id: 2,
    title: 'Facebook',
    description: 'A social media platform',
    redirect: 'https://facebook.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: `${host}/facebook-unique-id`,
  },
  {
    id: 3,
    title: 'Twitter',
    description: 'A social media platform',
    redirect: 'https://twitter.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: `${host}/twitter-unique-id`,
  },
];

export const createManyUrls = ({ host }: { host: string }) => [
  {
    title: `Google`,
    redirect: `https://google.com`,
    url: `${host}/1`,
  },
  {
    title: `Facebook`,
    redirect: `https://facebook.com`,
    url: `${host}/2`,
  },
  {
    title: `Twitter`,
    redirect: `https://twitter.com`,
    url: `${host}/3`,
  },
];
