// pages/immediateOffer.js
const util = require('../../utils/util.js')
import { $wuxToast } from '../../style/index'
import { $wuxLoading } from '../../style/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    remarks: '',
    phoneCarDemandOfferVOList: []
  },

  // 获取列表数据
  getList: function () {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/processingData.json',
      method: 'post',
      data: {
        demandId: _this.data.id
      },
      success: function (res) {
        _this.$wuxLoading.hide()
        wx.stopPullDownRefresh() // 停止下拉刷新
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
          phoneCarDemandOfferVOList: res.data.phoneCarDemandOfferVOList
        })
      },
      fail: function (res) {
        _this.$wuxLoading.hide()
        wx.stopPullDownRefresh() // 停止下拉刷新
        $wuxToast().show({
          type: 'forbidden',
          duration: 1500,
          color: '#fff',
          text: '网络错误'
        })
      }
    })
  }, 500)
  },

  // 加载图标
  showLoading: function(text) {
    this.$wuxLoading = $wuxLoading()
    this.$wuxLoading.show({
      text: text
    })
  },

  // 编辑车辆方案
  editOffer: function(e) {
    var _this = this
    var index = e.currentTarget.dataset.index
    wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/processingData.json',
      method: 'post',
      data: {
        demandId: _this.data.id,
        sort: index,
        carDemandOfferItemVOList: _this.data.phoneCarDemandOfferVOList[index]
      },
      success: function (res) {
        if (res.data.code) {
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '请求失败'
          })
          return false
        }
        wx.navigateTo({
          url: "../carOffer/carOffer?id=" + _this.data.id
        })
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
  },

  // 获取报价留言
  bindTextAreaBlur: function(e) {
    this.setData({
      remarks:e.detail.value
    })

  },

  // 提交表单(确认报价)
  formSubmit: function(e) {
    if (e.detail.value.isAgree[0]) {

    } else {
      $wuxToast().show({
        type: 'text',
        duration: 1500,
        color: '#fff',
        text: '您还没有车辆方案哦,赶紧添加吧'
      })
    }
  },

  // 前往用车须知页面
  goToCarKnowledge: function (e) {
    wx.navigateTo({
      url: "../carKnowledge/carKnowledge"
    })
  },

  // 前往编辑车辆方案页面
  goToCarOffer: function (e) {
    var id = e.currentTarget.id
    var length = this.data.phoneCarDemandOfferVOList.length
    wx.navigateTo({
      url: "../carOffer/carOffer?id=" + id + "&length=" + length
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showLoading('数据加载中')
    this.setData({
      id: options.id
    })
    this.getList()
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