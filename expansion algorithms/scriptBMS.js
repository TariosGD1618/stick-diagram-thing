function BMS(Arr,n) {
	if(Arr=='lim') {
		var outArr = [[],[]]
		for(var i = 0; i<=n; i++) {
			outArr[1].push(1n)
		}
		return outArr
	}
	var maxL = Arr[0].length
	var arr = []
	for(var i = 0; i<Arr.length; i++) {
		arr[i] = []
		for(var j = 0; j<Arr[i].length; j++) {
			arr[i][j] = Arr[i][j]
		}
		if(Arr[i].length>maxL) {
			maxL = Arr[i].length
		}
		for(var j = 0; j<arr.length; j++) {
			while(arr[j].length<maxL) {
				arr[j].push(0n)
			}
		}
	}
/* ---------------------------------------------------------
  bms.expand() returns one step expanded matrix from bms */
function expand(){
  var s=arr;
  var xs=arr.length;
  var ys=arr[0].length;
  
  /* inclement bracket */
  var s1 = s.slice(0,xs-1); /* pop rightmost column */
  
  /* get bad root */
  var r=getBadRoot();
  if(r==-1) return s1;
  /* delta = s[rightmost]-s[bad root] */
  var delta=sub(s[xs-1], s[r]);
  var lmnz=getLowermostNonzero(s[xs-1]); /* lowermost nonzero */
  for(var y=lmnz;y<ys;y++) delta[y]=0n; /* */
  /* create new matrix -> s1 */
  var A=getAscension(); /* get ascension matrix */
  var bs=xs-r-1; /* number of columns of the bad parts */
  
  /* copy and ascension */
  for(var i=0;i<n;i++){
    for(var x=0;x<bs;x++){
      var da=new Array(ys);
      for(var y=0;y<ys;y++){
        da[y]=s[r+x][y]+delta[y]*A[x][y]*BigInt(i+1);
      }
      s1.push(da);
    }
  }
  return s1;
};
/* ---------------------------------------------------------
  bms.findParent(x,y) returns column index of parent of (x,y).
  It returns -1 when the parent of (x,y) cannot be found. */
function getParent(x,y){
  var p = x; /* parent candidate */
  while(p>0){
    /* p = next */
    if(y!=0){
      p=getParent(p,y-1); /* try column of upper parent */
    }else{
      p=p-1; /* simply left */
    }
    if(p==-1)return p; /* parent is not found */
    if(arr[p][y]<arr[x][y]){ /* judge smaller */
      return p;
    }
  }
  return -1;
}
/* ---------------------------------------------------------
  bms.getBadRoot() returns column index of bad root of bms.
   It returns -1 when the parent of (x,y) cannot be found. */
function getBadRoot(){
  /* x = rightmost column */
  var x=arr.length-1;
  /* y = Lowermost Nonzero row of x */
  var y=getLowermostNonzero(arr[x]);
  if(y==-1)return -1;
  return getParent(x,y);
}
/* ---------------------------------------------------------
  bms.getAscension() returns ascension matrix A[x][y] of bms. 
   A[x][y]==0 (x+r,y) is not ascended in copy
   A[x][y]==1 (x+r,y) is ascended in copy
   r=column index of the bad root
*/
function getAscension(){
  var xs=arr.length;
  var ys=arr[0].length;
  var r = getBadRoot(); /* bad root */
  if(r==-1) return []; /* bad root is not found -> empty */
  var bs = xs-r-1; /* number of columns of the bad part */
  var A = zeros([bs, ys]); /* init */
  for(var y=0;y<ys;y++){
    A[0][y]=1n; /* bad root is ascended */
    for(var x=1;x<bs;x++){ /* x=column index of bad part */
      var p=getParent(x+r,y);
	  //console.log(A[p-r],p,r,arr)
      if(p!=-1 && A[p-r] && A[p-r][y]==1) A[x][y]=1n; /* propagate from parent *///line modified to fix ()(1,1)(2,1)(2)
    }
  }
  return A;
}
/* ---------------------------------------------------------
  bms.getLowermostNonzero(c) returns row index of the lowermost nonzero element of c. 
   if lowermost nonzero element of c is not found, it returns -1.*/
function getLowermostNonzero(c){
  var y;
  for(y=c.length-1;y>=0;y--){
    if(c[y]>0) break;
  }
  return y;
}
function zeros(s){
  var f=function(s, d){
    var a = new Array(s[d]);
    if(d==s.length-1){
      for(var i=0;i<s[d];i++) a[i] = 0n;
    }else{
      for(var i=0;i<s[d];i++) a[i] = f(s,d+1);
    }
    return a;
  };
  return f(s,0);
}
function sub(a0,a1){
  b = new Array(a0.length);
  if(a0[0] instanceof Array){
    for(var i=0;i<a0.length;i++){
      b[i]=new Array(a0[0].length);
      for(var j=0;j<b.length;j++){
        b[i][j]=a0[i][j]-a1[i][j];
      }
    }
  }else{
    for(var i=0;i<a0.length;i++){
      b[i] = a0[i] - a1[i];
    }
  }
  return b;
};
	var out_ = expand()
	for(var i = 0; i<out_.length; i++) {
		while(out_[i][out_[i].length-1]==0) {
			out_[i].pop()
		}
	}
	if(Arr.length>1&&Arr[Arr.length-1].length!=0&&!(Arr[Arr.length-2].length==0&&Arr[Arr.length-1].length==1&&Arr[Arr.length-1][0]==1)) {
		while(out_.length>0&&out_[out_.length-1].length==0) {
			out_.pop()
		}
	}if(Arr.length>2&&Arr[Arr.length-1].length!=0&&out_[out_.length-1].length==0) {
		out_.pop()
	}
	return out_
}
function PrSS(arr,n) {
	if(arr=='lim') {
		var arrO = []
		for(var i = 0n; i<=n+1; i++) {
			arrO.push(i)
		}
		return arrO
	}
	return BMS(arr.map(x=>x==0?[]:[x]),n).map(x=>(x[0]??0n))
}