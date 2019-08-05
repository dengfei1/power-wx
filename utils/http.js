
var config = require("config.js");
const app = getApp()

//通过code获取token,并保存到缓存
function getToken(callback) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      request({
        login:true,
        url: '/login/WXlogin',
        data: {
          wxCode: res.code
        },
        callBack: function (result) {
          if (result.userStutas == 0) {

            wx.showModal({
              showCancel: false,
              title: '提示',
              content: '您已被禁用，不能购买，请联系客服'
            })
            wx.setStorageSync('token', '');
          } else {
            wx.setStorageSync('token', 'bearer' + result.access_token);//把token存入缓存，请求接口数据时要用
          }
          if (callback) {
            callback();
          }
        }
      })

    }
  })
}

//统一的网络请求方法
function request(params, refetch) {
  var userList = wx.getStorageSync('userList');

  // console.log('userList', userList.user.data.sessionId)
  app.globalData.header.Cookie = 'JSESSIONID=' + userList.user.data.sessionId;

  wx.request({
    url: config.domain + params.url,//接口请求地址
    data: params.data,
    header: app.globalData.header,
    // header: {
    //    'content-type': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
    //   // 'Authorization': params.login?undefined:wx.getStorageSync('token')
    // },
    method: params.method == undefined ? "POST" : params.method,
    dataType: 'json',
    responseType: params.responseType == undefined ? 'text' : params.responseType,
    success: function (res) {
      if (res.statusCode == 200) {
        //如果有定义了params.callBack，则调用 params.callBack(res.data)
        if (params.callBack) {
          params.callBack(res.data);
        }

      } else if (res.statusCode == 500) {
        wx.hideLoading();
        wx.showToast({
          title: "服务器出了点小差",
          icon: "none"
        });
      } else if (res.statusCode == 401) {
        //重新获取token,再次请求接口
        // if (!refetch) {
        //   getToken(function () {
        //     request(params, true);
        //   });
        // } else {
        //   wx.hideLoading();
        // }
        wx.showToast({
          title: res.data,
          icon: "none"
        })

      } else if (res.statusCode == 400) {
        // wx.hideLoading();
        // wx.showToast({
        //   title: res.data,
        //   icon: "none"
        // })

      } else if (res.statusCode == 403) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '您不能自提，请联系代理商',
          showCancel: false,
          success(res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        wx.hideLoading();
        //如果有定义了params.errCallBack，则调用 params.errCallBack(res.data)
        if (params.errCallBack) {
          params.errCallBack(res);
        }

      }
    },
    fail: function (err) {
      wx.hideLoading();
      wx.showToast({
        title: "服务器出了点小差",
        icon: "none"
      });
    }
  })
}




exports.getToken = getToken;
exports.request = request;
