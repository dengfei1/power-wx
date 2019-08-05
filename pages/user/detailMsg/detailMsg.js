// pages/user/detailMsg/detailMsg.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
   
    userInfoArr:[],
    userInfo: '',
    nickName: '',
    avatarUrl: '',
    name:'',
    address:'',
    gender:'',
    realName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userList = wx.getStorageSync('userList')
    var realName = userList.user.data.currentUser.realName

    that.setData({
      realName: realName
    })
   
    lang: "zh_CN",
    // 获取用户信息
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = res.userInfo.nickName
        var avatarUrl = res.userInfo.avatarUrl
        var gender = res.userInfo.gender //性别 0：未知、1：男、2：女
        console.log('gender',gender)

        console.log('gender1', that.data.gender)
        if (gender == 1) {
          that.setData({ gender: '男' })
        }
        if (gender == 2) {
          that.setData({ gender: '女' })
        
        }
        if (gender == 0) {
          that.setData({ gender: '未知' })
        }
        console.log("2222",gender);
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(res)
        that.setData({
          userInfo: userInfo,
           nickName: nickName,
          avatarUrl: avatarUrl
        })
      }
    })
    wx.login({
      success: function (res_login) {
        if (res_login.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res_user) {
              var requestUrl = "/getUserApi/xxx.php";
              var jsonData = {
                code: res_login.code,
                encryptedData: res_user.encryptedData,
                iv: res_user.iv
              };
              request.httpsPostRequest(requestUrl, jsonData, function (res) {
                console.log(res.openId);
              });
            }
          })
        }
      }
    })
    
  },
  // 修改地址信息
  changeAddress:function(){
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res,"res")
        that.setData({
          name: res.name,
          address: res.address,
        })
      }
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