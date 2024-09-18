<template>
  <div class="imageList">
    <div class="listTitBar">
      <span class="title">素材列表</span>
      <el-upload class="avatar-uploader" :show-file-list="false">
        <el-button type="primary">
          <el-icon class="el-icon--right"><Upload /></el-icon>
          上传
        </el-button>
      </el-upload>
    </div>
    <div class="listData" v-loading="listLoading">
      <div class="item" v-for="img in listData" :key="img.id">
        <div class="image">
          <div class="extra">
            <el-popover trigger="hover" placement="bottom" :width="60" :teleported="false">
              <div class="action">
                <p @click="handleEdit(img)">重命名</p>
                <p @click="handleDel(img)">删除</p>
              </div>
              <template #reference>
                <span class="actionBtn">···</span>
              </template>
            </el-popover>
          </div>
          <el-image :src="img.url" lazy />
          <div class="name">
            <el-input
              v-model="ImageTitle"
              v-if="reNameId === img.id"
              ref="inputRef"
              @change="changeValue"
              @blur="handleBlur"
              :autofocus="true"
            />
            <div v-else>{{ img.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <LimuPagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      layout="->, total, prev, pager, next, sizes, jumper"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watchEffect } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import LimuPagination from '@/components/LimuPagination.vue';
import Mock from 'mockjs'; // mock数据用 你的页面应该删除mock数据
import { watch } from 'fs';

interface Image {
  id: number;
  url: string;
  title: string;
}
const props = defineProps({
  group: {
    type: String,
    defalut: '',
    required: true
  }
});

// tabel列表
const listData: any = ref<Image[]>([]);
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
  await getDataList(props.group, currentPage.value, pageSize.value);
};
const listLoading = ref(true);
// 主页面请求数据
const getDataList = async (group: string, currentPage: number, pageSize: number) => {
  listLoading.value = true;
  // TODO 请求 依赖传入的group 自动更新
  const data = Mock.mock({
    'list|13': [
      {
        title: '@cname', // 中文名
        url: '/example.png',
        id: '@guid' // guid
      }
    ],
    total: 100
  });
  setTimeout(() => {
    listData.value = data.list;
    total.value = data.total;
    listLoading.value = false;
  }, 500);
};
getDataList(props.group, currentPage.value, pageSize.value);

watch(props.group, async () => {
  await getDataList(props.group, currentPage.value, pageSize.value);
});

const ImageTitle = ref();
const reNameId = ref();
const inputRef = ref();
const handleEdit = (img: Image) => {
  reNameId.value = img.id;
  ImageTitle.value = img.title;
  nextTick(() => {
    inputRef.value[0]?.focus();
  });
};

const handleBlur = () => {
  reNameId.value = undefined;
};
const changeValue = (v: string) => {
  // TODO 请求数据
  if (!v) return;
  reNameId.value = undefined;
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
</script>

<style scoped lang="scss">
.imageList {
  padding: 24px;
  background-color: #fff;
  .listTitBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      &::before {
        margin-right: 10px;
        display: inline-block;
        content: '';
        width: 4px;
        height: 10px;
        border-radius: 3px;
        background-color: #2077ff;
      }
    }
  }
  .listData {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 20px 0;
  }
  .item {
    flex: 0 0 18%;
    margin-right: calc(9.99% / 4);
    margin-bottom: 14px;
    padding: 18px;
    box-sizing: border-box;
    cursor: pointer;
    background-color: #f6f8fb;
    &:nth-child(5n) {
      margin-right: 0;
    }

    &:hover {
      background: rgba($color: #000000, $alpha: 0.2);
      .image {
        position: relative;
        .extra {
          display: block;
        }
      }
    }
    .extra {
      position: absolute;
      display: none;
      right: 15px;
      top: 15px;
      z-index: 99;
      :deep(.el-popper.is-light) {
        padding: 5px 0;
        min-width: 80px;
      }
      .action {
        text-align: center;
        line-height: 26px;
        p:hover {
          background-color: #eef4ff;
          color: #2077ff;
        }
      }
      .actionBtn {
        display: inline-block;
        color: #fff;
        text-align: center;
        height: 20px;
        width: 24px;
        line-height: 20px;
        border-radius: 4px;
        background: rgba($color: #000000, $alpha: 0.3);
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .name {
      height: 26px;
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
