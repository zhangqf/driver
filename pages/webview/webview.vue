<template>
  <view class="container">
    <view class="header">
      <view class="back" @click="back">
        <text class="iconfont icon-back"></text>
      </view>
      <text class="title">{{ title }}</text>
    </view>
    <web-view :src="contentUrl"></web-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const contentUrl = ref('');

onLoad((options) => {
  if (options.type === 'terms') {
    title.value = '用户协议';
    contentUrl.value = 'https://example.com/terms'; // 替换为实际URL
  } else if (options.type === 'privacy') {
    title.value = '隐私政策';
    contentUrl.value = 'https://example.com/privacy'; // 替换为实际URL
  }
});

const back = () => {
  uni.navigateBack();
};
</script>

<style>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 88rpx;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  position: relative;
}

.back {
  width: 80rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.title {
  font-size: 36rpx;
  color: #333333;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

web-view {
  flex: 1;
}
</style>  