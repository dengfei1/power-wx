// pages/home/myMsg/myMsg.js
var app = new getApp();
var http = require("../../../utils/http.js");
var dialog = require("../../../utils/dialog.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    isHide: false,
    isHided: false,
    allAss: '',
    allImg: '',
    noAss: '',
    assed: '',
    // 信息公告
    dataArr: '',
    page: 1,
    pages: 0,
    dataList: [{}],
    moreDetail: [{
      title: '',
      main: '  ',
      imgUrl: ''
    }],
    // 待评价
    toBe: [
    //   {
    //   title: '公告标题',
    //   main: '公告内容大概',
    //   more: '查看详情',
    //   timed: '2019-04-18 10:00',
    //   time: '2019-04-18 14:00',
    //   result: '已解决1',
    //   id: '1'
    //  },
    // {
    //   title: '公告标题',
    //   main: '公告内容大概',
    //   more: '查看详情',
    //   timed: '2019-04-18 10:00',
    //   time: '2019-04-18 14:00',
    //   result: '已解决2',
    //   id: '2'
    // },
    // {
    //   title: '公告标题',
    //   main: '公告内容大概',
    //   more: '查看详情',
    //   timed: '2019-04-18 10:00',
    //   time: '2019-04-18 14:00',
    //   result: '已解决3',
    //   id: '3'

    // }
    ],
    // 已评价
    hadAss: [
    //   {
    //   specialty: '礼貌热情，认真负责',
    //   pname: '项目名称项目名称项目名称项目名称1',
    //   wxTime: '4月10日',
    //   imgUrl: '',
    //   conclusion:"dd"
    // },
    // {
    //   remark: '礼貌热情，认真负责',
    //   name: '项目名称项目名称项目名称项目名称2',
    //   time: '4月10日',
    //   imgUrl: ''
    // },
    // {
    //   remark: '礼貌热情，认真负责',
    //   name: '项目名称项目名称项目名称项目名称3',
    //   time: '4月10日',
    //   imgUrl: ''
    // }
    ],
    swiperHeight: "",
    pageSize: '',
    notice: '',
    pageNum: '',
    // toView: 'red',
    scrollTop: 100,

    // allNum:0,//全部评价
    // imgNum:0,//有图评价
    // noPjNum:0,//待评价
    // pjNum:0//已评价
    
    assessNumArr: {},//评价数量
    conclusion:['已处理','设备正常运行','无法处理','上报厂商维修'],
    stars: [
      {
        flag: 1,
        bgImg: "image/star2.png",
        bgfImg: "image/star1.png"
      },
      {
        flag: 1,
        bgImg: "image/star2.png",
        bgfImg: "image/star1.png"
      },
      {
        flag: 1,
        bgImg: "image/star2.png",
        bgfImg: "image/star1.png"
      },
      {
        flag: 1,
        bgImg: "image/star2.png",
        bgfImg: "image/star1.png"
      },
      {
        flag: 1,
        bgImg: "image/star2.png",
        bgfImg: "image/star1.png"
      }
    ],
  },

  /**
   * 滚动到底部
   */
  lower: function () {
    console.log("我到底部了")
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.fetchArticleList(1, true);
    // this.fetchArticleList(1)
  
    // var use = wx.getStorageSync('apply')
    this.scores()
 

    this.getStayAssessInfo()
    
    

  },
 
 /**
  * 点亮星星
  */
  scores() {
    var that=this
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      console.log("allItem", allItem)
      //参数和变量名称一致，可用一个值代替（es6新语法特性）
      that.setData({
        [allItem]: 1
      })
    }
    for (var i = 0; i <3; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 2
      })
    }
  },
  /**
   * 获取评价数量
   */
  getAssessNum(){
    var that = this;
    var userList = wx.getStorageSync('userList');
    var userid = userList.user.data.currentUser.id;
    var params = {
      url: '/maintainOrder/findOrderNumByUserId?userId=' + userid,
      method: "POST",
      callBack: (res) => {
        console.log("评价数量", res)
        that.setData({
          assessNumArr: res.data
        })
      }
    }
    http.request(params)
  },
  /**
   * 获取待评价信息
   */
  getStayAssessInfo(){
    
    var that = this;
    var userList = wx.getStorageSync('userList');
    var userid = userList.user.data.currentUser.id;
    dialog.loading();
    var params = {
      url: '/maintainOrder/findByUserId?userId=' + userid+"&&type="+3+"&&pageNum=1"+"&&pageSize=30",
      method: "POST",
      callBack: (res) => {
        console.log("获取待评价信息", res.data)
        that.setData({
          toBe: res.data.data
        })
        dialog.hide();
      }
    }
    http.request(params)

  },
  /**
   * 获取已评价信息
   */
  getAlreadyAssessInfo(){
    var that = this;
    var userList = wx.getStorageSync('userList');
    var userid = userList.user.data.currentUser.id;
    dialog.loading();
    var params = {
      url: '/maintainOrder/findByUserId?userId=' + userid + "&&type=" + 4 + "&&pageNum=1" + "&&pageSize=30",
      method: "POST",
      callBack: (res) => {
        console.log("获取已评价信息", res.data)
       
        var hadAss = res.data.data
        var wxTimes=[];
        var wxTime="";
        for (let i = 0; i < hadAss.length;i++){
           wxTimes[i]=hadAss[i].wxTime
        }
        for (let i = 0; i < wxTimes.length;i++){
          wxTime=wxTimes[i]
          wxTime=wxTime.substring(0, 10)
          console.log(wxTime)
          hadAss[i].wxTime = wxTime
        }
       

        that.setData({
          hadAss: hadAss
        })
        dialog.hide();
      }
    }
    http.request(params)
  },

  /**
   * 分享评价
   */
  onShareAppMessage: (res) => {
    let { hadAss}=this.data
    var index = e.currentTarget.dataset.index;
    var objHadAss=hadAss[0]
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: objHadAss.pname,
      path: '/pages/home/MyAssess/MyAssess',//这里的path是当前页面的path，必须是以 / 开头的完整路径，后面拼接的参数 是分享页面需要的参数  不然分享出去的页面可能会没有内容
      imageUrl: objHadAss.img,
      desc: objHadAss.conclusion,
      success: (res) => {
        console.log("转发成功", res);
        console.log("成功了")
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  // 删除评价
  delate: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var hadAss = that.data.hadAss;
    var id = hadAss[i].id
    
    var params = {
      url: '/maintainOrder/delDisposeOrder?id=' +id,
      method: "POST",
      callBack: (res) => {
        console.log("删除评论成功", res.data)
        that.setData({
          hadAss: res.data.data
        })
        hadAss.splice(index, 1);
        console.log("index", index)
      }
    }

   
    that.setData({
      hadAss: hadAss
    })
  },
  // 查看详情
  more: function () {
    var that = this;
    that.setData({
      isHide: true
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    this.getAlreadyAssessInfo()
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 返回
  back1: function () {
    var that = this;
    that.setData({
      isHide: false
    })

  },



  // 跳转评价页面
  toAssess: function (e) {
    var index = e.currentTarget.dataset.index
    var id = this.data.toBe[index].id
    wx.navigateTo({
      url: "../assess/assess?id="+id
    })
  },
  // 查看公告详情
  lookDel: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var objBe = JSON.stringify(this.data.toBe[index])
    console.log(this.data.toBe[index])
    wx.navigateTo({
      url: '../assesDetails/assesDetails?objBe=' + objBe,
    })

    
  },
  back: function () {
    this.setData({
      isHided: false
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
    this.getAssessNum()
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