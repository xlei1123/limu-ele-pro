<template>
  <div class="articleList">
    <div class="left">
      <Article v-for="article in tableData" :key="article.id" :article="article" />
      <div class="pagination">
        <LimuPagination
          :total="total"
          :currentPage="currentPage"
          :pageSize="pageSize"
          @update="handleUpdate"
        />
      </div>
    </div>
    <div class="right">
      <el-affix :offset="60">
        <h4>文章榜</h4>
        <div class="favorite">
          <p class="ellipsis">1. 使用Nest+LangChain给低代码</p>
          <p class="ellipsis">2. js如何实现当文本内容过长时，中间显示省略号...,两端正常展示</p>
          <p class="ellipsis">3. 偷偷分享下我们公司的研发规范~</p>
          <p class="ellipsis">4. 前端妹子失业在家刷题，开发了个leetcode刷题工具，效率直接翻倍！</p>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LimuPagination from '@/components/LimuPagination.vue';
import Article from './components/Articel.vue';
import Mock from 'mockjs'; //  mock数据用 你的页面应该删除mock数据
const Random = Mock.Random;

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

const getDataList = async () => {
  tableLoading.value = true;
  // TODO 请求
  const data = Mock.mock({
    'list|10': [
      {
        title: Random.cword(10, 20),
        summary: Random.cword(30, 60),
        author: '@cname', // 中文名
        goodCount: /[1-2][0-9]/, // 英文单词
        readCount: /[3-9][0-9]{2}/, // 正则模式
        org: Mock.mock('@cword(2,4)'), // 随机2-4字中文单词
        id: '@guid', // guid
        createTime: '@datetime',
        labels: ['前端', '后端', '程序员', 'css', 'java']
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
</script>

<style scoped lang="scss">
.articleList {
  display: flex;
  border-radius: 4px;
  .pagination {
    margin-top: 30px;
  }
  .left {
    width: 70%;
    padding: 16px;
    overflow: hidden;
    background-color: #fff;
  }
  .right {
    margin-left: 20px;
    width: calc(30% - 20px);
    padding: 0 10px;
    background-color: #fff;
    font-size: 13px;
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .favorite {
    p {
      cursor: pointer;
      padding: 10px 10px;
      margin: 0;
      &:hover {
        background-color: rgb(242, 243, 245);
      }
    }
  }
}
</style>
