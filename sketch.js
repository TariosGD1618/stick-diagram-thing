//stick diagramming algorithm TariosGD1618, algorithm for sequence expansion by Naruyoko
const inp = document.querySelectorAll('input')
const inp1 = inp[0]
const inp2 = inp[1]
const sel = document.querySelector('select')
isOne = currentValue => currentValue==1
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var doLabels = true
ctx.strokeStyle = 'white'
ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.fillStyle = 'white'
ctx.textBaseline = 'top';
var thing = 'wY'
stickDiagram(toArray(inp1.value),toArray(inp2.value),0,canvas.width,canvas.height)
function toArray(str_) {
	while(isNaN(str_.charAt(str_.length-1)*1)) {
		str_ = str_.slice(0,-1)
	}
	while(isNaN(str_.charAt(0)*1)) {
		str_ = str_.substring(1)
	}
	return JSON.parse('['+str_+']')
}
function stickDiagram(array_2_0,array,x1,x2,h) {
	var diff = x2-x1
	ctx.fillRect(x1,canvas.height/2-h/2,1,h)
	if(Math.abs(diff)<1/2||array.length==0) {
		return 0
	}
	if(doLabels&&ctx.measureText(f(array)).width<diff) {
		ctx.fillText(f(array_2_0),x1,canvas.height/2-h/2)
	}
	if(array.length<2||(array_2_0.length>0&&array[array.length-1]==1)) {
		return 0
	}
	var arr2 = []
	var array2 = JSON.parse(JSON.stringify(array))
	var j_ = 0
	while(array2[array2.length-1]==1) {
		array2.pop()
	}
	//a[k],a[k+1][b]
	var bob = 0
	for(var i = 0; i<=Math.log2(diff)+bob+1; i++) {
		if(array[array.length-1]!=1) {
			arr2_=expand(array,i)
			if(compare(array_2_0,arr2_)) {
				bob = i+1
			}
			arr2[i] = arr2_
		}else {
			if(i>j_) {
				break
			}
			arr2[i] = JSON.parse(JSON.stringify(array2))
			array2.push(1)
		}
	}
	for(var j = 0; j<bob; j++) {
		arr2.shift()
	}
	for(var i2 = 0; i2<arr2.length; i2++) {
		if(i2==0) {
			stickDiagram(array_2_0,arr2[i2],x2-diff/(2**i2),x2-diff/(2**i2)/2,h/(2**i2))
		}else {
			stickDiagram(arr2[i2-1],arr2[i2],x2-diff/(2**i2),x2-diff/(2**i2)/2,h/(2**i2))
		}
	}
}
function expand(arr,n) {
	var a__ = arr.findLastIndex((element)=>element==0)
	if(arr[arr.length-1]==0) {
		arr = JSON.parse(JSON.stringify(arr))
		arr[a__] = n+2
		return arr
	}
	return ex_(arr,n,true)
}
function f(x) {
	if(x.length==0) {
		return 0
	}
	if(!x.every(isOne)&&x[0]==1&&x[1]==1) {
		x.shift()
		return f(x)
	}
	return x+''
}
function conc(a,b) {
	a = JSON.parse(JSON.stringify(a))
	b = JSON.parse(JSON.stringify(b))
	return a.concat(b)
}
inp1.addEventListener('change', stik_)
inp2.addEventListener('change', stik_)
sel.addEventListener('change', stik_)
function stik_(a) {
	ctx.fillStyle = 'black'
	ctx.fillRect(0,0,canvas.width,canvas.height)
	ctx.fillStyle = 'white'
	stickDiagram(toArray(inp1.value),toArray(inp2.value),0,canvas.width,canvas.height)
}
function getBadRoot_(array) {
	for(var l_ = array.length-1; l_>=0; l_--) {
		if((array[l_]<array[array.length-1]&&array[l_]>0)||(array[l_]>array[array.length-1]&&array[l_]<=0&&array[array.length-1]<=0)||(array[l_]>=0&&array[array.length-1]<=0)) {
			return l_
		}
	}
	return -1
}
function ex_() {
	switch(sel.value) {
		case 'Y':
		return Y.apply(null,arguments)
		break
		case 'wY':
		return wY.apply(null,arguments)
		break
	}
}
function compare(n1,n2) {
	for(var i = 0; i<Math.min(n1.length,n2.length); i++) {
		if(n1[i]>n2[i]) {
			return true
		}if(n1[i]<n2[i]) {
			return false
		}
	}
	if(i==Math.min(n1.length,n2.length)) {
		return n1.length>=n2.length
	}
}
