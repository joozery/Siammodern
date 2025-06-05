import { axiosGet, axiosPost, axiosPut } from "../api/axiosService";
const URL_API_GET = "/products";
const URL_POST = "/products/add";

export const _ApiProducts = () => {
  return {
    Getlist: async (params) => {
      return await axiosGet(URL_API_GET, params);
    },

    Create: async (body) => {
      return await axiosPost(URL_POST, body);
    },

    Update: async (body, id) => {
      return await axiosPut(`/products/edit/${id}`, body);
    },
    DDL: async (params) => {
      return await axiosGet("/products/master", params);
    },
    Delete: async (body) => {
      return await axiosPost("/products/delete", body);
    },
  };
};
