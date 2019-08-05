// // pages/user/touch/touch.js
var http = require("../../../utils/http.js")
var cityData = require("../../../utils/cityData.js")
var dialog = require("../../../utils/dialog.js")

// 引入SDK核心类
var QQMapWX = require('../../../tools/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'AHDBZ-ZKDW6-AZISE-ELXTA-OL4CT-DZBVL' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
     listArr:[],
     provinces:[],
     citys:[],
     countys:[],
     address:'请选择地址',
     
     //返回的地址是数组
     strArr:[],
     tips:"",
     s:0,

  },
  /**
   * 跳转省份页
   */
  toProvinces:function() {
    wx.navigateTo({
      url: 'provinces/provinces',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


   
  },
  findShop(location) { //拿到商家的地理位置，用到了腾讯地图的api
    // 实例化API核心类
    var _that = this
    // 调用接口
    demo.calculateDistance({
      to: [{
        latitude: 22.806395,  //商家的纬度
        longitude: 113.519025,//商家的经度
      }],
      success: function (res) {
        let hw = res.result.elements[0].distance //拿到距离(米)
        if (hw && hw !== -1) { //拿到正确的值
          //转换成公里
          hw = (hw / 2 / 500).toFixed(2) + '公里'
        } else {
          hw = "距离太近或请刷新重试"
        }

        console.log('腾讯地图计算距离商家' + hw);
      }
    })
  },




 /**
  * 查询用户与商家的距离
  */
  findXy(location,t) {
     //获取用户的经纬度
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        // let location=[];
        
        // for (let i = 0; i < that.data.listArr.length;i++){
        //   location.push(that.data.listArr[i].location)
        // }
        // console.log("location", location)
        // for(let i=0;i<location.length;i++){
          
        // }
        console.log("location", location)
        var arr = location.split(",")
        console.log("分隔出来",arr[1], arr[0])
        that.getDistance(res.latitude, res.longitude, arr[1], arr[0],t)
      }
    })
  },
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  getDistance: function (lat1, lng1, lat2, lng2,t) {
    console.log(lat1, lng1)
    // lat1用户的纬度
    // lng1用户的经度
    // lat2商家的纬度
    // lng2商家的经度
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2) + 'km' //保留两位小数
    console.log('经纬度计算的距离:' + s)
    var listArr1 = this.data.listArr

    listArr1[t].km=s
    console.log("查看距离",s,listArr1)
    this.setData({
      listArr: listArr1
    })

  },


  /**
   * 拨打商家电话
   */
  callMerchant: function (e) {
    let {listArr}=this.data;
    let index = e.currentTarget.dataset.index;
    let phone = listArr[index].phone

    wx.makePhoneCall({

      phoneNumber: phone, //此号码仅用于测试 。

      success: function () {

        console.log("拨打电话成功！")

      },

      fail: function () {

        console.log("拨打电话失败！")

      }

    })

  },

  /**
   * 导航
   */
  navigation:function(e) {
    
    let { listArr } = this.data;
    let index = e.currentTarget.dataset.index;
    let location = listArr[index].location
    console.log("location", location)
    var arr = location.split(",")
    console.log("arr", arr)
    
    var name = listArr[index].name
    var address = listArr[index].address
    var longitude = arr[0]*1
    var latitude = arr[1]*1


    console.log("经度:", longitude, "纬度:", latitude)

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图定位功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");

              } else if (res.confirm) {
                //village_LBS(that);
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                      wx.openLocation({
                        latitude: latitude, //要去的纬度-地址, 39.834751
                        longitude: longitude,//要去的经度-地址119.488914
                        name: name,
                        address: address,
                        scale: 28
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: name,
            address: address,
            scale: 28
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]

    if (currPage.data.strArr.length>0){
      dialog.loading();
      var strArr = currPage.data.strArr
      console.log("获取定位地址", strArr)
       var address = strArr.join(",")
      console.log("获取定位地址", address)
      // var address = strArr[0]
      // var address = "广东省"
      var params = {
        url: '/provider/findAllByAddress?address=' + address,
        method: "GET",
        callBack: (res) => {
          dialog.hide();
          console.log('获取商家信息', res)
          if(res.data.length===0) {
            that.setData({
              tips:"附近没有商家"
            })
          }else{
            that.setData({
              tips: ''
            })
          }
         
          that.setData({
            listArr: res.data,

          })

          //利用腾讯地图的位置服务
          // var _this = this;
          // _this.findShop(this.data.listArr.location) //查询用户与商家的距离

          //查询用户与商家的距离
          //获取用户的位置信息,再进行计算(wx.getLocation)
          for(let i=0;i<that.data.listArr.length;i++) {
            that.findXy(that.data.listArr[i].location,i)
          }
         
           
        }

      }
      http.request(params)

      that.setData({
        address: address
      })

    }
    console.log(that.data.address)
   

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


// var zhenzisms = require('../../../utils/zhenzisms.js');
// //获取应用实例
// const app = getApp();

// Page({
//   data: {
//     hidden: true,
//     btnValue: '',
//     btnDisabled: false,
//     name: '',
//     phone: '',
//     code: '',
//     second: 60
//   },
//   onLoad: function () {

//   },
//   //姓名输入
//   bindNameInput(e) {
//     this.setData({
//       name: e.detail.value
//     })
//   },
//   //手机号输入
//   bindPhoneInput(e) {
//     console.log(e.detail.value);
//     var val = e.detail.value;
//     this.setData({
//       phone: val
//     })
//     if (val != '') {
//       this.setData({
//         hidden: false,
//         btnValue: '获取验证码'
//       })
//     } else {
//       this.setData({
//         hidden: true
//       })
//     }
//   },
//   //验证码输入
//   bindCodeInput(e) {
//     this.setData({
//       code: e.detail.value
//     })
//   },
//   //获取短信验证码
//   getCode:function(e) {
//     console.log('获取验证码');
//     var that = this;
//     zhenzisms.client.init('https://sms_developer.zhenzikj.com', 'appId', 'appSecret');
//     zhenzisms.client.send(function (res) {
//       if (res.data.code == 0) {
//         that.timer();
//         return;
//       }
//       wx.showToast({
//         title: res.data.data,
//         icon: 'none',
//         duration: 2000
//       })
//     }, '15811111111', '验证码为:3322');

//   },
//   timer: function () {
//     let promise = new Promise((resolve, reject) => {
//       let setTimer = setInterval(
//         () => {
//           var second = this.data.second - 1;
//           this.setData({
//             second: second,
//             btnValue: second + '秒',
//             btnDisabled: true
//           })
//           if (this.data.second <= 0) {
//             this.setData({
//               second: 60,
//               btnValue: '获取验证码',
//               btnDisabled: false
//             })
//             resolve(setTimer)
//           }
//         }
//         , 1000)
//     })
//     promise.then((setTimer) => {
//       clearInterval(setTimer)
//     })
//   },
//   //保存
//   save(e) {
//     console.log('姓名: ' + this.data.name);
//     console.log('手机号: ' + this.data.phone);
//     console.log('验证码: ' + this.data.code);

//     //省略提交过程
//   }
// })