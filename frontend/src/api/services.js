import axiosInstance from './axios';

export const authAPI = {
  register: (data) => axiosInstance.post('/register', data),
  login: (data) => axiosInstance.post('/login', data),
  activateAccount: (token) => axiosInstance.get(`/activate?token=${token}`),
  resetPassword: (data) => axiosInstance.post('/reset-password', data),
};

export const profileAPI = {
  getProfile: () => axiosInstance.get('/profile'),
};

export const dashboardAPI = {
  getDashboard: () => axiosInstance.get('/dashboard'),
};

export const expenseAPI = {
  addExpense: (data) => axiosInstance.post('/expenses', data),
  getExpenses: () => axiosInstance.get('/expenses'),
  deleteExpense: (id) => axiosInstance.delete(`/expenses/${id}`),
};

export const incomeAPI = {
  addIncome: (data) => axiosInstance.post('/incomes', data),
  getIncomes: () => axiosInstance.get('/incomes'),
  deleteIncome: (id) => axiosInstance.delete(`/incomes/${id}`),
};

export const categoryAPI = {
  saveCategory: (data) => axiosInstance.post('/categories', data),
  getCategories: () => axiosInstance.get('/categories'),
  getCategoriesByType: (type) => axiosInstance.get(`/categories/${type}`),
  updateCategory: (id, data) => axiosInstance.put(`/categories/${id}`, data),
};

export const filterAPI = {
  filterTransactions: (data) => axiosInstance.post('/filter', data),
};
