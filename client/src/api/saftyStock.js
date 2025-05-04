import { axiosGet, axiosPost, axiosPut } from "../api/axiosService";
const URL_API_GET = "/safety_stock/all";
const URL_POST = "/safety_stock/add";
const URL_PUT = "/safety_stock/update";

export const _ApiSafyStock = () => {
  return {
    Getlist: async (params) => {
      return await axiosGet(URL_API_GET, params);
    },

    Create: async (body) => {
      return await axiosPost(URL_POST, body);
    },

    Update: async (body) => {
      return await axiosPut(URL_PUT, body);
    },
  };
};
