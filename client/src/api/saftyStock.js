import { axiosGet, axiosPost, axiosPut } from "../api/axiosService";
const URL_API_GET = "/safety_stock/all";
const URL_POST = "/safety_stock/add";

export const _ApiSafyStock = () => {
  return {
    Getlist: async (params) => {
      return await axiosGet(URL_API_GET, params);
    },

    Create: async (body) => {
      return await axiosPost(URL_POST, body);
    },

    Update: async (body, id) => {
      return await axiosPut(`/safety_stock/edit/${id}`, body);
    },
    DDL: async (params) => {
      return await axiosGet("/safety_stock/master", params);
    },
    Delete: async (body) => {
      return await axiosPost("/safety_stock/delete", body);
    },
  };
};
