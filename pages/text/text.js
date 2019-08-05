
// pages/userhome/address/address.js
Page({
  data: {
   

    

    
processData: [{
      name: '提交工单',
      start: '#fff',
      end: '#EFF3F6',
      icon: 'https://p.ssl.qhimg.com/t011daff2c956afc2b8.jpg'
    },
    {
      name: '已接单',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://p.ssl.qhimg.com/t011daff2c956afc2b8.jpg'
    },
    {
      name: '开始维修',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://p.ssl.qhimg.com/t011daff2c956afc2b8.jpg'
    },
    {
      name: '维修结束',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://p.ssl.qhimg.com/t011daff2c956afc2b8.jpg'
    },
    {
      name: '已确认',
      start: '#EFF3F6',
      end: '#fff',
      icon: 'https://p.ssl.qhimg.com/t011daff2c956afc2b8.jpg'
    }],
    detailData:{
      progress:[
        {
          word:"提交工单",
          state:4
        },
        {
          word: "已接单",
          state: 4
        },
        {
          word: "开始维修",
          state: 4
        },
        {
          word: "维修结束",
          state: 4
        },
        {
          word: "已确认",
          state: 5
        }, 
      ]
        
    }

  },

//进度条的状态
 setPeocessIcon: function() {
    var index = 0//记录状态为1的最后的位置
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress.length; i++) {
       var item = this.data.detailData.progress[i]
      // console.log("dd", this.data.detailData.progress.length)
      // processArr[i].name = item.word
      if (item.state == 4) {
        index = i
        processArr[i].icon = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2848318008,551944810&fm=58"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "https://p.ssl.qhimg.com/t011daff2c956afc2b8.jpg"
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
  //  processArr[index].icon = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3100024767,29226190&fm=58"
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
