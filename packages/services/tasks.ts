import { z } from 'zod';
import api from './api';
import { NewTaskProps, TaskProps } from './types';

api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODAxMjg0MDMsImV4cCI6MTY4MjcyMDQwMywic3ViIjoiZDA4YzhkMGQtYWUwZS00MTAyLTkyZTQtOTU5N2Q1ZjAzZmI5In0.hDhSs5PYvydXQktgWdQ5eDz-kIns3s3iDnIn3f1dymU`;

export const createTask = async ({ content }: NewTaskProps): Promise<TaskProps> => {
  try {
    const schema = z.string().min(1);
    const task = schema.parse(content);
    
    const response = await api.post('/task', { content: task });
    return response.data
  } catch (error: any) {
    throw new Error(error);
  }
}
export const getTasks = async (): Promise<TaskProps[]> => {
  try {
    const response = await api.get('/task');
    return response.data
  } catch (error: any) {
    throw new Error(error);
  }
}
export const deleteTask = async (task: TaskProps):Promise<TaskProps> => {
  try {
    await api.delete(`/task/${task.id}`);
    return task
  } catch (error:any) {
    throw new Error(error);
  }
}
export const updateTask = async (task: TaskProps): Promise<TaskProps> => {
  try {
    const response = await api.put(`/task/${task.id}`, task);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}