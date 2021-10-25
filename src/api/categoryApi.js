import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/categories';
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.categoryId}`;
    return axiosClient.patch(url, data.values);
  },

  remove(data) {
    const url = `/categories/${data.categoryId}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
