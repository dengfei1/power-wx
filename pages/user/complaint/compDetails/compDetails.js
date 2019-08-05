// pages/user/complaint/compDetails/compDetails.js
var http = require("../../../../utils/http.js")
var dialog = require("../../../../utils/dialog.js")
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //投诉类型
    compTypeArr: [],
    //默认选择第一个
    compValue: 0,
    address1: '',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    isHede: true,

  },
  /**
  * 选择所在城市
  */
  open: function () {
    this.setData({
      condition: !this.data.condition,
      isHede: true
    })

    this.getAddres()
  },

  /**
  * 获取省市区
  */
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0],
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }

  },

  /**
   * 投诉类型
   */
  bindCompTyle: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      compValue: e.detail.value
    })
  },

  /**
     * 提交表单
     */
  formSubmit: function (e) {
    var that = this;//代表提交这个当前元素
    const paramss = e.detail.value
    var index = paramss.comp
    var type = this.data.compTypeArr[index]
    console.log("type", type)
    var content = paramss.content
    var userName = paramss.userName
    var userPhone = paramss.tel
    var textarea = paramss.address
    var address = that.data.address1 + "," + textarea
    if (this.data.compValue == 0) {
      wx.showModal({
        content: '请选择投诉类型',
      })
    } else if (content == "") {
      wx.showModal({
        content: '请填写建议内容',
      })
    } else if (userName == "") {
      wx.showModal({
        content: '请输入联系人姓名',
      })
    } else if (userPhone == ""){
      wx.showModal({
        content: '请输入联系人手机号码',
      })

    } else if (address == "") {
      wx.showModal({
        content: '请输入联系人地址',
      })

    } else {
      //获取用户信息
      var userList = wx.getStorageSync('userList')

      var userid = userList.user.data.currentUser.id
      console.log("提交投诉信息", type, content, userName, userid, userPhone, address)
      dialog.loading();
      var params = {
        url: '/complain/saveComplain?type=' + type + "&&content=" + content + "&&userName=" + userName + "&&userId=" + userid + "&&userPhone=" + userPhone + "&&address=" + address,
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
    var that = this

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data,
          gender: res.data.gender,
          'province': res.data.province,
          'city': res.data.city,
          'county': res.data.county
        })
      },
      fail: function (res) {

      }
    })
    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys
    })
    console.log('初始化完成');



    dialog.loading();
    var params = {
      url: '/systemParam/findAll?type=' + 1,
      method: "POST",
      callBack: (res) => {
        dialog.hide();
        var compTypeArr = [];
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          compTypeArr.push(res.data[i].name)
        }
        compTypeArr.unshift("请选择投诉类型");
        that.setData({
          compTypeArr: compTypeArr
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
    var that = this
    var userList = wx.getStorageSync('userList')

    var realName = userList.user.data.currentUser.realName
    var addressStr = userList.user.data.currentUser.address
    console.log("addressStr", addressStr)
    if (addressStr != null) {
      var addressArr = addressStr.split(',')
      var province = addressArr[0];
      var city = addressArr[1];
      var county = addressArr[2];
      var address = addressArr[3];
      var phone = userList.user.data.currentUser.phone
      that.setData({
        realName,
        province,
        city,
        county,
        address,
        phone,
        isHede: true
      })
    }
    that.getAddres()
  },
  getAddres() {
    var that = this
    let { province, city, county } = that.data
    var i = 0
    console.log(province, city, county, ++i)
    var address = []
    address = province + "," + city + "," + county
    console.log("address", address)
    that.setData({
      address1: address,
    })
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