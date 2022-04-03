import axios, { AxiosResponse } from "axios";
import type { Response } from "@/@types/global";

let token: string | null = null;

const request = axios;

request.interceptors.request.use((ctx) => {
  console.log({ token });
  if (token && ctx.headers) {
    ctx.headers["authorization"] = token;
  }
  return ctx;
});

request.interceptors.response.use((resp: AxiosResponse<Response>) => {
  const { token: _token } = resp.data;
  if (_token) token = _token;

  if (resp.status >= 400) {
    // TODO
    alert(`error: ${resp.status}`);
  }

  if (resp.data.code !== 1) {
    alert(resp.data.message);
  }

  return resp.data;
});

export default request;
