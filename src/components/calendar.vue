<template>
  <div>
    <div @click="popupVisible = true">
      <slot>
        <!-- <u-button type="primary">日期</u-button> -->
      </slot>
    </div>
    <div class="maskWrapper" :class="{ showMask: popupVisible}" @click="popupVisible=false"></div>
    <!-- <u-popup v-model="popupVisible" position="bottom" class="calendarWrapper" mode="bottom" length="70%" border-radius="14"> -->
    <div class="calendarWrapper" :class="{ showWrapper: popupVisible}">
      <div class="calendarContent" @tap.stop>
        <div class="header">
          选择日期
          <div class="closeWrapper" @click="popupVisible = false">
            <span class="iconfont icon-guanbichacha"></span>
          </div>
        </div>
        <div class="week">
          <span class="highlight">日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
        <span>五</span>
        <span class="highlight">六</span>
      </div>
      <div class="content">
        <div
          class="monthWrapper"
          v-for="(singleMonth, index) in monthInfo"
          :key="index"
        >
          <div class="title">
              <span>{{ singleMonth.year }}年{{ singleMonth.month }}月</span>
            </div>
            <div class="month">
              <div
                class="singleWeek"
                v-for="(singleWeek, index1) in singleMonth.weeks"
                :key="index1"
              >
                <div
                  class="everyDay"
                  v-for="(singleDay, index2) in singleWeek"
                  :key="index2"
                  :class="{
                    highlight: index2 == 0 || index2 == 6,
                    disable: isEarly([
                      singleMonth.year,
                      singleMonth.month,
                      singleDay.value,
                    ]),
                    active:
                      chooseDay[0] == singleMonth.year &&
                      chooseDay[1] == singleMonth.month &&
                      chooseDay[2] == singleDay.value,
                    active1:
                      chooseDay[0] == singleMonth.year &&
                      chooseDay[1] == singleMonth.month &&
                      chooseDay[2] == singleDay.value &&
                      needSecond,
                    active2:
                      chooseSecondDay[0] == singleMonth.year &&
                      chooseSecondDay[1] == singleMonth.month &&
                      chooseSecondDay[2] == singleDay.value &&
                      needSecond,
                    active3:
                      chooseDay[0] == singleMonth.year &&
                      chooseDay[1] == singleMonth.month &&
                      chooseDay[2] == singleDay.value &&
                      isSecondChoose == false &&
                      chooseSecondDay[0] == singleMonth.year &&
                      chooseSecondDay[1] == singleMonth.month &&
                      chooseSecondDay[2] == singleDay.value &&
                      needSecond,
                    cover:
                      isEarly(
                        [singleMonth.year, singleMonth.month, singleDay.value],
                        chooseSecondDay
                      ) &&
                      isEarly(chooseDay, [
                        singleMonth.year,
                        singleMonth.month,
                        singleDay.value,
                      ]),
                  }"
                  @click="
                    changeActive(
                      singleMonth.year,
                      singleMonth.month,
                      singleDay.value
                    )
                  "
                >
                  <span class="dayText">
                    <span class="dayTextBefore highlight">{{
                      isHoliday(
                        singleMonth.year,
                        singleMonth.month,
                        singleDay.value
                      )
                    }}</span>
                    <span
                      v-if="
                        singleMonth.year == today[0] &&
                        singleMonth.month == today[1] &&
                        singleDay.value == today[2]
                      "
                      >今天</span
                    >
                    <span
                      v-else-if="
                        singleMonth.year == tomorrow[0] &&
                        singleMonth.month == tomorrow[1] &&
                        singleDay.value == tomorrow[2]
                      "
                      >明天</span
                    >
                    <span
                      v-else-if="
                        singleMonth.year == theDayAfterTomorrow[0] &&
                        singleMonth.month == theDayAfterTomorrow[1] &&
                        singleDay.value == theDayAfterTomorrow[2]
                      "
                      >后天</span
                    >
                    <span v-else>{{ singleDay.value }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </u-popup> -->
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      holidays: [
        {
          name: "元旦节",
          date: [0, 1, 1],
        },
        {
          name: "情人节",
          date: [0, 2, 14],
        },
        {
          name: "妇女节",
          date: [0, 3, 8],
        },
        {
          name: "植树节",
          date: [0, 3, 12],
        },
        {
          name: "消费者日",
          date: [0, 3, 15],
        },
        {
          name: "愚人节",
          date: [0, 4, 1],
        },
        {
          name: "劳动节",
          date: [0, 5, 1],
        },
        {
          name: "青年节",
          date: [0, 5, 4],
        },
        {
          name: "护士节",
          date: [0, 5, 12],
        },
        {
          name: "儿童节",
          date: [0, 6, 1],
        },
        {
          name: "建党节",
          date: [0, 7, 1],
        },
        {
          name: "建军节",
          date: [0, 8, 1],
        },
        {
          name: "教师节",
          date: [0, 9, 10],
        },
        {
          name: "国庆节",
          date: [0, 10, 1],
        },
        {
          name: "老人节",
          date: [0, 10, 6],
        },
        {
          name: "感恩节",
          date: [0, 11, 24],
        },
        {
          name: "圣诞节",
          date: [0, 12, 25],
        },
      ],
      popupVisible: false,
      today: [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
      ],
      tomorrow: [],
      theDayAfterTomorrow: [],
      isSecondChoose: false,
    };
  },
  props: {
    limitDay: {
      type: Array,
      default: () => [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
      ],
    },
    needSecond: {
      type: Boolean,
      default: false,
    },
    chooseDay: {
      type: Array,
      default: () => [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
      ],
    },
    chooseSecondDay: {
      type: Array,
      default: () => [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
      ],
    },
    monthLimit: {
      type: Number,
      default: 6, //限制可选择的月份范围
    },
  },
  computed: {
    monthInfo: function() {
      let result = [];
      let curTime = new Date();
      let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      for (let i = 0; i < this.monthLimit; i++) {
        let month = (curTime.getMonth() + i) % 12;
        let year =
          curTime.getFullYear() + Math.floor((curTime.getMonth() + i) / 12);
        if (
          month == 1 &&
          ((year % 4 === 0 && year % 100 != 0) || year % 400 == 0)
        ) {
          monthArr[1] = 29;
        }

        // 每周为一个数组，每月为周的集合
        // 计算每月一号为周几，循环当月天数
        let weeks = [[]];
        let weekCount = 0;
        weeks[weekCount] = [{}, {}, {}, {}, {}, {}, {}];
        let curDay = new Date(year, month, 1).getDay();
        for (let j = 0; j < monthArr[month]; j++) {
          weeks[weekCount][curDay].value = j + 1;

          //判断当天是否为节日

          curDay++;
          if (curDay > 6) {
            curDay -= 7;
            weekCount++;
            weeks[weekCount] = [{}, {}, {}, {}, {}, {}, {}];
          }
        }

        result[i] = {
          year: year,
          month: month + 1,
          dayLen: monthArr[month],
          weeks: weeks,
        };
      }
      // 增加今天明天后天描述
      return result;
    },
  },
  mounted() {
    let time = new Date();
    time.setDate(time.getDate() + 1);
    this.tomorrow = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
    time.setDate(time.getDate() + 1);
    this.theDayAfterTomorrow = [
      time.getFullYear(),
      time.getMonth() + 1,
      time.getDate(),
    ];
  },
  watch: {
    popupVisible: function(val) {
      // 解决往返只选一次就主动关闭组件的情况
      if (!val && this.needSecond && this.isSecondChoose) {
        this.$emit("changeSecondDay", this.chooseDay);
        this.clearData();
      }
    },
  },
  methods: {
    isHoliday(year, month, day) {
      let i = 0;
      for (i = 0; i < this.holidays.length; i++) {
        if (
          (this.holidays[i].date[0] == 0 || this.holidays[i].date[0] == year) &&
          this.holidays[i].date[1] == month &&
          this.holidays[i].date[2] == day
        ) {
          return this.holidays[i].name;
        }
      }
      return "";
    },
    isEarly(chooseDate, compareDate = this.limitDay) {
      // 判断选中的时间是否早于对比的时间
      if (
        chooseDate[0] * 12 + chooseDate[1] <
          compareDate[0] * 12 + compareDate[1] ||
        (chooseDate[0] * 12 + chooseDate[1] ==
          compareDate[0] * 12 + compareDate[1] &&
          chooseDate[2] < compareDate[2])
      ) {
        return true;
      }
      return false;
    },
    changeActive(year, month, day) {
      // 如果天数小于限制天数，不处理
      if (!day || this.isEarly([year, month, day])) {
        return;
      }
      if (
        this.isSecondChoose &&
        this.isEarly([year, month, day], this.chooseDay)
      ) {
        this.$emit("changeFirstDay", [year, month, day]);
        this.$emit("changeSecondDay", [year, month, day]);
        this.isSecondChoose = true;
        return;
      }
      if (!this.needSecond) {
        this.$emit("changeFirstDay", [year, month, day]);
        this.clearData();
      } else {
        if (this.isSecondChoose) {
          this.$emit("changeSecondDay", [year, month, day]);
          this.isSecondChoose = false;
          this.clearData();
        } else {
          this.$emit("changeFirstDay", [year, month, day]);
          this.$emit("changeSecondDay", [year, month, day]);
          this.isSecondChoose = true;
        }
      }
    },
    clearData() {
      this.isSecondChoose = false;
      setTimeout(() => {
        this.popupVisible = false;
      }, 300);
    },
  },
};
</script>

