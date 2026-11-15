<template>
  <view class="page-shell">
    <view class="directory-hero">
      <view class="hero-copy">
        <text class="hero-label">CAMPUS DIRECTORY</text>
        <text class="hero-title">学生名册</text>
        <text class="hero-description">按姓名查找，点击查看学生档案</text>
      </view>
      <view class="hero-mark" aria-hidden="true">
        <text>学</text>
      </view>
    </view>

    <view class="surface search-bar">
      <view class="search-icon" aria-hidden="true"></view>
      <input
        id="student-search"
        class="search-input"
        type="text"
        :value="keyword"
        placeholder="输入学生姓名"
        placeholder-style="color: #526887"
        confirm-type="search"
        aria-label="按学生姓名搜索"
        @input="updateKeyword"
      />
      <button
        v-if="keyword"
        class="clear-button"
        size="mini"
        @tap="clearSearch"
      >清空</button>
    </view>

    <view class="section-heading">
      <text class="section-title">学生列表</text>
      <text v-if="!isLoading" class="count-pill">{{ filteredStudents.length }} 人</text>
    </view>

    <view v-if="isLoading" class="surface state-panel" aria-live="polite">
      <view class="loading-ring" aria-hidden="true"></view>
      <text class="state-title">正在加载学生信息…</text>
      <text class="state-description">请稍等，名册即将显示</text>
    </view>

    <view v-else-if="filteredStudents.length === 0" class="surface state-panel">
      <text class="state-title">未找到匹配的学生</text>
      <text class="state-description">试试输入姓名中的一个字</text>
      <button class="primary-button state-action" @tap="clearSearch">清空搜索</button>
    </view>

    <view v-else class="surface student-list">
      <view
        v-for="student in filteredStudents"
        :key="student.id"
        class="student-row"
        hover-class="student-row--pressed"
        role="button"
        :aria-label="'查看 ' + student.name + ' 的详情'"
        @tap="openStudent(student.id)"
      >
        <view class="avatar" :class="'avatar--' + student.color">
          <text>{{ student.name.slice(0, 1) }}</text>
        </view>
        <view class="student-copy">
          <text class="student-name">{{ student.name }}</text>
          <text class="student-major">{{ student.major }}</text>
        </view>
        <view class="student-side">
          <text class="student-id">{{ student.id }}</text>
          <text class="row-arrow" aria-hidden="true">›</text>
        </view>
      </view>
    </view>

    <text class="directory-footer">课程实验 · 本名单为演示数据</text>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  filterStudentsByName,
  getStudentDetailUrl,
  loadStudents
} from '../../services/students.mjs'

const students = ref([])
const keyword = ref('')
const isLoading = ref(true)

const filteredStudents = computed(() => filterStudentsByName(students.value, keyword.value))

onLoad(async () => {
  try {
    students.value = await loadStudents()
  } finally {
    isLoading.value = false
  }
})

function updateKeyword(event) {
  keyword.value = event.detail.value
}

function clearSearch() {
  keyword.value = ''
}

function openStudent(studentId) {
  uni.navigateTo({
    url: getStudentDetailUrl(studentId)
  })
}
</script>

<style scoped>
.directory-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-height: 226rpx;
  padding: 30rpx 32rpx;
  border-radius: 30rpx;
  background-color: #183c79;
  color: #ffffff;
}

.hero-copy,
.student-copy {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.hero-label {
  color: #bfd8ff;
  font-size: 19rpx;
  font-weight: 700;
  letter-spacing: 3rpx;
}

.hero-title {
  margin-top: 8rpx;
  font-size: 56rpx;
  font-weight: 750;
  letter-spacing: 2rpx;
  line-height: 1.2;
}

.hero-description {
  margin-top: 12rpx;
  color: #deebff;
  font-size: 23rpx;
  line-height: 1.45;
}

.hero-mark {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 98rpx;
  height: 98rpx;
  margin-left: 16rpx;
  border: 1px solid #6c8fc8;
  border-radius: 26rpx;
  background-color: #2a518e;
  color: #e6efff;
  font-size: 48rpx;
  font-weight: 600;
}

.search-bar {
  display: flex;
  align-items: center;
  min-height: 94rpx;
  margin-top: 24rpx;
  padding: 10rpx 22rpx;
}

.search-icon {
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 28rpx;
  height: 28rpx;
  margin-right: 22rpx;
  border: 3rpx solid #41618b;
  border-radius: 50%;
}

.search-icon::after {
  position: absolute;
  right: -8rpx;
  bottom: -5rpx;
  width: 12rpx;
  height: 3rpx;
  border-radius: 4rpx;
  background-color: #41618b;
  content: '';
  transform: rotate(45deg);
}

.search-input {
  flex: 1;
  min-width: 0;
  height: 64rpx;
  color: #172b4c;
  font-size: 28rpx;
}

.clear-button {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  min-height: 64rpx;
  margin: 0 0 0 8rpx;
  padding: 0 12rpx;
  border-radius: 14rpx;
  background-color: #edf3ff;
  color: #2455ae;
  font-size: 23rpx;
}

.clear-button::after {
  border: 0;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 56rpx;
  margin: 26rpx 4rpx 10rpx;
}

.section-title {
  font-size: 31rpx;
  font-weight: 700;
}

.count-pill {
  padding: 6rpx 16rpx;
  border-radius: 24rpx;
  background-color: #e0eaff;
  color: #254b88;
  font-size: 22rpx;
  font-weight: 650;
}

.student-list {
  overflow: hidden;
}

.student-row {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 113rpx;
  padding: 16rpx 22rpx;
}

.student-row + .student-row {
  border-top: 1px solid #edf1f7;
}

.student-row--pressed {
  background-color: #edf3ff;
}

.student-copy {
  margin: 0 18rpx;
}

.student-name {
  font-size: 30rpx;
  font-weight: 700;
  line-height: 1.4;
}

.student-major {
  margin-top: 3rpx;
  color: #4b617e;
  font-size: 23rpx;
  line-height: 1.4;
}

.student-side {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.student-id {
  color: #496180;
  font-size: 22rpx;
}

.row-arrow {
  margin-left: 16rpx;
  color: #3d5f8b;
  font-size: 37rpx;
  line-height: 1;
}

.state-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 270rpx;
  padding: 28rpx 25rpx;
  text-align: center;
}

.loading-ring {
  box-sizing: border-box;
  width: 42rpx;
  height: 42rpx;
  margin-bottom: 20rpx;
  border: 5rpx solid #dce7fa;
  border-top-color: #2455ae;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.state-title {
  font-size: 29rpx;
  font-weight: 700;
}

.state-description {
  margin-top: 9rpx;
  color: #4b617e;
  font-size: 24rpx;
}

.state-action {
  width: auto;
  min-height: 68rpx;
  margin-top: 22rpx;
  font-size: 24rpx;
}

.directory-footer {
  margin-top: 24rpx;
  color: #4b617e;
  font-size: 21rpx;
  text-align: center;
}
</style>
