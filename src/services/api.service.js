const BASE_URL = process.env.BACKEND_API_URL;

const fetchApi = async (url, options = { method: "GET" }) => {
  const { method, data } = options;

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body: JSON.stringify(data),
    });

    const res = await response.json();

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateBlockDataById = (id, obj) => {
  return fetchApi(`/blocks/${id}`, { method: "PUT", data: obj });
};

export const getModules = () => {
  return fetchApi(`/modules`);
};
