const fs = require('fs');



function readDirectory(path) {

	return (fs.readdirSync(path)).map(name => (path[path.length-1] == '/') ? path+name: path+'/'+name);
} 

function readFile(filePath){
	return fs.readFileSync(filePath);
}





function findClosure(str,pos){

	if(str[pos] != '{')
		throw 'there is not { there is a ' + str[pos];
	var counter = 1;
	while(counter != 0 ){
		pos +=1;
		if(str[pos] == '{'){
			counter +=1;
		}
		else if(str[pos] == '}'){
			counter -=1;
		}
	}
	return pos;
}


function parse(str){
	
	str = str.replace(/[\n\t\r]/g,"")
	var dict = {};
	var counter = 0;
	var l = str.length;
	for(i=0; i<l; i++){
		if(str[i] ==';'){
			var data = str.substring(counter,i);
			var arr = data.split(" ");
			dict[arr[0].replace(/[\n\t\r]/g,"")] = arr[1];
			counter = i+1;	
		}
		else if(str[i] == '{'){
			var j = findClosure(str,i);
			var data = str.substring(i+1,j) ;
			var key = str.substring(counter,i);
			if(data.indexOf(";") > -1 || data.indexOf("{") > -1) dict[key.replace(/[\n\t\r]/g,"").trim()] = parse(data);
			else dict[key.replace(/[\n\t\r]/g,"")] = data;
			counter = j+1;
			i = j;
		}
	}
	return dict;
}


function changeDict(dict){
	var file = "";
	file = JSON.stringify(dict);
	file = file.replace(/['"]+/g, '');
	return file;
}



function editFile(file){
	var data = fs.readFileSync(file,'utf8');
	var newFile = "";

	var dict = parse(data);
	console.log(dict);
	dict.server.listen = "ALLAXA";
	console.log("\n-------Second version lets see if the fucntion is working\n\n");
	newFile = changeDict(dict);

	console.log(newFile);
}


var list = readDirectory(__dirname);
var text = "";

for(i=0; i<list.length; i++){	
	if(list[i] == __dirname + '/nginx.txt'){
		editFile(list[i]);
	}
}
//var onlyPath = require('path').dirname('G:\node-demos\7-node-module\demo\config.json');

console.log(__dirname+'/nginx.txt')