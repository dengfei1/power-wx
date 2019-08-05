var util = require('../../utils/util.js');
// 引入SDK核心类
var QQMapWX = require('../../tools/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'AHDBZ-ZKDW6-AZISE-ELXTA-OL4CT-DZBVL' // 必填
});
var zhenzisms = require('../../utils/zhenzisms.js');
var app = new getApp();

var http = require("../../utils/http.js")



Page({
  data: {
    text: '这是一条会滚动的文字滚来滚去的文字跑马灯，哈哈哈哈哈哈哈哈',
    marqueePace: .5, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left', //滚动方向
    count:0,
    userInfo:'',
    nickName:'',
    avatarUrl:'',
    step: 1, //滚动速度
    distance: 0, //初始滚动距离
    space: 30,
    interval1: 5000, // 时间间隔
    date: '',
    isHide: false,
    address: '',
    dataList: [
      {
        name: '我的设备',
        url: 'mySet/mySet',
        color: '#3a83fc'
      },
      {
        name: '设备报修',
        url: ''
      },
      {
        name: '故障告警',
        url: ''
      },
      {
        name: '我的消息',
        url: ''
      },
      {
        name: '进度查询',
        url: ''
      },
      {
        name: '建议反馈', 
        url: 'suggest/suggest'
      },
      {
        name: '服务网点',
        url: ''
      },
      {
        name: '我的评价',
        url: ''
      },
    ],
    LsitA: [],
    msgList:[],
    // 轮播图片
    imgUrls: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tel:'',
    code: '',
    iv: '',
    wxCode: '',
    openId: '',
  },
  onShow: function() {
    // 页面显示
    let that = this;
    let length = that.data.text.length * that.data.size; //文字长度
    let windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : that.data.marquee2_margin //当文字长度小于屏幕长度时，需要增加补白
    });
    that.run(); // 水平一行字滚动完了再按照原来的方向滚动
   

    //获取用户信息
    var userList = wx.getStorageSync('userList')
    console.log("userList", userList)
    var userid = userList.user.data.currentUser.id
    var params = {
      url: '/report/findAllWxReportNum?userId=' + userid,
      method: "POST",
      callBack: (res) => {
        console.log('获取告警信息', res)
        if (res.data) {
          that.setData({
            isHide: true,
            count: res.data
          })
        }
      }

    }
    http.request(params)

  },
  run: function() {
    var that = this;
    var interval = setInterval(function() {
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.run();
      }

    }, that.data.interval);

  },
  // 公告栏滚动
  scrollling: function() {
    var that = this;
    var length = that.data.length; //滚动文字的宽度
    var windowWidth = that.data.windowWidth; //屏幕宽度
    var interval = setInterval(function() {
      var maxscrollwidth = length + that.data.space;
      var left = that.data.distance;
      if (left < maxscrollwidth) { //判断是否滚动到最大宽度
        that.setData({
          distance: left + that.data.step
        })
      } else {
        that.setData({
          distance: 0 // 直接重新滚动
        });
        clearInterval(interval);
        that.scrollling();
      }
    }, that.data.interval);
  },


  onReady() {  
  
   
  },
/**
 * 轮播图切换事件
 */
  swiperCurrent:function(e){
      this.setData({
        current:e.detail.current
      })
  },
