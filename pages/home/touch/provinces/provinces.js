// pages/home/touch/provinces/provinces.js
var cityData = require("../../../../utils/cityData.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    provincesId:[]
  },
  /**
   * 返回上一级
   */
  return:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 跳转市页
   */
  toCitys:function(e) {
     var index = e.currentTarget.dataset.index;
     var provinceId = this.data.provincesId[index];
     var province = this.data.provinces[index];
     console.log("省id",provinceId)
      wx.navigateTo({
        url: '../citys/citys?provinceId=' + provinceId + "&&province=" + province,
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let provinces=[];
    let provincesId=[]
    for (let temp in cityData["100000"]) {
      console.log(cityData['100000'][temp])
      console.log(temp)
      provinces.push(cityData['100000'][temp])
      provincesId.push(temp)
    }
    this.setData({
      provinces: provinces,
      provincesId: provincesId
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