// pages/immediateOffer.js
const util = require('../../utils/util.js')
import { $wuxToast } from '../../style/index'
import { $wuxLoading } from '../../style/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    id: '',
    remarks: '',
    phoneCarDemandOfferVOList: []
  },

  // 获取列表数据
  getList: function () {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/getProcessingData.json',
      method: 'post',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      data: {
        demandId: _this.data.id
      },
      success: function (res) {
        _this.$wuxLoading.hide()
        wx.stopPullDownRefresh() // 停止下拉刷新
        if (res.statusCode === 401) {
          wx.removeStorageSync('token')
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '登录已超时'
          })
          wx.reLaunch({
            url: "../login/login"
          })
          return false
        }
        if (res.data.code) {
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: res.data.msg
          })
          return false
        }
        if (res.data.data && res.data.data.phoneCarDemandOfferVOList) {
          _this.setData({
          phoneCarDemandOfferVOList: res.data.data.phoneCarDemandOfferVOList
        })
        }
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
    var sort = e.currentTarget.dataset.sort
    var isAdd = false
    wx.navigateTo({
      url: "../carOffer/carOffer?id=" + _this.data.id + "&sort=" + sort + "&index=" + index + "&isAdd=" + isAdd
    })
  },

  // 获取报价留言
  bindTextAreaBlur: function(e) {
    this.setData({
      remarks:e.detail.value
    })

  },

  // 获取checkbox的值
  changeCheckbox: function (e) {
    var isAgree = e.detail.value[0]
    if (isAgree) {
      this.setData({
        isAgree: isAgree
      })
    } else {
      this.setData({
        isAgree: false
      })
    }

  },

  // 提交表单(确认报价)
  formSubmit: function(e) {
    var _this = this
    if (_this.data.phoneCarDemandOfferVOList.length > 0) {
      wx.request({
        url: util.baseUrl + '/phone/phoneCarDemand/addCarDemandOffer.json',
        method: 'post',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        data: {
          demandId: _this.data.id,
          remarks: _this.data.remarks,
          kilometersFee: '超出行程内的公里数另算',
          overtimeFee: '当日用车时长超过10小时,司机将按50元/小时收取超时长费',
          thirdPartyCharge: '含第三方收取的停车费、过路过桥费',
          travelSubsidies: '用餐补贴30元/餐、住宿补贴为150元/晚',
          emptyFee: '默认接送点为两个,且距离为50公里以内,司机将按1元/公里收取超公里费,超过两个以上接送点,每多一个增加100元',
          phoneCarDemandOfferVOList: _this.data.phoneCarDemandOfferVOList
        },
        success: function (res) {
          if (res.statusCode === 401) {
            wx.removeStorageSync('token')
            $wuxToast().show({
              type: 'forbidden',
              duration: 1500,
              color: '#fff',
              text: '登录已超时'
            })
            wx.reLaunch({
              url: "../login/login"
            })
            return false
          }
          if (res.data.code) {
            $wuxToast().show({
              type: 'forbidden',
              duration: 1500,
              color: '#fff',
              text: res.data.msg
            })
            return false
          } else {
            $wuxToast().show({
              type: 'success',
              duration: 1500,
              color: '#fff',
              text: '保存成功'
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
    } else {
      $wuxToast().show({
        type: 'text',
        duration: 1500,
        color: '#fff',
        text: '您还没有添加车辆方案哦赶紧添加吧'
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
    var isAdd = true
    wx.navigateTo({
      url: "../carOffer/carOffer?id=" + id + "&sort=" + length + "&isAdd=" + isAdd
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('token')) {
      wx.reLaunch({
        url: "../login/login"
      })
    }
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