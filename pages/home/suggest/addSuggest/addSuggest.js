// pages/home/suggest/addSuggest/addSuggest.js
var http = require("../../../../utils/http.js")
var dialog = require("../../../../utils/dialog.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //意见类型
    suggestTypeArr:[],
    //默认选择第一个
    suggestValue:0,

    phone:'',
    realName:''

  },
  /**
   * 意见类型
   */
  bindSuggestTyle:function(e){
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      suggestValue:e.detail.value
    })
  },

  /**
   * 提交表单
   */
  formSubmit:function(e) {
    var that = this;//代表提交这个当前元素
    const paramss = e.detail.value
    var index = paramss.suggest
    var type = this.data.suggestTypeArr[index]
    console.log("type", type)
    var content = paramss.content 
    var userName = paramss.userName

    if (this.data.suggestValue ==0) {
      wx.showModal({
        content: '请选择意见类型',
      })
    } else if (content=="") {
      wx.showModal({
        content: '请填写建议内容',
      })
    } else if (userName=="") {
      wx.showModal({
        content: '请输入联系人姓名',
      })
    }else {
      //获取用户信息
      var userList = wx.getStorageSync('userList')

      var userid = userList.user.data.currentUser.id
      dialog.loading();
      var params = {
        url: '/feedback/release?type=' + type + "&&content=" + content + "&&userName=" + userName + "&&userId=" + userid,
        method: "POST",
        callBack: (res) => {
          dialog.hide();
          console.log('提交用户信息成功', res)
          wx.showToast({
            title: '提交成功',
            duration: 2000,
          })
          wx.hideLoading();
          wx.navigateBack({
            delta: 1,
          })
        }

      }
      http.request(params)
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = {
      url: '/systemParam/findAll?type=' + 3,
      method: "POST",
      callBack: (res) => {
        var suggestTypeArr=[];
         console.log(res.data)
         for(var i=0;i<res.data.length;i++) {
           suggestTypeArr.push(res.data[i].name)
         }
        suggestTypeArr.unshift("请选择意见类型");
         this.setData({
           suggestTypeArr: suggestTypeArr
         })
      }

    }
    http.request(params)
   
    var userList = wx.getStorageSync('userList')
    var realName = userList.user.data.currentUser.realName
    var phone = userList.user.data.currentUser.phone
    this.setData({
      realName,
      phone
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