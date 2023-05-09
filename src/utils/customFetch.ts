const customFetch = async (
  url: string,
  options?: { method?: string; headers?: HeadersInit; body?: BodyInit | null }
) => {
  try {
    const response = await fetch(url, {
      method: options?.method ?? 'GET',
      headers: options?.headers ?? {},
      body: options?.body ?? null,
    });

    if (!response.ok) {
      const { error }: { error: string } = await response.json();
      throw new Error(error);
    }

    return await response.json();
  } catch (error) {
    const message = error.message || 'Something went wrong';
    return message;
  }
};

export default customFetch;
