// pages/energy/energy.js

var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '测试下面legend的红色区域不应被裁剪',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "code": "售后维修服务工单xc3", "text": "售后维修服务工单xc3_3455", "type": "执行中","time":'2018.09.16 15:20:49' ,'op':'编辑 删除'},
      { "code": "售后维修服务工单xc3", "text": "售后维修服务工单xc3_3421", "type": "执行中", "time": '2018.10.15 10:00:30', 'op': '编辑 删除' },
      { "code": "售后维修服务工单xc3", "text": "售后维修服务工单xc3_2549", "type": "执行中", "time": '2018.11. 15:15:02', 'op': '编辑 删除' },
      { "code": "新穗学校", "text": "13", "type": "3200" },
      { "code": "清远狮子湖", "text": "17", "type": "1776" },
      { "code": "中山大学附属大三医院", "text": "6", "type": "595" },
      { "code": "07", "text": "text7", "type": "type7" }
    ],

    currentData: 0,
    dataList:[],
    data:'',
    ec: {
      onInit: initChart
    }
  },
  torecord() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
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
  },
  touchHandler: function(e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  updateData: function(e) {},
  // 时间选择
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var dated = util.formatYear(new Date());
    this.setData({
      date: dated
    });
    this.a();
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; // 以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550 // 以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    };
    var canvas1 = new wxCharts({
      canvasId: 'canvas1',
      type: 'pie',
      series: [{
        name: '一班',
        data: 50
      }, {
        name: '二班',
        data: 30
      }, {
        name: '三班',
        data: 20
      }, {
        name: '四班',
        data: 18
      }, {
        name: '五班',
        data: 8
      }],
      width: 300,
      height: 200,
      dataLabel: true,
    })
    var canvas2 = new wxCharts({
      canvasId: 'canvas2',
      type: 'column',
      // 横坐标
      categories: ['李伟', '张思水', '刘易', '罗明光', '刘大义', '李三铎'],
      series: [{
        name: '一般',
        data: [5, 20, 4, 17, 4, 8]
      }, {
        name: '重要',
        data: [7, 4, 6, 10, 3, 8]
      }, {
        name: 'vip',
        data: [7, 4, 7, 10, 4, 1]
      }, {
        name: 'vvip',
        data: [5, 2, 6, 5, 8, 5]
      }],
      yAxis: {
        format: function(val) {
          return val + '件';  
        }
      },
      width: 350,
      height: 200,
      dataLabel: false
    });
    var canvas3 = new wxCharts({
      canvasId: 'canvas3',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function(val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function(val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200
    });
    var canvas4 = new wxCharts({
      canvasId: 'canvas4',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200
    });
    var canvas5 = new wxCharts({
      canvasId: 'canvas5',
      type: 'column',
      // 横坐标
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
      }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量3',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量4',
        data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200,
      dataLabel: false
    });
    var canvas7 = new wxCharts({
      canvasId: 'canvas7',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200
    });
    var canvas6 = new wxCharts({
      canvasId: 'canvas6',
      type: 'column',
      // 横坐标
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
      }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量3',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量4',
        data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200,
      dataLabel: false
    });

  },

  a:function(){
    var dataList = [1,2,3,4,5,6];
    var that = this;
    that.setData({
      dataList:dataList
    })


  },
  b:function(){
    var dataList1 = [1, 2, 3, 4, 5, 6];
    var that = this;
    that.setData({
      dataList: dataList1
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

  },
})