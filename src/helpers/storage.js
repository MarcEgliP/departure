export function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}
export function getToken() {
    return sessionStorage.getItem('token');
}

export function tokenIsPresent() {
    return getToken() != null;
}