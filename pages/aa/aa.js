//index.js
// midea_zd_wr
var zhenzisms = require('../../utils/zhenzisms.js');
var http = require('../../utils/http.js')

//获取应用实例
var app = new getApp();
var that;
var setTimer;
Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    userName: '',
    phone: '',
    password: '',
    password1: '',
    code: '',
    second: 60,
    isHiddend: true,
    isHide: false,
    ajxtrue: false,
    wxCode: '',
    open_key: '',
    openId: '',
    sessionKey: '',
    encryptedData: '',
    iv: '',
    codeStyle:'',

    isSecondHide:false
  },
  onLoad: function(res) {

    //判断是否登录
    var that = this;
    wx.login({
      success(res) {
        that.setData({
          code: res.code
        })
        wx.getUserInfo({
          success: function(res) {
            //获取用户敏感数据密文和偏移向量
            that.setData({
              encryptedData: res.encryptedData
            })
            that.setData({
              iv: res.iv
            })
            console.log('iv:', res.iv, 'encryptedData:', res.encryptedData)
          }
        })

        console.log(res)
        if (res.code) {
          // 发起网络请求   
          wx.request({
            url: app.globalData.url + '/login/WXlogin',
            data: {
               wxCode: res.code
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


  },
  // 验证输入密码
  bindPasswordInput: function(e) {
    let that = this;
    let val = e.detail.value;
    console.log(val)
    that.setData({
      password: val
    })
  },
 //验证输入确定密码
  bindPasswordInput1: function(e) {
    let that = this;
    let password = that.data.password;
    let val = e.detail.value;
    that.setData({
      password1: val,
    })
    console.log('val', val)
    // console.log("111",val.length)
    if ((val.length >= password.length) && (val != password)) {
      wx.showToast({
        title: '密码不一致',
        icon: 'success',
      })
    }
  },
  // 表单提交事件
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    that = this
    var phone = that.data.phone;
    var possword = that.data.possword;
    var possword1 = that.data.possword1;
    var code = that.data.code;
    if ((phone != '') && (possword != '') && (possword1 != '') && (code != '')) {
      let val = e.detail.value
      let ajxtrue = this.data.ajxtrue
      console.log('ajxtrue', ajxtrue)
      // if (ajxtrue == true) {
      //   //表单提交进行
      // } else {
      //   wx.showToast({
      //     title: '手机号有误',
      //     icon: 'success',
      //     duration: 2000
      //   })
      // }
    } else {
      wx.showToast({
        title: '信息还未填写完',
        icon: 'success',
        duration: 2000
      })
    }

  },

  //姓名输入
  bindNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //验证码手机号输入
  bindPhoneInput: function(e) {
    // console.log(e.detail.value);
    var val = e.detail.value;
    var that = this
    if (!(/^1[34578]\d{9}$/.test(val))) {
      this.setData({
        ajxtrue: false,
        codeStyle: ''
      })
      if (val.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      that.setData({
        ajxtrue: true,
        codeStyle:'codeStyle'
      })
      console.log('验证成功', that.data.ajxtrue)

      //改变验证码颜色

    }
    // var val = e.detail.value;

      that.setData({
        phone: val
      })
      console.log('验证码手机号输入', val)
      if (val != '') {
        that.setData({
          hidden: false,
          btnValue: '获取验证码'
        })
      } else {
        that.setData({
          hidden: true
        })    
    }
    
  },
  //密码手机号输入
  bindPhoneInput1: function(e) {
    // console.log(e.detail.value);
    var val = e.detail.value;
    that = this
    if (!(/^1[345789]\d{9}$/.test(val))) {
      this.setData({
        ajxtrue: false
      })
      if (val.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
      console.log('验证成功', that.data.ajxtrue)
    }

    this.setData({
      phone: val
    })

  },
  // 密码登入验证码登录
  toIdentify: function() {
    that = this;
    that.setData({
      isHiddend: false
    })
  },
  toPassword: function() {
    clearInterval(setTimer);
    that = this;
    that.setData({
      isHiddend: true,
      codeStyle: '',
      isSecondHide: false,
      second: 60,
      btnValue: '获取验证码',
      phone:''
    })
  },
  // 注册
  register: function() {
    clearInterval(setTimer);
    that = this;
    that.setData({
      isHide: true,
      codeStyle: '',
      isSecondHide: false,
      second: 60,
      btnValue: '获取验证码',
      phone:''
    })
  },

  //注册提交
  regis: function(e) {
    var that = this;
    //var isrightful = that.bindPhoneInput();
    wx.login({
      success: function(res) {
        console.log(res.code, 'res.code')
        var userList = wx.getStorageSync('key')
        console.log('userList',userList)
        app.globalData.header.Cookie = 'JSESSIONID=' + userList.sessionId;
        console.log('app.globalData.header.Cookie', app.globalData.header.Cookie)
        // var data = JSON.stringify({
        //   phone: that.data.phone,
        //   password: that.data.password,
        //   code: that.data.code,
        //   wxCode: res.code,
        //   user: {
        //     password: that.data.password,
        //     code: that.data.code,
        //   }
        // });
        console.log()
        if (res.code) {
          console.log(that.data.password,'that.data.password')
          console.log(that.data.code, 'that.data.code')
          // var aa =  {
          //   phone: that.data.phone,
          //   password: that.data.password,
          //   code: that.data.code
          // }

          wx.request({
            //url: app.globalData.url + '/user/savewx',
            url: app.globalData.url + '/user/savewx?phone=' + that.data.phone + '&&password=' + that.data.password + '&&code=' + that.data.wxCode,
            method: "POST",
             data: {
                // phone: that.data.phone,
                //  password: that.data.password,
                //  code: that.data.code
              //  jsonObject: {
              //    phone: that.data.phone,
              //    password: that.data.password,
              //    code: that.data.code
              //   }
             
              // user:{
              //   // password: that.data.password,
              //   // code: that.data.code,
              //   phone: that.data.phone,
              //   password: that.data.password,
              //   // userName:'zhangyue',
              // }
            }, //请求参数
            header: {},
            complete() { //请求结束后隐藏 loading 提示框
            },
            success: res => {
              console.log('注册成功',res)
              // console.log(res.sessionId, 'session_key')
              // wx.setStorageSync('wxCode', res.session_key)
              wx.showToast({
                title: res.data.info,
                icon: 'none',
                duration: 2000
              })

              if (res.data.info=="注册成功"){
                that.setData({
                  isHiddend: true,
                  isHide: false
                })
              }
             
              wx.redirectTo({
                url: '/pages/aa/aa',
              })
            }
          });
        }
      }
    })

  },
  back: function() {
    that = this;
    that.setData({
      isHide: false
    })
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      wxCode: e.detail.value
    })
    console.log(e.detail.value)
  },
  //获取短信验证码
  getCode: function(res) {
    console.log('获取验证码', 111);
    var that = this;
    var phone = that.data.phone;
    if (!(/^1[345789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else {
       
      if (!that.data.isSecondHide){
        //获取验证码出现59秒倒计时
        that.setData({
          btnValue: '秒后重试',
          codeStyle: '',
          isSecondHide: true,
        })
        console.log("phone:" + that.data.phone + "wxCode:" + that.data.code)
        wx.request({
          url: app.globalData.url + '/user/sendSMSCode',
          method: 'GET', //请求方式
          data: {
            phone: that.data.phone,
            wxCode:that.data.code
          }, //请求参数
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            console.log('验证码', res)
            //console.log(res, 'yanzhengma')
            // wx.setStorageSync("key", res.data.data);
            // console.log('res.data.data.sessionId', res.data.data)
            // wx.showToast({
            //   title: res.data.info,
            //   icon: 'none',
            //   duration: 2000
            // })
            // this.setData({
            //   data: res.data,

            // })

             setTimer = setInterval(
              function() {
                that.setData({
                  second: that.data.second - 1
                })
                console.log(that.data.second)
                if (that.data.second <= 0) {
                  console.log("秒", that.data.second)
                  that.setData({
                    btnValue: '获取验证码',
                    codeStyle: 'codeStyle',
                    isSecondHide: false,
                    second: 60
                  })
                  clearInterval(setTimer);
                }
              }, 1000)

          }
        });
      }
     

    }
  },
  // 验证码登录
  codeLoad:function(e){
    console.log('验证码登录',1111);
    var that = this;
    //console.log('密码: ' + this.data.password);
    //console.log('手机号: ' + this.data.phone);
    // console.log('验证码: ' + this.data.code);
    // console.log('验证码: ' + this.data.userName);
    console.log('wxCode: ' + that.data.wxCode);
    wx.login({
       success:function(res){
         if(res.code){
           wx.request({
             url: app.globalData.url + '/login/WXlogin',

             data: {
               phone: that.data.phone,
               code: that.data.wxCode ,
               wxCode: res.code
             },
             header: {
               'content-type': 'application/json' // 默认值
             },
             success(res) {
               console.log("res:", res);
               console.log("resId:", res.data);
               console.log("app:", app.globalData.header);
               wx.showToast({
                 title: res.data.info,
                 icon: 'none',
                 duration: 2000
               })
               wx.setStorage({
                 key: "apply",
                 data: {
                   'openId': res.data.data.openid,
                   'sessionKey': res.data.data.session_key,
                 }
               })
               // 存储用户信息
               wx.setStorage({
                 key: "userList",
                 data: {
                   'user': res.data,
                   'phone': res.data.phone
                 }
               })
               if (res.data.info === '登录成功！') {
                 wx.switchTab({
                   url: '/pages/home/home'
                 })
               }
             }
           })
         }
       
       }
    })
    // wx.request({
    //   url: app.globalData.url + '/login/WXlogin',

    //   data: {
    //     phone: this.data.phone,
    //     // password: this.data.password,
    //     code: this.data.code,
    //     wxCode: this.data.code
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log("res:", res);
    //     console.log("resId:", res.data);
    //     console.log("app:", app.globalData.header);
    //     wx.showToast({
    //       title: res.data.info,
    //       icon: 'none',
    //       duration: 2000
    //     })
    //     wx.setStorage({
    //       key: "apply",
    //       data: {
    //         'openId': res.data.data.openid,
    //         'sessionKey': res.data.data.session_key,
    //       }
    //     })
    //     // 存储用户信息
    //     wx.setStorage({
    //       key: "userList",
    //       data: {
    //         'user': res.data,
    //         'phone': res.data.phone
    //       }
    //     })
    //     if (res.data.info === '登录成功！') {
    //       wx.switchTab({
    //         url: '/pages/home/home'
    //       })
    //     }
    //   }
    // })

  },
  //保存 登录 密码登录
  passwordLoad:function(e) {
    console.log('密码登录',222)
    var that = this;
    console.log('密码: ' + this.data.password);
    console.log('手机号: ' + this.data.phone);
    // console.log('验证码: ' + this.data.code);
    // console.log('验证码: ' + this.data.userName);
    console.log('wxCode: ' + this.data.code);
    wx.request({
      url: app.globalData.url + '/login/WXlogin',
      data: {
        userName: this.data.userName,
        password: this.data.password,
        wxCode: this.data.code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res:", res);
        console.log("resId:", res.data);
        // if (res.status == 200) {
        // 添加到全局数据的header中
        // app.globalData.header.Cookie = 'JSESSIONID=' + res.data.data.sessionId;
        // }
        console.log("app:", app.globalData.header);
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          duration: 2000
        })
        wx.setStorage({
          key: "apply",
          data: {
            'openId': res.data.data.openid,
            'sessionKey': res.data.data.session_key,
          }
        })
        // 存储用户信息
        wx.setStorage({
          key: "userList",
          data: {
            'user': res.data
          }
        })
        if (res.data.info === '登录成功！') {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }
      }
    })
  }
})