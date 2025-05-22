<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="ui-search">
			欢迎使用
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 400rpx;
		width: 670rpx;
		margin-top: 40rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 20rpx;
	}
	.ui-search{
		width: 670rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 60rpx;
		border-width: 20rpx;
		text-align: center;
		line-height: 100rpx;
		border-color: blanchedalmond;
		border-style: double;
	}

</style>
