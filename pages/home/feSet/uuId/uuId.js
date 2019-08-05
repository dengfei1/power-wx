// pages/home/feSet/uuId/uuId.js
var http = require("../../../../utils/http.js")
var dialog = require("../../../../utils/dialog.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },


  
  /**
   * 提交表单
   */
  formSubmit: function (e) {

    var that = this;//代表提交这个当前元素
    const params1 = e.detail.value
    var uuid = params1.uuid;
    console.log("设备编号", uuid)

    //验证设备编号
    var userList = wx.getStorageSync('userList');
    var userId = userList.user.data.currentUser.id
    var params = {
      url: '/repair/findByUserIdAndEqId?uuid=' + uuid + '&&userId=' + userId,
      method: "POST",
      callBack: (res) => {
       
      
        console.log(res.info =="成功！")
        if (res.info=="成功！") {
          //返回上一页返回参数
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

                uuid: uuid

              });

            }

          }
          wx.navigateBack({
            delta: 1,
          })

        }else{
          wx.showModal({
            content: res.info
          })
        }
      
      }

    }
    http.request(params)    
  },

/**
 * 获取用户id
 */
  bindUuid:function(e){
    var index = e.currentTarget.dataset.index;
    var uuid = this.data.list[index].uuid
    //返回上一页返回参数
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
          show:true,
          uuid: uuid

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
    this.getbangData()
  },

  /**
  * 获取绑定数据
  */
  getbangData() {
    var that = this
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
      }

    }
    http.request(params)
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