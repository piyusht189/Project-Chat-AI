import APIService from "./APIService";


async function login(email, password) {
  return APIService.postRequest('/login', {email: email, password: password});
}


const AuthenticationService = {
  login,
};

export default AuthenticationService;
