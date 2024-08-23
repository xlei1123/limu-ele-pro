import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 获取列表1
 * @returns
 */
export function getList1(data?: { appId: string }): AxiosPromise {
  return request({
    url: '/limu/getList1/v1.0.0',
    method: 'post',
    data,
    baseURL: import.meta.env.VITE_APP_LIMU_API
  });
}

/**
 * 获取列表2
 * @returns
 */
export function getList2(data?: any): AxiosPromise {
  return request({
    url: '/limu/getList2/v1.0.0',
    method: 'post',
    data,
    baseURL: import.meta.env.VITE_APP_LIMU_API
  });
}

/**
 * 获取列表3
 * @returns
 */
export function getList3(data?: any): AxiosPromise {
  return request({
    url: '/limu/getList2/v1.0.0',
    method: 'post',
    data,
    baseURL: import.meta.env.VITE_APP_LIMU_API
  });
}

/**
 * 获取统计 getSummaryTotal
 */

export function getSummaryTotal(data?: any): AxiosPromise {
  return request({
    url: '/limu/getSummaryTotal/v1.0.0',
    method: 'post',
    data,
    baseURL: import.meta.env.VITE_APP_LIMU_API
  });
}

/**
 * 获取统计列表
 */

export function getDataStatisticList(data?: any): AxiosPromise {
  return request({
    url: '/limu/getDataStatisticList/v1.0.0',
    method: 'post',
    data,
    baseURL: import.meta.env.VITE_APP_LIMU_API
  });
}
