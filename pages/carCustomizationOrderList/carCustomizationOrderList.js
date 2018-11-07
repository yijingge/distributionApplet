// pages/test/test.js
// import { $wuxCountDown } from '../../style/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinning: false,
    listData: [
      {
        id: "1001010",
        address: "上海",
        count: 10,
        time: "2018-02-09 15:00:00",
        date: new Date,
        status: "报价中"
      },
      {
        id: "1001011",
        address: "南京",
        count: 6,
        time: "2018-02-09 15:00:00",
        date: new Date,
        status: "报价中"
      },
      {
        id: "1001012",
        address: "杭州",
        count: 12,
        time: "2018-02-09 15:00:00",
        date: new Date,
        status: "已报价"
      },
      {
        id: "1001013",
        address: "上海",
        count: 7,
        time: "2018-02-09 15:00:00",
        date: new Date,
        status: "已报价"
      }
    ]
  },

  goToCarCustomizationOrderDetail: function(e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: "../carCustomizationOrderDetail/carCustomizationOrderDetail?id=" + id
    })
  },

  goToMyQuote: function(e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: "../myQuote/myQuote?id=" + id
    })
  },

  goToImmediateOffer: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: "../immediateOffer/immediateOffer?id=" + id
    })
  },

  goToCarCustomizationOrderList: function () {
    wx.reLaunch({
      url: "../carCustomizationOrderList/carCustomizationOrderList"
    })
  },

  goToPersonalCenter: function () {
    wx.reLaunch({
      url: "../personalCenter/personalCenter"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // for (let i = 0; i < this.data.listData.length; i++) {
    //   this.data.listData[i].date = new Date
    //   this.data.listData[i].date = new $wuxCountDown({
    //     date: +(this.data.listData[i].date) + 60000 * 30,
    //     render(date) {
    //       const min = this.leadingZeros(date.min, 2) + ' 分 '
    //       const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
    //       this.setData({
    //         "listData[0].lastTime": min + sec,
    //       })
    //     },
    //   })
    // }
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