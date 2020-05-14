<template>
  <div class>
    <clHeader
      :singleBtn="singleBtn"
      fixed
      v-bind:choseType.sync="tripTypeSel"
      v-bind:isActive="storeData.tripType"
      v-if="isShowHead"
    >
    </clHeader>
    <div class="main">
      <div class="imgWrapper">
        <img :src="ad | autoProtocol" :onerror="wrapperError" width="100%" style="width: 100%;pointer-events: none;">
      </div>
      <div class="tripWrapper">
        <div class="header-menu routeType" v-if="!hideReturnFirst">
          <div class="colum-2" @click="changeMethodSingle">
            <label
              class="header-item pointer font16 fontBold"
              v-bind:class="{ active: voyagetype1 , colorMain : voyagetype1 }"
              data-show="oneWay"
              type="0"
            >单程
            <span :class="{activeText:voyagetype1 }"></span>
            </label>
          </div>
          <div class="colum-2" @click="changeMethodReturn">
            <label  class="header-item pointer font16 fontBold"  v-bind:class="{ active: voyagetype2  , colorMain : voyagetype2 }"  data-show="arrDateDiv"  type="1">{{(!hideReturnFirst && showReturn) ? "往返" : ""}}
              <span :class="{activeText:voyagetype2 }"></span>
            </label>
          </div>
        </div>
        <div class="tripAll">
          <div class="tripList">
            <ul class="search-info">
              <li class="default-row">
                <div class="col fromcitySelectBtn" data-id="CitySelect" data-param="fromCity">
                  {{cityName}}
                  <!-- <input type="text" v-model="cityName" class="fromCity citySel" readonly="readonly" disabled> -->
                </div>
                <div class="changeStyleDiv" @click="changeStyleDiv">
                  <div class="change-city changeStyle iconfont icon-jipiaochengshiqiehuan"></div>
                  <!-- <span class="iconfont icon-jipiaochengshiqiehuan change-city changeStyle"></span> -->
                </div>
                <!-- <transition> -->
                <div class="col text-right tocitySelectBtn" data-id="CitySelect" data-param="toCity">
                  <input type="text" v-model="toCity.b" class="toCity citySel tr text-right" readonly disabled>
                </div>
                <!-- </transition> -->
              </li>
              <li class="h60 row" data-hide="oneWay" data-id="inDateCalandar" data-param="oneWay">
                <div class="col Cd0d0d0 h60" id="selectDate">
                  <calendar v-if="!voyagetype2" :chooseDay="this.chooseDay" @changeFirstDay="changeFirstDay" :style="!voyagetype2?'width:100%':''">
                    <input type="text" class="fromDay" readonly disabled v-model="storeData.fromDay.showFromDay">
                    <span class="fromDayWeek week" v-text="storeData.fromDay.showWeek"></span>
                  </calendar>
                  <calendar v-else :chooseDay="this.chooseDay" :chooseSecondDay="this.chooseSecondDay"  @changeFirstDay="changeFirstDay" @changeSecondDay="changeSecondDay" :needSecond="true">
                    <input type="text" class="fromDay" readonly disabled v-model="storeData.fromDay.showFromDay" style="width: 90px">
                    <span class="fromDayWeek week" v-text="storeData.fromDay.showWeek"></span>
                  </calendar>
                </div>
                <p v-show="voyagetype2" class="betweenDay">{{betweenDay}}</p>
                <div class="col Cd0d0d0 h60" style="text-align:right" id="selectReturnDate" v-if="voyagetype2">
                  <calendar :chooseDay="this.chooseDay" :chooseSecondDay="this.chooseSecondDay"  @changeFirstDay="changeFirstDay" @changeSecondDay="changeSecondDay" :needSecond="true">
                    <input type="text" class="fromDay" readonly disabled v-model="storeData.returnDay.showReturnDay" style="width: 90px">
                    <span class="fromDayWeek week" v-text="storeData.returnDay.showReturnWeek"></span>
                    <!-- <span class="fromDayWeek week" v-text="1"></span> -->
                  </calendar>
                </div>
              </li>
              <!-- <li class="h60 row" data-hide="oneWay" data-id="outDateCalandar" data-param="oneWay"></li> -->
            </ul>
          </div>
          <div class="searchAir">
            <u-button class="searchBtn" :custom-style="customStyle" size="large" type="primary" @click="searchFlight">搜&nbsp;索</u-button>
          </div>
          <div
            class="contain recent"
            id="recent"
            v-if="storeData.historyRecords&&storeData.historyRecords.length>0"
          >
            <span
              v-for="(cityHis,index) in storeData.historyRecords"
              :key="index"
              @click="historyConfirm(cityHis)"
            >{{cityHis.fromCity&&cityHis.fromCity.b}}-{{cityHis.toCity&&cityHis.toCity.b}}</span>
            <span class="cleanHis" @click="clearCityHistory">全部清除</span>
          </div>
        </div>
      </div>
      <section class="plugins"></section>
      <div class="btn-area" v-if="showBottomArea == 1">
        <div @click="toMyStand" class="singleBtn" v-show="storeData.tripType === '0'">
          <span class="iconfont icon-chaxunshouyewodechabiao"></span>
          我的差标</div>
        <div @click="toAirportTransport" v-show="storeData.tripType === '1'" class="singleBtn"><span class="iconfont icon-jiesongji"></span>接送机</div>
        <div @click="toMyOrder" class="singleBtn"><span class="iconfont icon-chaxunshouyewodedingdan"></span>我的订单</div>
      </div>
      <div class="btn-area" v-if="showBottomArea == 2 && businessList.length && storeData.tripType === '0'">
        <div class="singleBtn" @click="toCustom(item.path)" v-for="(item,index) in businessList" :key="index">
          <span class="iconfont" :class="item.icon"></span>
          {{item.name}}
        </div>
      </div>
      <div class="btn-area" v-if="showBottomArea == 2 && privateList.length && storeData.tripType === '1'">
        <div class="singleBtn" @click="toCustom(item.path)" v-for="(item,index) in privateList" :key="index">
          <span class="iconfont" :class="item.icon"></span>
          {{item.name}}
        </div>
      </div>
      <div class="btn-area" v-if="showBottomArea == 2 && !privateList.length && !businessList.length" style="background-color: #eee;">
      </div>
    </div>



  </div>
