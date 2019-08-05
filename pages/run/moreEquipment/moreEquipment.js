// pages/run/moreEquipment/moreEquipment.js
var http = require("../../../utils/http.js");
var dialog = require("../../../utils/dialog.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  /**
   * 跳转运行页
   */
  toRun:function(e){
    console.log("跳转运行页")
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。\
    var index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(this.data.dataList[index])
    console.log(this.data.dataList.length)
    prevPage.setData({  
      // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      dataList: this.data.dataList[index]

    })
   //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。

   //最后就是返回上一个页面。
    wx.navigateBack({
       // 返回上一级页面。
      delta: 1 
    })
   
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userList = wx.getStorageSync('userList');
    var userId = userList.user.data.currentUser.id
    dialog.loading();
    var params = {
      url: '/appLet/findLetEquipment?userId=' + userId,
      method: "GET",
      callBack: (res) => {
        dialog.hide();
        console.log('获取设备信息', res.data)

        that.setData({
          dataList:res.data
        })
      }

    }
    http.request(params)
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