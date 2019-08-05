// pages/home/myMsg/assess/assess.js
var a = [];
var b = [];
var image = [];
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData1 : 0,
    tempFilePaths: [],
    images: [],
    uploadedImages: [],
    stars: [{
        flag: 1,
        bgImg: "images/star2.png",
        bgfImg: "images/star1.png"
      },
      {
        flag: 1,
        bgImg: "images/star2.png",
        bgfImg: "images/star1.png"
      },
      {
        flag: 1,
        bgImg: "images/star2.png",
        bgfImg: "images/star1.png"
      },
      {
        flag: 1,
        bgImg: "images/star2.png",
        bgfImg: "images/star1.png"
      },
      {
        flag: 1,
        bgImg: "images/star2.png",
        bgfImg: "images/star1.png"
      }
    ],
    tempFilePaths: [],
    dataArr: [{
      name: '张三',
      time: '4月14日11:23 左右抵达处理',
    }],
    selectArr: [{
        name: 'sel1',
        value: '专业严谨'
      }, {
        name: 'sel2',
        value: '风雨无阻'
      }, {
        name: 'sel3',
        value: '礼貌热情'
      }, {
        name: 'sel4',
        value: '快速准时',
        checked:'true'

      }, {
        name: 'sel5',
        value: '仪表整洁'
      }, {
        name: 'sel6',
        value: '认真负责'
      },
      // '专业严谨', '风雨无阻', '礼貌热情', '快速准时', '仪表整洁', '认真负责'
    ],
    selectedArr: [
      {
        name: 'sel1',
        value: '未解决'
      }, {
        name: 'sel2',
        value: '解决不好'
      }, {
        name: 'sel3',
        value: '态度不好'
      }, {
        name: 'sel4',
        value: '迟到',
        checked: 'true'

      }, {
        name: 'sel5',
        value: '不负责'
      }
      // '未解决', '解决不好', '态度不好', '迟到', '不负责'
    ]
  },
  // 点亮星星的事件部分
  scores: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 2
      })
      b.push(i + 1);
      console.log("11", b)
      console.log(b[b.length - 1])
    }
  },
  // 满意选择
  select: function(e) {
    var that = this;
    var selectArr = that.data.selectArr;
    // console.log("sel", index)

  },
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  //获取当前滑块的index
  bindchange1: function(e) {
    const that = this;
    that.setData({
      currentData1: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent1: function(e) {
    const that = this;
    if (that.data.currentData1 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData1: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 调用相机
  chooseImg: function(e) {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
      }
    })
  },
  // 图片预览
  previewImage: function(e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  delete: function(e) {
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },
  //获取当前滑块的index
  // bindchange: function (e) {
  //   const that = this;
  //   that.setData({
  //     currentTab: e.detail.current
  //   })
  // },
  //点击切换，滑块index赋值
  pleased: function(e) {
    const that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 表单提交事件
  formSubmit(e) {
   
    console.log("xs", b[b.length - 1]);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  onLoad: function(options) {
    that = this;
    var objectId = options.objectId;
    console.log(objectId);
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