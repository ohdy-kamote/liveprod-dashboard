export async function checkMetabaseConnection(): Promise<boolean> {
  try {
    const response = await fetch('http://10.200.100.135:3000/api/health', {
      method: 'GET',
      timeout: 5000,
    });
    return response.ok;
  } catch (error) {
    console.error('Metabase connection failed:', error);
    return false;
  }
}

export async function testMetabaseEmbed(questionId: string): Promise<boolean> {
  try {
    const response = await fetch(`http://10.200.100.135:3000/embed/question/${questionId}`, {
      method: 'HEAD',
      timeout: 3000,
    });
    return response.ok;
  } catch (error) {
    console.error('Metabase embed test failed:', error);
    return false;
  }
}