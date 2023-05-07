export function setToken(userToken) {
    sessionStorage.setItem('x-access-token', userToken);
}
export function getToken() {
    return sessionStorage.getItem('x-access-token');
}

export function tokenIsPresent() {
    return getToken() != null;
}