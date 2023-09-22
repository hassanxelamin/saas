import { Price } from '@/src/types-db';

export const getUrl = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // This environment variable is automatically set by Vercel
    'http://localhost:3000/'; // If neither, default to 'http://localhost:3000/'

  // If the URL does not start with 'http', prepend 'http://' to the URL.
  url = url.includes('http') ? url : `http://${url}`;

  // If the URL does not end with a '/', append '/' to the URL.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

  return url;
};

export const postData = async ({
  url,
  data,
  headers = {},
}: {
  url: string;
  data?: { price: Price };
  headers?: Record<string, string>;
}) => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', ...headers }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });
    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  const t = new Date('1970-01-01T00:30:00Z');
  t.setSeconds(secs);
  return t;
};
