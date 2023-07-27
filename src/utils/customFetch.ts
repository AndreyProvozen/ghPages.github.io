const customFetch = async (url: string, { method = 'GET', headers = {}, body = null } = {}) => {
  try {
    const response = await fetch(url, { method, headers, body });

    if (!response.ok) {
      const { error }: { error: string } = await response.json();
      throw new Error(error);
    }

    return await response.json();
  } catch (error) {
    return error.message || 'Fetch error';
  }
};

export default customFetch;
