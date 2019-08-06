// pages/run/run.js
var wxCharts = require('../../utils/wxcharts.js');
var app = new getApp();
var util = require('../../utils/times.js');
var http = require("../../utils/http.js");
var dialog = require("../../utils/dialog.js");
import * as echarts from '../../ec-canvas/echarts';

//出水温度
var csTemp = [];
var sxTemp = [];
var hsTemp = [];
var hjTemp = [];
var tempTime = [];
var sxhs = [];

var chart;

function initChart(canvas, width, height) {
  console.log("进来了")
   chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scope: '',
    date: '',
    winHeight: "", //窗口高度
    currentData: 0,
    isHided: false,
    isHided1: false,
    isHided2: false,
    isHided3: false,
    sxTemp:[],//水箱温度
    hsTemp:[],//回水温度
    csTemp:[],//出水温度
    hjTemp:[],//环境温度
    // tempTime:'',
    // chartList: '',
    chartList:[],
    power: ['关机', '开机'],
    index: 0, //开关机下标
    inx: 0,
    hour: '',
    min: '',
    open1: 0,
    open2: 0,
    close1: 0,
    close2: 0,
    key: 0, //温度设置下标
    isHide: false,
    item: 0,
    onTime: [],
    tem: [], //温度设置

    dataArr: '',
    addTime: [],
    uuid: '',
    num: 0,
    setName: '',
    ecBar: {
      onInit: true // 延迟加载
    },
    ec: {
      onInit: initChart 
    },
    // 设备数据
    deviceArr: [],
   
    // 参数设置
    bitData: [{
      code: 'switch',
      scope: 0
    }, {
      code: 'L1',
      scope: 0
    }, {
      code: 'L3',
      scope: ''
    }] ,
    
    //存设备
    dataList:{},

    //设备数据隐藏
    parameter: false,
    

    //热水机温度范围
    hotWater:[],
    //冷暖机
    coldWater:[],

    //特种机

    //污泥干化热泵机


    //指令下发状态
    messageid:'',
    
    //设置模式的默认值
    modelValue:0,
    
    //设置模式：制冷 制热   默认制热
    model: ['制热模式','制冷模式']
  },

  test(csTemp, tempTime,color1,text){
    console.log("----------------", csTemp, tempTime, color1, text)
  var option = {
    title: {
      textStyle: {
        fontSize: 20,
        fontWeight: 'none',
        color: '#333' // 主标题文字颜色
      },
    },
    legend: {
      data: ['+text+'], 
      top: 20, 
      textStyle: {
        color: 'red',
        fontSize: 14
      }
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{b}T {c0}℃',
    
      axisPointer: {
        type: 'line',
        axis: 'x',
        snap: true,
        lineStyle: {
          color: 'red'
        }

      },
    },
    xAxis: {
      name: "时间/T",
      type: 'category',
      boundaryGap: false,
      data: tempTime,
      nameLocation: 'middle', //坐标轴名称显示位置。
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 'auto',
        rotate: "0",
        textStyle: {
          fontSize: 14,

        },
      },
      // nameTextStyle:{
      //   fontSize: 20,
      // },
     
      axisTick: {
        alignWithLabel: true
      },
      
      show: true,
      nameLocation: "center",
      nameGap: 30,
    },

    yAxis: {
      name: "温度/℃",
      type: 'value',
      nameGap: 30,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      show: true,
      nameLocation: "center",
      axisLabel: { //坐标轴刻度标签的相关设置。
        textStyle: {
          fontSize: 14,

        },
      },
    },
    series: [{
      name: '出水温度',
      type: 'line',
      symbol: 'circle',
      symbolSize: 0,
      data: csTemp,
      show: true,
      // normal: {
      //   fontSize: 10,
      //   rich: {}
      // },
      lineStyle: {
        color: color1
      },

    },


    ]
  };
    
    console.log(chart, "chart加载前")
    if (chart != undefined ){
      console.log(chart,"加载后")
      chart.setOption(option, true);
    }
   
 
},
/**
 * 出水温度
 */
  // test() {
  //   console.log(111)
  //   var option = {
  //     title: {
  //       textStyle: {
  //         fontSize: 12,
  //         fontWeight: 'none',
  //         color: '#333' // 主标题文字颜色
  //       },
  //     },
  //     color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
  //     legend: {
  //       data: ['出水温度', '环境温度', '水箱温度'],
  //       top: 'auto',
  //       left: 'center',
  //       // backgroundColor: 'red',
  //       z: 100
  //     },
  //     grid: {
  //       containLabel: true
  //     },
  //     tooltip: {
  //       show: true,
  //       trigger: 'axis'
  //     },
  //     xAxis: {
  //       type: 'category',
  //       boundaryGap: false,
  //       data: tempTime,
  //       nameLocation: 'end', //坐标轴名称显示位置。
  //       axisLabel: { //坐标轴刻度标签的相关设置。
  //         interval: 'auto',
  //         rotate: "30"
  //       },
  //       fontsize: 10,
  //       axisTick: {
  //         alignWithLabel: true
  //       }
  //       // show: false
  //     },
  //     dataZoom: [{
  //       type: 'slider',
  //       xAxisIndex: 0,
  //       filterMode: 'empty',
  //       height: 10,
  //       handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
  //       handleSize: '60%',
  //       handleStyle: {
  //         color: '#fff',
  //         shadowBlur: 3,
  //         shadowColor: 'rgba(0, 0, 0, 0.6)',
  //         shadowOffsetX: 1,
  //         shadowOffsetY: 1
  //       },
  //       bottom: "20rpx",
  //       //top: "94%"
  //     }],
  //     yAxis: {
  //       x: 'center',
  //       type: 'value',
  //       nameGap: 30,
  //       splitLine: {
  //         lineStyle: {
  //           type: 'dashed'
  //         }
  //       },
  //       // show: false
  //     },
  //     series: [{
  //         name: '出水温度',
  //         type: 'line',
  //         smooth: true,
  //         data: csTemp,
  //         show: true,
  //         normal: {
  //           fontSize: 14,
  //           rich: {}
  //         },
  //       },
  //       {
  //         name: '环境温度',
  //         type: 'line',
  //         smooth: true,
  //         data: hjTemp,
  //         normal: {
  //           fontSize: 14,
  //           rich: {}
  //         }
  //       },
  //       {
  //         name: '水箱温度',
  //         type: 'line',
  //         smooth: true,
  //         data: sxhs,
  //         normal: {
  //           fontSize: 14,
  //           rich: {}
  //         }
  //       }
  //     ]
  //   };
  //   // chart.setOption(option, true);
  // },
  /**
   * 温度图表接口
  */
  // chartList: function() {
  //   var that = this;
  //   var uuid = that.data.dataList.uuid;
  //   var date = that.data.date;
  //   wx.request({
  //     url: app.globalData.url + '/receptionMessage/findByTemp?imei=' + uuid + '&&recevie_date=' + date,
  //     data: '',
  //     header: app.globalData.header,
  //     method: 'POST',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function(res) {
  //       console.log('水箱温度', res.data.data)
  //       that.setData({
  //         chartList: res.data.data
  //       })
  //       var chartList = that.data.chartList;
  //       csTemp = [], sxTemp = [], hsTemp = [], hjTemp = [], tempTime = [];
  //       for (var i = 0; i < chartList.length; i++) {
  //         let date = chartList[i][4].substring(11, chartList[i][4].length - 3)
  //         csTemp.push(chartList[i][1])
  //         hjTemp.push(chartList[i][2])
  //         tempTime.push(date)
  //         // 判断运行模式为单热水、制热制冷
  //         if (that.data.dataArr[0].runnmodel == 0) {
  //           sxhs.push(chartList[i][0])
  //         }
  //         if (that.data.dataArr[0].runnmodel == 1) {
  //           sxhs.push(chartList[i][3])
  //         }
  //         if (that.data.dataArr[0].runnmodel == 2) {
  //           sxhs.push(chartList[i][3])
  //         }
  //       }

  //       that.test();
  //     },
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // },
  // 参数设置接口
  //  {{ dataArr[0].runnmodel == 0 ? '单热水' : (dataArr[0].runnmodel == 1 ? '单制热' : (dataArr[0].runnmodel == 2 ? '单制冷' : '未知')) }}
  /**
   * 设置模式  //jqtype   0:单热水，1单制热, 2单制冷, 3热水+[u1]制热, 4热水+制冷, 默认1  3应为制冷+制热
   */
  bindModel:function(e){
    var that = this;
    console.log('picker发送选择改变，携带值为', this.data.model[e.detail.value], e.detail.value)
    that.setData({
      modelValue: e.detail.value
    })
    var type ="runnmodel";
    var idnex=e.detail.value;

    //0001 单制热  0002单制冷  0003热水+制热  0004热水+制冷
    var model = ["0001", "0002", " 0003","0004热水"];
    var params = {
      url: '/send/sendMainboard?unitIp=' + '01' + '&&type=' + type + '&&param=' + model[idnex] + "&&uuid=" + that.data.dataList.uuid,
      method: "POST",
      callBack: (res) => {

        console.log('设置模式', res)
        console.log(res.data.messageid)
        that.setData({
          messageid: res.data.messageid
        })
       
      }
    }
    http.request(params)

    var myVar = setInterval(function () {
      console.log(that.data.messageid)
      var params = {
        url: '/commandPaiWo/findCommand?messageid=' + that.data.messageid + '&&uuid=' + that.data.dataList.uuid,
        method: "GET",
        callBack: (res) => {
          console.log('指令状态', res)
          wx.showToast({
            icon: 'none',
            title: res.data[0].commstatus,
          })
          if (res.data[0].commstatus == "已送达") {
            clearInterval(myVar);
            that.setData({
              messageid: ' '
            })
          }


        }

      }
      http.request(params)
    }, 1000)
  },

