// pages/home/touch/citys/citys.js
var cityData = require("../../../../utils/cityData.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citys:[],
    citysId:[],
    //某个省名称
    province:""
  },
  
  /**
    * 返回上一级
    */
  return: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 跳转区页
   */
  toCountys: function (e) {
    var index = e.currentTarget.dataset.index;
    var cityId = this.data.citysId[index];
    var city = this.data.citys[index];
    console.log("市id", cityId)
    wx.navigateTo({
      url: '../countys/countys?cityId=' + cityId + "&&province=" + this.data.province + "&&city=" + city,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var citys = []
    var citysId= []
    for (var temp in cityData[options.provinceId]){
      console.log("市id "+temp)
      citys.push(cityData[options.provinceId][temp])
      citysId.push(temp)
    }
    this.setData({
      citys: citys,
      citysId: citysId,
      province: options.province
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