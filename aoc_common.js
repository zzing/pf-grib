//--------------------------------------------------------------------------------------------
//함수명 : fn_console_debug 디버그를 크롬 콘솔에 띠운다  -- 20161216 작업합
//@return 
//3. 사용법
//	1) fn_open_activity(str)
//	2) str : 로그인후 다시 돌아올 페이지에 full url 값을 넣어 준다.

//--------------------------------------------------------------------------------------------
var bDebugMode = true; // 향후에 운영 모드에서는 이거 false 로 하자 

function gfn_console_debug(str) {
	  if (bDebugMode){
		  console.log(str);
	  }
}
//--------------------------------------------------------------------------------------------
//함수명 : gfn_history_back 자바스크립트의 히스토리 back 
//@return 
//3. 사용법
//	1) gfn_history_back(backCnt)
//	2) backCnt : 히스토리 back 해야 하는 페이지 count

//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//함수명 : fn_replaceAll 자바스크립트의 replace all 
//@return 
//3. 사용법
//	1) fn_replaceAll(str, searchStr, replaceStr)
//	2) str : 원본 문자열  , searchStr: 찾을 문자열 , replaceStr : 바꿀 문자열

//--------------------------------------------------------------------------------------------
function fn_replaceAll(str, searchStr, replaceStr) {

    return str.split(searchStr).join(replaceStr);
}

//--------------------------------------------------------------------------------------------
//함수명 : fn_numberWithCommas 자바스크립트의 3자리마자 , 찍기
//@return 
//--------------------------------------------------------------------------------------------
function fn_numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



//--------------------------------------------------------------------------------------------
//함수명 : fn_goLoginPage 로그인 페이지로 보내고 로그인후 다시 현재 페이지로 돌아 온다. 
//@return 
//3. 사용법
//	1) fn_goLoginPage(str)
//	2) str : 로그인후 다시 돌아올 페이지에 full url 값을 넣어 준다.

//--------------------------------------------------------------------------------------------
/*
function fn_goLoginPage(urlStr, str) {
//  alert('fn_goLoginPage의 파라미터 str 은?  -->'+str);	
	str = fn_replaceAll(str,'&', '*^*');
//  alert('fn_goLoginPage 문자열변환처리후str은?  -->'+str);
	var pUrlVal = "/member/loginMain.do?sTargetUrl="+str;
//  alert('pUrlVal-->'+pUrlVal);
  location.href=urlStr+encodeURI(pUrlVal);
//location.href=urlStr+encodeURI("/member/loginMain.do?sTargetUrl="+str);
}
*/
function fn_goLoginPage(urlStr, str) {
	var pUrlVal = "/member/loginMain.do";	
  	location.href=urlStr+encodeURI(pUrlVal);
}

//--------------------------------------------------------------------------------------------
//함수명 : fn_open_activity 액티비티를 띠운다 -- 20161212 작업중
//--------------------------------------------------------------------------------------------
/*
function fn_open_activity(str) {
	  alert('액티비티를 띠운다. -->'+str);
	  return false;
	}
*/

//--------------------------------------------------------------------------------------------
//함수명 : gfn_onHasAuoDele
//--------------------------------------------------------------------------------------------
function gfn_onHasAuoDele(e){
	if($(e.target).next().hasClass("btnRemoveTxt")){
		
	}else{
		$(".hasAutoDele").after("<a href='#none' class='btnRemoveTxt'>X</a>");
	}
	if($(e.target).val() != ""){
			var _obj = {
				"_x":$(e.target).offset().left,
			"_y":$(e.target).offset().top,
			"_w":$(e.target).outerWidth(),
			"_h":$(e.target).outerHeight()
		};

		 $(e.target).next(".btnRemoveTxt").css({"display":"block", "position":"absolute", "left":_obj._x + _obj._w - 30 + "px", "top": _obj._y + _obj._h/2 - 10 + "px"});
		 $(e.target).next(".btnRemoveTxt").on("click", gfn_onRemoveText);
		}else{
		$(e.target).next(".btnRemoveTxt").css({"display":"none"});
		$(e.target).next(".btnRemoveTxt").off("click");
		}
}		

//--------------------------------------------------------------------------------------------
//함수명 : gfn_onRemoveText
//--------------------------------------------------------------------------------------------
function gfn_onRemoveText(e){
	e.preventDefault();
	$(e.target).css({"display":"none"}).off("click");
	$(e.target).prev("input").val("");
}

//--------------------------------------------------------------------------------------------
//함수명 : marginTopMiddle 로그인 페이지로 보내고 로그인후 다시 현재 페이지로 돌아 온다. 
//@return 
//3. 사용법
//	1) marginTopMiddle(str)
//	2) str : 세로 중앙정렬할 id
//--------------------------------------------------------------------------------------------
function marginTopMiddle( _select ){				
	var _popLayoutMT = $("#" + _select).outerHeight()/2 * (-1);
	$("#" + _select).css({"margin-top":_popLayoutMT});
}