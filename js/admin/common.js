// datepicker fn
$(function(){	
	$(".datepicker").datepicker({
		monthNames: ['1월','2월','3월','4월','5월','6월',
					'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
					'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		selectOtherMonths: true,
		showOtherMonths: true,
		yearSuffix: '.',
		onSelect : function(){			
			// 사용 종료 날짜 선택을 사용시작 날짜 다음으로 선택되게 하는 fn
			//$('.endDate').datepicker();
		  //	$('.endDate').datepicker("option", "minDate", $(".startDate").val());
		}
	});
	// 사용자 예약일 & 사용시작날짜에 default값 = 오늘날짜
	$(".resvDate, .startDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));
	// 사용종료날짜에 default값 = 내일날짜
	$(".endDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date(new Date().getTime() + 60*60*24*1000)));
	
	
	$('.datepicker').on({
		click:function(e){
			var _$target = e.currentTarget;			
			_$currentTarget = _$target;
			var width = $('.dateSelect > label').innerWidth();
			$(".ui-datepicker").css({"width":width,"left":$(_$target).offset().left -4 });

		}
	});
	
	$('.ui-corner-all').on({
		click:function(e){
			var _$target = e.currentTarget;

			var width = $('.dateSelect > label').innerWidth();
			$(".ui-datepicker").css({"width":width,"left":$(_$target).offset().left});
		}
	});
	
});

//popup fn
$(document).ready(function(){
	var popClose = $('.btn_close, .confirm, .dimmed, .pop_cancel, .req_pop_cancel, .findMyId');
	var cancel = $('.send .pop_cancel');
//	var _$currentTarget = null;
	
	$('input, textarea').placeholder();
	
	// 제휴 문의 팝업
	$('.btn_reqcont').on({
		click:function(){
			$('.dimmed').css({"display":"block"});
			$('.proposal').show();
		}
	});
	
	// 팝업 닫기
	popClose.on({
		click:function(e){
			// 타입이 function인지 체크함으로써 해당 이름의 함수가 존재하는지 여부를 알 수 있다. 
			if (typeof fn_resv_sms_layer_close == 'function') { 
				fn_resv_sms_layer_close();
			}
			else{
				$('.dimmed, .pop').hide();
			}
		}
	});
	
	// SMS알림 전송 팝업에서 취소 버튼을 누를시 alert창 출력
//	cancel.on({
//		click:function(){
//			$('.dimmed, .pop').hide();
//			alert("SMS알림 전송이 취소되었습니다. SMS알림은 상세 예약정보에서 다시 전송하실 수 있습니다.");
//		}
//	})
//현재 사용하지 않음
});


// resize fn
$(window).load(function(e){
	$(window).resize(function(){
		// 스크롤바에 따른 footer 최하단으로 이동
		$.fn.hasVerticalScrollBar = function() {
			return this.get(0) ? this.get(0).scrollHeight > $(window).height()  : false;
		}

		if($("body").hasVerticalScrollBar()){ 
		// 스크롤이 있을경우
			$('#footer').css({"position":"relative","float":"left"});
		}else{ 
		// 스크롤이 없을경우
			$('#footer').css({"position":"fixed","bottom":"0"});
		}
		$("#footer").css({"display":"block"});
							
			// 리사이즈시 datepicker 크기 및 위치변경
			if(!$("#ui-datepicker-div").is(":hidden") && $("#ui-datepicker-div").hasClass("ui-datepicker")){				
				var width = $('.dateSelect > label').innerWidth();
				$("#ui-datepicker-div").css({"width":width,"left":$(_$currentTarget).offset().left -4 });
			}
		//console.log("resize= " + $(".toDate").offset().left)
	}).resize();
});


//패스워드 체크
function gfn_pwdCheck(idName) {
	var checkResult = false;
	var pass = $('#' + idName).val();
	if(pass.length < 8) {
		alert("비밀번호는 8자리 이상이어야 합니다.");
		$('#'+idName).focus();
		return false;
	} else if(pass == '') {
		alert("비밀번호를 입력하세요.");
		$('#'+idName).focus();
		return false;
	} else if(!gfn_checkPass(pass)) {
		alert("부적합한 비밀번호 조합입니다.");
		$('#'+idName).focus();
		return false;
	} else if(!gfn_pwdCheck2(pass)) {
		alert("연속된 4자리 문자를 사용할수 없습니다.");
		$('#'+idName).focus();
		return false;
	} else {
		checkResult = true;
	}
	return checkResult;
}

// 비밀번호 조합
function gfn_checkPass(str){
	var reg1 = /['~!@#$%^&*()_+|\\\'\"\/?]/gi;
	var reg2 = /[a-z]/g;    
	var reg3 = /[0-9]/g;

	var bRtn1 = reg1.test(str);
	var bRtn2 = reg2.test(str);
	var bRtn3 = reg3.test(str);
	
	if(bRtn1 && bRtn2 && !bRtn3) {
		return true;
	} else if(!bRtn1 && bRtn2 && bRtn3) {
		return true;
	} else if(bRtn1 && !bRtn2 && bRtn3) {
		return true;
	} else if(bRtn1 && bRtn2 && bRtn3){
		return true;
	}else {
		return false;
	}
}

//연속 문자 체크
function gfn_pwdCheck2(pw){
	var temp ="";
	var temp2 ="";
	for(var i=0; i < pw.length; i++){
		temp = pw.charAt(i);
		if(temp == pw.charAt(i+1) && temp == pw.charAt(i+2) && temp == pw.charAt(i+3)){
			return false;
		}
	}
	
	for(var i=0; i < pw.length; i++){
		if(i>2){
			temp2 = pw.charCodeAt(i);
			//숫자검사
			if(temp2 > 50 && temp2 < 58){
				if(pw.charCodeAt(i-3) == (temp2 -3) && pw.charCodeAt(i-2) == (temp2 -2) && pw.charCodeAt(i-1) == (temp2 -1)){
					return false;
				}
			}
			//알파벳 검사
			else if( (temp2 > 67 && temp2<91) || (temp2 > 99 && temp2 < 123) ){
				if(pw.charCodeAt(i-3) == (temp2 -3) && pw.charCodeAt(i-2) == (temp2 -2) && pw.charCodeAt(i-1) == (temp2 -1)){
					return false;
				}
			}
		}
	}
	return true;
}

//헤더 에서 ajax 호출시 사용한다.
function gfn_ajax_call_data_header(data, requestUrl, type){
	$.ajax({
		cache: false,
		type: 'POST',
		timeout : 10000,
		url:  requestUrl,
		data: data,
		dataType:'JSON',
		success: function(data){
			gfn_ajax_callBack_header(data, type);	
		}, 
		error:gfn_ajaxException
	});
}
//제휴 메일 발송 결과 콜백
function gfn_ajax_callBack_header(data, type) {
	// SUCCESS_CODE는 무조건 200000200. 분기하기 위해. (ajaxUtils.js에서 생성해 둠.)
	//alert('콜백-data.resultCode: '+data.resultCode); 
	if(data.resultCode == SUCCESS_CODE) {
		if(type == "reqProposalMailSend"){//제휴 메일 발송 성공
			alert("제휴 문의 메일이 발송 되었습니다.");

			$("#reqSenderNm").val("");
			$("#reqSenderEmail").val("");
			$("#reqSenderCompanyNm").val("");
			$("#reqTelNum").val("");
			$("#reqMailTitle").val("");
			$("#reqMailContents").val("");

			$(".req_pop_cancel").trigger('click'); 
		} 
	} else {
		if(type == "reqProposalMailSend"){//제휴 메일 발송 실패
			alert("제휴 문의 메일 발송 실패 되었습니다. 관리자에게 문의하세요.");
			return false; 
		} 
	}
}

//제휴 메일 발송
function fnc_ReqMailSend(){

	var senderNm = $("#reqSenderNm").val();
	var senderEmail = $("#reqSenderEmail").val();
	var senderCompanyNm = $("#reqSenderCompanyNm").val();
	var telNum = $("#reqTelNum").val();
	var mailTitle = $("#reqMailTitle").val();
	var mailContents = $("#reqMailContents").val();
	
	// validation S.
	
	if(senderNm == ""){
		alert("필수입력 사항을 모두 입력해주세요.");
		$("#reqSenderNm").focus();
		return false;
	}
	if(senderEmail == ""){
		alert("필수입력 사항을 모두 입력해주세요.");
		$("#reqSenderEmail").focus();
		return false;
	}
	
	/* 이메일 validation. S. */
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 체크 정규식 
	
	//이메일 형식 체크
 	if(!regExp.test(senderEmail)) {
		alert("올바른 이메일 주소를 입력해주세요. ");
		$("#reqSenderEmail").focus();
		return false;
	}
	/* 이메일 validation. E. */
	
	if(senderCompanyNm == ""){
		alert("필수입력 사항을 모두 입력해주세요.");
		$("#reqSenderCompanyNm").focus();
		return false;
	}
	if(telNum == ""){
		alert("필수입력 사항을 모두 입력해주세요.");
		$("#reqTelNum").focus();
		return false;
	}
	
	/* 전화번호 validation. S.  */
	var regExpTel = /^([0-9]{1,4})-([0-9]{1,4})-([0-9]{1,4})$/; // 숫자-숫자-숫자 ( - 2개 필수)

	if ( !regExpTel.test(telNum) ) {
	      alert("잘못된 번호형식입니다. 숫자, - 를 포함해 입력해주세요.");
	      return false;
	}
	/* 전화번호 validation. E. */
	
	if(mailTitle==""){
		alert("필수입력 사항을 모두 입력해주세요.");
		$("#reqMailTitle").focus();
		return false;
	}
	if(mailContents==""){
		alert("필수입력 사항을 모두 입력해주세요.");
		$("#reqMailContents").focus();
		return false;
	}

	// validation E.


 	
	var setParameters = {
			 senderNm : senderNm
			,senderEmail : senderEmail
			,senderCompanyNm : senderCompanyNm
			,telNum : telNum
			,mailTitle : mailTitle
			,mailContents : mailContents
	};
	gfn_ajax_call_data_header(setParameters, contextPathStr+"/admin/serv/reqProposalMailSend.do","reqProposalMailSend" );
}

//쿠키 가져오기
function getCookie(cName) {
     cName = cName + '=';
     var cookieData = document.cookie;
     var start = cookieData.indexOf(cName);
     var cValue = '';
     if(start != -1){
          start += cName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cValue = cookieData.substring(start, end);
     }
     return unescape(cValue);
}
