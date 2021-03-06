//pageInfo.domain = "http://localhost:8080/nyam/"
$(document).on("loadLayout", function() {

	
	console.log("LOAD REQUEST BOARD WRITE");
	
	$(".navigation-item.back").removeClass("hidden");
	$(".navigation-item.menu").addClass("hidden");
	$(".navigation-item.back").click(function() {
		history.go(-1);
	});
	
	$(".submit").click(function(e) {
		e.preventDefault();
		var data = {title:$('[name="title"]').val(), content:$('[name="content"]').val()};
		if(!data.title) {
			alert("제목을 써주세요.");
			return;
		}
		if(!data.content) {
			alert("내용을 써주세요.");
			return;
		}
		$.ajax(pageInfo.domain + "m/requestBoard/write", {data:data, method:"POST", type:"json"}).done(function(value) {
			if(!value.hasOwnProperty("code")) {

				alert("실패");
				return;
			}
			var code = parseFloat(value.code);
			
			switch(code) {
			case 200:
				alert("성공");
				window.location.replace("boardList.html");
				break;
			case -300:
				alert("제목을 입력해주세요.");
				return;
			case -400:
				alert("내용을 입력해주세요.");
				return;
			case -500:
				alert("로그인을 해주세요.");
				goLoginPage();
				return;
			}
		
		
		}).fail(function(request) {
			alert("fail " + request.status);
		});
	});

});