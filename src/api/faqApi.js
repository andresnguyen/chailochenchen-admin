import axiosClient from './axiosClient';

const faqApi = {
  getAll(params) {
    const url = '/faqs';
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/faqs';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/faqs/${data.faqId}`;
    return axiosClient.patch(url, data.values);
  },

  remove(data) {
    const url = `/faqs/${data.faqId}`;
    return axiosClient.delete(url);
  },
};

export default faqApi;
