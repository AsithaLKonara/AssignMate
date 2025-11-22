export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Assignment {
  id: string;
  question: string;
  answer: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

