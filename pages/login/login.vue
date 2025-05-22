<template>
  <view class="container">
    <view class="logo-container">
      <image class="logo" src="/static/logo.png"></image>
      <text class="app-name">干云司机</text>
    </view>
    
    <view class="form-container">
      <button class="wechat-btn" @click="loginByWechat" :disabled="loading">
        <image src="/static/wechat.png" mode="aspectFit"></image>
        <text>{{ loading ? '登录中...' : '微信登录' }}</text>
      </button>
      
      <view class="agreement">
        <text>点击登录即表示同意</text>
        <text class="link" @click="navigateToTerms">用户协议</text>
        <text>和</text>
        <text class="link" @click="navigateToPrivacy">隐私政策</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api/login.js'; // 引入API

// 登录状态
const loading = ref(false);

// 微信登录方法
const loginByWechat = async () => {
  if (loading.value) return;
  loading.value = true;
  
  try {
    // 获取登录凭证
    const loginRes = await uni.login({ provider: 'weixin' });
    console.log('登录凭证:', loginRes.code);
	console.log(loginRes)
    
    // 获取用户信息
    const infoRes = await uni.getUserInfo({ provider: 'weixin' });
    console.log('用户信息:', infoRes.userInfo);
    
    // 调用登录API
    const res = await login({
      code: loginRes.code,
      userInfo: infoRes.userInfo
    });
    
    if (res.code === 200) {
      // 登录成功
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('userInfo', res.data.userInfo);
      
      // 跳转到首页
      uni.switchTab({
        url: '/pages/index/index'
      });
    } else {
      uni.showToast({
        title: res.msg || '登录失败',
        icon: 'none'
      });
    }
  } catch (err) {
    console.error('登录错误:', err);
    uni.showToast({
      title: err.errMsg || '登录失败，请重试',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 导航到协议页面
const navigateToTerms = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?type=terms'
  });
};

const navigateToPrivacy = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?type=privacy'
  });
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  padding: 0 30rpx;
}

.logo-container {
  margin-bottom: 120rpx;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
}

.app-name {
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
}

.form-container {
  width: 100%;
  max-width: 600rpx;
}

.wechat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96rpx;
  background-color: #07C160;
  border-radius: 48rpx;
  color: #ffffff;
  font-size: 32rpx;
  margin-bottom: 40rpx;
}

.wechat-btn image {
  width: 44rpx;
  height: 44rpx;
  margin-right: 16rpx;
}

.agreement {
  font-size: 24rpx;
  color: #999999;
  text-align: center;
}

.link {
  color: #07C160;
}
</style>  