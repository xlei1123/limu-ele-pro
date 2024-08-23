<template>
  <div class="userInfo">
    <div class="basicInfo">
      <el-avatar :icon="UserFilled" :size="62" />
      <div class="info">
        <div class="name">
          早安，吴彦祖，祝你开心每一天！
        </div>
        <div class="welcome">
          交互专家 |某某公司－某某某事业群－某某平台部－某某技术部－UED
        </div>
      </div>
    </div>
    <el-descriptions
      direction="vertical"
      :column="3"
      align="center"
      class="moreInfo"
    >
      <el-descriptions-item label="项目数"><b>31</b></el-descriptions-item>
      <el-descriptions-item label="团队内排名"><b>8 / 24</b></el-descriptions-item>
      <el-descriptions-item label="项目访问"><b>2,223</b></el-descriptions-item>
    </el-descriptions>
  </div>
  <div class="content">
    <div class="left">
      <el-card class="projectsCard" body-class="projectsWrapper">
        <template #header>
          <div class="cardHeader">
            <span>进行中项目</span>
          </div>
        </template>
        <div class="projects">
          <el-card shadow="hover"class="project" v-for="project in projects" :key="project.title">
            <div>
              <p class="title"><el-avatar :src="project.avatar"/> <span class="titText">{{ project.title }}</span></p>
              <p class="desc">{{ project.desc }}</p>
              <p><span class="author">{{ project.author }}</span><span class="time">{{ project.time }}</span></p>
            </div>
          </el-card>
        </div>
      </el-card>
      <el-card class="trends" header="动态">
        <div class="infiniteWrapper" style="overflow: auto">
          <ul
            v-infinite-scroll="load"
            class="list"
            :infinite-scroll-disabled="disabled"
          >
            <li v-for="i in count" :key="i" class="listItem">{{ i }}</li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">~到底了~</p>
        </div>
      </el-card>
    </div>
    <div class="right">
      <div class="nav">
        <el-card header="行业最新动态" class="news">
          <p v-for="item in news" class="item">{{item}}</p>
        </el-card>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';

const projects = ref([
  {
    title: 'limu',
    desc: '那是一种内在的东西，他们到达不了，也无法触及的',
    author: '科学搬砖祖',
    time: '3秒前',
    avatar: '/favicon.ico'
  },
  {
    title: 'limu-paste',
    desc: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    author: '中二少女团',
    time: '1分钟前',
    avatar: '/favicon.ico'
  },
  {
    title: 'wx-app',
    desc: '那时候我只会想自己想要什么，从不想自己拥有什么',
    author: '程序员日常',
    time: '3年前',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
  },
  {
    title: 'Bootstrap',
    desc: '凛冬将至',
    author: '高逼格设计天团',
    time: '4天前',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
  },
  {
    title: 'Vue',
    desc: '生命就像一盒巧克力，结果往往出人意料',
    author: '骗你来学计算机',
    time: '1周前',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
  },
  {
    title: 'JQuery',
    desc: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    author: '全组都是吴彦祖',
    time: '1月前',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
  }
]);

const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 600)
}

const news = ref([
  'Web组件和自定义元素，趋势概述：Web组件技术',
  '前端框架和库的持续演进',
  'TypeScript的普及',
  'Progressive Web Apps (PWA) 的推广',
  'WebAssembly (Wasm) 的应用',
  '前端开发工具的发展',
  '人工智能和机器学习',
  'Web组件和自定义元素，趋势概述：Web组件技术',
  '前端框架和库的持续演进',
  'TypeScript的普及',
  'Progressive Web Apps (PWA) 的推广',
  'WebAssembly (Wasm) 的应用',
  '前端开发工具的发展',
  '人工智能和机器学习'
])
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 33px;
}
.basicInfo {
  display: flex;
  align-items: center;
  .info {
    margin-left: 18px;
    .name {
      font-size: 18px;
    }
  }
  .welcome {
    margin-top: 12px;
    color: rgba(0, 0, 0, 0.65);
  }
}
.moreInfo {
  width: 300px;
  :deep(.el-descriptions__body) {
    background-color: transparent;
  }
  b {
    font-size: 16px;
  }
}
.content {
  display: flex;
  .left {
    flex: 2;
    margin-right: 20px;
    padding: 0;
    .projectsCard {
      border: none;
      :deep(.el-card__header) {
        border: none;
      }
      :deep(.projectsWrapper) {
        padding: 0;
        border: none;
      }
      .projects {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        .project {
          padding: 0;
          margin: 0;
          width: 33.33%;
          border-radius: 0;
          margin-block-start: -1px;
          margin-inline-start: -1px;
          border-right: 0;
          .title {
            display: flex;
            align-items: center;
            .titText {
              margin-left: 14px;
            }
          }
          .desc {
            height: 40px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
          }
          .author, .time {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.65);
          }
          .time {
            margin-left: 5px;
            color: rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
    .trends {
      margin-top: 20px;
      .infiniteWrapper {
        height: 300px;
        text-align: center;
        .list {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .listItem {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          background: var(--el-color-danger-light-9);
          color: var(--el-color-danger);
        }
      }
    }
  }
  .right {
    flex: 1;
    .news {
      .item {
        border-bottom: 1px dashed #ccc;
      }
    }
  }
}
</style>
