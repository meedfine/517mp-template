<template>
	<view>
	    <!-- <view class="status_bar"></view> -->

  <header class="mint-header" :class="[{ 'fixed-block': fixed, 'singleBtn':singleBtn }]">
    <div class="mint-header-button is-left">
      <slot name="left">
        <span @click="back" class="" style="font-size:16px">back</span>
      </slot>

    </div>
    <h1 class="mint-header-title" v-text="title" v-show="title"></h1>
    <h1 class="mint-header-title" v-show="choseType">
      <label class="title-nav homeGroup" id="title-nav" v-show="showWay">
        <span @click="activeType=1;" v-bind:class="{ active: activeType }" v-show="showPub && !isList" triptype="0">{{headerTripType && headerTripType["0"] ? headerTripType["0"] : "因公"}}</span>
      
        <span @click="activeType=0;" v-bind:class="{ active: !activeType }" v-show="showPri && !isList" triptype="1">{{headerTripType && headerTripType["1"] ? headerTripType["1"] : "因私"}}</span>
     
      </label>
    </h1>
    <h1 class="mint-header-title" v-show="!title&&!choseType">
      <slot name="center"></slot>
    </h1>
    <div class="mint-header-button is-right">
      <slot name="right">
          <span @click="back" class="iconfont icon-yiwentishixinxi" style="font-size:24px"></span>
      </slot>
    </div>
  </header>
  	  </view>
</template>

<script>
export default {
    name: 'clHeader',
    props: {
        fixed: Boolean,
        title: String,
        choseTrip: Boolean,
        choseType: String,
        isActive: String,
        meBack: Function,
        singleBtn: Boolean,
        isList: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showPub: true,
            showPri: true,
            showWay: true,
            activeType: this.isActive === '1' ? false : true
        }
    },
    computed: {
        headerTripType() {
            return this.$store.state.common.i18n.headerTripType;
        }
    },
    methods: {
        back: function() {
            if (this.meBack) {
                this.meBack()
            } else {
                uni.navigateBack({
    delta: 1
});
                // this.$u.route({type:"navigateBack",delta:1})
                // $('html').removeClass('fixedScroll')
                // window.history.go(-1)
            }
        }
    },
    mounted() {
        if (this.choseType) {
            switch (this.choseType) {
                case '0':
                    this.showPri = false
                    this.showPub = false
                    this.showWay = false
                    break
                case '1':
                    this.showPub = false
                    this.showPri = false
                    this.showWay = false
                    this.isActive = '1'
                    this.activeType = false
                    break
                case '2':
                    this.showPub = true
                    this.showPri = true
                    this.showWay = true
                    break
                default:
                    break
            }
        }
        var _that = this
        // $('.title-nav span').click(function() {
        //     $('.title-nav .active').removeClass('active')
        //     $(this).addClass('active')
        //     var tripType = $(this).attr('tripType')
        //     _that.$store.commit('ChangeTripType', tripType)
        //     _that.$parent.$emit('changeHeaderType', tripType)
        // })
    },
    watch: {
        isActive(val) { // 解决首页改变出行方式后跳转我的订单没有反绑选中状态
          this.activeType= val === '1' ? false : true
        },
        choseType(val) {
            this.choseType = val
            if (this.choseType) {
                switch (this.choseType) {
                    case '0':
                        this.showPri = false
                        this.showPub = false
                        this.showWay = false
                        break
                    case '1':
                        this.showPub = false
                        this.showPri = false
                        this.showWay = false
                        this.isActive = '1'
                        this.activeType = false
                        break
                    case '2':
                        this.showPub = true
                        this.showPri = true
                        this.showWay = true
                        break
                    default:
                        break
                }
            }
        }
    }
}
</script>
<style>
.mintui-back:before {
    font-size: 22px;
}
.status_bar {
      height: var(--status-bar-height);
      width: 100%;
		background-color: #119dee;
		}
</style>

<style scoped>

header .title-nav span {
    color: #fff;
    width: 70px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
}
header .title-nav {
    border: 1px solid #fff;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    height: 32px;
    line-height: 30px;
    display: inline-block;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    font-size: 12px;
    margin-top: 3px;
}

header .title-nav .active {
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    /* color: #119dee; */
    color: #333;
    background: #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    margin-left: -1px;
    margin-right: -1px;
}
.mint-header {
    background-color: #119dee;
    max-width: 768px;
    font-size: 12px;
	height: 50px;
}
.mint-header-button {
    min-width: 50px;
    -webkit-box-flex: none;
    -ms-flex: none;
    flex: none;
}
#app .singleBtn{
    background-color: unset !important;
}
.newBackBtn {
    position: relative;
    top: -2px;
    left: 5px;
    display: none;
    width: 26px;
    height: 26px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAB3CAYAAAC0VJjeAAACaElEQVR4nOXdyVLDMBRE0Q7F//9y2JCqVLCNJb2hu6UlK84NGSw/kcfz+cQG6xD59ecnfusQvgP+FA5z/CUcxvhbL2SO+Nuv4G74kbeuhxN+CA6jR34YDhP8FBwG+Gk4xPFLcAjjl+EQxYfAIYgPg0MMHwqHED4cDhF8ChwC+DQ4yPGpcBDj0+EgxZfAQYgvg4MMXwoHEb4cDhJ8CxwE+DY4mvGtcDTi2+FowlPA0YCngaMYTwVHIZ4OjiI8JRwFeFo4kvHUcCTi6eFIwkvAkYCXgSMYLwVHIF4OjiC8JBwBeFk4FvHScCzg5eGYxFvAMYG3gWMQbwXHAN4Ojpt4Szhu4G3h+AdvDccF3h6OE/wWcBzgt4HjA78VHG/47eD4xW8Jx8Fz/mpZwbHJicrTlXVhI7G+Bv+crQK8HvktA7z/2W8X4PM5v1WAoxe8bQIc4bFLgDM8dghwhYd7gDsfcmwD3P2EZxkg68JGIsDohY1VgJmrOpsAs5e0FgFWruflA6xuZkgHiNjJkQ0QtY0lGSByD08uQPQGplSAjN1bmQBZW9cSATL37ekDZN+0oA5QcceGNkDV7SrKAJX36ugCVN+opArQcZeWJkDXLWqKAJ3359sDdA8ntAZgmMxoC8AyltISgGkmpzwA20BSaQDGaayyAKyjaCUBmOfw0gOwDyGmBlCYwEwLoDJ+mhJAafY2PIDa4HFoAMWp67AAqiPnIQGU5+2XA6gfNlgK4HDSYjqAyzGTqQBOZ2yGA7gdMBoK4Hi6yuqf+88sq691mFlWX+gxsy4D7HCi8jTAd+3v0bZeAV7v8Q8A+AFFW3PtSlvgGwAAAABJRU5ErkJggg==");
    background-position: left center;
    background-size: auto 16px;
    background-repeat: no-repeat;
}
</style>
