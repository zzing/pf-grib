// 성공 코드
var SUCCESS_CODE = "200000200";

//--------------------------------------------------------------------------------------------
//함수명 : ajax 통신
//1. 전체 설명
//	1) 서버와 통신 
//2. 파라미터
//@param formName 페이지의 form명, requestUrl 요청할 URL, type 구분자 
//@return 
//3. 사용법
//	1) fn_ajax_call("#test1", "./insertdate.html", "insert")
//	2) ajax 쓸경우 페이지에 fn_ajax_callBack 함수를 명시해야된다.
//--------------------------------------------------------------------------------------------
function gfn_ajax_call_data(data, requestUrl, type){
	$.ajax({
		cache: false,
		type: 'POST',
		timeout : 60000,
		url:  requestUrl,
		data: data,
		dataType:'JSON',
		success: function(data){
			gfn_ajax_callBack(data, type);	
		}, 
		error:gfn_ajaxException
	});
}

function gfn_ajax_call(formName, requestUrl, type){
	$.ajax({
		cache: false,
		type: 'POST',
		timeout : 60000,
		url:  requestUrl,
		data: $(formName).serialize(),
		dataType:'JSON',
		success: function(data){
			gfn_ajax_callBack(data, type);	
		}, 
		error:gfn_ajaxException
	});
}

function gfn_ajax_call_data_two(requestType, data, requestUrl, type){
	$.ajax({
		cache: false,
		type: requestType,
		timeout : 60000,
		url:  requestUrl,
		data: data,
		dataType:'JSON',
		success: function(data){
			gfn_ajax_callBack(data, type);	
		}, 
		error:gfn_ajaxException
	});
}

//--------------------------------------------------------------------------------------------
//함수명 : ajax 통신 에러 
//1. 전체 설명
//	1) 서버와 통신 에러
//--------------------------------------------------------------------------------------------
function gfn_ajaxException(){
	alert("서버와의 통신이 원할하지 않습니다.");
}


var getService = function(svcurl, svctype, requestdata, callback){
	$.ajax({
		url : svcurl,
		type : svctype,
		timeout : 60000,
		data : requestdata,
		dataType:'JSON',
		beforeSend : function(request, settings) {
		},
		success : function(data, textStatus, request) {
			if (data.resultCode == SUCCESS_CODE) {
				callback(true, data); // 성공
			} else {
				callback(false, data); // 서비스 오류
			}
		},
		error : function(request, textStatus, errorThrown) {
			var data = {
				"code" : request.status,
				"message" : "통신오류",
				"detailMessage" : request.statusText
			};
			callback(false, data); // 통신 오류
		}
	});
};