</template>

<script>
import moment from "moment";
import calendar from "../../components/calendar";
export default {
  name: "search",
  components: {
    calendar
  },
  data() {
    return {
      customStyle: {
        height: "44px"
      },
      storeData: this.$store.state.common,
      fromCity: {},
      toCity: {},
      city: "",
      tmcInfo: {},
      isShowFooter: false,
      isShowHead: true,
      // ad: window.rsFileUrl + "airADnew-ZS.png", // 招商证券
      ad: "//cdn.517la.net/" + "h5-air/img/airADnew-ZS20190322.png", //公有云
      // ad: "//rs.517na.com/h5-air/img/airADnew-ZS.png",
      tripTypeSel: "",
      voyagetype1: true,
      voyagetype2: false,
      voyagetype: 1,
      showReturn: true, // 是否展示往返按钮
      hideReturnFirst: false, // 根据公司信息判断往返按钮展示
      singleBtn: true, // 只有按钮，没有背景色
      cityName: "123"
      // chooseDay: [],
      // chooseSecondDay: []
    };
  },
  computed: {
    wrapperError() {
      return 'this.src="' + "//cdn.517la.net/" + "h5-air/airAD.png" + '"'
    },
    tripType: function() {
      return this.storeData.tripType;
    },
    chooseDay: function(){
      return this.dealDay(this.storeData.fromDay.showFromDay,this.storeData.fromDay.fromDay);
    },
    chooseSecondDay: function(){
      return this.dealDay(this.storeData.returnDay.showReturnDay,this.storeData.returnDay.returnDay);
    },
    betweenDay() {
        var weekCh = [ "日", "一", "二", "三", "四", "五", "六"];
        let showFromDay = this.storeData.fromDay.showFromDay;
        let showReturnDay = this.storeData.returnDay.showReturnDay ? this.storeData.returnDay.showReturnDay : this.storeData.fromDay.fromDay? moment(this.storeData.fromDay.fromDay.replace(/\-/g, "/")).add("days", 1).format("MM月DD日"): "";
        let showFromDayStr = showFromDay ? new Date().getFullYear()+"-"+showFromDay.split("月")[0] +"-"+ showFromDay.split("月")[1].split("日")[0] : "";
        let showReturnDayStr = showReturnDay ? new Date().getFullYear()+"-"+showReturnDay.split("月")[0] +"-"+ showReturnDay.split("月")[1].split("日")[0] : "";
        let date1 = this.chooseDay.join("/") ? this.chooseDay.join("/") : showFromDayStr;
        let date2 = this.chooseSecondDay.join("/") ?  this.chooseSecondDay.join("/") : showReturnDayStr;
        let dateTime1 = Date.parse(date1.replace(/\-/g, "/"));
        let dateTime2 = Date.parse(date2.replace(/\-/g, "/"));
        let betweenTime = Math.abs(dateTime1 - dateTime2) + 86400000;
        return Math.floor(betweenTime/(24*3600*1000)) + " 天";
    },
    showBottomArea(){
      if(this.$store.state.common.i18n && this.$store.state.common.i18n.businessList && this.$store.state.common.i18n.privateList){
        return 2
      } else {
        return 1
      }
    },
    businessList(){
      if(this.$store.state.common.i18n && this.$store.state.common.i18n.businessList){
        return this.$store.state.common.i18n.businessList
      }else {
        return []
      }
    },
    privateList(){
      if(this.$store.state.common.i18n && this.$store.state.common.i18n.privateList){
        return this.$store.state.common.i18n.privateList
      }else {
        return []
      }
    }
  },
  watch: {
    tripType: function(val) {
      if (val === "0") {
        this.showReturn = true;
      } else {
        this.showReturn = false;
        this.changeMethodSingle();
      }
    }
  },
  methods: {
    toCustom(path){
      if(path.indexOf("stand") > -1){
        this.toMyStand();
      } else if(path.indexOf("orderList") > -1){
        this.toMyOrder();
      } else if(path.indexOf("airport") > -1){
        this.toAirportTransport();
      } else if(path.indexOf("//")> -1){
        // location.href = path;
      } else {
      //   this.$router.push({
      //     path: `/${path}?ticket=${localStorage.getItem("VUE_FLIGHT_AUTH")}`
      //  });
      }
    },
    changeFirstDay(arg) {
      var weekCh = [ "日", "一", "二", "三", "四", "五", "六"];
      // this.storeData.fromDay.showFromDay = arg[1].toString().padStart(2, "0")+"月"+arg[2].toString().padStart(2, "0")+"日";
      this.storeData.fromDay.showFromDay = moment(arg.join("/")+" 00:00:00").format("MM月DD日");
      // this.chooseDay = arg;
      var fromDayObj = {
        fromDay: arg.join("-")+" 00:00:00",
        showFromDay: this.storeData.fromDay.showFromDay,
        showWeek: "周" + weekCh[new Date(arg.join("/")+" 00:00:00").getDay()]
      };
      this.$store.commit('ChangeFromDay', fromDayObj);
      var fromTime = new Date(fromDayObj.fromDay.replace(/\-/g, "/")).getTime();
      var returnTime = new Date(this.storeData.returnDay.returnDay.replace(/\-/g, "/")).getTime();
      if (fromTime > returnTime)  {
        var returnObj = {
          returnDay: moment(fromDayObj.fromDay.replace(/\-/g, "/")).add("days", 1).format("YYYY-MM-DD HH:mm:ss"),
          showReturnDay: moment(fromDayObj.fromDay.replace(/\-/g, "/")).add("days", 1).format("MM月DD日"),
        }
        // returnObj.returnDay = returnObj.returnDay.replace('/\-/','/');
        // returnObj.returnDay = returnObj.returnDay.replace(/\-/g, "/");
        returnObj.showReturnWeek = "周" + weekCh[new Date(returnObj.returnDay.replace(/\-/g, "/")).getDay()];
        this.$store.commit('ChangeReturnDay', returnObj);
      }
    },
    changeSecondDay(arg) {
      var weekCh = [ "日", "一", "二", "三", "四", "五", "六"];
      // this.storeData.returnDay.showReturnDay = arg[1].toString().padStart(2, "0")+"月"+arg[2].toString().padStart(2, "0")+"日";
      this.storeData.returnDay.showReturnDay = moment(arg.join("/")+" 00:00:00").format("MM月DD日");
      // this.chooseSecondDay = arg;
      var returnObj = {
        returnDay: arg.join("-")+" 00:00:00",
        showReturnDay: this.storeData.returnDay.showReturnDay,
        showReturnWeek: "周" + weekCh[new Date(arg.join("/")+" 00:00:00").getDay()]
      };
      this.$store.commit('ChangeReturnDay', returnObj);
    },
    toMyStand() {
      let year = new Date().getFullYear();
      let showFromDay = this.storeData.fromDay.showFromDay;
      let month = showFromDay.split("月")[0];
      let day = showFromDay.split("月")[1].split("日")[0];
      this.$router.push({
        name: "stander",
        params: {
          //takeOffTime: this.storeData.selFlightInfo.DepDate +
            takeOffTime: `${year}` + "-" + `${month}` + "-" + `${day}`
        }
      });
    },
    toMyOrder() {
      // this.$router.push({
      //   path: "/orderList?ticket=" + localStorage.getItem("VUE_FLIGHT_AUTH")
      // });
    },
    toAirportTransport() {
      var hostUrl = "";
      var i18nConfig = this.$store.state.common.i18n;
      if (i18nConfig['AirportUrl']) {
        hostUrl = i18nConfig['AirportUrl'];
      } else {
        hostUrl = "//m.517la.com"
      }

      // location.href=hostUrl+"/car/#/index?ticket="+localStorage.getItem("VUE_FLIGHT_AUTH")+"&skinkey="
    },
    dealDay(dateStr,time) {
      if(!dateStr || !time){
        return [];
      }

        let year = +time.slice(0,4);
        let month = dateStr.split("月")[0];
        let date = dateStr.split("月")[1].split("日")[0];
        return [year, +month, +date];
    },
    changeMethodSingle() {
      this.voyagetype1 = true;
      this.voyagetype2 = false;
      this.voyagetype = 1;
      this.$store.commit("ChangeReturnDay", {
        showReturnDay: "",
        returnDay: "",
        showReturnWeek: ""
      });
    },
    changeMethodReturn() {
      if (!this.hideReturnFirst && this.showReturn) {
        var _that = this;
        this.voyagetype2 = true;
        this.voyagetype1 = false;
        this.voyagetype = 2;
        var weekCh = [ "日", "一", "二", "三", "四", "五", "六"];
         var returnDay = {
          returnDay: moment(_that.$store.state.common.fromDay.fromDay.replace(/\-/g, "/")).add("days", 1).format("YYYY-MM-DD HH:mm:ss"),
          showReturnDay: moment(_that.$store.state.common.fromDay.fromDay.replace(/\-/g, "/")).add("days", 1).format("MM月DD日"),
        }
        returnDay.showReturnWeek = "周" + weekCh[new Date(returnDay.returnDay.replace(/\-/g, "/")).getDay()];
        _that.$store.commit("ChangeReturnDay", returnDay);
      }
    },
    jumpOrder() {
      // this.$router.push({
      //   path: "/orderList?ticket=" + localStorage.getItem("VUE_FLIGHT_AUTH")
      // });
    },
    jumpService() {
      var self = this;
      if (self.storeData && self.storeData.serviceCenterUrl) {
        // location.href = self.storeData.serviceCenterUrl;
      } else {
        axios.get("/getServiceUrl").then(function(response) {
          self.$store.commit("storeData.serviceCenterUrl", response);
          // location.href = response;
        });
      }
    },
    historyConfirm(his) {
      this.$store.commit("ChangeCity", his);
      this.fromCity = this.storeData.city.fromCity;
      this.toCity = this.storeData.city.toCity;
      // localStorage.setItem("fromCityAir", JSON.stringify(this.fromCity));
      // localStorage.setItem("toCityAir", JSON.stringify(this.toCity));
    },
    clearCityHistory() {
      localStorage.removeItem("historyRecordsAir");
      this.$store.commit("ChangeHistoryRecords", []);
    },
    changeStyleDiv() {
      var itemCity = $.extend(true, {}, this.fromCity);
      this.fromCity = $.extend(true, {}, this.toCity);
      this.toCity = itemCity;
      var orgCity = {
        fromCity: this.fromCity,
        toCity: this.toCity
      };
      this.$store.commit("ChangeCity", orgCity);
      // localStorage.setItem("fromCityAir", JSON.stringify(this.fromCity));
      // localStorage.setItem("toCityAir", JSON.stringify(this.toCity));
    },
    searchFlight() {
      var flightParam = {};
      if (this.voyagetype === 1) {
        flightParam = {
          DstCity: this.storeData.city.toCity.a,
          DstCityName: this.storeData.city.toCity.b,
          TravelType: this.storeData.tripType,
          DepDate: this.storeData.fromDay.fromDay,
          OrgCity: this.storeData.city.fromCity.a,
          OrgCityName: this.storeData.city.fromCity.b,
          VoyageType: this.voyagetype,
          VoyageInfoList: [
            {
              ArrCity: this.storeData.city.toCity.a,
              DepCity: this.storeData.city.fromCity.a,
              DepDate: this.storeData.fromDay.fromDay,
              SegmentIndex: 1
            }
          ],
          QueryProductType: 0
        };
        this.$store.commit("ChangeReturnDay", {
          showReturnDay: "",
          returnDay: "",
          showReturnWeek: ""
        });
      } else if (this.voyagetype === 2) {
        flightParam = {
          DstCity: this.storeData.city.toCity.a,
          DstCityName: this.storeData.city.toCity.b,
          TravelType: this.storeData.tripType,
          DepDate: this.storeData.fromDay.fromDay,
          OrgCity: this.storeData.city.fromCity.a,
          OrgCityName: this.storeData.city.fromCity.b,
          VoyageType: this.voyagetype,
          QueryProductType: 0,
          VoyageInfoList: [
            {
              ArrCity: this.storeData.city.toCity.a,
              DepCity: this.storeData.city.fromCity.a,
              DepDate: this.storeData.fromDay.fromDay,
              SegmentIndex: 1
            },
            {
              ArrCity: this.storeData.city.fromCity.a,
              DepCity: this.storeData.city.toCity.a,
              DepDate: this.storeData.returnDay.returnDay,
              SegmentIndex: 2
            }
          ],
        };
        if (
          moment(this.storeData.fromDay.fromDay).isAfter(
            this.storeData.returnDay.returnDay
          )
        ) {
          layer.open({
            content: "出发时间应在到达时间之前",
            skin: "msg",
            time: 2
          });
          return false;
        }
      }
      if (flightParam.DstCity === flightParam.OrgCity) {
        layer.open({
          content: "出发城市与到达城市不能相同",
          skin: "msg",
          time: 2
        });
        return false;
      }
      //城市存入缓存
      var historyCity = [];
      // if (
      //   localStorage.getItem("historyRecordsAir") &&
      //   JSON.parse(localStorage.getItem("historyRecordsAir")).length > 0
      // ) {
      //   historyCity = JSON.parse(localStorage.getItem("historyRecordsAir"));
      //   //判断是否已存在，如果存在，提前
      //   var itemCityArr = [];
      //   for (var i = 0; i < historyCity.length; i++) {
      //     if (
      //       historyCity[i].fromCity.b !== this.storeData.city.fromCity.b ||
      //       historyCity[i].toCity.b !== this.storeData.city.toCity.b
      //     ) {
      //       itemCityArr.push(historyCity[i]);
      //     }
      //   }
      //   itemCityArr.push({
      //     fromCity: this.storeData.city.fromCity,
      //     toCity: this.storeData.city.toCity
      //   });
      //   historyCity = itemCityArr;
      //   historyCity.reverse();
      //   if (historyCity.length > 10) {
      //     historyCity.splice(10);
      //   }
      // } else {
      //   historyCity.push({
      //     fromCity: this.storeData.city.fromCity,
      //     toCity: this.storeData.city.toCity
      //   });
      // }
      if (this.$store.state.common.tripType === "1") {
        this.$store.commit("ChangeShowToApply", 0);
      }
      // localStorage.setItem("historyRecordsAir", JSON.stringify(historyCity));
      this.$store.commit("ChangeFlightParam", flightParam);

      this.$router.push({
        name: "flight"
      });
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.name == null) {
        vm.$store.commit("ChangeRef", document.referrer);
      }
      next();
    });
  },
  mounted() {
    // 返回首页时需要判断是否初始化往返的展示
    if (
      this.$store.state.common.returnDay.returnDay ||
      (this.$store.state.common.flightParam &&
        this.$store.state.common.flightParam.VoyageInfoList &&
        this.$store.state.common.flightParam.VoyageInfoList.length > 1)
    ) {
      this.showReturn = true;
      this.voyagetype2 = true;
      this.voyagetype1 = false;
      this.voyagetype = 2;
    }
    if (this.$store.state.common.tripType === "1") {
      this.voyagetype1 = true;
      this.voyagetype2 = false;
      this.voyagetype = 1;
      this.showReturn = false;
    }
    // localStorage.setItem(
    //   "thirdApplys",
    //   this.$utils.getUrlKey("thirdApplyId")
    //     ? this.$utils.getUrlKey("thirdApplyId")
    //     : ""
    // );
    if (
      this.$utils.getUrlKey("code") === "zjj" ||
      (this.$store && this.$store.state.common.entDiyConfigCode === "zjj")
    ) {
      this.isShowHead = false;
      this.$store.commit("ChangeNeedIndexHead", false);
      // $(".main").css("padding-top", 0);
    }
    if (this.$store) {
      this.$store.commit(
        "ChangeEntDiyConfigCode",
        this.$utils.getUrlKey("code")
      );
    }
    //0因公，1因私，2都要
    if (
      this.$utils.getUrlKey("tripType") === "0" ||
      (this.$store && this.$store.state.common.entDiyConfigTrip === "0")
    ) {
      this.tripTypeSel = "0";
      this.$store.commit("ChangeTripType", "0");
    } else if (
      this.$utils.getUrlKey("tripType") === "1" ||
      (this.$store && this.$store.state.common.entDiyConfigTrip === "0")
    ) {
      this.tripTypeSel = "1";
      this.$store.commit("ChangeTripType", "1");
    } else {
      this.tripTypeSel = "2";
      if (this.$store.state.common.tripType != "1") {
        this.$store.commit("ChangeTripType", "0");
      }
      this.isShowHead = true;
      this.$store.commit("ChangeNeedIndexHead", true);
      // $(".main").css("padding-top", "50px");
    }
    if (this.$store) {
      this.$store.commit(
        "ChangeEntDiyConfigTrip",
        this.$utils.getUrlKey("tripType")
          ? this.$utils.getUrlKey("tripType")
          : "2"
      );
    }

    // this.$store.commit(
    //   "ChangeThirdApplys",
    //   localStorage.getItem("thirdApplys")
    // );
    this.$store.commit("ChangeThirdApplysInfo", {});
    // if (
    //   localStorage.getItem("historyRecordsAir") &&
    //   JSON.parse(localStorage.getItem("historyRecordsAir")).length > 0
    // ) {
    //   this.$store.commit(
    //     "ChangeHistoryRecords",
    //     JSON.parse(localStorage.getItem("historyRecordsAir"))
    //   );
    // } else {
    //   this.$store.commit("ChangeHistoryRecords", []);
    // }
    // this.$busUtils.getUserInfo(this.$store);

    var _that = this;
    this.city = this.$store.state.common.city;
    this.tmcInfo = this.$store.state.common.tmcFooter;
    //默认城市或者历史
    console.log(111);
    this.fromCity = {
      a: "PEK",
      b: "北京"
    };
    this.toCity = {
      a: "SHA",
      b: "上海"
    };
    this.cityName="北京";
    console.log(this.fromCity);
    var orgCity = {
      fromCity: this.fromCity,
      toCity: this.toCity
    };
    this.$store.commit("ChangeCity", orgCity);
    var localTime = "";
    try {
      // if (window.localStorage) {
      //   var localFromCity = localStorage.getItem("fromCityAir"),
      //     localToCity = localStorage.getItem("toCityAir");
      //   if (localFromCity) {
      //     this.fromCity = JSON.parse(localFromCity);
      //     var cityFromItem = {
      //       fromCity: this.fromCity
      //     };
      //     this.$store.commit("ChangeCity", cityFromItem);
      //   }
      //   if (localToCity) {
      //     this.toCity = JSON.parse(localToCity);
      //     var cityToItem = {
      //       toCity: this.toCity
      //     };
      //     this.$store.commit("ChangeCity", cityToItem);
      //   }
      // }
    } catch (e) {}
    if (
      !_that.$store.state.common.fromDay.fromDay ||
      (_that.$store.state.common.fromDay.fromDay &&
        moment().diff(
          moment(_that.$store.state.common.fromDay.fromDay),
          "days"
        ) > 0)
    ) {
      var weekCh = ["一", "二", "三", "四", "五", "六", "日"];
      var showWeek =
        "周" +
        weekCh[
          moment()
            .add("days", 2)
            .format("E") - 1
        ];
      var showReturnWeek =
        "周" +
        weekCh[
          moment()
            .add("days", 3)
            .format("E") - 1
        ];
      var initFromDay = {
        showFromDay: moment()
          .add("days", 2)
          .format("MM月DD日"),
        fromDay: moment()
          .add("days", 2)
          .format("YYYY-MM-DD HH:mm:ss"),
        showWeek: showWeek
      };
      var initReturnDay = {
        showReturnDay: moment()
          .add("days", 3)
          .format("MM月DD日"),
        returnDay: moment()
          .add("days", 3)
          .format("YYYY-MM-DD HH:mm:ss"),
        showReturnWeek: showReturnWeek
      };
      this.$store.commit("ChangeFromDay", initFromDay);
      this.$store.commit("ChangeReturnDay", {
        showReturnDay: "",
        returnDay: "",
        showReturnWeek: ""
      });
      // this.$store.commit("ChangeReturnDay", initReturnDay);
    }
    // $(".fromcitySelectBtn")
    //   .off("click")
    //   .on("click", function() {
    //     _that.$router.push({
    //       name: "city",
    //       params: {
    //         name: "fromCityAir",
    //         mul: "inner"
    //       }
    //     });
    //   });
    // $(".tocitySelectBtn")
    //   .off("click")
    //   .on("click", function() {
    //     _that.$router.push({
    //       name: "city",
    //       params: {
    //         name: "toCityAir",
    //         mul: "inner"
    //       }
    //     });
    //   });
      const dealI18n = function () {
        var i18nConfig = _that.$store.state.common.i18n;
        if (i18nConfig["Air_TopImg"]) {
          _that.ad = i18nConfig["Air_TopImg"];
        }
        _that.$store.commit("ChangeI18n", i18nConfig);
      
        if (i18nConfig.ShowReturnType) {
          let tmcArr = i18nConfig.ShowReturnType.split("|");
          // _that.$busUtils.getUserInfo(_that.$store, function(userInfo) {
          //   try {
          //     $.each(tmcArr, function(index, tmcInfo) {
          //       let tmcInfoArr = tmcInfo.split("^");
          //       if (
          //         tmcInfoArr[0].indexOf(
          //           userInfo.entAndTmcShortInfoList[0].tMCNumber
          //         ) > -1
          //       ) {
          //         if (tmcInfoArr.length === 1) {
          //           _that.hideReturnFirst = true;
          //           return true;
          //         } else {
          //           let companyInfo = tmcInfoArr[1].split("+");
          //           let hideType = _.filter(companyInfo, function(item) {
          //             return (
          //               item ===
          //               userInfo.entAndTmcShortInfoList[0].enterpriseNum
          //             );
          //           });
          //           if (hideType.length > 0) {
          //             _that.hideReturnFirst = true;
          //             return false;
          //           } else {
          //             _that.hideReturnFirst = false;
          //           }
          //         }
          //       } else {
          //         _that.hideReturnFirst = false;
          //       }
          //     });
          //   } catch (ex) {
          //     _that.hideReturnFirst = false;
          //   }
          // });
        }
      }
      let getI18nNum = 0;
      // const getI18n = function () {
      //   _that.$busUtils.getI18n(_that.$store, function() {
      //     if (
      //       !$.isEmptyObject(_that.$store.state.common.i18n) &&
      //       (_config_unisys_air || getI18nNum > 3)
      //     ) {
      //       dealI18n();
      //     } else if (getI18nNum < 3){
      //       getI18nNum ++;
      //       setTimeout(getI18n, 100);
      //     }
      //   });
      // }
      // getI18n();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.main {
  background-color: #fff;
  margin-top: 0;
}
.search-info {
  padding: 0 20px;
  /* line-height: 25px; */
}

