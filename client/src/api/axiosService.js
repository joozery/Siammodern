import axios from "axios";

// ตั้งค่า baseURL จาก .env
axios.defaults.baseURL = import.meta.env.VITE_URL_API;

const configAuthenHeader = () => {
  return {
    "Content-Type": "application/json",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  };
};

// ฟังก์ชัน POST
const axiosPost = async (Path, body) => {
  return await axios
    .post(Path, body, configAuthenHeader())
    .then((response) => {
      // ถ้าผ่าน
      return response.data;
    })
    .catch((error) => {
      // ถ้า Error
      return error?.response?.data;
    });
};

// ฟังก์ชัน GET
const axiosGet = async (Path, params = {}) => {
  return await axios
    .get(Path, { params, ...configAuthenHeader() }) // ส่ง params ผ่าน query string
    .then((response) => {
      // ถ้าผ่าน
      return response.data;
    })
    .catch((error) => {
      // ถ้า Error
      return error?.response?.data;
    });
};

// ฟังก์ชัน PUT
const axiosPut = async (Path, body) => {
  return await axios
    .put(Path, body, configAuthenHeader())
    .then((response) => {
      // ถ้าผ่าน
      return response.data;
    })
    .catch((error) => {
      // ถ้า Error
      return error?.response?.data;
    });
};

export { axiosPost, axiosGet, axiosPut };
