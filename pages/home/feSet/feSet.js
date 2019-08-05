// pages/home/feSet/feSet.js
// 表单
var that;
var a = [];


import WxValidate from '../../../utils/WxValidate';
var http = require("../../../utils/http.js");
var dialog = require("../../../utils/dialog.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    images: [],
    uploadedImages: [],
   
    from: {
      name: '',
      phone: ''
    },
    uuid:'',
    name:'',
    textarea:'',
    userName:'',
    tel:'',
    address:'',

    show:false,

    //故障类别
    feSetstyle: [],
    //默认选择第一个
    feSetstyleValue: 0,
  },

/**
 * 选择故障类别
 */
 bindFeSetStTyle: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      feSetstyleValue: e.detail.value
    })
  },
/**
 * 获取故障类别
 */
getFeSet(){
  var that = this;
  dialog.loading();
  var params = {
    url: '/systemParam/findAll?type=' + 2,
    method: "GET",
    callBack: (res) => {
      dialog.hide();
      var feSetstyle = [];
      console.log("查询故障类别", res)
      for (var i = 0; i < res.data.length; i++) {
        feSetstyle.push(res.data[i].name)
      }
      feSetstyle.unshift("选择故障类别");
      that.setData({
        feSetstyle: feSetstyle
      })

    }
  
  }
  http.request(params)
},
  // 调用相机
  chooseImg: function(e) {
    var that = this;
    console.log(that.data.images.length,'长度')
    if (that.data.images.length<=2){
      // 选择图片
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
          that.setData({
            images: that.data.images.concat(tempFilePaths)
          });
          // var len = that.data.images;
          // if (len.length > 3) {

          // }
          console.log("123", that.data.images);
        }
      })
    }else{
      wx.showModal({
        content:'最多只能传入3张图片',
        showCancel:false
      })
    }
   
    
  },
  // 图片预览
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  delete: function (e) {
    var index = e.currentTarget.dataset.index; var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },
// 删除图片
  deleteImage: function (e) {
    var that = this;
    var images = that.data.images;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          console.log("12:", a);
          console.log(index);
          var imgList = a.splice(index,1);
          console.log(imgList);
          that.setData({
            tempFilePaths: imgList
          })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   var  that = this;
    // 表单验证
    that.initValidate()

    //获取故障类型
    that.getFeSet()
 
    var objectId = options.objectId; 
    console.log(objectId);

    

  },
  submitForm(e) {
    /**
     * 4-3(表单提交校验)
     */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    /**
     * 这里添写验证成功以后的逻辑
     * 
     */
    //验证通过以后->
    this.submitInfo(params);
  },
  submitInfo(params) {
    // form提交
    var form = params;
    console.log('将要提交的表单信息：', form);
    wx.showToast({
      title: '提交成功！！！！',
    })
  },
  // 报错
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
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

    }
    this.WxValidate = new WxValidate(rules, messages)
  }, 
  submitForm(e) {
        /**
         * 4-3(表单提交校验)
         */
        const params = e.detail.value
        if (!this.WxValidate.checkForm(params)) {
          const error = this.WxValidate.errorList[0]
          this.showModal(error)
          return false
        }
        /**
         * 这里添写验证成功以后的逻辑
         * 
         */
        //验证通过以后->
        this.submitInfo(params);

      },
      /**
       * 表单-提交
       */
  //调用验证函数
  formSubmit: function(e) {
    var that = this;
    let { uuid, images, address, feSetstyle, feSetstyleValue } = that.data
    let userList = wx.getStorageSync('userList');

    const params1 = e.detail.value//代表提交这个当前元素
    let textarea = params1.textarea
    let userName = params1.name
    let tel = params1.tel
    let userId = userList.user.data.currentUser.id

    let problem = textarea;
    let clientName = userName;
    let clientPhone = tel;
    let clientAddress = address;
    let faultType = feSetstyle[feSetstyleValue]
    let imageArr = images
    console.log(uuid, userId, faultType, problem, clientName, clientPhone, clientAddress, imageArr,imageArr.length)
    if (uuid != "" && userId != "" && problem != "" && clientName != "" && clientPhone != "" && clientAddress != "" && imageArr.length != 0 && faultType!="") {
      console.log("进来了")
      var params = {
        url: '/repair/save?uuid=' + uuid + '&&userId=' + userId + '&&problem=' + problem + '&&clientName=' + clientName + '&&clientPhone=' + clientPhone + '&&clientAddress=' + clientAddress + '&&uploadFile1=' + imageArr[0] + '&&uploadFile2=' + imageArr[1] + '&&uploadFile3=' + imageArr[2] + "&&faultType=" + faultType,
        method: "GET",
        callBack: (res) => {
          console.log('设备报修提交', res)
          
          this.showModal({
            msg: '提交成功'
          })

        }

      }
      http.request(params)

     
    }else{
      wx.showModal({
        content: '请填写完整信息',
        showCancel: false
      })
    }
  
  },


  /**
  * 跳转设备编号
  */
  toUuid:function() {
    wx.navigateTo({
      url: 'uuId/uuId',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
      
  },

  /**
  * 跳转设备编号
  */
  toModelName:function() {
    wx.navigateTo({
      url: 'modelName/modelName',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 跳转故障描述
   */
  toDescribe:function(){
    wx.navigateTo({
      url: 'faultDescription/faultDescription',
    })
  },

  /**
   * 跳转用户名
   */
  toUserName:function() {
    wx.navigateTo({
      url: 'userName/userName',
    })
  },
    /**
   * 跳转联系方式
   */
  toTouch: function () {
    wx.navigateTo({
      url: 'tel/tel',
    })
  },
  /**
 * 跳转详细地址
 */
  toAddress: function () {
    wx.navigateTo({
      url: 'address/address',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
     var that= this;
     
     if (that.data.uuid) {
        this.getUserInfo(that.data.uuid)
      }


    //  var pages=getCurrentPages();
    //  var currPage=pages[pages.length-1]
   
    // if (currPage.data.uuid && currPage.data.name && currPage.data.textarea && currPage.data.userName && currPage.data.tel && currPage.data.address){
    //   console.log("上一页", currPage.data.uuid, currPage.data.userName)
    //   console.log(that.data.uuid)
    //   if (that.data.uuid) {
    //     this.getUserInfo(that.data.uuid)
    //   }
    //     that.setData({
    //       uuid: currPage.data.uuid,
    //       name: currPage.data.name,
    //       textarea: currPage.data.textarea,
    //       userName: currPage.data.userName,
    //       tel: currPage.data.tel,
    //       address: currPage.data.address
    //     })
    //  }
    
   
    

  },

  /**
   * 根据设备编号获取用户信息
   */
  getUserInfo:function(uuid){
    var that = this
    var userList = wx.getStorageSync('userList');
    var userId = userList.user.data.currentUser.id
    //获取绑定数据
    var params = {
      url: '/repair/findByUserIdAndEqId?uuid=' + uuid + '&&userId=' + userId,
      method: "GET",
      callBack: (res) => {
        console.log('用户信息', res)

        that.setData({
          userName: res.data.clientName,
          tel: res.data.clientPhone,
          address: res.data.clientAddress
        })
      }

    }
    http.request(params)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})