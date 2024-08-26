<template>
  <div class="queryList">
    <el-form
      :inline="true"
      ref="ruleFormRef"
      label-width="80px"
      :rules="rules"
      :model="queryParams"
      class="queryCard"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入完整姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="queryParams.phone" placeholder="请输入完整手机号" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="queryParams.idCard" placeholder="请输入完整身份证号" />
      </el-form-item>
      <el-form-item label="所属机构">
        <el-select v-model="queryParams.org" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="函数校验" prop="funT">
        <el-input v-model="queryParams.funT" maxlength="10" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="queryParams.createTime"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetQuery" plain>重置</el-button>
        <el-button type="primary" @click="handleSearch(ruleFormRef)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tableList">
      <div class="title">
        <span>应用列表</span>
        <div>
          <el-button type="primary" @click="multipleAction">批量操作</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="tableLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="70" label="序号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="idCard" label="身份证号" />
        <el-table-column prop="org" label="所属机构" />
        <el-table-column prop="sales" label="代销者" />
        <el-table-column prop="createTime" label="注册时间" />
        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click="handleDel(scope.row.id)">
              删除
            </el-button>
            <el-button link type="primary" size="small" @click="visibleFlagHandle(scope.row.id)">
              其他
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <LimuPagination
          :total="total"
          :currentPage="currentPage"
          :pageSize="pageSize"
          @update="handleUpdate"
        />
      </div>
    </div>

    <EditDialog :editFlag="editFlagHandle" :initBlockData="blockData" @close="handleClose" />
    <Dialog :visibleFlag="visibleFlag" @close="visibleFlagClose" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';
import Mock from 'mockjs'; // mock数据用
import LimuPagination from '@/components/LimuPagination/index.vue';
import EditDialog from './components/EditDialog.vue';
import Dialog from './components/Dialog.vue';

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }
  }
];

// 查询校验
const checkNumber = (_rule: any, value: any, callback: any) => {
  if (!value || /^[1-9]\d{0,9}$/.test(value)) {
    callback();
  } else {
    callback(new Error('只能输入最多10位正整数'));
  }
};
const rules = {
  name: [
    {
      pattern: /^(?=.{1,20}$)(?!.*([·])\1)[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5·]{0,}[\u4e00-\u9fa5]+$/,
      message: '最多20位,不能以·开头结尾,·不能连续'
    }
  ],
  phone: [{ pattern: /^1[0-9]{10}$/, message: '请输入11位手机号' }],
  idCard: [{ pattern: /^[0-9]{17}([0-9]|X)$/, message: '请输入正确的身份证号' }],
  funT: [{ validator: checkNumber, trigger: 'change' }]
};
// 查询初始值
const initQueryParams = {
  name: '',
  phone: '',
  idCard: '',
  org: '',
  funT: '',
  createTime: ''
};

const queryParams = ref({ ...initQueryParams });
// tabel列表
const tableLoading = ref(false);
const tableData: any = ref([]);
const total = ref(100);
const currentPage = ref(1);
const pageSize = ref(10); // limit; start = (currentPage.value-1) * limit;
interface Page {
  currentPage: number;
  pageSize: number;
}
const handleUpdate = async (page: Page) => {
  currentPage.value = page.currentPage;
  pageSize.value = page.pageSize;
  await getDataList();
};

// 主页面请求数据
const getDataList = async () => {
  tableLoading.value = true;
  // TODO 请求
  const data = Mock.mock({
    'list|10': [
      {
        name: '@cname', // 中文名
        sales: '@word', // 英文单词
        idCard: /1[0-9]{17}/, // 正则模式
        phone: /1[3-9][0-9]{9}/, // 正则模式
        org: Mock.mock('@cword(2,4)'), // 随机2-4字中文单词
        id: '@guid', // guid
        createTime: '@datetime'
      }
    ],
    total: 100
  });
  setTimeout(() => {
    tableData.value = data.list;
    total.value = data.total;
    tableLoading.value = false;
  }, 500);
};
getDataList();

const ruleFormRef = ref<FormInstance>();
const handleSearch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      currentPage.value = 1;
      getDataList();
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 重置
const resetQuery = () => {
  queryParams.value = initQueryParams;
  getDataList();
};

// 删除
const handleDel = (id: number) => {
  console.log(id);
  ElMessageBox.confirm('你确定要删除嘛？', '确认提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    // type: 'warning',
    draggable: true
  })
    .then(() => {
      // TODO 确认删除 请求删除接口
      ElMessage({
        type: 'success',
        message: '删除成功'
      });
    })
    .catch(() => {
      // 取消
      ElMessage({
        type: 'info',
        message: '已取消删除'
      });
    });
};

// 编辑
const editFlagHandle = ref(false);
const blockData = ref<any>({});
const handleEdit = async (data: any) => {
  editFlagHandle.value = true;
  blockData.value = data;
};

const handleClose = async () => {
  blockData.value = {};
  editFlagHandle.value = false;
};

// 其他
const visibleFlag = ref(false);
const visibleFlagHandle = (_val: string) => {
  visibleFlag.value = true;
};
const visibleFlagClose = async () => {
  visibleFlag.value = false;
};

const multipleSelection = ref<any[]>([]);
const handleSelectionChange = async (val: any[]) => {
  multipleSelection.value = val;
};
const multipleAction = async () => {
  // TODO 请求接口
  await getDataList();
};
</script>

<style scoped lang="scss">
.queryList {
  overflow: hidden;
  border-radius: 2px 2px 0px 0px;
  .queryCard {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    padding: 20px 20px 0;
    background-color: #fff;
    .el-input {
      --el-input-width: 200px;
    }
    .el-select {
      --el-select-width: 200px;
    }
    :deep(.el-date-editor) {
      width: 200px;
    }
  }
  .tableList {
    padding: 20px;
    background-color: #fff;
  }
  .title {
    padding: 10px;
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
  .pagination {
    margin-top: 30px;
  }
}
</style>
