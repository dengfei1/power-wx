//app.js
var config = require("./utils/config.js");

App({
  onLaunch: function() {
    var that = this;
    
    // wx.request({
    //   url: app.globalData.requestUrl,
    //   data: {
    //     code: res.code
    //   },
    //   success: function (res) {
    //     let ret = res.data;
    //     if (ret.status == 200) {
    //       // 添加到全局数据的header中
    //       app.globalData.header.Cookie = 'JSESSIONID=' + ret.data.sessionid;
    //     }
    //   }
    // })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    //添加最新的数据到缓存
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // var list = wx.getStorageSync('userList');
        

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  
  },
  globalData: {
    userInfo: null,
    header: {
      'Cookie': ''
    },
   // url: 'http://localhost:80',
    url: config.domain,
  },
})