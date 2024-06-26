// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://192.168.0.108:5000/tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTask = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const completeTask = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/complete`);
  return response.data;
};

export const deleteAllTasks = async () => {
  const response = await axios.delete(API_URL);
  return response.data;
};