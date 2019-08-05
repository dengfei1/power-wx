var util = require('../../utils/util.js');
// 引入SDK核心类
var QQMapWX = require('../../tools/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'AHDBZ-ZKDW6-AZISE-ELXTA-OL4CT-DZBVL' // 必填
});

Page({
  data: {
    date: '',
    address: '',
    userInfo: '',
    nickName: '',
    avatarUrl: '',
    tel:'',
  dataArr: [
    {
    name: '客户信息',
    dataIcon: 'iconfont icon-xiaoxi',
    toMsg:'toCustomerMsg'
     }, 
    //  {
    //   name: '建议反馈',
    //   dataIcon: 'iconfont icon-lingdang',
    //   toMsg: 'toSugget'
    // }, 
     {
      name: '客户投诉',
      dataIcon: 'iconfont icon-tousu',
      toMsg: 'toComp'
    }, 
    {
      name: '客服支持',
      dataIcon: 'iconfont icon-service',
      toMsg: 'toTouch'
    },
    {
      name: '关于我们',
      dataIcon: 'iconfont icon-guanyuwomen',
      toMsg:'toOur'
      }],
    storageData:''
  },

onLoad: function() {
  // 调用接口,需要引入SDK核心类
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      var latitude = res.latitude//纬度
      var longitude = res.longitude//经度
      demo.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          console.log(res);
          let province = res.result.address_component.province;//省份
          let city = res.result.address;//城市
          that.setData({
            address: city
          })
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }
  });
  //this.getCityNameOFLocation();
  console.log("1");
  var that = this;
  // 获取日期
  var dated = util.formatDate(new Date());
  that.setData({
    date: dated
  });
  wx.getUserInfo({
    success: function (res) {
      var userInfo = res.userInfo
      var nickName = res.userInfo.nickName
      var avatarUrl = res.userInfo.avatarUrl
      var gender = res.userInfo.gender
      var province = userInfo.province
      var city = userInfo.city
      var country = userInfo.country
      console.log(res)
      that.setData({
        userInfo: userInfo,
        nickName: nickName,
        avatarUrl: avatarUrl
      })
    }
  })

  var userList = wx.getStorageSync('userList')
  var phone = userList.user.data.currentUser.phone
  //实现手机号码中间4位用星号（*）替换显示
  var tel = phone;
  this.setData({
    tel: tel.replace(/(1[358]{1}[0-9])[0-9]{4}([0-9]{4})/i, "$1****$2")
  })
},
  // 跳转到客户信息
toCustomerMsg:function(){
  console.log(123)
  wx.navigateTo({
    url: "customerMsg/customerMsg"
  })
},
//跳转到投诉中心
  toComp: function () {
    console.log(123)
    wx.navigateTo({
      url: "./complaint/complaint"
    })
  },
// 跳转我的详细信息
  toDetailMsg:function(){
    wx.navigateTo({
      url: "./detailMsg/detailMsg"
    })
  },
  // 跳转到建议反馈
  toSugget: function () {
    console.log(123)
    wx.navigateTo({
      url: "./suggest/suggest"
    })
  },
  toTouch:function(){
    wx.navigateTo({
      url: "./servicePromise/servicePromise"
    })
  },
  toOur:function(){
    wx.navigateTo({
      url: "./our/our"
    })
  },
// 退出登录
  backLoad:function(){
    wx.showModal({
      title: '提示',
      content: '退出登录？',
      success: function (res) {
       if(res.confirm){
         wx.reLaunch({
           url: '/pages/aa/aa',
         })
         //  清除本地缓存
         var that = this;
         wx.removeStorage({
           key: 'userList'
         })
       }
      }
    })
  }
})