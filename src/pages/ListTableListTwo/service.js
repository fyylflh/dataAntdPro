import request from '@/utils/request';


export async function queryTidData() {
  return request('/api/dataTidList', {
    method: 'GET'
  });
}