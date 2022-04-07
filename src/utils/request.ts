import { message } from 'antd';
import axios, { AxiosResponse } from "axios";
import type { Response } from "@/@types/global";

const request = axios;

request.interceptors.request.use((ctx) => {
  const token = localStorage.getItem('token');
  console.log({ token });
  if (token && ctx.headers) {
    ctx.headers["authorization"] = token;
  }
  return ctx;
});

request.interceptors.response.use((resp: AxiosResponse<Response>) => {
  const { token } = resp.data;
  if (token) {
    localStorage.setItem('token', token);
  }

  if (resp.status === 401) {
    message.error('用户验证过期, 请重新登陆');
  } else if (resp.status >= 400) {
    message.error(`error: ${resp.status}`);
  }

  if (resp.data.code !== 1) {
    // message.warn(resp.data.message);
  }

  return resp.data;
});

export default request;
