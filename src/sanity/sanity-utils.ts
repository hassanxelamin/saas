import { createClient } from 'next-sanity';

export interface NavItem {
  logoImage: {
    asset: {
      url: string;
    };
  };
  brandName: string;
  primaryLinkText: string;
  primaryLinkUrl: string;
  secondaryLinkText: string;
  secondaryLinkUrl: string;
}

export async function getNav(): Promise<NavItem | null> {
  const client = createClient({
    projectId: 'w6c56ibm',
    dataset: 'production',
    apiVersion: '2023-06-27',
    useCdn: true,
  });

  try {
    const result: NavItem | null = await client.fetch(`*[_type == "navbar"]{
            "logoImage": logoImage.asset->url,
            brandName, 
            primaryLinkText, 
            primaryLinkUrl, 
            secondaryLinkText, 
            secondaryLinkUrl 
        }[0]`);
    return result;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
}
