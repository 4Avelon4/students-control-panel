import { API_BASE_URL } from '../config/path';

export async function serverAddStudent(obj) {
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = await response.json();

  return data;
}

export async function serverGetAllStudents() {
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  return data;
}

export async function serverSetStudent(id, obj) {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  const data = await response.json();

  return data;
}

export async function serverDeleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  return data;
}
