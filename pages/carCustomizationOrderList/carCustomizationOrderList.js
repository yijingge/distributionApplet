// pages/test/test.js
const util = require('../../utils/util.js')
import { $wuxToast } from '../../style/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinning: false,
    pageIndex: 1, // 当前是第几页
    pageSize: 10, // 每页显示多少条数据
    totalCount: 0, // 总共有多少条数据
    listData: []
  },

  // 前往需求详情
  goToCarCustomizationOrderDetail: function(e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: "../carCustomizationOrderDetail/carCustomizationOrderDetail?id=" + id
    })
  },

  // 前往我的报价
  goToMyQuote: function(e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: "../myQuote/myQuote?id=" + id
    })
  },

  // 前往立即报价
  goToImmediateOffer: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: "../immediateOffer/immediateOffer?id=" + id
    })
  },

  // 前往定制报价
  goToCarCustomizationOrderList: function () {
    wx.reLaunch({
      url: "../carCustomizationOrderList/carCustomizationOrderList"
    })
  },

  // 前往个人中心
  goToPersonalCenter: function () {
    wx.reLaunch({
      url: "../personalCenter/personalCenter"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.data.spinning = true
    wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/demandList.json',
      method: 'post',
      data: {
        pageNumber: _this.data.pageIndex,
        pageSize: _this.data.pageSize
      },
      success: function (res) {
        _this.data.spinning = false
        if (res.data.code) {
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '请求失败'
          })
          return false
        }
        _this.setData({
          listData: res.data.data,
          totalCount: res.data.count
        })
      },
      fail: function (res) {
        _this.data.spinning = false
        $wuxToast().show({
          type: 'forbidden',
          duration: 1500,
          color: '#fff',
          text: '网络错误'
        })
      }
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