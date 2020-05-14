import http from "uview-ui/libs/request";

const restfulUrl = "http://restful.517la.com/";
const gatewayUrl = "https://jpgatewayzs.517la.com/h5/";
const restfulHeader = {
  auth:
    "CA4B3DA5935D7031CE0D5A35B92EE9B361A47CAEDB226F964AE6473A5C56177DF887E72A6240D52D5ACB5A12B387FF0569BFF3075AAEDC82AF66759EBDDF1158",
};
const gatewayHeader = {
  la517_authSign:
    "CA4B3DA5935D7031CE0D5A35B92EE9B361A47CAEDB226F964AE6473A5C56177DF887E72A6240D52D5ACB5A12B387FF0569BFF3075AAEDC82AF66759EBDDF1158",
};

export const getUserInfo = (params) =>
  http.get(restfulUrl + "getUserInfo", {}, restfulHeader).then(res=>{
	  console.log("getUserInfo Success");
  });

export const queryFlight = (params) =>
  http.post(
    gatewayUrl +
      "CLAirTicketProductQueryService/jppubapi/flightQuery/queryFlight",
    {
      clientType: 3,
      data: {
        queryType: 0,
        travelType: "0",
        voyageType: 1,
        voyageInfoList: [
          {
            arrCity: "SHA",
            depCity: "PEK",
            depDate: "2020-05-09 11:09:40",
            segmentIndex: 1,
          },
        ],
      },
    },
    gatewayHeader
  ).then(res=>{
	console.log("queryFlight Success");
});;
