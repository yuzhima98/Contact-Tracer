export const tokenKey = `${process.env.PUBLIC_URL}_token`;
export const tokenKey2 = `${process.env.PUBLIC_URL}_token2`;

export function decodeUserObjectFromStoredCredentials() {
  try {
    const token = getStoredCredentials();
    const [, payload] = token.split(/\./);
    const decodedpayload = atob(payload); // base64 decode
    let { _id, username } = JSON.parse(decodedpayload);
    return {
      _id,
      username,
      authenticated: true,
    };
  } catch {
    return { authenticated: false };
  }
}

export function decodeUserObjectFromStoredCredentials2() {
    try {
      const token = getStoredCredentials2();
      const [, payload] = token.split(/\./);
      const decodedpayload = atob(payload); // base64 decode
      let { _id, username } = JSON.parse(decodedpayload);
      return {
        _id,
        username,
        authenticated: true,
      };
    } catch {
      return { authenticated: false };
    }
  }

export function getStoredCredentials() {
  return localStorage.getItem(tokenKey);
}

export function getStoredCredentials2() {
    return localStorage.getItem(tokenKey2);
  }

export function setStoredCredentials(credentials) {
  return localStorage.setItem(tokenKey, credentials);
}

export function setStoredCredentials2(credentials) {
    return localStorage.setItem(tokenKey2, credentials);
  }

export function clearStoredCredentials() {
  return localStorage.removeItem(tokenKey);
}

export function clearStoredCredentials2() {
    return localStorage.removeItem(tokenKey2);
  }