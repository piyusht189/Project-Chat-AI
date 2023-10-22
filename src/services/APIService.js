const API_BASE_URL = 'http://34.16.164.105:8080'; // Replace with your API base URL

async function getRequest(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }

  return response.json();
}

async function postRequest(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error creating data: ${response.status}`);
  }

  return response.json();
}

async function putRequest(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error updating data: ${response.status}`);
  }

  return response.json();
}

async function deleteRequest(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error deleting data: ${response.status}`);
  }

  return response.json();
}

const APIService = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};

export default APIService;
