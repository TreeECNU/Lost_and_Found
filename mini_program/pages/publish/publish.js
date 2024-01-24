// pages/publish/publish.js
import { ajax } from '../../utils/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展示的两列数据
    multiArray: [
      ['卡片证件类', '生活用品类', '数码产品类', '其他'], 
      ['身份证', '校园卡', '学生证', '公交卡', '银行卡', '驾驶证', '其他']
    ],
    // 第二列的储备数据源
    pickerList: [
      ['身份证', '校园卡', '学生证', '公交卡', '银行卡', '驾驶证', '其他'],
      ['水杯', '雨伞', '钥匙', '钱包', '眼镜', '现金', '手表', '其他'],
      ['手机', 'U盘/硬盘', '平板电脑', '手写笔', '耳机', '相机', '其他'],
      ['其他']
    ],
    multiIndex: [0, 0],
    select: false,
    name: '',
    date: '',
    region: '',
    phone: '',
    desc: '',
    imgList: [],
    type: '',
    type_check: false,
    name_check: false,
    date_check: false,
    region_check: false,
    phone_check: false,
  },

  async toPublish() {
    const {
      type,
      multiArray,
      multiIndex,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      select,
      id
    } = this.data;
    if(!type) {
      this.setData({
        type_check: true
      })
    } 
    if(!name) {
      this.setData({
        name_check: true
      })
    } 
    if(!date) {
      this.setData({
        date_check: true
      })
    } 
    if(!region) {
      this.setData({
        region_check: true
      })
    } 
    if(!phone) {
      this.setData({
        phone_check: true
      })
    } 
    if (!type || !select || !name || !date || !region || !phone) {
      wx.showToast({
        title: '未填写必填项',
        icon: 'none',
      });
      return;
    }

    if (id) {
      // 修改
      const params = {
        openid: wx.getStorageSync('openid'),
        type: Number(type),
        classify1: multiArray[0][multiIndex[0]],
        classify2: multiArray[1][multiIndex[1]],
        name,
        date,
        region,
        phone,
        desc,
        imgList,
        time: new Date().getTime(),
        id,
      };

      const { data } = await ajax('/updateLose', 'POST', params);

      if (data === "success") {
        wx.switchTab({
          url: '../index/index',
          success: () => {
            wx.showToast({
              icon: 'none',
              title: '修改成功！',
            })
          }
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
      }
    } else {
      // 发布
        const params = {
          openid: wx.getStorageSync('openid'),
          type: Number(type),
          classify1: multiArray[0][multiIndex[0]],
          classify2: multiArray[1][multiIndex[1]],
          name,
          date,
          region,
          phone,
          desc,
          imgList,
          time: new Date().getTime()
        };
  
        const result = await ajax('/publish', 'POST', params);
        const { data } = result;
        if (data === "success") {
          wx.switchTab({
            url: '../index/index',
            success: () => {
              wx.showToast({
                icon: 'none',
                title: '发布成功！',
              })
            }
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none'
          })
        }
  
    }

    
    
  },

  backPage() {
    // wx.navigateBack();
    wx.switchTab({
      url: '../index/index',
    })
  },

  selectType(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      type: id,
      type_check: false
    })
  },

  deleteImg(e) {
    let { index } = e.currentTarget.dataset;
    let { imgList } = this.data;
    imgList.splice(index, 1);
    this.setData({
      imgList
    })
  },

  uploadImg() {
    let { imgList } = this.data;
    wx.chooseMedia({
      count: 9 - imgList.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const { tempFiles } = res;
        console.log(tempFiles);
        tempFiles.forEach((item, index) => {
          wx.uploadFile({
            url: 'http://47.120.59.186:3000/uploadImg', 
            filePath: item.tempFilePath,
            name: 'file',
            success: (res) => {
              const { data } = res;
              let { path } = JSON.parse(data)[0];
              let _path = `http://47.120.59.186:3000/${path}`;
              console.log(_path);
              imgList.unshift(_path);
              console.log(imgList);
              this.setData({
                imgList
              })
              // const data = res.data
              //do something
            },
            fail: (err) => {
              console.log(err);
            }
          })
          // imgList.unshift(res.fileID);
          // console.log(imgList);
        })
      }
    })
  },

  deleteDesc() {
    this.setData({
      desc: ''
    })
  },

  getName(e) {
    this.setData({
      name: e.detail.value,
      name_check: false
    })
  },

  getDate(e) {
    this.setData({
      date: e.detail.value,
      date_check: false
    })
  },

  getRegion(e) {
    this.setData({
      region: e.detail.value,
      region_check: false
    })
  },

  getPhone(e) {
    this.setData({
      phone: e.detail.value,
      phone_check: false
    })
  },

  getDesc(e) {
    // 如果不希望去掉多余空格，就去掉.trim()
    this.setData({
      desc: e.detail.value.trim()
    })
  },

  closeSelect() {
    this.setData({
      select: false,
      multiIndex: [0, 0],
    })
  },

  bindMultiPickerChange(e) {
    this.setData({
      select: true
    })
  },

  bindMultiPickerColumnChange(e) {
    let { column, value } = e.detail;
    let data = this.data;
    let { multiArray, pickerList } = this.data;
    if (column === 0) {
      // 替换展示的数据源
      multiArray[1] = pickerList[value];
    }
    data.multiArray = multiArray;
    data.multiIndex[column] = value;
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { id } = options;
    const { multiArray, pickerList } = this.data;
    if (id) {
      const params = {
        _id: id
      };
      const { data } = await ajax('/getDetail', 'POST', params);
      const { type, classify1, classify2, name, date, region, phone, desc, imgList } = data;
      const index1 = multiArray[0].findIndex(item => item === classify1);
      const index2 = pickerList[index1].findIndex(index => index === classify2);

      this.setData({
        type: String(type),
        multiArray: [
          multiArray[0],
          pickerList[index1]
        ],
        multiIndex: [index1, index2],
        select: true,
        name,
        date,
        region, 
        phone,
        desc,
        imgList,
        id
      })
    }
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