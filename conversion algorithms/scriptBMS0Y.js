function BMSt0Y(x) {
	var lineBreakRegex=/\r?\n/g;
var itemSeparatorRegex=/[\t ,]/g;

function dg(s){
  return document.getElementById(s);
}
function parseMatrix(s){
  if (!/^(\(\d*(,\d*)*\))*$/.test(s)) return [];
  var matrix=JSON.parse(
    "["+s
      .replace(itemSeparatorRegex,",")
      .replace(/\(/g,"[")
      .replace(/\)/g,"]")
      .replace(/\]\[/g,"],[")+"]");
  var columns=matrix.length;
  var rows=0;
  for (var i=0;i<columns;i++){
    if (matrix[i].length>rows){
      rows=matrix[i].length;
    }
  }
  for (var i=0;i<columns;i++){
    while (matrix[i].length<rows){
      matrix[i].push(0);
    }
  }
  return matrix;
}
//function Y_to_B(s){}
function B_to_Y(s){
  var matrix;
  if (typeof s=="string") matrix=parseMatrix(s);
  else matrix=s;
  var X=matrix.length;
  var Y=matrix[0].length;
  var parentMatrix=[];
  for (var y=0;y<Y;y++){
    for (var x=0;x<X;x++){
      var p;
      if (y===0){
        parentMatrix.push([]);
        for (p=x;p>=0;p--)
          if (matrix[p][y]<matrix[x][y]) break;
      }else{
        for (p=x;p>=0;p=parentMatrix[p][y-1])
          if (matrix[p][y]<matrix[x][y]) break;
      }
      parentMatrix[x][y]=p;
    }
  }
  var a=[];
  for (var x=0;x<X;x++) a.push(1n);
  for (var y=Y-1;y>=0;y--){
    for (var x=0;x<X;x++){
      a[x]=matrix[x][y]===0n?1n:a[x]+a[parentMatrix[x][y]];
    }
  }
	return a;
}
	if(x.length==0) {
		return []
	}
	var x2 = []
	var maxL = 0
	for(var i = 0; i<x.length; i++) {
		x2.push([])
		if(x[i].length>maxL) {
			maxL = x[i].length
		}
		for(var j = 0; j<x[i].length; j++) {
			x2[i][j]=x[i][j]
		}
	}
	for(var i = 0; i<x2.length; i++) {
		while(x2[i].length<maxL) {
			x2[i].push(0n)
		}
	}
	return B_to_Y(x2)
}