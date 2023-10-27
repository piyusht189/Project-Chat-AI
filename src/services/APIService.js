const API_BASE_URL = 'http://34.16.164.105:8080'; // Replace with your API base URL

async function getRequest(endpoint, token) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: new Headers(token? {
      'Authorization': 'Bearer '+ token
    }: {}) 
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }

  return response.json();
}

async function postRequest(endpoint, data, token) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
    } : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error creating data: ${response.status}`);
  }

  return response.json();
}

async function putRequest(endpoint, data, token) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
    } : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error updating data: ${response.status}`);
  }

  return response.json();
}

async function deleteRequest(endpoint, token) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
    } : {
      'Content-Type': 'application/json'
    },
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
