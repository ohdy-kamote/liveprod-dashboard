export const SOURCE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : process.env.SOURCE_URL || process.env.NEXT_PUBLIC_SOURCE_URL || 'http://localhost:3000';