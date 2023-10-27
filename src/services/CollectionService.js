import APIService from "./APIService";



async function addCollection(name, description, token) {
  let request_payload = {
    name: name, 
    description: description
  }
  return APIService.postRequest('/collections', request_payload, token);
}


async function getCollections(token) {
  return APIService.getRequest('/collections', token);
}


async function updateCollection(id, name, description, token) {
  let request_payload = {
    name: name, 
    description: description
  }
  return APIService.putRequest('/collections/' + id, request_payload, token);
}


const CollectionService = {
    getCollections,
    addCollection,
    updateCollection
};

export default CollectionService;
