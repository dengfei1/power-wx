// pages/home/progress/progress.js
var http = require("../../../utils/http.js");
var dialog = require("../../../utils/dialog.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:-1,
    temp:true,
    rotate:"",
    deviceArr:[],

    processData: [{
      name: '已维修',
      start: '#fff',
      end: '#a1a1a1',
      icon: 'icon-weixiu',
      judge:1,
      color:"#999999",
      background: "",
      border:''
      
    },
    {
      name: '售后工程师处理中...',
      start: '#a1a1a1',
      end: '#a1a1a1',
      judge: 0,
      color: "#999999",
      background: "",
      border: ''
      
    },
    {
      name: '已派工',
      start: '#a1a1a1',
      end: '#a1a1a1',
      icon: 'icon-paigong',
      judge: 1,
      color: "#999999",
      background: "",
      border: ''
    },
    {
      name: '服务商派单处理中...',
      start: '#a1a1a1',
      end: '#a1a1a1',
      judge: 0,
      color: "#999999",
      background:"",
      border: ''
    },
    {
      name: '已派单',
      start: '#a1a1a1',
      end: '#a1a1a1',
      icon: 'icon-paidan',
      judge: 1,
      color: "#999999",
      background: "",
      border: ''
    },
    {
        name: '已派单处理中...',
        start: '#a1a1a1',
        end: '#a1a1a1',
        judge: 0,
        color: "#999999",
        background: "",
        border: ''
    },
    {
        name: '待处理',
        start: '#a1a1a1',
        end: '#fff',
        icon: 'icon-gongdan',
        judge: 1,
        color: "#999999",
        background: "",
        border: ''
    },
  ],
  
    listArr:[],
    times:[
      {
        time1:"",
        time2: ""
      },
      {
        time1: "",
        time2: ""
      },
      {
        time1: "",
        time2: ""
      },
      {
        time1: "",
        time2: ""
      },
    ],
    listData:[
      {
        text1:"已维修",
        // text2:'维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论',
        // text3: '',
        vlue: "维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论维修结论"
      },
      {
        text1: "售后工程师处理中",
        text2: '已派工',
        text3: '售后工程师【姓名，工号，联系方式】，等待预约上门维修中...',
        vlue: "姓名，工号，联系方式"
      },
      {
        text1: "服务商派单处理中...",
        text2: '已派单',
        text3: '服务商[北京创新能源科技有限公司派沃售后部],等待派单处理中...',
        vlue: "北京创新能源科技有限公司派沃售后部"
      },
      {
        text1: "派单处理中...",
        text2: '待处理',
        text3: '已生成工单，等待派单处理',
        // vlue:""
      }
    ]

  },
  /**
   * 滚动到底部
   */
  lower:function(){
      console.log("我到底部了")
  },
  /**
   * 获取点击index,根据index获取每个item的状态值
   */
  // clickItem:function(e) {
  //   var index = e.currentTarget.dataset.index;
  //   // console.log("状态值", this.data.listArr)
  //   var state= this.data.listArr[index].state;
  //   console.log("状态值", state)
  //   var i=0;
  //   if(state==1) {
  //     while (i < state*2){
  //       this.data.detailData.progress[i].state=state
  //       i++
  //     } 
  //   } 
  //   if (state == 2) {
  //     while (i < state * 2) {
  //       this.data.detailData.progress[i].state = state
  //       i++
  //     }
  //   } 
  //   if (state == 3) {
  //     while (i < state * 2) {
  //       this.data.detailData.progress[i].state = state
  //       i++
  //     }
  //   } 
  //   if (state == 4) {
  //     while (i < state * 2) {
  //       this.data.detailData.progress[i].state = state
  //       i++
  //     }
  //   } 
  // },

  //进度条的状态
  // setPeocessIcon() {
  //   for(let i=0;i<this.data.listArr.length;i++) {
  //     console.log(this.data.listArr[i].state,"状态")
  //   }


  //   var index = 0//记录状态为1的最后的位置
  //   var processArr = this.data.processData
  //   // console.log("progress", this.data.detailData.progress)
  //   for (var i = 0; i < this.data.detailData.progress.length; i++) {
  //     var n = this.data.detailData.progress.length
  //     var item = this.data.detailData.progress[i]
  //     if (item.state == this.data.listArr[index].state) {
  //       index = i
  //       processArr[i].color = "#fff"
  //       processArr[i].background ="#ff670b",
  //       processArr[i].border ="#ff670b"
  //       processArr[i].start = "#ff670b"
  //       processArr[i].end = "#ff670b"
  //       // if (item.stat==){

  //       // }
  //     } 
  //   }
  //   processArr[index].end = "#999999"
  //   processArr[0].start = "#fff"
  //   processArr[this.data.detailData.progress.length - 1].end = "#fff"
  //   this.setData({
  //     processData: processArr
  //   })
  // },
  /**
   * 进度查询
   */
  setPeocessIcon(state){
    var that=this
    var i=6
    var t=0;
    var end = 0//记录状态为1的最后的位置
    var processArr = that.data.processData
    while (t<=state){
      end = i
      console.log("state", i)
     

      //2 4 6 样式不一样的
      if(i==1){
        processArr[i].color = "#fff"
        processArr[i].background1 = "#ff670b",
        processArr[i].border = "#ff670b"
        processArr[i].start = "#ff670b"
        processArr[i].end = "#ff670b"
      }else if (i==3) {
        processArr[i].color = "#fff"
        processArr[i].background1 = "#ff670b",
        processArr[i].border = "#ff670b"
        processArr[i].start = "#ff670b"
        processArr[i].end = "#ff670b"
      }else if (i==5) {
        processArr[i].color = "#fff"
        processArr[i].background1 = "#ff670b",
        processArr[i].border = "#ff670b"
        processArr[i].start = "#ff670b"
        processArr[i].end = "#ff670b"
      }
      else{
        processArr[i].color = "#fff"
        processArr[i].background = "#ff670b",
        processArr[i].border = "#ff670b"
        processArr[i].start = "#ff670b"
        processArr[i].end = "#ff670b"
      }
      t++
      i--
     }
     processArr[end].start = "#999999"
     processArr[0].start = "#fff"
     processArr[processArr.length-1].end = "#fff"
     that.setData({
      processData: processArr
    })
  },
  clickTriangle:function(e){
   
    console.log("---------")
    var that=this
    var index = e.currentTarget.dataset.index;
    var deviceArr=that.data.deviceArr;
    var state = that.data.deviceArr[index].state
     //調用進度條1  23 45 6
    
   
   
    console.log(that.data.isShow)
    var temp=that.data.temp
    var isShow = that.data.isShow

    if (temp){
     
      that.setData({
        isShow: index,
        temp: !temp,
        deviceArr: deviceArr
      })
    }else{
      that.setData({
        isShow: -1,
        temp: !temp,
      })
    }
    if (index === this.data.isShow){
      deviceArr[index].rotate = "tf180"
      that.setData({
        deviceArr: deviceArr
      })
    }else{
      deviceArr[index].rotate = "tf0"
      that.setData({
        deviceArr: deviceArr
      })
    }
    //调用进度
    console.log("状态值state", state)
    switch (state) {
      case "1":
        this.setPeocessIcon(1)
        break;
      case "2":
        this.setPeocessIcon(3)
        break;
      case "3":
        this.setPeocessIcon(5)
        break;
      case "4":
        console.log("执行")
        this.setPeocessIcon(6)
        break;
      default:
        console.log("default");
    }

    //获取时间 2019-07-25 10:34:36
    console.log(that.data.deviceArr[index])
    console.log(that.data.deviceArr[index].bxTime)
    console.log(that.data.deviceArr[index].pdTime)
    //维修时间
    var wxTime = that.data.deviceArr[index].wxTime
    //报修时间
    var bxTime = that.data.deviceArr[index].bxTime
    //派单时间
    var pdTime = that.data.deviceArr[index].pdTime
    //接单时间
    var jdTime = that.data.deviceArr[index].jdTime
    console.log("进度时间", wxTime, pdTime, jdTime, bxTime)
    var timeArr = [wxTime, jdTime ,pdTime, bxTime]
    console.log("timeArr:",timeArr)
    var time1=""
    var time2 = ""
    var times = this.data.times;
    timeArr.forEach((item,index) => {
      console.log("item:", item)
      //这里需要截取的内容
      if (item!=undefined){
        time1 = item.substring(5, 10)
        time2 = item.substring(11, 16)
        console.log("time1:", time1, "time2", time2)
        times[index].time1 = time1
        times[index].time2 = time2
      }
      
    })
    this.setData({
      times: times
    })
    console.log("times", times)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      dialog.loading();
      var that=this
      var userList = wx.getStorageSync('userList');
      var userid = userList.user.data.currentUser.id
      var pageNum = 1;
      var pageSize = 20;
      var params = {
        url: '/repair/findAll?pageNum=' + pageNum + "&userId=" + userid + "&&pageSize=" + pageSize,
        method: "POST",
        callBack: (res) => {      
          console.log('进度信息', res)
          that.setData({
            deviceArr: res.data
          })
          dialog.hide()
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