/**
 * 跳转资讯推介
 */
  swiperClick:function(e){ 
    let { imgUrls}=this.data
    console.log(imgUrls)
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var objInf = encodeURIComponent(JSON.stringify(imgUrls[index]))
    console.log("资讯推介", objInf)
    wx:wx.navigateTo({
      url: './information/information?objInf=' + objInf
    })
  },
  // 跳转我的设备
  toMy: function() {
    wx.navigateTo({
      url: "./mySet/mySet"
    })
  },
  toSet: function() {
    wx.navigateTo({
      url: "./feSet/feSet"
    })
  },
  toBad: function() {
    wx.navigateTo({
      url: "./myBad/myBad"
    })
  },
  toMsg: function() {
    wx.navigateTo({
      url: "./myMsg/myMsg"
    }) 
  },
  toSchedule: function () {
    wx.navigateTo({
      url: "./progress/progress"
    })
  },
  toSuggest: function () {
    wx.navigateTo({
      url: "./suggest/suggest"
    })
  },
  toService: function () {
    wx.navigateTo({
      url: "./touch/touch"
    })
  },
  toAssess: function () {
    wx.navigateTo({
      url: "./MyAssess/MyAssess"
    })
  },
  onLoad:function(){
    var that = this;
    var use = wx.getStorageSync('apply')
    console.log(use,'apply')
    
    // wx.getSetting({
    //   success(res){
    //     if (!res.authSetting['scope.userInfo']){
    //       wx.navigateTo({
    //         url: '/pages/aa/aa',
    //       })
    //     }
    //   }
    // })


    //获取轮播图数据
    var params = {
      url: '/postInformation/findAll',
      method: "GET",
      callBack: (res) => {
        console.log('获取轮播图数据', res)
        that.setData({
          imgUrls: res.data

        })
      }

    }
    http.request(params)
    // 获取公告数据
    console.log('获取公告数据')
    var params = {
      url: '/notice/findAllNews',
      method: "GET",
      callBack: (res) => {
        console.log('获取公告数据', res)
        that.setData({
          msgList: res.data
        })
      }

    }
    http.request(params)
    // 调用接口,需要引入SDK核心类 定位
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
             console.log("定位",res);
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
  // 获取用户信息
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
      userInfo:userInfo,
      nickName:nickName,
      avatarUrl: avatarUrl
    })
    }
  })

    // 获取当前日期
    var dated = util.formatDate(new Date());
    this.setData({
      date: dated
    });
    wx.showTabBar({});
    console.log(dated),
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                wx.login({
                  success(res) {
                    that.setData({
                      code: res.code
                    })
                    wx.getUserInfo({
                      success: function (res) {
                        //获取用户敏感数据密文和偏移向量
                        that.setData({
                          encryptedData: res.encryptedData
                        })
                        that.setData({
                          iv: res.iv
                        })
                        console.log('iv:', res.iv, 'encryptedData:', res.encryptedData)
                      }
                    })

                    console.log(res)
                    if (res.code) {
                      // 发起网络请求   
                      wx.request({
                        url: app.globalData.url + '/login/WXlogin',
                        data: {
                          wxCode: res.code
                        },
                      })
                    } else {
                      console.log('登录失败！' + res.errMsg)
                    }
                  }
                })
              }
            });
            // wx.hideTabBar({aniamtion:false});
          } else {
            // 用户没有授权
            // 改变 isHide 的值，显示授权页面
            wx.navigateTo({
              url: '/pages/mask/mask',
           })

          }
        }
      });
      var userList = wx.getStorageSync('userList')
      var phone = userList.user.data.currentUser.phone
      //实现手机号码中间4位用星号（*）替换显示
      var tel = phone;
      this.setData({
        tel: tel.replace(/(1[358]{1}[0-9])[0-9]{4}([0-9]{4})/i, "$1****$2")
      })

  
    // var userList = wx.getStorageSync('userList');
    
    // console.log('userList', userList.user.data.sessionId)
    // app.globalData.header.Cookie = 'JSESSIONID=' + userList.user.data.sessionId;
    //获取轮播图数据
    // console.log('获取轮播图数据')
    // wx.request({
    //   url: app.globalData.url + '/postInformation/findAll',
    //   header: app.globalData.header,
    //   method: "GET",
    //   data: {

    //   },
    //   success: (res) => {
    //     console.log('获取轮播图数据', res)
    //     that.setData({
    //       imgUrls:res.data.data
          
    //     })
    //   }
    // })

    // var userList = wx.getStorageSync('userList');

    // console.log('userList', userList.user.data.sessionId)
    // app.globalData.header.Cookie = 'JSESSIONID=' + userList.user.data.sessionId;

    // console.log('获取公告数据')
    // wx.request({
    //   url: app.globalData.url + '/notice/findMyNo',
    //   header: app.globalData.header,
    //   method: "GET",
    //   data: {

    //   },
    //   success: (res) => {
    //     console.log('获取公告数据', res)
       
    //   }
    // })

   
      
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 位置获取
  // getCityNameOFLocation: function() {
  //   var that = this;
  //   wx.getLocation({
  //     type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
  //     success: function(res) {
  //       console.log("定位成功");
  //       var locationString = res.latitude + "," + res.longitude;
  //       wx.request({
  //         url: 'https://apis.map.qq.com/ws/geocoder/v1/?&get_poi=1',
  //         data: {
  //           "key": "AHDBZ-ZKDW6-AZISE-ELXTA-OL4CT-DZBVL",
  //           "location": locationString
  //         },
  //         method: 'GET',
  //         // header: {}, 
  //         success: function(res) {
  //           // success
  //           console.log("请求成功");
  //           console.log("请求数据:" + res.data.result.address);
  //           var address = res.data.result.address;
  //           that.setData({
  //             address: address
  //           })
  //         },
  //         fail: function() {
  //           // fail
  //           console.log("请求失败");
  //         },
  //         complete: function() {
  //           // complete
  //           console.log("请求完成");
  //         }
  //       })
  //     },
  //     fail: function() {
  //       // fail
  //       console.log("定位失败");
  //     },
  //     complete: function() {
  //       // complete
  //       console.log("定位完成");
  //     }
  //   })
  // },
  //  微信获取地址d
  // getLocation: function (e) {
  //   wx.getLocation({
  //     type: 'gcj02',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
  //     success: function (res) {
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       console.log(res)
  //     }
  //   })
  // },
  // chooseLocation: function (e) {
  //   wx.chooseLocation({
  //     success: function (res) {
  //       console.log(res.address);
  //       var address = res.address;
  //       that.setData({
  //         address: address
  //       })
  //     },

  //   })
  // }
});