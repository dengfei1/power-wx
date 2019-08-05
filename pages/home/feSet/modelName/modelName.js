// pages/home/feSet/modelName/modelName.js
var http = require("../../../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
   
  /**
   * 返回设备报修
   */
  toFeSet:function(e) {

    var index = e.currentTarget.dataset.index;

    var name = this.data.list[index].name
    let pages = getCurrentPages();//定义上页面

    let currPage = null; //当前页面

    let prevPage = null; //上一个页面

    if (pages.length >= 2) {

      currPage = pages[pages.length - 1]; //当前页面

      prevPage = pages[pages.length - 2]; //上一个页面

      if (prevPage) {
        console.log("进来了")
        //上一页存在则给上一个data赋值。则把title传过去

        prevPage.setData({

          name: name

        });

      }

    }
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    var params = {
      url: '/systemParam/findAll?type='+2,
      method: "GET",
      callBack: (res) => {
        console.log("查询故障类别", res)
        that.setData({
          list:res.data
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