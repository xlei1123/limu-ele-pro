<template>
  <div class="approve">
    <div class="userInfo">
      <div class="basicInfo">
        <el-avatar :icon="UserFilled" :size="62" />
        <div class="info">
          <div class="nameScore">
            <b>张三</b>
            <span class="score">
              <el-icon class="icon"><SuccessFilled /></el-icon>
              积分·100
            </span>
          </div>
          <div class="status">
            状态·正常
          </div>
        </div>
      </div>
      <div class="moreInfo">
        <el-descriptions :column="1">
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Iphone /></el-icon>
                手机号
              </div>
            </template>
            131100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><School /></el-icon>
                银行
              </div>
            </template>
            工商银行
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Postcard /></el-icon>
                身份证号
              </div>
            </template>
            110101129810101011</el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><CreditCard /></el-icon>
                银行卡号
              </div>
            </template>
            6123 1212 9739 8127
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><School /></el-icon>
                所属机构
              </div>
            </template>
            机构A
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Timer /></el-icon>
                申请时间
              </div>
            </template>
            2024-06-20 13:23:45
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Location /></el-icon>
                地市区划
              </div>
            </template>
            上海市浦东区
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><User /></el-icon>
                代销者
              </div>
            </template>
            代销者A
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="process">
      <h4 class="tit">开设申请审批流程</h4>
      <el-timeline style="max-width: 380px">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :type="activity.type"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import {
  UserFilled,
  Iphone,
  Location,
  School,
  User,
} from '@element-plus/icons-vue';

const activities = [
  {
    content: '提交申请',
    timestamp: '2018-04-08',
    type: 'success' as const
  },
  {
    content: '系统验证',
    timestamp: '2018-04-08',
    type: 'warning' as const
  },
  {
    content: '省中心初审',
    timestamp: '2018-04-11',
  },
  {
    content: '中心初审',
    timestamp: '2018-04-13',
  },
];
</script>

<style lang="scss" scoped>
.approve {
  display: flex;
  .userInfo {
    flex: 1;
    padding: 33px;
    background-color: #fff;
    .basicInfo {
      display: flex;
      align-items: center;
      .info {
        margin-left: 18px;
        .nameScore {
          display: flex;
          align-items: center;
        }
        b {
          font-size: 18px;
        }
        .score {
          display: flex;
          align-items: center;
          margin-left: 9px;
          color: #FFB300;
          font-weight: 500;
          .icon {
            margin-right: 4px;
          }
        }
      }
      .status {
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 98px;
        height: 24px;
        background: #1fc8bc;
        border-radius: 12px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        &::before {
          margin-right: 4px;
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border: 3px solid #95EBE5;
          border-radius: 50%;
        }
      }
    }
    .moreInfo {
      margin-top: 34px;
      margin-left: 78px;
      .cell-item {
        display: inline-block;
        width: 90px;
      }
    }
  }
  .process {
    margin-left: 16px;
    width: 328px;
    background-color: #fff;
    .tit {
      display: flex;
      align-items: center;
      margin-left: 26px;
      margin-bottom: 30px;
      font-size: 18px;
      &::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 14px;
        background: #2077ff;
        border-radius: 5px;
        margin-right: 6px;
      }
    }
  }
}


</style>
