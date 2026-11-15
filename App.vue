<script>
export default {}
</script>

<style>
page {
  min-height: 100%;
  background-color: #f1f5fb;
  color: #172b4c;
  font-family: system-ui, sans-serif;
}

.page-shell {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: 28rpx 32rpx 48rpx;
}

.surface {
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #e6edf6;
  border-radius: 28rpx;
}

.avatar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 72rpx;
  height: 72rpx;
  border-radius: 22rpx;
  font-size: 34rpx;
  font-weight: 700;
}

.avatar--blue {
  background-color: #e7efff;
  color: #245bb6;
}

.avatar--mint {
  background-color: #e0f4ed;
  color: #176957;
}

.avatar--amber {
  background-color: #fcf0d9;
  color: #8b5619;
}

.avatar--purple {
  background-color: #eee8fc;
  color: #6243a0;
}

.primary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 86rpx;
  margin: 0;
  padding: 8rpx 24rpx;
  border-radius: 20rpx;
  background-color: #2455ae;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.4;
}

.primary-button::after {
  border: 0;
}
</style>
