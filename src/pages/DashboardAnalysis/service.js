import request from 'umi-request';

export async function dataTidList() {
  return request('/api/dataTidList');
}
