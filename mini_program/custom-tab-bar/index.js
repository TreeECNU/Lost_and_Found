Component({
  data: {
    select: 0,
    list: [
      {
        iconPath: "/images/index00.png",
        pagePath: "/pages/index/index",
        selectedIconPath: "/images/index11.png",
        text: "首页",
        type: 0
      },
      {
        iconPath: "/images/classify00.png",
        pagePath: "/pages/classify/classify",
        selectedIconPath: "/images/classify11.png",
        text: "分类",
        type: 0
      },
      {
        type: 1,
        pagePath: "/pages/publish/publish",
      },
      {
        iconPath: "/images/collection00.png",
        pagePath: "/pages/collection/collection",
        selectedIconPath: "/images/collection11.png",
        text: "收藏夹",
        type: 0
      },
      {
        iconPath: "/images/me00.png",
        pagePath: "/pages/me/me",
        selectedIconPath: "/images/me11.png",
        text: "我的",
        type: 0
      }
    ]
  },

  methods: {
    selectPage(e) {
      const { index, page, type } = e.currentTarget.dataset;
      if (index !== this.data.select && type === 0) {
        wx.switchTab({
          url: page,
        })
      } else {
        if (!wx.getStorageSync('login')) {
          wx.showToast({
            title: '请您先登陆再发布',
            icon: 'none'
          })
          return;
        } else {
          wx.navigateTo({
            url: page,
          })
        }
      }
    }
  }
})