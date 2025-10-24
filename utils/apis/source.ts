export const SOURCE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : process.env.NEXTAUTH_URL || 'https://ccf-liveprod.vercel.app';