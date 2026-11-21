export default function sitemap() {
  return [
    { url: 'https://aimvirtue.com', lastModified: new Date(), priority: 1 },
    { url: 'https://aimvirtue.com/team', lastModified: new Date(), priority: 0.8 },
    { url: 'https://aimvirtue.com/afterhours', lastModified: new Date(), priority: 0.8 },
    { url: 'https://aimvirtue.com/verify', lastModified: new Date(), priority: 0.7 },
    { url: 'https://aimvirtue.com/feedback', lastModified: new Date(), priority: 0.6 },
  ];
}