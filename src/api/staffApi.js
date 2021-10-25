import axiosClient from './axiosClient';

const staffApi = {
  getAll(params) {
    const url = '/staffs';
    return axiosClient.get(url, { params });
  },

  //   get(id) {
  //     const url = `/staffs/${id}`;
  //     return axiosClient.get(url);
  //   },

  add(data) {
    const url = '/staffs';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/staffs/${data._id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/staffs/${id}`;
    return axiosClient.delete(url);
  },
};

export default staffApi;
