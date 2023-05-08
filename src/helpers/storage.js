export function processLoginResponse(loginResponse) {
    setToken(loginResponse.token);
    setPersonalInformation(loginResponse);
}

export function setToken(userToken) {
    sessionStorage.setItem('x-access-token', userToken);
}
export function clearToken() {
    sessionStorage.removeItem('x-access-token');
}
export function getToken() {
    return sessionStorage.getItem('x-access-token');
}

export function setPersonalInformation(loginData) {
    const userObject = {
        "firstName": loginData.firstName,
        "lastName": loginData.lastName,
        "email": loginData.email
    }
    sessionStorage.setItem("personalInformation", JSON.stringify(userObject));
}

export function getPersonalInformation() {
    return JSON.parse(sessionStorage.getItem('personalInformation'));
}

export function tokenIsPresent() {
    return getToken() != null;
}