function _0Y(z,k_) {
	var lineBreakRegex=/\r?\n/g;
var itemSeparatorRegex=/[\t ,]/g;

function dg(s){
  return document.getElementById(s);
}
function calcMountain(s){
  if (typeof s=="string") s=s.split(itemSeparatorRegex);
  var lastLayer=[];
  var mountain=[lastLayer];
  var length=s.length;
  for (var i=0;i<length;i++){
    var value=BigInt(s[i]);
    //if (!isFinite(value)||!Number.isInteger(value)||value<1) value=1; //throw Error("Invalid sequence");
    lastLayer.push([value,0]);
  }
  var hasNextLayer=true;
  while (hasNextLayer){
    hasNextLayer=false;
    for (var x=0;x<length;x++){
      if (useIntended){
        var p=x;
        while (p>=0&&(mountain.length==1||mountain[mountain.length-2][p][1])&&lastLayer[p][0]>=lastLayer[x][0]){
          p-=mountain.length==1?1:mountain[mountain.length-2][p][1];
        }
        if (p>=0&&lastLayer[p][0]&&lastLayer[p][0]<lastLayer[x][0]){
          lastLayer[x][1]=x-p;
          hasNextLayer=true;
        }
      }else{
        var xp=0;
        var p=x;
        while (p>=0&&(mountain.length==1||mountain[mountain.length-2][p][1])){
          p-=mountain.length==1?1:mountain[mountain.length-2][p][1];
          if (p>=0&&lastLayer[p][0]&&lastLayer[p][0]<lastLayer[x][0]) xp=x-p;
        }
        if (xp){
          lastLayer[x][1]=xp;
          hasNextLayer=true;
        }
      }
    }
    if (hasNextLayer){
      if (useIntended){
        var currentLayer=[];
        for (var x=0;x<length;x++){
          currentLayer.push([lastLayer[x][1]?lastLayer[x][0]-lastLayer[x-lastLayer[x][1]][0]:1n,0]);
        }
      }else{
        var currentLayer=[[1,0]];
        for (var x=1;x<length;x++){
          currentLayer.push([lastLayer[x][0]-lastLayer[x-lastLayer[x][1]][0],0]);
        }
      }
      mountain.push(currentLayer);
      lastLayer=currentLayer;
    }
  }
  return mountain;
}
function cloneMountain(mountain){
  var newMountain=[];
  for (var i=0;i<mountain.length;i++){
    newMountain.push([]);
    for (var j=0;j<mountain[0].length;j++){
      newMountain[i].push(mountain[i][j].slice(0));
    }
  }
  return newMountain;
}
function expand(s,n,stringify){
  var mountain;
  if (typeof s=="string") mountain=calcMountain(s);
  else mountain=s;
  if (stringify===undefined) stringify=true;
  var height=mountain.length;
  var result=cloneMountain(mountain);
  var cutPosition=mountain[0].length-1;
  var cutHeight=0;
  while (cutHeight+1<height&&mountain[cutHeight][cutPosition][1]) cutHeight++;
  var badRootPosition=cutHeight&&cutPosition-mountain[cutHeight-1][cutPosition][1];
  for (var y=0;y<height;y++) result[y].pop();
  //Create Mt.Fuji shell
  for (var i=1;i<=n&&cutHeight;i++){ //iteration
    for (var x=badRootPosition;x<cutPosition;x++){ //position
      for (var y=0;y<height;y++){
        if (x==badRootPosition&&y<cutHeight-1) result[y].push([NaN,mountain[y][cutPosition][1]]);
        else if (!mountain[y][x][1]) result[y].push([mountain[y][x][0],0]);
        else if (mountain[y][x][1]&&x-mountain[y][x][1]>=badRootPosition&&(x>badRootPosition||y<cutHeight)) result[y].push([NaN,mountain[y][x][1]]);
        else result[y].push([NaN,mountain[y][x][1]+(cutPosition-badRootPosition)*i]);
      }
    }
  }
  //Build number from ltr, ttb
  var resultLength=result[0].length;
  for (var x=0;x<resultLength;x++){
    for (var y=height-1;y>=0;y--){
      if ((result[y][x][0])!=(result[y][x][0])){
        result[y][x][0]=result[y+1][x][0]+result[y][x-result[y][x][1]][0];
      }
    }
  }
  var rr;
  if (stringify){
    rr=[];
    for (var x=0;x<resultLength;x++) rr.push(result[0][x][0]);
    rr=rr.join(",");
  }else{
    rr=result;
  }
  return rr;
}
function expandmulti(s,nstring){
  var result=s;
  for (var i of nstring.split(",")) result=expand(result,+i);
  return result;
}
var input="";
var inputn="3";
var noLimitToN=false;
var useIntended=true;
var automaticallyExpandOnChange=false;



	if(z[z.length-1]==1) {
		return z.slice(0,z.length-1)
	}
	if(z=='lim') {
		return [1n,BigInt(k_)+2n]
	}/*
	if(z[z.length-1]>=3) {
		k_++
	}*/
	var aOut = expand(z+'',k_,true).split(',')
	for(var i =0; i<aOut.length; i++) {
		aOut[i] = BigInt(aOut[i])
	}
	if(z[z.length-1]!=1&&(z[z.length-1]!=2||z[z.length-2]!=1)) {
		while(aOut[aOut.length-1]==1) {
			aOut.pop()
		}
	}else if(aOut[aOut.length-1]==1&&z[z.length-1]!=1) {
		aOut.pop()
	}
	return aOut
}