// pages/user/complaint/complaint.js
import WxValidate from '../../../utils/WxValidate.js';
var http = require("../../../utils/http.js")
var dialog = require("../../../utils/dialog.js")
var app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden: false,
    isHide: false,
    time: '',
    dataArr: [ ],
    dataArr1: [],
    dataArr2: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 表单提交事件
  formSubmit(e) {
    if ((e.detail.value.content != '') && (e.detail.value.address != '') && (e.detail.value.radio != '') && (e.detail.value.tel != '') && (e.detail.value.name != '')) {
      if (!(/^1[34578]\d{9}$/.test(e.detail.value.tel))) {
        wx.showToast({
          icon: 'none',
          title: '手机号错误',
          duration: 2000
        })

      } else {
        //  提交成功
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        wx.showToast({
          icon: 'success',
          title: '提交成功',
          duration: 2000,

        })
        var value = e.detail.value;
        var that = this;
        var userList = wx.getStorageSync('userList')
        var id = userList.user.data.currentUser.id;
        app.globalData.header.Cookie = 'JSESSIONID=' + userList.user.data.sessionId;
        console.log(1);
        var complain = {
          content: value.content,
          type: value.radio == '产品投诉' ? 1 : 0,
          userName: value.name,
          userPhone: value.tel,
          address: value.address
        }
        var va1 = value.radio == '产品投诉' ? 1 : 0
        // console.log('userList', userList)
        // console.log('userList', userList.user.data.currentUser.id)
        wx.request({
          // url: app.globalData.url + '/complain/saveComplain?complain=' + JSON.stringify(complain),
          // url: app.globalData.url + '/complain/saveComplain',
          url: app.globalData.url + '/complain/saveComplain?content=' + value.content + '&type=' + va1 + '&userName=' + value.name + '&userPhone=' + value.tel + '&address=' + value.address,
          data: JSON.stringify({
            content: value.content,
            type: value.radio == '产品投诉' ? 1 : 0,
            userName: value.name,
            userPhone: value.tel,
            address: value.address
          }),
          header: app.globalData.header,
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log('res0', res)
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请填写完整',
        duration: 2000
      })
    }

  },
  // 新增投诉
  addSuggest: function () {
    wx.navigateTo({
      url: 'addSuggest/addSuggest',
    })
  },
  // 返回
  back: function () {
    var that = this;
    that.setData({
      isHidden: false
    })
    that.setData({
      isHide: false
    })
  },
  /**
   * 未处理
   */
  toDetail: function (e) {
    wx.showToast({
      title: '等待处理',
      icon:"none",
      duration:500
    })
  },
  toDetail1: function (e) {
    var that = this;

    var index = e.currentTarget.dataset.index;
    var objList = JSON.stringify(this.data.dataArr2[index])
    wx.navigateTo({
      url: "suggestDetails/suggestDetails?objList=" + objList
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
     this.getSuggestInfo()
  },
  /**
   * 获取意见信息
   */
  getSuggestInfo(){
    var that=this
    //获取用户信息
    var userList = wx.getStorageSync('userList')
    var userid = userList.user.data.currentUser.id

    dialog.loading();
    var params = {
      url: '/feedback/findAll?userId=' + userid + "&&pageNum=" + 1 + "&&pageSize=" + 5,
      method: "POST",
      callBack: (res) => {
        dialog.hide();
        console.log('建议反馈信息', res)
        that.setData({
          dataArr:res.data
        })
        this.isHandle()
      }

    }
    http.request(params)
  },

  /**
   *  判断是否处理
   */
  isHandle() {
    let { dataArr, dataArr1, dataArr2 } = this.data
    var that = this;
     dataArr1.length=0;
     dataArr2.length = 0;
    for (let i = 0; i < dataArr.length; i++) {
      // 已处理
      if (dataArr[i].state ==0) {
        dataArr[i].background = '#cccdcd';
        dataArr[i].color = '#fd2a2a';
        dataArr1.push(dataArr[i]);
      }
      // 未处理
      if (dataArr[i].state == 1) {
        dataArr[i].background = '#0093dd';
        dataArr[i].color = '#8e8f8f';
        dataArr2.push(dataArr[i]);
      }
    }
    console.log("已处理",dataArr1, dataArr2)
    that.setData({
      dataArr2: dataArr2
    })
    that.setData({
      dataArr1: dataArr1
    })

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