<style lang="stylus">
.maskWrapper
  position fixed
  transition: background-color 0.3s ease-in-out 0s;
  z-index 10
.showMask
  top 0
  bottom 0
  left 0
  right 0
  background-color: rgba(0, 0, 0, 0.6);
.calendarContent
  display flex
  flex-direction column
  height 100%
.calendarWrapper
  &.showWrapper
    bottom 0
    left 0
    display flex
  height 70%
  z-index 10000
  background-color: #fff
  transition: all 0.3s ease-in-out 0s;
  position fixed
  bottom -1000px
  text-align center
  // display flex
  flex-direction column
  width 100%
  // max-height 80%
  border-radius 15px 15px 0 0
  overflow hidden
  // z-index 200000
  color: #333;
  .icon-guanbichacha
    color #C0C8CB
  .highlight
    color #ff9133
  .disable
    color #999
  .cover
    background-color #edf8ff
    border-radius 0 !important
  .active,.active1,.active2
    background-color #199dee
    color #fff
  .header
    position relative
    flex  0 0 45px
    display flex
    align-items center
    justify-content center
    background-color #fff
    font-size 12px
    color #333
    .closeWrapper
      position absolute
      right 15px
      top 13px
      width 17px
      height 17px
      display flex
      justify-content center
      align-items center
      .close
        width 17px
  .week
    flex  0 0 24px
    display flex
    justify-content space-around
    align-items center
    background-color #fff
    font-size 11px
    background-color #f5f5f5
    color #999
  .content
    position relative
    // -webkit-overflow-scrolling touch
    display flex
    flex-direction column
    overflow scroll
    font-size 11px
    // height 600px
    .title
      position relative
      text-align center
      margin-top 17px
      height 35px
      line-height 35px
      &:after
        content ""
        width 100%
        height 1px
        position absolute
        bottom 50%
        left 0
        background-color #e5e5e5
      span
        position relative
        z-index 20
        background-color #fff
        padding 0 17px
    .month
      .singleWeek
        display flex
        justify-content space-around
        .everyDay
          position relative
          flex  1 0 46px
          height 54px
          line-height 54px
          border-radius 8px
        .dayText
          position relative
          display inline-block
          width 100%
        .dayTextBefore
          position absolute
          width 100%
          height 0
          top -11px
          left 0
          font-size 12px
        .active1:after,.active2:after
          position absolute
          content "去程"
          font-size 11px
          width 100%
          height 0
          text-align center
          left 0
          top 14px
        .active2:after
          content:"返程"
        .active1:after
          content:"去程"
        .active3:after
          content:"去返"
</style>
