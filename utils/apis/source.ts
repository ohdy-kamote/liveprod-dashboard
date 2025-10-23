export const SOURCE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ccf-liveprod.vercel.app'
  : process.env.SOURCE_URL || process.env.NEXT_PUBLIC_SOURCE_URL || 'http://localhost:3000';