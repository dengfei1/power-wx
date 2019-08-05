// pages/home/mySet/deviceDetails/deviceDetails.js
import WxValidate from '../../../../utils/WxValidate';
var http = require("../../../../utils/http.js");
var dialog = require("../../../../utils/dialog.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    name:'',
    tel:'',
    address:''
  },
  /**
   * 
   */
  toMySet:function(){
    wx.navigateBack({
      delta: 1
    })
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
     * 表单验证
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
    let jsonObject = JSON.parse(options.jsonStr);
    console.log("设备信息",jsonObject)
    this.setData({
      obj: jsonObject
    });
    //验证函数
    this.initValidate();
    
  },


  /**
    * 表单-提交
    */
  submitInfo(params) {
    dialog.loading();
    // form提交
    var form = params;
    console.log('将要提交的表单信息：', form);
    //网络请求提交数据

    var clientName = form.name;
    var clientPhone = form.tel;
    var clientAddress = form.address;
    if (clientName !="" && clientPhone !="" && clientAddress!=""){
      console.log(this.data.obj.uuid)
      console.log(clientName)
      console.log(clientPhone)
      console.log(clientAddress)

      var paramss = {
        url: '/equipment/updateClientMessage?clientName=' + clientName + "&&clientPhone=" + clientPhone + "&&clientAddress=" + clientAddress + "&&uuid=" + this.data.obj.uuid,
        method: "GET",
        header: {'Content-Type': 'json'},
        callBack: (res) => {
    
          console.log('提交用户信息成功', res)
          wx.showToast({
            title: '保存成功',
            duration:1000,
            icon:'none'
          })
          dialog.hide();
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