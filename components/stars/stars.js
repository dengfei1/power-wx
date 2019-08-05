Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stars:Array,
    starWidth: Number
  },
  methods: {
    // 点亮星星的事件部分
    scores: function (e) {
      var b = [];
      var that = this;
      for (var i = 0; i < that.data.stars.length; i++) {
        var allItem = 'stars[' + i + '].flag';
        console.log("allItem",allItem)
        //参数和变量名称一致，可用一个值代替（es6新语法特性）
        that.setData({
          [allItem]: 1
        })
      }
      var index = e.currentTarget.dataset.index;
      for (var i = 0; i <= index; i++) {
        var item = 'stars[' + i + '].flag';
        that.setData({
          [item]: 2
        })
        b.push(i + 1);
        console.log("11", b)
        console.log(b[b.length - 1])
      }
      this.triggerEvent('onCheckbox', b)
    }
  }
  

})