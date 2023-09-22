const navbar = {
  name: 'navbar',
  title: 'Navigation Bar',
  type: 'document',
  fields: [
    {
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true, // Enables custom cropping
      },
    },
    {
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
    },
    {
      name: 'primaryLinkText',
      type: 'string',
      title: 'Primary Link Text',
    },
    {
      name: 'primaryLinkUrl',
      type: 'string',
      title: 'Primary Link URL',
    },
    {
      name: 'secondaryLinkText',
      type: 'string',
      title: 'Secondary Link Text',
    },
    {
      name: 'secondaryLinkUrl',
      type: 'string',
      title: 'Secondary Link URL',
    },
  ],
};

export default navbar;
