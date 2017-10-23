var http = require("http");
var fs= require("fs");
var qs = require("querystring");

var websites = [];

var app = http.createServer(function(req, res){
	var postData = "";
	if(req.method ==="GET"){
		switch(req.url){
			case "/index.html":
				fs.readFile("index.html",function(err,data){
					if(err) throw err;
					res.writeHead(200, ("Context-Type","text/html"));
					res.end(data, toString());
				});
			break;
			case "/add.html":
				fs.readFile("add.html",function(err,data){
					if(err) throw err;
					res.writeHead(200, ("Context-Type","text/html"));
					res.end(data, toString());
				});
			
			break;
		}
		
	}
	else if(req.method === "POST"){
		switch(req.url){
			case "/Add.js":
				
				req.on("data", function(chunk){
					postData +=chunk;
				});
				
				req.on("end", function(){
//					console.log(postData);
					var website = qs.parse(postData);
					console.log(website.domainName);
					console.log(website.name);
					console.log(website.email);
					console.log(website.age);
					console.log(website.click);
					
					websites.push(website);
					var html = "<html><head><meta charset ='utf8'/><title>FGU</title></head><body>";
					html+="<table>";
					
					for(var i=0; i<websites.length;i++){
						var row = "<tr>"+
						"<td>" + websites[i].domainName+"</td>"+
						"<td>" + websites[i].name+"</td>"+
						"<td>" + websites[i].email+"</td>"+
						"<td>" + websites[i].age+"</td>"+
						"<td>" + websites[i].click+"</td>"+
						"</td>";
						html +=row;
					}
					
					html+="</table>";
					html += "</body></html>";
					
					res.writeHead(200, ("Context-type", "text/html"));
					res.end(html);
				});
				
			break;
		}
	}
});


app.listen(7798);