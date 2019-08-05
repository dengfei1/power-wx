// pages/home/information/information.js
var WxParse = require('../../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objInf:{},
    createtime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var objInf = JSON.parse(decodeURIComponent(options.objInf))
    console.log("information",objInf)
    var createtime = objInf.createtime.substring(0, 10)
    var content = objInf.content
    WxParse.wxParse('article', 'html', content, that, 5);

    that.setData({
      objInf: objInf,
      createtime: createtime,
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