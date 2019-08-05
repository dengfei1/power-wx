// pages/home/myMsg/myMsg.js
var app = new getApp();
var http = require('../../../utils/http.js')
var WxParse = require('../../../wxParse/html2json.js')
var WxParse1 = require('../../../wxParse/wxParse.js')

var dialog = require('../../../utils/dialog.js')
var times1=require('../../../utils/times1.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData:0,
    currentData1: 0,
    isHide: false,
    isHided: false,
    allAss: '',
    allImg: '',
    noAss: '',
    assed: '',
    // 信息公告
    dataArr: [],
    page: 1,
    pages: 0,
    dataList: [{}],
    moreDetail: [],

   
    swiperHeight: "",
    pageSize:'',
    notice:'',
    pageNum:'',
    // toView: 'red',
    scrollTop: 100,
    
    //存时间
    results:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dialog.loading();
    var that = this;
  
    var params = {
      url: '/notice/findAllNews',
      method: "GET",
      callBack: (res) => {
        dialog.hide();
        console.log('获取公告数据', res)
        //通过request获取数据后；这里不写了。
        var result = res.data;

        var list =[] ;//我这里的contnet是html内容
        var times=[];//取出时间
        for(let i=0;i<result.length;i++) {
          list.push(result[i].content)
          times.push(result[i].startTime)
        }
        console.log("times",times)
        var htmlAry = [];
        for (let i = 0; i < list.length; i++) {
            htmlAry[i] = WxParse.html2json(list[i], 'returnData');//重点，就是这里。只要这么干就能直接获取到转化后的node格式数据；
            console.log(htmlAry[i]);
          
        }
        for(let i=0;i<times.length;i++){
          // var stringTime = "2019-8-4 00:00:00";
          var stringTime = times[i]
          console.log("发布时间：" + stringTime)
          var stringTime1 = new Date(Date.parse(stringTime.replace(/-/g, "/")));
          console.log("stringTime1", stringTime1)
          var date = stringTime1.getTime();
          console.log("dd", date )
          this.timeago(date)
         
      
          for (let j = 0; j < this.data.results.length;j++){
            var timeItem = this.data.results[j]
            result[j].timeItem = timeItem
            }
            that.setData({
              dataArr: result,
              htmlAry: htmlAry,//记得这里要加入
            });
          
        }
     


      }

    }
    http.request(params)

    
  },
  /**
   * 把后台传来的日期时间转化为几天前,几小时前，几分钟前在前端展现
   */

  timeago(dateTimeStamp){
    console.log("调用timeago", dateTimeStamp)
    var result=""
    // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var  hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    
    var  now = new Date().getTime();   //获取当前时间毫秒
    console.log("now", now)
    var diffValue = now - dateTimeStamp;//时间差
    console.log("diffValue", diffValue)
    if(diffValue<0) { return; }
      //计算时间差的分，时，天，周，月
	  var  minC = diffValue / minute;   
    var  hourC = diffValue / hour;
    var  dayC = diffValue / day;
    var  weekC = diffValue / week;
    var  monthC = diffValue / month;
    console.log("天数：", dayC)
    console.log("时间：", hourC)
    if(monthC>= 1){
      // result = "" + parseInt(monthC) + "月前";
      result = "" + times1.formatTimeTwo(dateTimeStamp,"Y年M月D日")
     }else if (weekC >= 1) {
       result = "" + parseInt(weekC) + "周前";
    } else if (parseInt(dayC)==2) {
      // result = "" + parseInt(dayC) + "昨天";
      result = "昨天" + times1.formatTimeTwo(dateTimeStamp, "Y年M月D日 h:m").substring(11, 17)
    } else if (parseInt(dayC) > 2) {
      // result = "" + parseInt(dayC) + "昨天";)
      result = times1.formatTimeTwo(dateTimeStamp, "Y年M月D日 h:m").substring(5, 17)
    } else if (hourC <1||hourC >= 1) {
      console.log(hourC)
      // result = "" + parseInt(hourC) + "小时前";
      result = times1.formatTimeTwo(dateTimeStamp, "Y年M月D日 h:m").substring(12, 17) 
     }
    //  else if (minC >= 1) {
    //     // result = "" + parseInt(minC) + "分钟前";
    //   result = times1.formatTimeTwo(dateTimeStamp, "Y年M月D日 h:m").substring(11, 17) + "分钟前"
    //   }else{
    //     result = "刚刚";
    //   } 
    console.log("调用timeago", dateTimeStamp)
      console.log("result",result)
      var  results=this.data.results
     console.log("第一次")
     results.push(result)
      console.log("第一次")
      this.setData({
        results: results
      })
    console.log(this.data.results)
      // return result;
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
    hadAss.splice(index, 1);
    console.log("index", index)
    that.setData({
      hadAss: hadAss
    })
  },
  // 查看详情
  more: function (e) {
    var that = this;
    var index =e.currentTarget.dataset.index;
  
    var moreDetail=[]
    moreDetail.push(this.data.dataArr[index])
    console.log(this.data.dataArr[index])
    console.log(moreDetail[0].content)
    WxParse1.wxParse('content', 'html', moreDetail[0].content, that, 5); 
    
    that.setData({
      isHide: true,
      moreDetail: moreDetail
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

  //获取当前滑块的index
  bindchange1: function (e) {
    const that = this;
    that.setData({
      currentData1: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent1: function (e) {
    const that = this;
    if (that.data.currentData1 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData1: e.target.dataset.current
      })
    }
  },
  // 跳转评价页面
  toAssess: function () {
    wx.navigateTo({
      url: "./assess/assess"
    })
  },
  // 查看公告详情
  lookDel: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    // var toBe = that.data.toBe;
    this.setData({
      isHided: true
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
