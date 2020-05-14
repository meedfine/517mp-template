import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		common: {
			tripType: "1",
			i18n: {},
			tripType: "0", //0：因公
			fromDay: {
			  showFromDay: "",
			  fromDay: "",
			  showWeek: ""
			},
			returnDay: {
			  showReturnDay: "",
			  returnDay: "",
			  showReturnWeek: ""
			},
			city: { loc: "" },
			tmcFooter: {
			  tmcName: "",
			  skillPhone: "",
			  clPhone: "",
			  imgUrl: ""
			},
			goMinMoney: "0",
			relaOrderId: "",
			thirdApplys: "",
			thirdApplysInfo: {},
			flightParam: {},
			selFlightInfo: {},
			selReturnFlightInfo: {},
			flightList: [],
			flightReturnList: [],
			cabinList: {},
			flightListCreateTime: null,
			cabinListCreateTime: null,
			selCabin: {},
			selReturnCabin: {},
			selInsurance: [],
			standOverDetail: {},
			overDetailList: {},
			overDetailObj: {},
			standerParam: {}, //
			pasList: [],
			returnPasList: [],
			orderPasList: [], //经过逻辑后的出行人
			linkList: [],
			selPass: {},
			createOrderRes: {},
			pnrInfo: {},
			pnrInfoCreateTime: null,
			hasApply: false,
			staffApplys: [],
			myHistory: {},
			orderHistory: 0,
			orderFilterType: 1,
			oldOrderInfo: {},
			ticketCRStatus:"",
			refundReasonInfo: {},
			refundApplyInfo: {},
			changeReasonInfo: {},
			changeApplyInfo: {},
			canCRFlightInfo:[],
			outTicketArr:[],
			changeSelFlightInfo: {},
			changeFlightList: [],
			changeFlightReturnList: [],
			changeFlightCreateTime: null,
			flightHistoryLength: -1,
			searchHistoryLength: -1,
			orderListHistoryLength: -1,
			showToApply: 0,
			approvalConfig: null,
			isForward: false,
			ref: "",
			isJumpThirdOrderList: true,
			systemParam: [],
			systemParamObj: {},
			isSortDept: false,
			historyRecords: [],
			orderCost: {},
			loginUserInfo: {},
			needIndexHead: true,
			serviceCenterUrl: "",
			orgConfig: {},
			choseDisAdd: {},
			choseDisAddList: [],
			choseDistrbutionList: [],
			orderDisAdd: {},
			editDisAddItem: {},
			autoParam: {},
			notTicketCostWork: false,
			ticketCostWorkEnt: {},
			entDiyConfigCode: "",
			entDiyConfigTrip: "",
			needDisAdd: true,
			travelScene: "1",
			showServiceFee: undefined,
			serviceFee: 0,
			chargeType: 1,
			serviceFeeRt: 0,
			chargeTypeRt: 1,
			applyBeforePay: 0, // 支付前申请 true为允许
			isAutoApply: 0, // 支付前申请 true为自动申请,
			judgeStandardRes: {},
			switchMailAir: false, //机场自取和邮寄配送开关
			bindChangeAdressInfo: {},
			totalPrice: 0,
			innerAppid: "",
			innerOpenid: "",
			goAirrule: {}, //去程客规
			backAirrule: {}, //回程客规
			innerUseThirdApply: "", //是否需要加载跳转本地化企业自己的申请单
			isHideCertFlag: false,   // 是否脱敏 创单保存 支付页面取用
			orderinfobo: {},
			orderinfoboRt: {},
			isBookingHighCabin: false,
			costCenterList: [],
			costList: [],
			isShowNew: false,
		},
		testData: "1111111",
		hasLogin: false,
		loginProvider: "",
		openid: null,
		testvuex:false,
        colorIndex: 0,
        colorList: ['#FF0000','#00FF00','#0000FF']
	},
	mutations: {
		changeTestData(state,value){
			state.testData = value;
		},
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state){
			state.testvuex = true
		},
		setTestFalse(state){
			state.testvuex = false
		},
        setColorIndex(state,index){
            state.colorIndex = index
		},
		ChangeUpdateProp(state, obj) {
			// state = $.extend(true, state, obj);
		  },
		  //网站配置文件
		  ChangeI18n(state, i18n) {
			state.i18n = i18n;
		  },
		  //因公因私
		  ChangeTripType(state, tripType) {
			state.tripType = tripType;
		  },
		  //出发日期
		  ChangeFromDay(state, fromDay) {
			state.fromDay = fromDay;
		  },
		  //返回日期
		  ChangeReturnDay(state, returnDay) {
			state.returnDay = returnDay;
		  },
		  ChangeEntDiyConfigTrip(state, entDiyConfigTrip) {
			state.entDiyConfigTrip = entDiyConfigTrip;
		  },
		  ChangeEntDiyConfigCode(state, entDiyConfigCode) {
			state.entDiyConfigCode = entDiyConfigCode;
		  },
		  ChangeChoseDisAdd(state, choseDisAdd) {
			state.choseDisAdd = choseDisAdd;
		  },
		  ChangeNeedDisAdd(state, needDisAdd) {
			state.needDisAdd = needDisAdd;
		  },
		  ChangeOrderDisAdd(state, orderDisAdd) {
			state.orderDisAdd = orderDisAdd;
		  },
		  ChangeTicketCostWorkEnt(state, ticketCostWorkEnt) {
			state.ticketCostWorkEnt = ticketCostWorkEnt;
		  },
		  ChangeChoseDisAddList(state, choseDisAddList) {
			state.choseDisAddList = choseDisAddList;
		  },
		  ChangeChoseDistrbutionList(state, choseDistrbutionList) {
			state.choseDistrbutionList = choseDistrbutionList;
		  },
		
		  ChangeEditDisAddItem(state, editDisAddItem) {
			state.editDisAddItem = editDisAddItem;
		  },
		  ChangeOrderCost(state, orderCost) {
			state.orderCost = orderCost;
		  },
		  ChangeHistoryRecords(state, historyRecords) {
			state.historyRecords = historyRecords;
		  },
		  ChangeLoginUserInfo(state, loginUserInfo) {
			state.loginUserInfo = loginUserInfo;
		  },
		
		  ChangeOverDetailList(state, overDetailList) {
			state.overDetailList = overDetailList;
		  },
		
		  ChangeOverDetailObj(state, overDetailObj) {
			state.overDetailObj = overDetailObj;
		  },
		
		  //城市
		  ChangeCity(state, city) {
			// state.city = $.extend(true, state.city, city);
		  },
		  ChangeSystemParam(state, systemParam) {
			state.systemParam = systemParam;
		  },
		  ChangeSystemParamObj(state, systemParamObj) {
			state.systemParamObj = systemParamObj;
		  },
		  ChangeIsSortDept(state, isSortDept) {
			state.isSortDept = isSortDept;
		  },
		  //Tmc信息
		  ChangeTmcFooter(state, tmcFooter) {
			state.tmcFooter = tmcFooter;
		  },
		  ChangeThirdApplys(state, thirdApplys) {
			state.thirdApplys = thirdApplys;
		  },
		  ChangeAutoParam(state, autoParam) {
			state.autoParam = autoParam;
		  },
		  ChangeThirdApplysInfo(state, thirdApplysInfo) {
			state.thirdApplysInfo = thirdApplysInfo;
		  },
		  ChangeFlightParam(state, flightParam) {
			state.flightParam = flightParam;
		  },
		  ChangeSelFlightInfo(state, selFlightInfo) {
			state.selFlightInfo = selFlightInfo;
		  },
		  ChangeSelReturnFlightInfo(state, selReturnFlightInfo) {
			state.selReturnFlightInfo = selReturnFlightInfo;
		  },
		  ChangeFlightList(state, flightList) {
			state.flightList = flightList;
		  },
		  ChangeFlightReturnList(state, flightList) {
			state.flightReturnList = flightList;
		  },
		  ChangeCabinList(state, cabinList) {
			state.cabinList = cabinList;
		  },
		  ChangeSelReturnCabin(state, selReturnCabin) {
			state.selReturnCabin = selReturnCabin;
		  },
		  ChangeCabinListCreateTime(state, cabinListCreateTime) {
			state.cabinListCreateTime = cabinListCreateTime;
		  },
		  ChangeFlightListCreateTime(state, flightListCreateTime) {
			state.flightListCreateTime = flightListCreateTime;
		  },
		  ChangeFlightHistoryLength(state, flightHistoryLength) {
			state.flightHistoryLength = flightHistoryLength;
		  },
		  ChangeSearchHistoryLength(state, searchHistoryLength) {
			state.searchHistoryLength = searchHistoryLength;
		  },
		  ChangeOrderListHistoryLength(state, orderListHistoryLength) {
			state.orderListHistoryLength = orderListHistoryLength;
		  },
		  ChangeSelCabin(state, selCabin) {
			state.selCabin = selCabin;
		  },
		  ChangeStanderParam(state, standerParam) {
			state.standerParam = standerParam;
		  },
		  ChangeCreateOrderRes(state, createOrderRes) {
			state.createOrderRes = createOrderRes;
		  },
		  ChangePasList(state, pasList) {
			state.pasList = pasList;
		  },
		  ChangeReturnPasList(state, returnPasList) {
			state.returnPasList = returnPasList;
		  },
		  ChangeOrderPasList(state, orderPasList) {
			state.orderPasList = orderPasList;
		  },
		  ChangeLinkList(state, linkList) {
			state.linkList = linkList;
		  },
		  ChangeStaffApplys(state, staffApplys) {
			state.staffApplys = staffApplys;
		  },
		  ChangeSelPass(state, selPass) {
			state.selPass = selPass;
		  },
		  ChangeSelInsurance(state, selInsurance) {
			state.selInsurance = selInsurance;
		  },
		  ChangeStandOverDetail(state, standOverDetail) {
			state.standOverDetail = standOverDetail;
		  },
		  ChangeOrderHistory(state, orderHistory) {
			state.orderHistory = orderHistory;
		  },
		  ChangeRelaOrderId(state, relaOrderId) {
			state.relaOrderId = relaOrderId;
		  },
		  ChangePnrInfo(state, pnrInfo) {
			state.pnrInfo = pnrInfo;
		  },
		  ChangePnrInfoCreateTime(state, pnrInfoCreateTime) {
			state.pnrInfoCreateTime = pnrInfoCreateTime;
		  },
		  ChangeHasApply(state, hasApply) {
			state.hasApply = hasApply;
		  },
		  ChangeMyHistory(state, myHistory) {
			// state.myHistory = $.extend({}, state.myHistory, myHistory);
		  },
		  ChangeIsForward(state, isForward) {
			state.isForward = isForward;
		  },
		  ChangeOrgConfig(state, orgConfig) {
			state.orgConfig = orgConfig;
		  },
		  ChangeNeedIndexHead(state, needIndexHead) {
			state.needIndexHead = needIndexHead;
		  },
		  ChangeServiceCenterUrl(state, serviceCenterUrl) {
			state.serviceCenterUrl = serviceCenterUrl;
		  },
		  ChangeGoMinMoney(state, goMinMoney) {
			state.goMinMoney = goMinMoney;
		  },
		
		  ["InitFlush"](state, { stateLG }) {
			// state = $.extend(true, state, stateLG.common);
		  },
		  ChangeTicketCRStatus(state, ticketCRStatus) {
			state.ticketCRStatus = ticketCRStatus;
		  },
		  //已创单的订单信息
		  ChangeOldOrderInfo(state, oldOrderInfo) {
			state.oldOrderInfo = oldOrderInfo;
		  },
		  ChangeChangeReasonInfo(state, changeReasonInfo) {
			state.changeReasonInfo = changeReasonInfo;
		  },
		  ChangeRefundReasonInfo(state, refundReasonInfo) {
			state.refundReasonInfo = refundReasonInfo;
		  },
		  ChangeRefundApplyInfo(state, refundApplyInfo) {
			state.refundApplyInfo = refundApplyInfo;
		  },
		  ChangeChangeApplyInfo(state, changeApplyInfo) {
			state.changeApplyInfo = changeApplyInfo;
		  },
		  ChangeChangeFlightParam(state, changeFlightParam) {
			state.changeFlightParam = changeFlightParam;
		  },
		  ChangeChangeVoyageInfo(state, voyageInfo) {
			state.changeApplyInfo.voyageInfo = voyageInfo;
		  },
		  ChangeChangeFlightCreateTime(state, changeFlightCreateTime) {
			state.changeFlightCreateTime = changeFlightCreateTime;
		  },
		  ChangeChangeFlightList(state, changeFlightList) {
			state.changeFlightList = changeFlightList;
		  },
		  ChangeCanCRFlightInfo(state, canCRFlightInfo) {
			state.canCRFlightInfo = canCRFlightInfo;
		  },
		  ChangeOutTicketArr(state, outTicketArr) {
			state.outTicketArr = outTicketArr;
		  },
		  ChangeChangeSelFlightInfo(state, changeSelFlightInfo) {
			state.changeSelFlightInfo.flightInfo = changeSelFlightInfo.flightInfo;
			state.changeSelFlightInfo.canbinInfo = changeSelFlightInfo.cabinInfo;
		  },
		  ChangeOrderFilterType(state, orderFilterType) {
			state.orderFilterType = orderFilterType;
		  },
		  ChangeShowToApply(state, showToApply) {
			state.showToApply = showToApply;
		  },
		  ChangeApprovalConfig(state, approvalConfig) {
			state.approvalConfig = approvalConfig;
		  },
		  ChangeRef(state, ref) {
			state.ref = ref;
		  },
		  ChangeIsJumpThirdOrderList(state, isJumpThirdOrderList) {
			state.isJumpThirdOrderList = isJumpThirdOrderList;
		  },
		  ChangeTravelScene(state, travelScene) {
			state.travelScene = travelScene;
		  },
		  ChangeShowServiceFee(state, showServiceFee) {
			state.showServiceFee = showServiceFee;
		  },
		  ChangeServiceFee(state, serviceFee) {
			state.serviceFee = serviceFee;
		  },
		  ChangeServiceChargeType(state, chargeType) {
			state.chargeType = chargeType;
		  },
		  ChangeServiceFeeRt(state, serviceFeeRt) {
			state.serviceFeeRt = serviceFeeRt;
		  },
		  ChangeServiceChargeTypeRt(state, chargeType) {
			state.chargeTypeRt = chargeType;
		  },
		  ChangeApplyBeforePay(state, applyBeforePay) {
			state.applyBeforePay = applyBeforePay;
		  },
		  ChangeIsAutoApply(state, isAutoApply) {
			state.isAutoApply = isAutoApply;
		  },
		  ChangeJudgeStandardRes(state, res) {
			state.judgeStandardRes = res;
		  },
		  ChangeSwitchMailAir(state, res) {
			state.switchMailAir = res;
		  },
		  ChangeBindChangeAdressInfo(state, res) {
			state.bindChangeAdressInfo = res;
		  },
		  ChangeTotalPrice(state, totalPrice) {
			state.totalPrice = totalPrice;
		  },
		  ChangeInnerAppid(state, innerAppid) {
			state.innerAppid = innerAppid;
		  },
		  ChangeInnerOpenid(state, innerOpenid) {
			state.innerOpenid = innerOpenid;
		  },
		  ChangeGoAirrule(state, goAirrule){
			state.goAirrule = goAirrule;
		  },
		  ChangeBackAirrule(state, backAirrule){
			state.backAirrule = backAirrule;
		  },
		  ChangeUseThirdApply(state, innerUseThirdApply){
			state.innerUseThirdApply = innerUseThirdApply;
		  },
		  ChangeIsHideCertFlag(state, isHideCertFlag){
			state.isHideCertFlag = isHideCertFlag;
		  },
		  ChangeOrderinfobo(state, orderInfo) {
			state.orderinfobo = orderInfo;
		  },
		  ChangeOrderinfoboRt(state, orderInfoRt) {
			state.orderinfoboRt = orderInfoRt;
		  },
		  ChangeIsBookingHighCabin(state, isBookingHighCabin) {
			state.isBookingHighCabin = isBookingHighCabin;
		  },
		  ChangeCostCenterList(state, costCenterList) {
			state.costCenterList = costCenterList;
		  },
		  ChangeCostList(state, costList) {
			state.costList = costList;
		  },
		  ChangeIsShowNew(state, isShowNew) {
			state.isShowNew = isShowNew
		  }
	},
    getters:{
        currentColor(state){
            return state.colorList[state.colorIndex]
        }
    },
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
