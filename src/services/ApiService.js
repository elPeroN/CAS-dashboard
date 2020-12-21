export const authHeader = authToken => ({
  Token: authToken,
  Accept: "application/json"
});

export const apiCall = (
  method,
  url,
  content_type,
  data = false,
  headers ,
) => {
  let base = data === false ? {} : { body: JSON.stringify(data) };
  return fetch(url, {
    ...base,
    method: method,
    headers: {
      "Content-Type": content_type,
      ...headers
    }
  });
};

export const authReq = (url, httpReqType, content_type, authToken, data) =>
  apiCall(httpReqType, url, content_type, data, authHeader(authToken)).then(_ =>
    _.json()
  );

export const authReqWithoutJSON = (
  url,
  httpReqType,
  content_type,
  authToken,
  data
) => apiCall(httpReqType, url, content_type, data, authHeader(authToken));

export const jsonAuthReq = (url, httpReqType, content_type, authToken, data) =>
  apiCall(httpReqType, url, content_type, data, {
    ...authHeader(authToken),
    Accept: content_type
  }).then(_ => _.json());

export const authGET = (url, content_type, authToken) =>
  apiCall("GET", url, content_type, false, authHeader(authToken)).then(response =>
    {console.log(response);}
    //response.json()
  );

export const authPOST = (url, content_type, data, authToken) =>
  apiCall("POST", url, content_type, data, authHeader(authToken)).then(_ =>
    _.json()
  );

export const noAuthApiCall = (
  method,
  url,
  data,
  content_type,
  headers = {},
  body = {}
) => apiCall(method, url, content_type, data, headers).then(_ => _.json());

export const apiCallWithBody = (method, url, data, authToken, content_type) =>
  apiCall(method, url, content_type, data, authHeader(authToken));

export const apiCallWithFormData = (
  method,
  url,
  data,
  authToken,
  content_type
) => {
  return fetch(url, {
    method: method,
    body: data,
    headers: {
      Accept: "application/json",
      ...authHeader(authToken)
    }
  });
};
