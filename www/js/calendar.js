
$(document).on("loginComplete", function() {	
	var todate = new Date();
	var date = new Date(todate.getFullYear(), todate.getMonth(), 1);
	var lastDate = new Date(todate.getFullYear(), todate.getMonth() + 1, 0);
	
	var startWeek = date.getDay();
	var today = todate.getDate();
	var lastDay = lastDate.getDate();
	var day = 1;
	var tds = $(".calendar td");
	var getStamps = function(){
	
		$.ajax(pageInfo.domain + "m_nyamHistory", {method:"POST" , type: "json"}).done(function(value) {
			if(value.hasOwnProperty("code")) {
				value.code = parseFloat(value.code);
				switch(value.code) {
				case 500:
					alert("로그인을 해주세요.");
					window.location.replace("login.html");
					return;
				}
			}
			if(!value.hasOwnProperty("length") || value.constructor !== Array){
				alert("실패: Not Array");
				return;//배열이 아니다.
			}
			for(var i=0; i< value.length; i++){
				var regdate = value[i].regdate;
				var day = regdate.substring(8,10);
				$(tds.get(startWeek + day - 1)).find(".stamps").append('<div class="stamp"></div>');
				//console.log(day);
			}
		}).fail(function(request) {
			alert("-실패-" + request.status);
		});
	}
	
	tds.each(function(td, index) {
		if(index < startWeek)
			return;
		if(day > lastDay)
			return;
		var td = $(td);
		td.find("span").text(day);
		if(day == today)
			td.addClass("today");
		day++;
	});
	var resize = function() {
		var width = $(document.querySelector(".calendar td")).width();
		$(".calendar td").css("height", width+"px");
	};
	
	$(window).resize(resize);
	resize();
	getStamps();
});