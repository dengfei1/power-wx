// pages/home/myMsg/assess/assess.js
var http = require("../../../utils/http.js");
var a = [];
var b = [];
var image = [];
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData1: 0,
    currentData2:0,
    tempFilePaths: [],
    images: [],
    uploadedImages: [],
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
    tempFilePaths: [],
    dataArr: [{
      name: '张三',
      time: '4月14日11:23 左右抵达处理',
    }],
    selectArr: [{
      name: 'sel1',
      value: '专业严谨',
      checked:false
    }, {
      name: 'sel2',
      value: '风雨无阻',
      checked: false
    }, {
      name: 'sel3',
      value: '礼貌热情',
      checked: false
    }, {
      name: 'sel4',
      value: '快速准时',
      checked: false

    }, {
      name: 'sel5',
      value: '仪表整洁',
      checked: false
    }, {
      name: 'sel6',
      value: '认真负责',
      checked: false
    },
      // '专业严谨', '风雨无阻', '礼貌热情', '快速准时', '仪表整洁', '认真负责'
    ],
    selectedArr: [
      {
        name: 'sel1',
        value: '未解决',
        checked: false
      }, {
        name: 'sel2',
        value: '解决不好',
        checked: false
      }, {
        name: 'sel3',
        value: '态度不好',
        checked: false

      }, {
        name: 'sel4',
        value: '迟到',
        checked: false

      }, {
        name: 'sel5',
        value: '不负责',
        checked: false
      }
      
    ],
    texts: "至少输入8个字",
    min: 8,//最少字数
    max: 520, //最多字数 (根据自己需求改变) 

    selectPleasedArr:[],

    selectOnPleasedArr:[],

    stars1:0,

    stars2: 0,

    stars3: 0,

    isPleaseArr:["满意","不满意"],

    isPlease:'满意'
   
  },
  // 点亮星星的事件部分
  // scores: function (e) {
  //   var that = this;
  //   for (var i = 0; i < that.data.stars.length; i++) {
  //     var allItem = 'stars[' + i + '].flag';
  //     console.log("allItem",allItem)
  //     that.setData({
  //       [allItem]: 1
  //     })
  //   }
  //   var index = e.currentTarget.dataset.index;
  //   for (var i = 0; i <= index; i++) {
  //     var item = 'stars[' + i + '].flag';
  //     that.setData({
  //       [item]: 2
  //     })
  //     b.push(i + 1);
  //     console.log("11", b)
  //     console.log(b[b.length - 1])
  //   }
  // },
  // 满意选择
  select: function (e) {
    var selectPleasedArr = this.data.selectPleasedArr
    var that = this;
    var selectArr = that.data.selectArr;
   //选择标签
    var index = e.currentTarget.dataset.index;
    selectArr[index].checked = !selectArr[index].checked ;
    
    //获取标签文字
    if(selectArr[index].checked) {
      console.log(selectArr[index].value)
      selectPleasedArr.push(selectArr[index].value)
    } else{
      console.log("内容", selectArr[index])
      for (let i = 0; i < selectPleasedArr.length;i++){
        if (selectPleasedArr[i] == selectArr[index].value)
          selectPleasedArr.splice(i,1)
      }
     
    }
    console.log(selectPleasedArr)

    that.setData({
      selectArr: selectArr,
      selectPleasedArr: selectPleasedArr,
      selectOnPleasedArr:[]
    })
    
  },
  // 不满意选择
  select1: function (e) {
    var selectOnPleasedArr = this.data.selectOnPleasedArr
    var that = this;
    var selectedArr = that.data.selectedArr;
    //选择标签
    var index = e.currentTarget.dataset.index;
    selectedArr[index].checked = !selectedArr[index].checked;
   
    //获取标签文字
    if (selectedArr[index].checked) {
      console.log(selectedArr[index].value)
      selectOnPleasedArr.push(selectedArr[index].value)
    }else{
      console.log("内容", selectedArr[index])
      for (let i = 0; i < selectOnPleasedArr.length; i++) {
        if (selectOnPleasedArr[i] == selectedArr[index].value)
          selectOnPleasedArr.splice(i, 1)
      }
    }
  
    console.log(selectOnPleasedArr)

    that.setData({
      selectedArr: selectedArr,
      selectOnPleasedArr: selectOnPleasedArr,
    
    })
  
  },

  //文本
  inputs:function(e){
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    if(len>=this.data.min) {
      this.setData({
        texts: ''
      })
    }else{
      this.setData({
        texts: "至少输入8个字"
      })
    }
    if(len>=this.max) {
      this.setData({
        texts: '输入字数不能超过520个字'
      })
    }
    
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  //获取当前滑块的index
  bindchange1: function (e) {
    
    const that = this;
    that.setData({
      currentData1: e.detail.current
    })
    
    let { selectedArr } = that.data
    for(let i=0;i<selectedArr.length;i++) {
      if (selectedArr[i].checked){
        selectedArr[i].checked=false
      }
      that.setData({
        selectedArr: selectedArr
      })
    
    }
    console.log(selectedArr)
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
    let { selectArr } = that.data
    for (let i = 0; i < selectArr.length; i++) {
      if (selectArr[i].checked) {
        selectArr[i].checked = false
      }
      that.setData({
        selectArr: selectArr,
       
      })
    
    }
    console.log(selectArr)
    that.setData({
      selectOnPleasedArr: [],
      isPlease: that.data.isPleaseArr[0]
    })
    console.log("selectPleasedArr清空", this.data.selectOnPleasedArr)
  },
  //点击切换，滑块index赋值
  checkCurrent2: function (e) {
    const that = this;
    if (that.data.currentData1 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData1: e.target.dataset.current
      })
    }
    let { selectArr } = that.data
    for (let i = 0; i < selectArr.length; i++) {
      if (selectArr[i].checked) {
        selectArr[i].checked = false
      }
      that.setData({
        selectArr: selectArr,
        
      })

    }
    console.log(selectArr)

    that.setData({
      selectPleasedArr: []  ,
      isPlease: that.data.isPleaseArr[e.target.dataset.current]
    })
    console.log("selectPleasedArr清空", this.data.selectPleasedArr)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 调用相机
  chooseImg: function (e) {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 5, // 默认9
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
      }
    })
  },
  /**
   * 图片预览
   */ 
  previewImage: function (e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  /**
   * 删除图片
   */
  delete: function (e) {
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
  pleased: function (e) {
    const that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 服务态度
   */
  onCheckbox1:function(e) {
    console.log(' 获取stars传来的值',e.detail)
    console.log(' 服务态度几颗星', e.detail.length)
    this.setData({
      stars1: e.detail.length
    })
  },
  /**
  * 服务效果
  */
  onCheckbox2: function (e) {
    console.log(' 获取stars传来的值', e.detail)
    console.log(' 服务效果几颗星', e.detail.length)
    this.setData({
      stars2: e.detail.length
    })
  },
  /**
  * 服务效率
  */
  onCheckbox3: function (e) {
    console.log(' 获取stars传来的值', e.detail)
    console.log(' 服务效率几颗星', e.detail.length)
    this.setData({
      stars3: e.detail.length
    })
  },
  
  // 表单提交事件
  formSubmit(e) {
    let { selectPleasedArr, selectOnPleasedArr, id, stars1, stars2, stars3, isPlease}= this.data
    const paramss = e.detail.value
    console.log("xs", b[b.length - 1]);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var evaluation = paramss.remark;
    var specialty=""
    if (selectPleasedArr.length != 0) {
       specialty = selectPleasedArr.join(",")
    } else if (selectOnPleasedArr.length != 0) {
       specialty = selectOnPleasedArr.join(",")
    }
    console.log("满意度",specialty)
    if (specialty==""){
        wx.showToast({
          title: '请选择满意或不满意',
          icon:'none'
        })

    } else if (evaluation==""){
        wx.showToast({
          title: '故障项目名称不能为空',
          icon: 'none'
        })
    } else if (stars1==0){
      wx.showToast({
        title: '服务态度',
        icon: 'none'
      })
    } else if (stars2 == 0) {
      wx.showToast({
        title: '服务效果',
        icon: 'none'
      })
    } else if (stars3 == 0) {
      wx.showToast({
        title: '服务效率',
        icon: 'none'
      })
    } else {
      console.log(id, stars1, stars2, stars3, evaluation, specialty, isPlease)
      that.getAssessInfo(id, stars1, stars2, stars3,evaluation,specialty,isPlease)
    }

  },

  onLoad: function (options) {
    that = this;
    var objectId = options.objectId;
    console.log(objectId);

    console.log("id",options.id)
    this.setData({
      id: options.id
    })
  },
  /**
 * 评价
 */
  getAssessInfo(id, attitude, effect, efficiency, evaluation, specialty, isPlease) {
    var that = this;

    var params = {
      url: '/maintainOrder/disposeOrder?Id=' + id + "&&attitude=" + attitude + "&&effect=" + effect + "&&efficiency=" + efficiency + "&&evaluation=" + evaluation + "&&specialty=" + specialty + "&&grade=" + isPlease,
      method: "POST",
      callBack: (res) => {
        console.log("获取评价信息", res.data)
        wx.navigateBack({
          delta: 1,
        })

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