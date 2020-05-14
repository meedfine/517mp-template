export default {
    getUrlKey: function(name) {
        // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    changeWeek: function(num, type) {
        var wek = ["天", "一", "二", "三", "四", "五", "六"];
        return type ? type : "星期" + wek[num];
    },
    // 单点网站跳转过来带的url参数存sessionStorage
    storeUrlQueryString: function() {
        // let queryStringArr = [],
        //     index = 0,
        //     queryStringObj = {};
        // index = href.lastIndexOf('?');
        // href = href.slice(index + 1);
        // queryStringArr = href.split('&');
        // queryStringArr.forEach(item => {
        //     let idx = item.indexOf('='),
        //         queryKey = item.slice(0, idx),
        //         queryValue = item.slice(idx + 1);
        //     queryStringObj[queryKey] = encodeURIComponent(queryValue);
        // });
        // window.sessionStorage.setItem('urlParams', JSON.stringify(queryStringObj));
    }
}