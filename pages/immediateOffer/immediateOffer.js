// pages/immediateOffer.js
import { $wuxToast } from '../../style/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    phoneCarDemandOfferVOList: [{}],
    remarks: ''
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
    wx.navigateTo({
      url: "../carOffer/carOffer?id=" + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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