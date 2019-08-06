// pages/home/feSet/address/address.js
var http = require("../../../../utils/citys.js")
var tcity = require("../../../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '广东省,广州市,黄埔区',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
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
   * 选择所在城市
   */
  open: function () {
    let { province, city, county } = this.data
    var i = 0
    console.log(province, city, county, ++i)
    var address = this.data.address
    address = province + "," + city + "," + county
    console.log("address", address)
    this.setData({
      condition: !this.data.condition,
      address: address
    })


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
     * 提交表单
     */
  formSubmit: function (e) {

    var that = this;//代表提交这个当前元素
    const params = e.detail.value
    var textarea = params.textarea;
    var address = that.data.address + "," + textarea
    console.log("联系地址", address)
    if (textarea != "" && address != "") {
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

            address: address

          });

        }

      }
      wx.navigateBack({
        delta: 1,
      })
    } else {
      wx.showModal({
        content: '请填写完整信息',
        showCancel: false
      })
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
    //console.log(that.userInfo);
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