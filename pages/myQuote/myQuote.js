// pages/myQuote/myQuote.js
const util = require('../../utils/util.js')
import { $wuxToast } from '../../style/index.js'
import { $wuxLoading } from '../../style/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    dividerIsShow: false,
    pageIndex: 1, // 当前是第几页
    pageSize: 10, // 每页显示多少条数据
    listData: [],
    myQuoteData: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showLoading('数据加载中')
    this.setData({
      id: options.id
    })
    this.getDetail(options.id)
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
    this.showLoading('页面刷新中')
    this.getDetail(this.data.id)
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
  
  },
  // 获取列表数据
  getDetail: function (id) {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/getCarDemandOfferDetail.json',
      method: 'post',
      data: {
        demandId: id,
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
          myQuoteData: res.data.data,
          listData: res.data.data.carDemandOfferEntityList
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
  },
    500
  )
  },
  // 加载图标
  showLoading: function (e) {
    this.$wuxLoading = $wuxLoading()
    this.$wuxLoading.show({
      text: '数据加载中'
    })
  }
})