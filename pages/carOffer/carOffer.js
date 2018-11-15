// pages/carOffer/carOffer.js
import {$wuxSelect, $wuxToast,  $wuxDialog} from '../../style/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      {
        value1: '',
        title1: '',
        value2: '',
        title2: '',
        value3: '',
        title3: '',
        number: '',
        price: ''
      },
      {
        value1: '',
        title1: '',
        value2: '',
        title2: '',
        value3: '',
        title3: '',
        number: '',
        price: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 // 删除某个车辆
  delItem: function (e) {
    this.data.listData.splice(this.data.listData.length - 1, 1);
    this.setData({
      listData: this.data.listData
    })
  },
 //点击添加车辆
  addItem: function (e) {
    this.data.listData.push({
      value1: '',
      title1: '',
      value2: '',
      title2: '',
      value3: '',
      title3: '',
      number: '',
      price: ''
    })
    this.setData({
      listData: this.data.listData
    })
  },
  onClick1(event) {
    var key = event.currentTarget.dataset.index
    $wuxSelect('#wux-select1').open({
      value: this.data.listData[key].value1,
      options: [
        {
          title: '豪华型',
          value: '001'
        },
        {
          title: '舒适性',
          value: '002'
        },
        {
          title: '经济型',
          value: '003'
        },
        {
          title: '加长版',
          value: '004'
        }
      ],
      onConfirm: (value, index, options) => {
    if (index !== -1) {
      this.data.listData[key].value1 = value
      this.data.listData[key].title1 = options[index].title,
      this.setData({
        listData: this.data.listData
      })
    }
  },
  })
  },
  onClick2(event) {
    var key = event.currentTarget.dataset.index
    $wuxSelect('#wux-select2').open({
      value: this.data.listData[key].value2,
      options: [
        {
          title: '大众',
          value: '001'
        },
        {
          title: '宝来',
          value: '002'
        },
        {
          title: 'benz',
          value: '003'
        },
        {
          title: 'jeep',
          value: '004'
        },
        {
          title: '红旗',
          value: '005'
        },
        {
          title: 'skoda',
          value: '006'
        }
      ],
      onConfirm: (value, index, options) => {
      console.log('brand', value, index, options)
    if (index !== -1) {
      this.data.listData[key].value2 = value
      this.data.listData[key].title2 = options[index].title,
        this.setData({
          listData: this.data.listData
        })
    }
  },
  })
  },
  onClick3(event) {
    var key = event.currentTarget.dataset.index
    $wuxSelect('#wux-select2').open({
      value: this.data.listData[key].value3,
      options: [
        {
          title: '5座',
          value: '001',
        },
        {
          title: '7座',
          value: '002',
        },
        {
          title: '13座',
          value: '003',
        },
        {
          title: '22座',
          value: '004',
        },
        {
          title: '33座',
          value: '005',
        },
        {
          title: '60座',
          value: '006',
        }
      ],
      onConfirm: (value, index, options) => {
      console.log('seatNumber', value, index, options)
    if (index !== -1) {
      this.data.listData[key].value3 = value
      this.data.listData[key].title3 = options[index].title,
        this.setData({
          listData: this.data.listData
        })
    }
  },
  })
  },
  inputPrice(event) {
    var key = event.currentTarget.dataset.index
    this.data.listData[key].price = event.detail.value
    this.setData({
      listData: this.data.listData
    })
  },
  inputNumber(event) {
    var key = event.currentTarget.dataset.index
    this.data.listData[key].number = event.detail.value
    this.setData({
      listData: this.data.listData
    })
  },
  // 删除报价方案
  delScheme () {
    $wuxDialog('#wux-dialog').confirm({
      resetOnClose: true,
      closable: false,
      title: '删除确认',
      content: '你确定要删除此方案？',
      onConfirm(e) {
        wx.reLaunch({
          url: "../immediateOffer/immediateOffer"
        })
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
  saveScheme: function(e) {
    var formData = e.detail.value
    var errorMes = ''
    // console.log(formData)
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
      if (i.indexOf('number') !== -1 && formData[i] == '') {
        errorMes = '请输入数量'
        this.showError(errorMes)
        return false
      }
      if (i.indexOf('price') !== -1 && formData[i] === '') {
        errorMes = '请输入单价'
        this.showError(errorMes)
        return false
      }
    }
    wx.reLaunch({
      url: "../immediateOffer/immediateOffer"
    })
  }
})