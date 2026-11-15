<template>
  <view class="page-shell">
    <template v-if="student">
      <view class="profile-hero">
        <view class="avatar profile-avatar" :class="'avatar--' + student.color">
          <text>{{ student.name.slice(0, 1) }}</text>
        </view>
        <view class="profile-copy">
          <text class="profile-label">STUDENT PROFILE</text>
          <text class="profile-name">{{ student.name }}</text>
          <text class="profile-major">{{ student.major }}</text>
        </view>
      </view>

      <view class="surface details-card">
        <text class="details-title">基本信息</text>
        <view class="detail-row">
          <text class="detail-key">学号</text>
          <text class="detail-value student-number">{{ student.id }}</text>
        </view>
        <view class="detail-row">
          <text class="detail-key">姓名</text>
          <text class="detail-value">{{ student.name }}</text>
        </view>
        <view class="detail-row">
          <text class="detail-key">专业</text>
          <text class="detail-value">{{ student.major }}</text>
        </view>
        <view class="detail-row">
          <text class="detail-key">年级</text>
          <text class="detail-value">{{ student.grade }}</text>
        </view>
      </view>
    </template>

    <view v-else class="surface not-found">
      <text class="details-title">未找到学生档案</text>
      <text class="not-found-description">学号缺失或不存在，请返回列表重试。</text>
    </view>

    <button class="primary-button back-button" @tap="backToList">返回学生列表</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { findStudentById } from '../../services/students.mjs'

const student = ref(null)

onLoad((options) => {
  student.value = findStudentById(options?.id)
})

function backToList() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({ url: '/pages/students/students' })
  }
}
</script>

<style scoped>
.profile-hero {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 250rpx;
  padding: 30rpx 32rpx;
  border-radius: 30rpx;
  background-color: #183c79;
  color: #ffffff;
}

.profile-avatar {
  width: 116rpx;
  height: 116rpx;
  border-radius: 30rpx;
  font-size: 49rpx;
}

.profile-copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  margin-left: 26rpx;
}

.profile-label {
  color: #bfd8ff;
  font-size: 19rpx;
  font-weight: 700;
  letter-spacing: 3rpx;
}

.profile-name {
  margin-top: 7rpx;
  font-size: 52rpx;
  font-weight: 750;
  line-height: 1.2;
}

.profile-major {
  margin-top: 12rpx;
  color: #deebff;
  font-size: 24rpx;
  line-height: 1.45;
}

.details-card,
.not-found {
  display: flex;
  flex-direction: column;
  margin-top: 24rpx;
  padding: 24rpx 28rpx;
}

.details-title {
  margin-bottom: 12rpx;
  font-size: 31rpx;
  font-weight: 700;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76rpx;
  padding: 8rpx 0;
  border-bottom: 1px solid #edf1f7;
}

.detail-row:last-child {
  border-bottom: 0;
}

.detail-key {
  flex-shrink: 0;
  margin-right: 24rpx;
  color: #4b617e;
  font-size: 26rpx;
}

.detail-value {
  min-width: 0;
  font-size: 27rpx;
  font-weight: 600;
  text-align: right;
}

.student-number {
  color: #2455ae;
  letter-spacing: 1rpx;
}

.not-found-description {
  color: #4b617e;
  font-size: 26rpx;
  line-height: 1.5;
}

.back-button {
  margin-top: 26rpx;
}
</style>