/**
 *  出水温度
 */
  interTem: function() {
    var that = this;
    var uuid = that.data.dataList.uuid;
    var date = that.data.date;
    console.log("出水温度参数",uuid, date)
    dialog.loading();
    var params = {
      url: '/receptionMessage/findByCsTemp?imei=' + that.data.dataList.uuid + '&&recevie_date=' + date,
      method: "POST",
      callBack: (res) => {
        
        console.log("出水温度结果", res)
        that.setData({    
          chartList: res.data,
          isHided2: true
        })
        that.paintingInterTem()
     
        if (that.data.isHided2) {
        
           var timeOut = setTimeout(function () {
             let { csTemp, tempTime } = that.data
             that.test(csTemp, tempTime, 'blue', '出水温度')
             dialog.hide();
          }, 3000)
         
        }
        
      }
    }
    http.request(params)


   
  },

/**
 * 回水温度
 */
  huiSuiTem:function() {
    var that = this;
    var uuid = that.data.dataList.uuid;
    var date = that.data.date;
    dialog.loading();
    console.log("回水温度参数：", uuid, date)
    var params = {
      url: '/receptionMessage/findByHsTemp?imei=' + that.data.dataList.uuid + '&&recevie_date=' + date,
      method: "POST",
      callBack: (res) => {
        console.log("回水温度结果：", res)
        that.setData({
          chartList: res.data,
          isHided4: true
        })

        that.paintingInterTem()
        if (this.data.isHided4) {
          var timeOut = setTimeout(function () {
            let { csTemp, tempTime } = that.data
            that.test(csTemp, tempTime, 'blue', '回水温度')
            dialog.hide();
          }, 1500)

        }
      }
    }
    http.request(params)

   

  },

  /**
   *  环境温度
   */
  ambTem: function () {
    var that = this;
    var uuid = that.data.dataList.uuid;
    var date = that.data.date;
    dialog.loading();
    console.log("环境温度参数：", uuid, date)
    var params = {
      url: '/receptionMessage/findByHjTemp?imei=' + that.data.dataList.uuid + '&&recevie_date=' + date,
      method: "POST",
      callBack: (res) => {
        console.log("环境温度结果：", res)
        that.setData({
          chartList: res.data,
          isHided3: true
        })

        that.paintingInterTem()    

        
        
        if (this.data.isHided3) {
          var timeOut = setTimeout(function () {
            let { csTemp, tempTime } = that.data
            that.test(csTemp, tempTime, 'green', '环境温度')
            dialog.hide();
          }, 3000)

        }
      }
    }
    http.request(params)

   
  },

  /**
   * 折线图
   */
  paintingInterTem() {
    var that = this
    var chartList = that.data.chartList;
    var csTemp = []
    var tempTime = [];
    for (let i = 50; i < chartList.length; i++) {
      // console.log(chartList[i][0], chartList[i][1]);
      let date = chartList[i][0].substring(11, chartList[i][0].length - 3)

      tempTime.push(date)

      csTemp.push(chartList[i][1])

      // console.log("截取时间", date, "截取温度", chartList[i][1])

      // console.log(chartList.length)

      that.setData({
        csTemp: csTemp,
        tempTime: tempTime
      })



    }


  },
  /**
   * 添加定时
   */
  addTime: function(e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    var onTime = that.data.addTime;
    let onTimeOne = {
      open1: '00',
      open2: '00',
      close1: '00',
      close2: '00',
    };
  
    if (onTime.length < 2) {
      onTime.push(onTimeOne);
      that.setData({
        addTime: onTime,
        //keys: onTimeOne.length
      })
    } else {
      wx.showToast({
        icon:'none',
        title: '最多定时2个阶段',
      })
    }
  
  },

  // 删除
  del: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除该阶段定时？',
      success: function(res) {
        if (res.confirm) {
          var addTime = that.data.addTime;
          console.log("删除", addTime)
          var index = e.currentTarget.dataset.index;
          console.log('index', index);
          var openHour = addTime[index].open1
          var openMinute = addTime[index].open2
          console.log("删除", openHour, openMinute)
          var params = {
            url: '/timer/del?uuid=' + that.data.dataList.uuid + "&&openHour=" + openHour + "&&openMinute=" + openMinute,
            method: "GET",
            callBack: (res) => {
              console.log('删除定时', res)
              addTime.splice(e.currentTarget.dataset.index, 1);
              that.setData({
                addTime: addTime
              })
            }

          }
          http.request(params)



        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 定时
  onTime: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '即将定时？',
      success: function (res) {
        if (res.confirm) {
          var addTime = that.data.addTime;
          var index = e.currentTarget.dataset.index;
          var unitIp = that.data.dataArr[0].unitaddr;
          var index = e.currentTarget.dataset.index;
          //console.log('unitIp', unitIp)
          //var scope='';
          //添加第一个type=T1 添加第二个type=T2
          var type=['T1','T2'];
         
          //var openHour = that.data.addTime[index];
          // console.log('openHour', openHour)
          //     unitIp unitIp机组地址
          //     type 命令类别
          // param 定时使能标志参数
          //     openHour 命令开小时
          //     openMin 命令开分钟
          //     closeHour 命令关小时
          //     closeMin 命令关分钟
          var arr = that.data.addTime[index];
          console.log('index', index, that.data.addTime[index])
          var openHour = arr.open1;
          var openMin = arr.open2;
          var closeHour = arr.close1;
          var closeMin = arr.close2;
          console.log('01', type[index], index, openHour, openMin, closeHour, closeMin, that.data.dataList.uuid)
          wx.request({
            url: app.globalData.url + '/sendTimed/sendTimedTask?unitIp=' + '01' + '&&type=' + type[index] + '&&param=' + index + '&&openHour=' + openHour + '&&openMin=' + openMin + '&&closeHour=' + closeHour + '&&closeMin=' + closeMin+'&&uuid='+that.data.dataList.uuid,
            data: '',
            header: app.globalData.header,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log('第一阶段定时结果：', res)
              that.setData({
                messageid: res.data.data.messageid
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })

          var myVar = setInterval(function () {
            console.log(that.data.messageid)
            var params = {
              url: '/commandPaiWo/findCommand?messageid=' + that.data.messageid + '&&uuid=' + that.data.dataList.uuid,
              method: "GET",
              callBack: (res) => {
                console.log('指令状态', res)
                wx.showToast({
                  icon: 'none',
                  title: res.data[0].commstatus,
                })
                if (res.data[0].commstatus == "已送达") {
                  clearInterval(myVar);
                  that.setData({
                    messageid: ' '
                  })
                }


              }

            }
            http.request(params)
          }, 1000)

         


        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
 /**
  * 查看定时结果
  */
  viewTiming(){
    console.log("定时设备uuid", this.data.dataList.uuid)
    var that=this
    var params = {
      url: '/timer/findByUuid?uuid=' + that.data.dataList.uuid,
      method: "GET",
      callBack: (res) => {
        console.log('查看定时结果', res)
        let onTime=res.data;
        var addTime=[];
        console.log("onTime", onTime)
        
        
        for (let i = 0; i < onTime.length;i++){
          var onTimeOne = {
            open1: onTime[i].openHour,
            open2: onTime[i].openMinute,
            close1: onTime[i].closeHour,
            close2: onTime[i].closeMinute,
          }
          console.log("第" + i + "次", onTimeOne)
          addTime[i] = onTimeOne
          console.log(addTime)
        }
   
          that.setData({
            addTime: addTime
          })
      
      }

    }
    http.request(params)
  },
  /**
  * 判断机型
  */
  typeModel() {
    let hotWater = [];
    let coldWater = [];
    let { dataList } = this.data
    if (dataList.typeName == "热水机") {
      for (let i = 20; i <= 58; i++) {
        if (i < 10) {
          i = i
        }
        hotWater.push(i)
      }
    }
    if (dataList.typeName == "冷暖机") {
      for (let i = 10; i <= 32; i++) {
        if (i < 10) {
          i =  i
        }
        coldWater.push(i)
      }
    }
    console.log(hotWater, coldWater)
  },
 /**
  * 设定温度
  */
  bindTemp:function(e){
    var that = this;
    var { dataList, hotWater, coldWater} = that.data
    console.log("设定温度", e.detail.value)
    that.typeModel()
    if (dataList.typeName == "热水机"){
      console.log(dataList.typeName)
      for (let i = 0; i < hotWater.length;i++) {
        if (hotWater[i] >= 20 && hotWater[i]<=58){
             console.log(i)
        }
      }
    }

   
    var time = e.detail.value
    

    var ind = e.detail.value;
    
    //console.log('that.data.dataArr', that.data.dataArr[0].unitaddr)
    var unitIp = that.data.dataArr[0].unitaddr;
    //console.log('unitIp', unitIp)
    //var scope='';
    var type;
    if (that.data.dataArr[0].runnmodel == 0) {
      type = 'L1'
    }
    if (that.data.dataArr[0].runnmodel == 1) {
      type = 'L1'
    }
    if (that.data.dataArr[0].runnmodel == 2) {
      type = 'L3'
    }
    wx.request({
      url: app.globalData.url + '/send/sendMainboard?unitIp=' + unitIp + '&&type=' + type + '&&param=' + that.data.key+"&&uuid="+uuid,
      data: {},
      header: app.globalData.header,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('设定成功', res)
        wx.showToast({
          icon: 'none',
          title: res.data.data.success,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })


  },
  //水位选择
  waterChange(e) {
    var that = this;
    var ind = e.detail.value;
    var index = e.currentTarget.dataset.c;
    var data = 'key3[' + index + ']';
    that.setData({
      data: this.data.water[ind]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    var that = this;
    // 获取当前时间
    var dated = util.formatDate(new Date());
    console.log(dated, 'formatDate')
    this.setData({
      date: dated
    });

    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    


    
   

    //hour
    var hour = [];
    for (var i = 0; i < 12; i++) {
      if (i < 10) {
        i = '0' + i
      }
      hour.push(i)
    }
    that.setData({
      hour: hour
    })
    //min
    var min = [];
    for (var j = 0; j < 60; j++) {
      if (j < 10) {
        j = '0' + j
      }
      min.push(j)
    }
    that.setData({
      min: min
    })
  
  },
  /**
   * 设备查询
   */
  devInfo(){
    var that=this
    //获取用户信息
    var userList = wx.getStorageSync('userList')

    var id = userList.user.data.currentUser.id

    var params = {
      url: '/appLet/findLetEquipment?userId=' + id,
      method: "POST",
      callBack: (res) => {
        console.log(res, '设备查询')
        //判断是否绑定设备
        that.isDev(res.data)

        that.setData({
          deviceArr: res.data,
          dataList: res.data[0],
          parameter: true
        })
        console.log("--------------")
        that.run1(res.data[0].uuid)
        console.log("默认第一个设备uuid", res.data[0].uuid, that.dataList)
        // that.chartList()
        that.viewTiming()


      }

    }
    http.request(params)
  },
  /**
   * 判断是否绑定设备
   */
  isDev(deviceArr){
    console.log("判断是否绑定设备")
    if (deviceArr.length==0){
      wx.showModal({
        content: '请在我的设备,绑定设备',
        showCancel:false,
        success:function(res){
          if(res.confirm) {
            console.log("confirm", res.confirm)
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        }
      })
    }
  },

  // 时间赋值
  timeValue: function() {


  },
  /**
   * 启动设备
   * 默认第一个接口
   */
  run1(uuid) {
    var that = this;   
    wx.request({
      url: app.globalData.url + '/receptionMessage/findByImei?imei=' + uuid,
      data: '',
      header: app.globalData.header,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('运行状态设备', res);
        // console.log(res.data.data);
        var dataArr = res.data.data

        //截取开关机字符串
        console.log("截取开关机字符串", dataArr[0].control.substring(4, 5))
        var control = dataArr[0].control.substring(4, 5)


        // 运行状态赋值
        that.setData({
          dataArr: dataArr,
          index: control
    
        })

       
           

        // that.setData({
        //   isHide: false
        // })
        // 判断温度取值范围
        var tem = [];
        var key=0;//温度默认值
        if (that.data.dataArr[0].runnmodel == 0) {
          for (var i = 20; i <= 58; i++) {
            tem.push(i)
          }
          key = 35
        }
        if (that.data.dataArr[0].runnmodel == 1) {
          for (var i = 12; i <= 55; i++) {
            tem.push(i)
          }
          key = 28
        }
        if (that.data.dataArr[0].runnmodel == 2) {   
          for (var i = 10; i <= 32; i++) {
            tem.push(i)
          }
          key = 2
        }
        that.setData({
          tem: tem,
          key:key
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    var currentData = that.data.currentData;
    // 运行状态
    if (currentData == 0) {

    }
    // 系统定时
    if (currentData == 1) {
      console.log(222)
    }
  },


  // 开机选择
  bindPickerChange1(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为',this.data.power[e.detail.value])
    that.setData({
      index: e.detail.value
   })
   
    // console.log("开关机",that.data.dataArr[0].control[4])
    //console.log('that.data.dataArr', that.data.dataArr[0].unitaddr)
    var unitIp = that.data.dataArr[0].unitaddr;
    //console.log('unitIp', unitIp)
    //var scope='';
    var type;
    if (that.data.dataArr[0].runnmodel == 0) {
      type = 'L1'
    }
    if (that.data.dataArr[0].runnmodel == 1) {
      type = 'L5'
    }
    if (that.data.dataArr[0].runnmodel == 2) {
      type = 'L3'
    }
    wx.request({
      url: app.globalData.url + '/send/sendMainboard?unitIp=' + '01' + '&&type=' + type + '&&param=' + "1011001" + that.data.index + "&&uuid=" + that.data.dataList.uuid,

      data: {},
      header: app.globalData.header,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('参数设置', res)
        console.log(res.data.data.messageid)
        // wx.showToast({
        //   icon: 'none',
        //   title: res.data.data.success,
        // })
        that.setData({
          messageid: res.data.data.messageid
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })


    var myVar = setInterval(function () {
      console.log(that.data.messageid)
      var params = {
        url: '/commandPaiWo/findCommand?messageid=' + that.data.messageid + '&&uuid=' + that.data.dataList.uuid,
        method: "GET",
        callBack: (res) => {
          console.log('指令状态', res.data[0].commstatus)
          wx.showToast({
            icon: 'none',
            title: res.data[0].commstatus,
          })
          if (res.data[0].commstatus=="已送达"){
            clearInterval(myVar);
            that.setData({
              messageid: ' '
            })
          }
        

        }

      }
      http.request(params)
    }, 1000)
    

  },
  // 运行选择
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      key: e.detail.value
    })
  },
  //开机小时
  openHour(e) {
    var that = this;
    // 最外层下标e
    var ind = e.detail.value;
    // 模式下标
    var index = e.currentTarget.dataset.a;
    console.log(e)
    console.log(index, ind, 11111);
    var data = 'addTime[' + index + '].open1';
  
    that.setData({
      [data]: ind.length < 2 ? '0' + ind : ind,
      open1:ind
    })

    console.log(that.data.open1,'open1')
    console.log(that.data.addTime)
  },
  //开机分
  openMin(e) {
    var that = this;
    // 最外层下标e
    var ind = e.detail.value;
    // 模式下标
    var index = e.currentTarget.dataset.b;
    // console.log(index, this.data.hour[ind]);
    var data = 'addTime[' + index + '].open2';
    that.setData({
      [data]: ind.length < 2 ? '0' + ind : ind,
      open2: ind
    })
  },
  //关机小时
  closeHour(e) {
    var that = this;
    // 最外层下标e
    var ind = e.detail.value;
    // 模式下标
    var index = e.currentTarget.dataset.c;
    var data = 'addTime[' + index + '].close1';
    
    that.setData({
      [data]: ind.length < 2 ? '0' + ind : ind,
      close1:ind
    })
  },
  //关机分
  closeMin(e) {
    var that = this;
    // 最外层下标e
    var ind = e.detail.value;
    // 模式下标
    var index = e.currentTarget.dataset.d;
    // console.log(index, this.data.hour[ind]);
    var data = 'addTime[' + index + '].close2';
    that.setData({
      [data]: ind.length < 2 ? '0' + ind : ind,
      close1: ind
    })
  },
  //温度设置
  bindPickerTem(e) {
    
    var that = this;
    var ind = e.detail.value;
    var uuid = that.data.dataList.uuid;
    that.setData({
      key: ind
    })
    //console.log('that.data.dataArr', that.data.dataArr[0].unitaddr)
    var unitIp = that.data.dataArr[0].unitaddr;
    console.log("下发指令",that.data.tem[that.data.key])
    //console.log('unitIp', unitIp)
    //var scope='';
    //0：单热水L1  1：单制热  L5   2 单制冷L3
    var type;
    if (that.data.dataArr[0].runnmodel == 0) {
      type = 'L1'
    }
    if (that.data.dataArr[0].runnmodel == 1) {
      type = 'L5'
    }
    if (that.data.dataArr[0].runnmodel == 2) {
      type = 'L3'
    }
    wx.request({
      url: app.globalData.url + '/send/sendMainboard?unitIp=' + '01' + '&&type=' + type + '&&param=' + that.data.tem[that.data.key] + "&&uuid=" +that.data.dataList.uuid,
      data: {},
      header: app.globalData.header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('参数设置', res)
        that.setData({
          messageid: res.data.data.messageid
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    var myVar = setInterval(function () {
      console.log(that.data.messageid)
      var params = {
        url: '/commandPaiWo/findCommand?messageid=' + that.data.messageid + '&&uuid=' + that.data.dataList.uuid,
        method: "GET",
        callBack: (res) => {
          console.log('指令状态', res.data[0].commstatus)
          wx.showToast({
            icon: 'none',
            title: res.data[0].commstatus,
          })
          if (res.data[0].commstatus == "已送达") {
            clearInterval(myVar);
            that.setData({
              messageid: ' '
            })
          }


        }

      }
      http.request(params)
    }, 1000)

  },
  //水位选择
  waterChange(e) {
    var that = this;
    var ind = e.detail.value;
    var index = e.currentTarget.dataset.c;
    var data = 'key3[' + index + ']';
    that.setData({
      data: this.data.water[ind]
    })
  },
  // 时间选择
  // openHour(e) {
  //   var that = this;
  //   var ind = e.detail.value;
  //   console.log(e)
  //   var index = e.currentTarget.dataset.a;
  //   console.log(index, 'index')
  //   var data = 'time[' + index + ']'; 
  //   console.log('data', data)
  //    that.setData({
  //     open1: ind
  //   })
  // },
  bindTimeChange1(e) {
    var that = this;
    var ind = e.detail.value;
    console.log(e)
    var index = e.currentTarget.dataset.e;
    console.log(index, 'index')
    var data = 'time1[' + index + ']';
    that.setData({
      [data]: ind
    })
  },
  bindPickerChange5(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      key3: e.detail.value
    })
  },
  //水箱温度选择时间
  bindDateChange: function(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    that.huiSuiTem()
  },
  // 查看更多设备
  more: function() {
    // var that = this;
    // that.setData({
    //   isHide: true
    // })
    wx.navigateTo({
      url: 'moreEquipment/moreEquipment',
    })
  },
  back: function() {
    var that = this;
    that.setData({
      isHide: false
    })
    that.setData({
      isHided: false
    })
    that.setData({
      isHided1: false
    })
    that.setData({
      isHided2: false
    })
    that.setData({
      isHided3: false
    })
    that.setData({
      isHided4: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    // 默认为运行状态
    
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


    // 设备查询
    this.devInfo()
  

  
    
    //判断机型
    this.typeModel()

  

    console.log(this.data.dataList == '{}')
    console.log(this.data.dataList)
    if (JSON.stringify(this.data.dataList) == '{}'){
      this.setData({
        parameter: false
      })
    }else{  
      this.setData({
        parameter: true
      })
      var uuid = this.data.dataList.uuid
      console.log("启动选择的设备",uuid)
      //启动选择的设备
      this.run1(uuid)

     
    }
   
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

  },

})