// pages/test/test.js
const util = require('../../utils/util.js')
import { $wuxToast } from '../../style/index'
import { $wuxLoading } from '../../style/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dividerIsShow: false,
    pageIndex: 1, // 当前是第几页
    pageSize: 10, // 每页显示多少条数据
    totalCount: 0, // 总共有多少条数据
    listData: []
  },

  // 获取列表数据
  getList: function () {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/demandList.json',
      method: 'post',
      data: {
        pageNumber: _this.data.pageIndex,
        pageSize: _this.data.pageSize
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
          listData: res.data.data,
          totalCount: res.data.count
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

  // 前往需求详情
  goToCarCustomizationOrderDetail: function(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: "../carCustomizationOrderDetail/carCustomizationOrderDetail?id=" + id
    })
  },

  // 前往我的报价
  goToMyQuote: function(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: "../myQuote/myQuote?id=" + id
    })
  },

  // 前往立即报价
  goToImmediateOffer: function (e) {
    var id = e.currentTarget.id
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
    this.showLoading('数据加载中')
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
    this.setData({
      dividerIsShow: false,
      pageIndex: 1
    })
    this.showLoading('页面刷新中')
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    var pageIndex = _this.data.pageIndex + 1
    _this.setData({
      pageIndex: pageIndex
    })
    if ((pageIndex * _this.data.pageSize) <= _this.data.totalCount) {
      _this.showLoading('数据加载中')
      setTimeout(() => {
        // 请求后台，获取下一页的数据。
        wx.request({
        url: util.baseUrl + '/phone/phoneCarDemand/demandList.json',
        method: 'post',
        data: {
          pageNumber: _this.data.pageIndex,
          pageSize: _this.data.pageSize
        },
        success: function (res) {
          _this.$wuxLoading.hide()
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
            listData: _this.data.listData.concat(res.data.data),
            totalCount: res.data.count
          })
        },
        fail: function (res) {
          _this.$wuxLoading.hide()
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '网络错误'
          })
        }
      })
      }, 500)
    } else {
      _this.setData({
        dividerIsShow: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})