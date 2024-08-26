<template>
  <div class="basicInfo">
    <el-descriptions title="退款申请">
      <el-descriptions-item label="取货单号">1000000000</el-descriptions-item>
      <el-descriptions-item label="状态">已取货</el-descriptions-item>
      <el-descriptions-item label="销售单号">1234123421</el-descriptions-item>
      <el-descriptions-item label="子订单">1000000000</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户姓名">李牧</el-descriptions-item>
      <el-descriptions-item label="联系电话">18100000000</el-descriptions-item>
      <el-descriptions-item label="常用快递">菜鸟仓储</el-descriptions-item>
      <el-descriptions-item label="取货地址">浙江省杭州市西湖区万塘路18号</el-descriptions-item>
      <el-descriptions-item label="备注">无</el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <div>
      <h4>退货商品</h4>
      <el-table :data="refundTable" sum-text="合计" :summary-method="getSummaries" show-summary>
        <el-table-column prop="id" label="商品编号" width="180" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="code" label="商品条码" />
        <el-table-column prop="price" label="单价" />
        <el-table-column prop="num" label="数量（件）" />
        <el-table-column prop="total" label="金额" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Mock from 'mockjs'; // mock数据用
import type { VNode } from 'vue';

const getSummaries = (param: any) => {
  const { columns, data } = param;
  const sums: (string | VNode)[] = [];
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = '合计';
      return;
    }
    if (index < 4) {
      return;
    }
    const values = data.map((item: any) => Number(item[column.property]));
    if (!values.every((value: number) => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev: number, curr: number) => {
        const value = Number(curr);
        if (!Number.isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0)}`;
    } else {
      sums[index] = 'N/A';
    }
  });

  return sums;
};
const refundTable = ref([]);
const getDataList = async () => {
  // TODO 请求
  const data = Mock.mock({
    'list|4': [
      {
        name: '@cname', // 中文名
        price: /[1-9][0-9]/, // 英文单词
        code: /1[3-9][0-9]{9}/, // 正则模式
        num: 3, // 随机2-4字中文单词
        id: /1[3-9][0-9]{9}/, // guid
        total: /[1-9][0-9]{2}/
      }
    ],
    total: 100
  });
  setTimeout(() => {
    refundTable.value = data.list;
  }, 500);
};
getDataList();
</script>

<style lang="scss" scoped>
.basicInfo {
  padding: 20px;
  background-color: #fff;
}
</style>
