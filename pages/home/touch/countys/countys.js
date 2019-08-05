// pages/home/touch/countys/countys.js
var cityData = require("../../../../utils/cityData.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countys:[],
    province:'',
    city:''
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
   * 放回省页
   */
  toCountys: function (e) {
    var index = e.currentTarget.dataset.index;
    var countys = this.data.countys[index];
  
    // var str = this.data.province + "," + this.data.city + "," + countys ;

    var strArr = [this.data.province, this.data.city, countys]



    console.log(strArr)
    let pages = getCurrentPages();//定义上页面

    let currPage = null; //当前页面

    let prevPage = null; //上一个页面

    if (pages.length >= 4) {

      currPage = pages[pages.length - 1]; //当前页面

      prevPage = pages[pages.length - 4]; //上一个页面

      if (prevPage) {
        console.log("进来了")
        //上一页存在则给上一个data赋值。则把title传过去

        prevPage.setData({

          strArr: strArr

        });

      }

    }
    wx.navigateBack({
      delta: 3,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("市id", options.cityId)
    var province = options.province
    var city = options.city
    var countys=[]
    for (var temp in cityData[options.cityId]) {

      countys.push(cityData[options.cityId][temp])

    }
    this.setData({
      countys: countys,
      province: province,
      city: city
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