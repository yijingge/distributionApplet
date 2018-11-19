// pages/carOffer/carOffer.js
var util = require('../../utils/util.js')
import { $wuxSelect, $wuxToast, $wuxDialog, $wuxLoading } from '../../style/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schemeIndex: 0,
    id: '',
    carLevelList: [],
    seatNumberList: [],
    carBrandList: [],
    phoneCarDemandOfferVOList: [
      {
        offerMoney: 0,
        sort: 0,
        id: '',
        carDemandOfferItemVOList: [{
          value1: '',
          title1: '请选择',
          value2: '',
          title2: '请选择',
          value3: '',
          title3: '请选择',
          number: 1,
          price: 0,
          sort: 0
        }]
      }
    ],
    copyPhoneCarDemandOfferVOList: [],
    otherPhoneCarDemandOfferVOList: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var schemeIndex = options.index == 1 ? '二' : options.index == 2 ? '三' : options.index == 3 ? '四' : '一'
    this.setData({
      id: options.id,
      schemeIndex: schemeIndex,
      isAdd: options.isAdd,
      sort: options.sort
    })
    this.getList(this.data.id)
    this.showLoading('数据加载中')
    this.getCarLevelList()
    this.getCarBrandList()
    this.getCarSeatNumberList()
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 加载图标
  showLoading: function () {
    this.$wuxLoading = $wuxLoading()
    this.$wuxLoading.show({
      text: '数据加载中'
    })
  },
  // 获取编辑车辆列表的信息
  getList(id) {
    var _this = this
    setTimeout(function () {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/getProcessingData.json',
      method: 'post',
      header: {'Authorization': wx.getStorage({ key: 'token' })},
      data: {demandId: id},
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
        if (res.data.data.phoneCarDemandOfferVOList.length) {
          var phoneCarDemandOfferVOList = res.data.data.phoneCarDemandOfferVOList.map(function (item) {
            var carDemandOfferItemVOList = item.carDemandOfferItemVOList.map(function (item, index) {
              return {
                value1: item.carLevel,
                title1: item.carLevelName,
                value2: item.carBrand,
                title2: item.carBrandName,
                value3: index,
                title3: item.seatNumber,
                number: item.carNumber,
                price: item.unitPrice,
                sort: item.sort
              }
            })
            var outerSet = {
              id: item.id,
              offerMoney: item.offerMoney,
              sort: item.sort,
              carDemandOfferItemVOList: carDemandOfferItemVOList
            }
            return outerSet
          })
        }
        var editPhoneCarDemandOfferVOList = []
        var otherPhoneCarDemandOfferVOList = []
        if (phoneCarDemandOfferVOList) {
          phoneCarDemandOfferVOList.forEach(function (item){
            if (item.sort == Number(_this.data.sort)) {
              editPhoneCarDemandOfferVOList.push(item)
            } else {
              otherPhoneCarDemandOfferVOList.push(item)
            }
          })
        }
        _this.setData({
          phoneCarDemandOfferVOList:  _this.data.isAdd === 'true' ? _this.data.phoneCarDemandOfferVOList : editPhoneCarDemandOfferVOList,
          copyPhoneCarDemandOfferVOList: phoneCarDemandOfferVOList ? phoneCarDemandOfferVOList : [],
          otherPhoneCarDemandOfferVOList: otherPhoneCarDemandOfferVOList ? otherPhoneCarDemandOfferVOList : []
        })
        if (_this.data.phoneCarDemandOfferVOList.length) {
          _this.data.phoneCarDemandOfferVOList.map(function (item) {
            item.sort = Number(_this.data.sort)
            return item
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
  },
    500
  )
  },
  // 获取车辆配置列表
  getCarLevelList () {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/getCarLevelList.json',
      method: 'post',
      header: {
        'Authorization': wx.getStorage({ key: 'token' })
      },
      data: {},
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
          carLevelList: res.data.data
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
  // 获取车品牌列表
  getCarBrandList () {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/getCarBrandList.json',
      method: 'post',
      header: {
        'Authorization': wx.getStorage({ key: 'token' })
      },
      data: {},
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
          carBrandList: res.data.data
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
  // 获取座位数列表
  getCarSeatNumberList () {
    var _this = this
    setTimeout(() => {
      wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/enableCarInfoList.json',
      method: 'post',
      header: {
        'Authorization': wx.getStorage({ key: 'token' })
      },
      data: {},
      success: function (res) {
        res.data.data.map((item, index) => {
          item.value = (index + 1).toString()
        item.label = item.guestSeat
        return item
      })
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
          seatNumberList: res.data.data
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
  // 删除某个车辆
  delItem: function (event) {
    var index = event.currentTarget.dataset.index
    this.data.phoneCarDemandOfferVOList.map(function (item) {
      item.carDemandOfferItemVOList.splice(index, 1);
      return item
    })
    var carDemandOfferItemVOList = this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList
    var offerMoney = 0
    for (var i = 0; i < carDemandOfferItemVOList.length; i++) {
      offerMoney += Number(carDemandOfferItemVOList[i].price) * Number(carDemandOfferItemVOList[i].number)
    }
    this.data.phoneCarDemandOfferVOList[0].offerMoney = offerMoney
    this.setData({
      phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
    })
  },
  //点击添加车辆
  addItem: function () {
    this.data.phoneCarDemandOfferVOList.map(function (item) {
      item.carDemandOfferItemVOList.push({
          value1: '',
          title1: '',
          value2: '',
          title2: '',
          value3: '',
          title3: '',
          number: 0,
          price: '',
          sort: item.carDemandOfferItemVOList.length - 1
       })
      return item
    })
    this.setData({
      phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
    })
  },
  onClick1 (event) {
    var key = event.currentTarget.dataset.index
    $wuxSelect('#wux-select1').open({
      value: this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].value1,
      options: this.data.carLevelList,
      onConfirm: (value, index, options) => {
      if (index !== -1)
    {
      this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].value1 = value
      this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].title1 = options[index].label,
        this.setData({
          phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
        })
    }
  },
  })
  },
  onClick2 (event) {
    var key = event.currentTarget.dataset.index
    $wuxSelect('#wux-select2').open({
      value: this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].value2,
      options: this.data.carBrandList,
      onConfirm: (value, index, options) => {
      if (index !== -1)
    {
      this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].value2 = value
      this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].title2 = options[index].label,
        this.setData({
          phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
        })
    }
  },
  })
  },
  onClick3 (event) {
    var key = event.currentTarget.dataset.index
    $wuxSelect('#wux-select3').open({
      value: this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].value3,
      options: this.data.seatNumberList,
      onConfirm: (value, index, options) => {
      if (index !== -1)
    {
      this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].value3 = value
      this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].title3 = options[index].label,
        this.setData({
          phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
        })
    }
  },
  })
  },
  inputPrice (event) {
    var key = event.currentTarget.dataset.index
    this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].price = Number(event.detail.value)
    var carDemandOfferItemVOList = this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList
    var offerMoney = 0
    for (var i = 0; i < carDemandOfferItemVOList.length; i++) {
      offerMoney += Number(carDemandOfferItemVOList[i].price) * Number(carDemandOfferItemVOList[i].number)
    }
    this.data.phoneCarDemandOfferVOList[0].offerMoney = offerMoney
    this.setData({
      phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
    })
  },
  inputNumber (event) {
    var key = event.currentTarget.dataset.index
    this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList[key].number = Number(event.detail.value)
    var carDemandOfferItemVOList = this.data.phoneCarDemandOfferVOList[0].carDemandOfferItemVOList
    var offerMoney = 0
    for (var i = 0; i < carDemandOfferItemVOList.length; i++) {
      offerMoney += Number(carDemandOfferItemVOList[i].price) * Number(carDemandOfferItemVOList[i].number)
    }
    this.data.phoneCarDemandOfferVOList[0].offerMoney = offerMoney
    this.setData({
      phoneCarDemandOfferVOList: this.data.phoneCarDemandOfferVOList
    })
  },
  // 删除报价方案
  delScheme () {
    var _this = this
    var index = _this.data.copyPhoneCarDemandOfferVOList.findIndex(d => d.id === _this.data.phoneCarDemandOfferVOList[0].id)
    $wuxDialog('#wux-dialog').confirm({
      resetOnClose: true,
      closable: false,
      title: '删除确认',
      content: '确定要删除此方案吗？',
      onConfirm (e) {
        var copyPhoneCarDemandOfferVOList = _this.data.copyPhoneCarDemandOfferVOList.map(function (item) {
          var carDemandOfferItemVOList = item.carDemandOfferItemVOList.map(function (item, index) {
            return {
              carLevel: item.value1,
              carLevelName: item.title1,
              carBrand: item.value2,
              carBrandName: item.title2,
              seatNumber: item.title3,
              carNumber: item.number,
              unitPrice: item.price,
              sort: index
            }
          })
          var outerSet = {
            id: item.id,
            offerMoney: item.offerMoney,
            sort: item.sort,
            carDemandOfferItemVOList: carDemandOfferItemVOList
          }
          return outerSet
        })
        copyPhoneCarDemandOfferVOList.splice(index, 1)
        copyPhoneCarDemandOfferVOList.map(function (item, index) {
          console.log(index)
          item.sort = index
          return item
        })
        if (_this.data.isAdd === 'false') {
          wx.request({
            url: util.baseUrl + '/phone/phoneCarDemand/processingData.json',
            method: 'post',
            header: {
              'Authorization': wx.getStorage({ key: 'token' })
            },
            data: {
              demandId: _this.data.id,
              phoneCarDemandOfferVOList: copyPhoneCarDemandOfferVOList
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
              wx.redirectTo({
                url: "../immediateOffer/immediateOffer?id=" + _this.data.id
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
        } else {
          wx.redirectTo({
            url: "../immediateOffer/immediateOffer"
          })
        }
      }
    })
  },
  /*报错提示*/
  showError (errorMes) {
    $wuxToast('#wux-toast').show({
      type: 'text',
      duration: 500,
      color: '#fff',
      text: errorMes
    })
  },
  // 提交报价方案
  saveScheme: function (e) {
    var _this = this
    var formData = e.detail.value
    var errorMes = ''
    for (var i in formData) {
      if (i.indexOf('config') !== -1 && formData[i] === '') {
        errorMes = '请选择车辆配置'
        this.showError(errorMes)
        return false
      }
      if (i.indexOf('seatNumber') !== -1 && formData[i] === '') {
        errorMes = '请选择座位数'
        this.showError(errorMes)
        return false
      }
      if (i.indexOf('brand') !== -1 && formData[i] === '') {
        errorMes = '请选择车辆品牌'
        this.showError(errorMes)
        return false
      }
      if (i.indexOf('number') !== -1 && (formData[i] === '' || formData[i] == 0)) {
        errorMes = '请输入数量'
        this.showError(errorMes)
        return false
      }
      if (i.indexOf('price') !== -1 && (formData[i] === '' || formData[i] == 0)) {
        errorMes = '请输入单价'
        this.showError(errorMes)
        return false
      }
    }
    var submitData = this.data.isAdd === 'true' ? this.data.phoneCarDemandOfferVOList.concat(this.data.copyPhoneCarDemandOfferVOList)
      : this.data.phoneCarDemandOfferVOList.concat(this.data.otherPhoneCarDemandOfferVOList)
    var phoneCarDemandOfferVOList = submitData.map(function (item) {
      var carDemandOfferItemVOList = item.carDemandOfferItemVOList.map(function (item, index) {
        return {
          carLevel: item.value1,
          carLevelName: item.title1,
          carBrand: item.value2,
          carBrandName: item.title2,
          seatNumber: item.title3,
          carNumber: item.number,
          unitPrice: item.price,
          sort: index
        }
      })
      var outerSet = {
        id: item.id,
        offerMoney: item.offerMoney,
        sort: item.sort,
        carDemandOfferItemVOList: carDemandOfferItemVOList
      }
      return outerSet
    })
    wx.request({
      url: util.baseUrl + '/phone/phoneCarDemand/processingData.json',
      method: 'post',
      header: {
        'Authorization': wx.getStorage({ key: 'token' })
      },
      data: {
        demandId: _this.data.id,
        phoneCarDemandOfferVOList: phoneCarDemandOfferVOList
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
        wx.redirectTo({
          url: "../immediateOffer/immediateOffer?id=" + _this.data.id
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
  }
})