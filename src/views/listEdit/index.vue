<template>
  <div class="block-model">
    <div class="title">
      <span>应用列表</span>
      <el-button type="primary" v-if="!editStatus" :icon="Edit" @click="handleEdit">编辑</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      style="width: 100%"
      :span-method="objectSpanMethod"
    >
      <el-table-column prop="modelType" label="参数" />
      <el-table-column prop="modelContent" label="内容" />
      <el-table-column prop="modelCoefficient" label="系数">
        <template #default="scope">
          <span v-if="!editStatus">{{ scope.row.modelCoefficient }}</span>
          <div v-else>
            <el-input v-model="tableData[scope.$index].modelCoefficient" />
            <span
              class="error"
              v-if="
                !(
                  /^0(\.\d{1,2})$/.test(tableData[scope.$index].modelCoefficient) ||
                  /^[1-4](\.\d{1,2})?$/.test(tableData[scope.$index].modelCoefficient)
                )
              "
            >
              系数必须大于0小于5且最多两位小数;
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="modelWeight" label="权重">
        <template #default="scope">
          <span v-if="!editStatus">{{ scope.row.modelWeight }}</span>
          <div v-else>
            <el-input v-model="tableData[scope.$index].modelWeight" />
            <span class="error" v-if="!/^0(\.\d{1,2})$/.test(tableData[scope.$index].modelWeight)">
              权重必须为大于0小于1且最多2位小数
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="editBtnWrap" v-if="editStatus">
      <el-space>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import Mock from 'mockjs'; // mock数据用 你的页面应该删除mock数据

// 处理合并数据
const joinCol = ref<any>({});
const addJoinData = () => {
  joinCol.value = {};
  console.log(tableData.value);
  tableData.value.forEach((item: any) => {
    if (!joinCol.value[item.markModelId]) {
      joinCol.value[item.markModelId] = [];
    }
    joinCol.value[item.markModelId].push(item);
    item.batchIndex = joinCol.value[item.markModelId]?.length;
  });

  // 排序后 相邻的合并 排序根据你自己的业务需求，如果产品有特殊的排序需求 前端此处不需要排序 后端返回的数据就是固定的排序，可以合并
  tableData.value = tableData.value.sort((pre: any, next: any) => {
    return pre.markModelId - next.markModelId;
  });
};
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  if (columnIndex == 0 || columnIndex == 3) {
    if (row.batchIndex === 1) {
      return {
        rowspan: joinCol.value[row.markModelId].length,
        colspan: 1
      };
    } else {
      return {
        rowspan: 0,
        colspan: 1
      };
    }
  } else {
    return [1, 1];
  }
};
// 编辑标志位
const editStatus = ref(false);
const handleEdit = () => {
  editStatus.value = true;
};
const handleCancel = () => {
  editStatus.value = false;
  handleSearch();
};
const handleSave = async () => {
  const joinCol: any = {};
  let modelWeightTotal = 0;
  for (let index = 0; index < tableData.value.length; index++) {
    const item = tableData.value[index];
    item.modelCoefficient = Number(item.modelCoefficient);
    item.modelWeight = Number(item.modelWeight);
    const { markModelId, ...other } = toRaw(item);
    if (
      !(
        /^0(\.\d{1,2})$/.test(item.modelCoefficient) ||
        /^[1-4](\.\d{1,2})?$/.test(item.modelCoefficient)
      )
    ) {
      ElMessage({
        message: '系数必须大于0小于5且最多两位小数;',
        type: 'error'
      });
      return;
    }
    if (!/^0(\.\d{1,2})$/.test(item.modelWeight)) {
      ElMessage({
        message: '权重必须为大于0小于1且最多2位小数',
        type: 'error'
      });
      return;
    }
    if (!joinCol[markModelId]) {
      joinCol[markModelId] = {
        markModelId: markModelId,
        dispositionType: 'DOT_SCORE_TYPE',
        markModelDetailInfoVoList: []
      };
      modelWeightTotal += Number(item.modelWeight);
    }
    joinCol[markModelId].markModelId = markModelId;
    joinCol[markModelId].markModelDetailInfoVoList.push(other);
  }
  if (modelWeightTotal.toFixed(2) != '1.00') {
    ElMessage({
      message: '权重累计需为1',
      type: 'error'
    });
    return;
  }
  const markModelInfoParamList: any[] = Object.values(joinCol);
  // TODO 更新请求
  editStatus.value = false;
};

const tableLoading = ref(false);
const tableData: any = ref([]);
const handleSearch = async () => {
  // TODO 请求原始数据
  const data = Mock.mock({
    'list|10': [
      {
        markModelId: /[1-4]/,
        modelType: '@word',
        modelContent: '@cname',
        modelCoefficient: /[1-5]/,
        modelWeight: Mock.Random.float(0, 1, 2, 2) // 0-1之间两位小数
      }
    ],
    total: 100
  });
  setTimeout(() => {
    tableData.value = data.list;
    tableLoading.value = false;
    addJoinData();
  }, 500);
};
handleSearch();
</script>

<style scoped lang="scss">
.block-model {
  padding: 0px 20px 20px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 2px 2px 0px 0px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      font-weight: normal;
      color: #262626;
      font-size: 16px;

      &::before {
        display: inline-block;
        margin-right: 10px;
        content: '';
        width: 4px;
        height: 10px;
        background-color: #2077ff;
        border-radius: 2px;
      }
    }
  }

  .editBtnWrap {
    display: flex;
    justify-content: flex-end;
  }

  .error {
    color: red;
  }
}
</style>
