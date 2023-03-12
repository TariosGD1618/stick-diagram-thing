//stick diagramming algorithm TariosGD1618, algorithm for sequence expansion by Naruyoko
const inp = document.querySelectorAll('input')
const inp1 = inp[0]
const inp2 = inp[1]
const sel = document.querySelector('select')
isOne = currentValue => currentValue==1
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var doLabels_ = true
ctx.strokeStyle = 'white'
ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.fillStyle = 'white'
ctx.textBaseline = 'top';
var thing = 'wY'
stickDiagram(toNot(inp1.value),toNot(inp2.value),0,canvas.width,canvas.height,doLabels_)
function toNot(str_) {
	if(thing=='Y'||thing=='wY') {
		str_ = str_.replaceAll('(','[')
		str_ = str_.replaceAll(')',']')
		str_ = str_.replaceAll('][','],[')
		if(!str_.startsWith('[')) {
			str_ = '['+str_
		}
		if(!str_.endsWith(']')) {
			str_ += ']'
		}
		var n1 = str_.match(/\[/g).length
		var n2 = str_.match(/\]/g).length
		if(n1>n2) {
			str_ = str_.padEnd(str_.length+n1-n2,']')
		}else if(n1<n2) {
			str_ = str_.padStart(str_.length+n2-n1,'[')
		}
		return JSON.parse(str_)
	}
}
function stickDiagram(array_2_0,array,x1,x2,h,doLabels) {
	var diff = x2-x1
	ctx.fillRect(x1,canvas.height/2-h/2,1,h)
	if(Math.abs(diff)<1/2||array.length==0) {
		return 0
	}
	if(doLabels&&ctx.measureText(f(array_2_0)).width<diff) {
		ctx.fillText(f(array_2_0),x1,canvas.height/2-h/2)
	}
	var arrN = F(array_2_0,array)
	if(arrN!=0) {
		stickDiagram(array_2_0,arrN,x1,(x1+x2)/2,h,false)
		stickDiagram(arrN,array,(x1+x2)/2,x2,h/2,doLabels_)
	}
}
function F(a,b) {
	if(thing=='Y'||thing=='wY') {
		var bobby = expand(b,0)
		if(b[b.length-1]==1&&bobby+''==a+'') {
			return 0
		}
		var i = 0
		while(compare(a,bobby)) {
			bobby = expand(b,i)
			if(bobby[bobby.length-1]==1) {
				bobby.pop()
			}
			i++
		}
		return bobby
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
	stickDiagram(toNot(inp1.value),toNot(inp2.value),0,canvas.width,canvas.height,doLabels_)
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
