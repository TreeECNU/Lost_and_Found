// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asideBar: ["卡片证件类", "生活用品类", "数码产品类", "其他"],
    // ['身份证', '校园卡', '学生证', '公交卡', '银行卡', '其他'],
    // ['水杯', '雨伞', '钥匙', '其他'],
    // ['手机', 'U盘/硬盘', '平板电脑', '手写笔', '耳机', '其他'],
    //['其他']
    rightList:  [
      [
        {
          url: "../../images/idCard.png",
          text: "身份证"
        },
        {
          url: "../../images/schoolcard.png",
          text: "校园卡"
        },
        {
          url: "../../images/stuCard.png",
          text: "学生证"
        },
        {
          url: "../../images/busCard.png",
          text: "公交卡"
        },
        {
          url: "../../images/bankCard.png",
          text: "银行卡"
        },
        {
          url: "../../images/car.png",
          text: "驾驶证"
        },
        {
          url: "../../images/others.png",
          text: "其他"
        }
      ],
      [
        {
          url: "../../images/cup.png",
          text: "水杯"
        },
        {
          url: "../../images/key.png",
          text: "钥匙"
        },
        {
          url: "../../images/umbrella.png",
          text: "雨伞"
        },
        {
          url: "../../images/wallet.png",
          text: "钱包"
        },
        {
          url: "../../images/glasses.png",
          text: "眼镜"
        },
        {
          url: "../../images/money.png",
          text: "现金"
        },
        {
          url: "../../images/watch.png",
          text: "手表"
        },
        {
          url: "../../images/others.png",
          text: "其他"
        }
      ],
      [
        {
          url: "../../images/phone.png",
          text: "手机"
        },
        {
          url: "../../images/udisk.png",
          text: "U盘/硬盘"
        },
        {
          url: "../../images/pad.png",
          text: "平板电脑"
        },
        {
          url: "../../images/bianji.png",
          text: "手写笔"
        },
        {
          url: "../../images/earphone.png",
          text: "耳机"
        },
        {
          url: "../../images/camera.png",
          text: "相机"
        },
        {
          url: "../../images/others.png",
          text: "其他"
        }
      ],
      [
        {
          url: "../../images/others.png",
          text: "其他"
        }
      ]
    ],
    select: 0,
    login: true
  },

  toSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  toClassify(e) {
    const { text } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../classifyList/classifyList?text=${text}`,
    })
  },

  selectLeft(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      select: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      login: !!wx.getStorageSync('login')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        select: 1
      })
    }
    this.onLoad();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})