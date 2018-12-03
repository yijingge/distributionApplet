// pages/login/login.js
const util = require('../../utils/util.js')
import { $wuxToast } from '../../style/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  changeUsername(event) {
    this.setData({
      username: (event.detail.value).replace(/\s*/g,"")
    })
  },
  clearUsername() {
    this.setData({
      username: ''
    })
  },
  changePassword(event) {
    this.setData({
      password: (event.detail.value).replace(/\s*/g,"")
    })
  },
  clearPassword() {
    this.setData({
      password: ''
    })
  },
  // 登录功能
  login: function () {
    var _this = this
    if (_this.data.username === '' || _this.data.username === null || _this.data.username === undefined) {
      $wuxToast().show({
        type: 'text',
        duration: 1500,
        color: '#fff',
        text: '用户名不能为空'
      })
    } else if (_this.data.password === '' || _this.data.password === null || _this.data.password === undefined) {
      $wuxToast().show({
        type: 'text',
        duration: 1500,
        color: '#fff',
        text: '密码不能为空'
      })
    } else {
      wx.request({
        url: util.baseUrl + '/phone/member/login',
        method: 'post',
        data: {
          account: _this.data.username.trim(),
          password: _this.data.password.trim(),
          memberGroup: '2' // 2代表卖方会员,后端根据这个值判断会员的类型
        },
        success: function (res) {
          if (res.data.code) {
            $wuxToast().show({
              type: 'forbidden',
              duration: 1500,
              color: '#fff',
              text: res.data.msg
            })
            return false
          } else {
            wx.setStorage({
              key: "token",
              data: res.data.data.Authorization
            })
            wx.redirectTo({
              url: "../carCustomizationOrderList/carCustomizationOrderList"
            })
          }
        },
        fail: function (res) {
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '网络错误'
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      wx.redirectTo({
        url: "../carCustomizationOrderList/carCustomizationOrderList"
      })
    }
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