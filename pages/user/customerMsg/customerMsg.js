// pages/user/customerMsg/customerMsg.js
import WxValidate from '../../../utils/WxValidate';
var http = require("../../../utils/http.js")
var tcity = require("../../../utils/citys.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    realName:'',
    phone:'',
    address1:'',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    isHede:true,
    cityData:[]
  },
  /**
 * 选择所在城市
 */
  open:function() {
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
   * 初始化提示信息
   */
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      tel: {
        required: true,
        tel: true
      },
      address: {
        required: true
      }
    }
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4个汉字个汉字'

      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      address: {
        required: '请输入联系地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
     * 表单-提交
     */
  //调用验证函数
  formSubmit: function (e) {

    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      //验证出错
      const error = this.WxValidate.errorList[0]
      //提示错误信息
      this.showModal(error)
      return false
    }
    //验证通过以后->
    this.submitInfo(params);
   
  },
  /**
   * 提交成功
   */
  submitInfo(params) {
   var that=this
    console.log("提交用户信息")
    // form提交
    var form = params;
    //网络请求提交数据

    var realName = form.name;
    var clientPhone = form.tel;
    var textarea = form.address;
    var clientAddress = that.data.address1 + "," + textarea
    console.log(that.data.address1 )
    console.log("联系地址", clientAddress)
    var userList = wx.getStorageSync('userList')

    var userId = userList.user.data.currentUser.id

    if (realName !="" && clientPhone != "" && clientAddress != "" && userId !="") {

      console.log("提交用户信息", realName, clientPhone, clientAddress, userId)
      //修改全局变量userList
      var currentUser= userList.user.data.currentUser
      currentUser.address =clientAddress
      currentUser.phone = clientPhone
      currentUser.realName = realName
      wx.setStorageSync('userList', userList)

      var paramss = {
        url: '/user/updateUserMessage?realName=' + realName + "&&phone=" + clientPhone + "&&address=" + clientAddress + "&&userId=" + userId,
        method: "GET",
        callBack: (res) => {
          console.log('提交用户信息成功', res)
          wx.showToast({
            title: res.info,
            duration:1000
          })
          //跳转我的设备    
          wx.navigateBack({
            delta: 1
          })

        }

      }
      http.request(paramss)

    }  
    
    
  },
  /**
   * 错误提示
   */
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //验证函数
    that.initValidate();

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
    var that=this
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
  getAddres(){
    var that=this
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