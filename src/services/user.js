import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryMyCurrent() {
  return request('/api/currentMyUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
