// pages/myQuote/myQuote.js
const util = require('../../utils/util.js')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    dividerIsShow: false,
    pageIndex: 1, // 当前是第几页
    pageSize: 10, // 每页显示多少条数据
    totalCount: 0, // 总共有多少条数据
    listData: [
      {
        money: '10',
        schemeList: [
          {
            carName: 'benz',
            type: '豪华型',
            seatNumber: '10',
            number: '2',
            money: '20'
          },
          {
            carName: '宝马',
            type: '豪华型',
            seatNumber: '10',
            number: '2',
            money: '20'
          },
          {
            carName: '大众',
            type: '豪华型',
            seatNumber: '10',
            number: '2',
            money: '20'
          },
        ]
      },
      {
        money: '20',
        schemeList: [
          {
            carName: '宝来',
            type: '经济型',
            seatNumber: '10',
            number: '2',
            money: '20'
          },
          {
            carName: '',
            type: '豪华型',
            seatNumber: '10',
            number: '2',
            money: '20'
          },
          {
            carName: '火车',
            type: '豪华型',
            seatNumber: '10',
            number: '2',
            money: '20'
          }
        ]
      }
    ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getList()
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
  
  },
  // 获取列表数据
  // 加载图标
  showLoading: function (e) {
    this.$wuxLoading = $wuxLoading()
    this.$wuxLoading.show({
      text: '数据加载中'
    })
  }
})