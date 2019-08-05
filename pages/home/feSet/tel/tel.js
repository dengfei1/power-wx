// pages/home/feSet/tel/tel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 返回设备保修
   */
  toFeSet: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
     * 提交表单
     */
  formSubmit: function (e) {

    var that = this;//代表提交这个当前元素
    const params = e.detail.value
    var tel = params.tel;
    console.log("手机号码", tel)
    if (!(/^1[345789]\d{9}$/.test(tel))) {
      console.log("手机号有误",tel)
      if (tel.length >= 11||tel.length<11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
      
    } else {


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

            tel: tel

          });

        }

      }
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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