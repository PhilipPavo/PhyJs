$.ready = function(){
		var container = $.geByTag1("body");
		
		var params = $.getUrlParams();
		
		$.Ajax.get("", {param: "param"}, function(d, code, msg){
			var e = $.ce("p", {innerText: "Some inserted text, code: " + code}, {color: "green"});
			container.appendChild(e);
			console.log(d);
		});
}