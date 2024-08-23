import { PageQueryParam, PageResult } from '../base';

/**
 * 登录用户类型声明
 */
export interface UserInfo {
  /** 用户Id */
  userId: string;
  /** 用户名 */
  loginName: string;
  /** 姓名 */
  name: string;
  /** 证件类型 */
  idType: string;
  /** 证件号码 */
  idNumber: string;
  /** 性别 */
  gender: string;
  /** 所属机构ids */
  org: string[];
  /** 中心机构 */
  orgCenterId: string;
  /** 省机构 */
  orgProvinceId?: string;
  /** 市机构 */
  orgCityId?: string;
  /** 区县机构 */
  orgAreaId?: string;
  /** 职位 */
  position: string;
  /** 工作电话 */
  workPhone?: string;
  /** 手机号 */
  mobile: string;
  /** 状态 */
  status: string;
  /** 删除标志 */
  deleted: string;
  /** 角色id逗号分割 */
  roleIds: string;
  /** 角色列表 */
  roles: Roles[];
  organizationLevel: number;
}
export interface Roles {
  /** 角色Id */
  roleId: string;
  /** 角色名称 */
  roleName: string;
  /** 角色类型:  0-市场管理员 1-仓库管理员 2-仓库操作员 3-印厂管理员 4-机构管理人员 */
  roleType: string;
}
