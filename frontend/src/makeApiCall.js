import { getStoredCredentials, getStoredCredentials2 } from "./credentials";
export async function makeAPICall2(method, url, body) {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = getStoredCredentials2();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    let req = fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    return req;
  } catch (er) {
    throw er;
  }
}
export async function makeAPICall(method, url, body) {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = getStoredCredentials();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    let req = fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    return req;
  } catch (er) {
    throw er;
  }
}