.search-info label,
.search-info div {
  /* line-height: 30px; */
  color: #949494;
  display: inline-block;
}
.search-info .caption {
  display: block;
}
.search-info input.citySel {
  padding-left: 0;
  white-space: nowrap;
  display: block;
  width: 100%;
  /* height: 30px; */
  color: black;
  font-weight: bold;
}
.search-info input.citySel:disabled,
input.fromDay:disabled {
  color: black;
  -webkit-text-fill-color: black;
  -webkit-opacity: 1;
  opacity: 1;
}
.search-info input {
  width: 100px;
  font-size: 16px;
  /* line-height: 30px; */
  vertical-align: middle;
  padding: 0px;
}
.changeStyleDiv {
  width: 20%;
  /* height: 100%; */
  position: relative;
}
.search-info .change-city {
  background-color: #fff;
  width: 50px;
  /* height: 50px; */
  margin: 0 auto;
  top: 4px;
  left: 50%;
  margin-left: -24px;
}
.search-info .change-city {
  background-size: 700px;
}
.search-info span {
  font-size: 22px;
  color: #000;
  /* line-height: 35px; */
  padding-left: 8px;
  /* height: 30px; */
}
.search-info span.week {
  font-size: 12px;
  vertical-align: sub;
  display: inline-block;
  margin-left: -10px;
  color: rgb(148, 148, 148);
}
.searchAir {
  margin: 20px 20px;
}
.searchBtn {
  // height: 44px;
}
#recent {
  white-space: nowrap;
  overflow: scroll;
  /* height: 40px; */
  text-overflow: inherit;
  margin: 0 20px;
  width: 89%;
  overflow: auto;
}
#recent span {
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;
  color: #999;
}
#recent span:hover {
  color: gray;
}
.quickService {
  border: 1px solid #ccc;
  margin: 20px 20px;
  text-align: center;
  /* height: 40px; */
  border-radius: 7px;
}
.quickCont {
  display: inline-block;
  width: 49%;
  /* line-height: 20px; */
  border-right: 1px solid #ccc;
  /* height: 20px; */
  margin-top: 10px;
}
.orderIcon,
.serviceIcon {
  position: relative;
}
.orderIcon:before {
  content: "";
  width: 20px;
  /* height: 21px; */
  position: absolute;
  // background-image: url(imgFileUrl("h5-air/img/orderIcon.png"));
  left: -22px;
  background-size: 20px;
  top: 0px;
}
.serviceIcon:before {
  content: "";
  width: 20px;
  /* height: 21px; */
  position: absolute;
  // background-image: url(imgFileUrl("h5-air/img/serviceIcon.png"));
  left: -22px;
  background-size: 20px;
  top: 0px;
}
.quickCont:last-child {
  border-right: none;
}

