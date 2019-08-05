// pages/home/mySet/mySet.js
var http = require("../../../utils/http.js")
var dialog = require("../../../utils/dialog.js");


Page({
  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 185, //删除按钮宽度单位（rpx） 
    isHide: false,
    list: [],
    show: "",
    id: '',
    testNum: '',
    scrollTop: 100,
    tips: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  // 刷新加载
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // 开始滑动事件
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    var that = this;
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      // var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
        // txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
        // txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          // txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
    }
  },
  // 滑动中事件
  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = "";
      txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      list[index].shows = txtStyle;
      console.log("1", list[index].shows);
      //更新列表的状态 
      this.setData({
        list: list
      });
    } else {
      console.log("2");
    }
  },
  //获取元素自适应后的实际宽度 
  getEleWidth: function(w) {
    var real = 0;
    try {
      // wx.getSystemInfoSync()根据手机品牌获取宽度
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale); 
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error 
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件 （设备解绑）
  delItem: function(e) {
    var that = this;
    // wx.showModal({
    //   title: '提示',
    //   content: '你将解除该项目？',
    //   showCancel: true,//是否显示取消按钮
    //   cancelText: "否",//默认是“取消”
    //  // cancelColor: 'skyblue',//取消文字的颜色
    //   confirmText: "是",//默认是“确定”
    //   success: function(res) {
    //     if (res.confirm) {
    //       var list = that.data.list;
    //       list.splice(e.currentTarget.dataset.index, 1);
    //       that.setData({
    //         list: list
    //       })
    //     } else {
    //      wx.showToast({
    //        title: '取消解除',
    //        icon:'none'
    //      })
    //     }
    //   }
    // })
   
    var userList = wx.getStorageSync('userList')

    var that = this;
    // 打印出当前选中的index
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index
    var uuid=this.data.list[index].uuid
    console.log(uuid)
    // 获取到列表数据
    wx.showModal({
      title: "提示",
      content: '你将解除该设备？',
      success: function(res) {
        if (res.confirm) {
          var id = userList.user.data.currentUser.id

          // 解绑
          var params = {
            url: '/appLet/relieveBinding?userId=' + id + "&&uuid=" + uuid,
            method: "POST",
            callBack: (res) => {
              console.log("解绑成功返回数据", res)
              var list = that.data.list;
              list.splice(e.currentTarget.dataset.index, 1);
              that.setData({
                list: list
              })

            }

          }
          http.request(params)



        }
      }
    })

    // 重新渲染
    that.setData({
      list: this.data.list
    })
    initdata(that)
  },
 

  // 报错
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  /**
   * 扫描设备
   */
  click: function() {
    console.log("开始扫描设备")
    var that = this;
   wx.scanCode({
       //是二维码才合法
      scanType:'qrCode',
      success: (res) => {
   //     // this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
    //     // that.show = 
    //     //   that.setData({
    //     //     list: this.show.concat(list)
    //     //  })
        //扫描绑定设备
        console.log('开始扫描绑定设备')
        var userList = wx.getStorageSync('userList');
        var userid = userList.user.data.currentUser.id

        var uuid = res.result.substring(5, res.result.length)
        
        // var uuid = "999029035353112"
        //获取扫描参数uuid=456767657567657
        console.log("绑定uuid:", uuid)
        var params = {
          url: '/appLet/saveEquipmentSetOne?uuid=' + uuid + "&userId=" + userid,
          method: "GET",
          callBack: (res) => {
            console.log('绑定设备成功',res)
            wx.showToast({
              title: res.info,
              icon: 'success',
              duration: 2000,
            })
            that.getbangData()
          }

        }
        http.request(params)
      }

   })
  },

  /**
 * 获取绑定数据
 */
  getbangData() {
    var that=this
    dialog.loading();
    var userList = wx.getStorageSync('userList');
    var userid = userList.user.data.currentUser.id
    dialog.loading();
    //获取绑定数据
    var params = {
      url: '/appLet/findLetEquipment?userId=' + userid,
      method: "GET",
      callBack: (res) => {
        dialog.hide()
        console.log('获取绑定数据', res)
        that.setData({
          list: res.data
        })
        if (res.data.length === 0) {
          that.setData({
            tips: "请绑定设备"
          })
        } else {
          that.setData({
            tips: ''
          })
        }
        dialog.hide();
      }

    }
    http.request(params)
  },
  //打开透明层
  showRule: function() {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭透明层
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  write: function() {
    this.setData({
      isHide: true
    })
  },

  // 返回
  back: function() {
    this.setData({
      isHide: false
    })
  },
  //跳转设备详情
  deviceDetails:function(e){
    var index = e.currentTarget.dataset.index;
    var str = JSON.stringify(this.data.list[index])
    wx.navigateTo({
      url: 'deviceDetails/deviceDetails?jsonStr=' + str,
      //  url: 'deviceDetails/deviceDetails？uuid' + this.data.uuid,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getbangData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})