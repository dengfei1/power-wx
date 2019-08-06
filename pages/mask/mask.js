const app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        console.log(res.authSetting['scope.userInfo'],"查看是否授权")
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUserInfo();
              //用户已经授权过
              console.log("用户已经授权过");
              //   判断用户登录状态
              var userList = wx.getStorageSync('userList')
              console.log("授权--------------------",userList)
              if (wx.getStorageSync('userList')) {
                wx.switchTab({
                  url: '../home/home'
                })
              } else {
                wx.reLaunch({
                  url: '../aa/aa'
                })
              }
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          console.log("没有授权");
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      //   判断用户登录状态
      var userList = wx.getStorageSync('userList')
      console.log(userList,"userList")
      // if (wx.getStorageSync('userList')) {
      //   wx.switchTab({
      //     url: '../home/home'
      //   })
      // } else {
      //   wx.reLaunch({
      //     url: '../aa/aa'
      //   })
      // }
     
      if (wx.getStorageSync('userList')!=null) {
        wx.reLaunch({
          url: '../aa/aa'
        })
      } else {
        wx.switchTab({
          url: '/home/home'
        })
      }

      // wx.reLaunch({
      //   url: '../aa/aa',
      // })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
            wx.reLaunch({
              url: '/pages/mask/mask'
            })
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUserInfo: function() {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
    var that = this;

    //获取用户信息
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        that.data.userInfo = res.userInfo;
        that.setData({
          userInfo: that.data.userInfo
        })
      }
    })
  },

})