import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
});

export const CourtDocsDataAPI = {

  async getData(data) {
    const responce = await instance
      .post(`/court/docs/get`, { data });
    return responce.data;
  },

  async uploadData(data) {
    const responce = await instance
      .post(`court/docs/upload`, { data });
    return responce.data;
  },

  async getTotalRecords() {
    const responce = await instance
      .get(`court/getTotalRecords`);
    return responce.data;
  },

}

export const TotalTasksDataAPI = {

  async getData(data) {
    const responce = await instance
      .post(`tasks/get`, { data });
    return responce.data;
  },

}

export const NewTasksDataAPI = {

  async getData(data) {
    const responce = await instance
      .post(`tasks/get`, { data });
    return responce.data;
  },

  async getTotalNewRecords() {
    const responce = await instance
      .get(`tasks/getTotalNewRecords`);
    return responce.data;
  },

  async distributeToWork(selectedTasks, user) {
    const responce = await instance
      .post(`tasks/distributeToWork`, { selectedTasks, user });
    return responce.data;
  },

}

export const MyTasksDataAPI = {

  async getData(lazyState, employer) {
    const responce = await instance
      .post(`tasks/my/get`, { lazyState, employer });
    return responce.data;
  },

}

export const InWorkTasksDataAPI = {

  async getData(lazyState, employer) {
    const responce = await instance
      .post(`tasks/inwork/get`, { lazyState, employer });
    return responce.data;
  },

  async updateData(rowData, uniqueNumber) {
    const responce = await instance
      .post(`tasks/inwork/update`, { rowData, uniqueNumber });
    return responce.data;
  },

  async getTotalInWorkRecords(employer) {
    const responce = await instance
      .post(`tasks/inwork/getTotalInWorkRecords`, { employer });
    return responce.data;
  },

}

export const CourtListDataAPI = {

  async getData(lazyState) {
    const responce = await instance
      .post(`courtlist/get`, { lazyState });
    return responce.data;
  },

  async updateData(rowData, employer) {
    // console.log(rowData);
    // console.log(employer);
    const responce = await instance
      .post(`courtlist/update`, { rowData, employer });
    return responce.data;
  },

}

export const UsersAPI = {

  async getUsers() {
    const responce = await instance
      .get(`users/get`);
    return responce.data;
  },

}

export const ValuesAPI = {

  async getValues() {
    const responce = await instance
      .get(`values/get`);
    return responce.data;
  },

}

export const AuthAPI = {

  async me() {
    const responce = await instance
      .get(`auth/me`, { headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },

  async login(login, password) {
    const responce = await instance
      .post(`auth/login`, { login, password });
    return responce.data;
  },

  async logout() {
    const responce = await instance
      .get(`auth/logout`, { headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },

}

export const ThemeAPI = {

  async updateTheme(theme) {
    const responce = await instance
      .put(`theme/update`, { theme }, { headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },

}