// pages/home/myBad/myBad.js
var app = new getApp();
var http = require("../../../utils/http.js")
var dialog = require("../../../utils/dialog.js")
var WxParse = require('../../../wxParse/html2json.js')
var WxParse1 = require('../../../wxParse/wxParse.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [],

    dataArr1: [],
    // dataArr2: [],
    dataArr3: [],
    isShow:false,
    content:'',
    objData :{},
    id: 0,
    state: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
     this.getMyBadInfo()

  },
  deviceDetails:function(e){
    let index = e.currentTarget.dataset.index;
    let { dataArr } = this.data
    let id = dataArr[index].id
    let state = dataArr[index].state
    this.setData({
      id:id,
      state: state
    })
  },
  /**
   * 确认告警
   */
  confirm:function(e){
    let that=this
    let { id, state } = that.data
    console.log(id, state)

      var params = {
        url: '/report/updateReadState?id=' + id + "&&state=" + state,
        method: "POST",
        callBack: (res) => {
          dialog.hide();
          console.log('确认告警', res)
          wx.showToast({
            title: '已确认告警',
            icon: 'none'
          })
          that.setData({
            isShow: false
          })

          //刷新数据
          that.getMyBadInfo()
        }


      }
      http.request(params)
    

  },
/**
 * 取消
 */
  bindCancel:function(){
    this.setData({
      isShow:false
    })
  },
  /**
   * 获取告警信息
   */
  getMyBadInfo(){
    var that = this
    //获取用户信息
    var userList = wx.getStorageSync('userList')
    var userid = userList.user.data.currentUser.id

    dialog.loading();
    var params = {
      url: '/report/findAllWxReport?userId=' + userid + "&&pageNum=" + 1 + "&&pageSize=" + 30,
      method: "POST",
      callBack: (res) => {
        dialog.hide();
        console.log('获取告警信息', res)
        var dataArr = res.data
        var list=[];
        var htmlAry=[];
        for (let i = 0; i < dataArr.length;i++){
          list.push(dataArr[i].manage)
        }
        for (let i = 0; i < list.length;i++){
          htmlAry[i] = WxParse.html2json(list[i], 'returnData');//重点，就是这里。只要这么干就能直接获取到转化后的node格式数据；
        }

        that.setData({
          dataArr: res.data,
          htmlAry: htmlAry//记得这里要加入
        })
        this.isHandle()
      }

    }
    http.request(params)
  },

  /**
   *  判断状态，0为已确认，1为已报修,2为未处理
   */
  isHandle() {
    let { dataArr, dataArr1, dataArr2, dataArr3 } = this.data
    var that = this;
    dataArr1.length = 0;
    // dataArr2.length = 0;
    dataArr3.length = 0;
    for (let i = 0; i < dataArr.length; i++) {
      // 0为已确认
      if (dataArr[i].readState == 1) {
        dataArr[i].background = '#0093dd';
        dataArr[i].color = '#333';
        dataArr1.push(dataArr[i]);
      }
      //1为已报修
      // if (dataArr[i].state == 1) {
      //   dataArr[i].background = '#cccdcd';
      //   dataArr[i].color = '#333';
      //   dataArr2.push(dataArr[i]);
      // }
      // 2为未处理 
      if (dataArr[i].readState == 0) {
        dataArr[i].background = '#ff6100';
        dataArr[i].color = '#ff792e';
        dataArr3.push(dataArr[i]);
      }
    }
    console.log("已处理", dataArr1, dataArr3)
    that.setData({
      dataArr1: dataArr1,
      // dataArr2: dataArr2,
      dataArr3: dataArr3
    })
    

  },
  /**
   * 跳转设备详情
   */
  bindShow:function(e){
    var that=this
    let index = e.currentTarget.dataset.index;
    let { dataArr } = that.data
    var objData = dataArr[index]
    var content = objData.manage
    WxParse1.wxParse('article', 'html', content, that, 5);
    that.setData({
      isShow:true,
      objData: objData,
      content: content
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