/* 新风格复写样式 */
.main {
  padding-top: 0 !important;
  background-color: #eee;
}
.tripWrapper {
  position: relative;
  overflow: hidden;
  margin: -60px 4% 0 4%;
  padding-bottom: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 5px #ddd;
  height: 39%;
}
.tripWrapper .routeType {
  /* width: 100%; */
  margin: 0 20px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.tripWrapper .colum-2 {
  background-color: #fff;
}
.tripWrapper .pointer {
  position: relative;
  display: inline-block;
  background-color: #fff;
  color: #888;
  font-size: 15px;
  font-weight: 400;
  border: 0 !important;
}
.tripWrapper .activeText {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30px;
  height: 3px;
  background-color: #26a2ff;
  border-radius: 6px;
  overflow: hidden;
}
.tripWrapper .changeStyle {
  font-size: 40px;
  position: absolute;
  line-height: 50px;
  color: #199dee;
}
.citySel {
  height: 60px !important;
  /* height: 0.83rem !important; */
  font-size: 20px !important;
}
.h60 {
  /* height: 60px; */
  height: 42px;
}
.fromDay {
  font-size: 17px !important;
  letter-spacing: 1px;
  text-align: left
}
#recent span {
  display: inline-block;
  background-color: #eee;
  padding: 2px 10px;
  border-radius: 12px;
}
#recent span.cleanHis {
  display: inline-block;
  background-color: #eee;
  padding: 1px 4px;
  border-radius: 10px;
}
.quickService {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  background-color: #fff;
  border: none;
}
.header-menu.routeType .active {
  color: #333;
}
.default-row,
.row {
  /* border-bottom: 1px solid #eee; */
}
#selectDate,
#selectReturnDate {
  /* line-height: 60px; */
  line-height: 42px;
}

.imgWrapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  /* padding-bottom: 62.5%; */
  height: 35%;
}
.betweenDay {
  width: 49px;
  text-align: center;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  /* height: 0.27rem; */
  line-height: 20px;
  color: #999;
  font-size: 12px;
}
.btn-area {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  background-color: #fff;
  line-height: 40px;
  color: #999;
}
.btn-area .singleBtn+.singleBtn {
  border-left: solid 1px #ebebeb;
}
.btn-area div {
  /* width: 49%; */
  flex: 1 0 100px;
  text-align: center;
  display: inline-block;
}
.btn-area img {
    margin-right: 5px
}
/* .btn-area .myStand,
.btn-area .airportTransport {
  border-right: solid 1px #ebebeb;
} */
.icon-jiesongji {
  color: #119dee;
}
.icon-chaxunshouyewodedingdan {
  color: #119dee;
}
.icon-chaxunshouyewodechabiao {
  /* color: #6ccd61; */
  color: #119dee;
}
.icon-yuandianzhong {
  color: #119dee;
}
    .fade-enter-active{
      transition: all 1.5s;
      transition-delay: 2s;
    }

    .fade-leave-active{
      transition: all 2.5s;
    }

    .fade-enter, .fade-leave-active{
        opacity: 0;
    }


</style>
