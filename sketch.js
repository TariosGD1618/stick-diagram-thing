//stick diagramming and BMS expansion algorithm by TariosGD1618, algorithm for Y and w-Y sequence expansion by Naruyoko, algorithm for TON expansion by solarzone
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
	if(str_.toLowerCase()=='lim') {
		return 'lim'
	}
	try {
		if(thing=='Y'||thing=='wY'||thing=='BMS') {
			str_ = str_.replaceAll('(','[')
			str_ = str_.replaceAll(')',']')
			str_ = str_.replaceAll('][','],[')
			if(!str_.startsWith('[')) {
				str_ = '['+str_
			}
			if(!str_.endsWith(']')) {
				str_ += ']'
			}
			if(thing=='BMS'&&!str_.endsWith(']]')) {
				str_ += ']'
			}
			if(thing=='BMS'&&!str_.startsWith('[[')) {
				str_ = '[' + str_
			}
			var n1 = str_.match(/\[/g).length
			var n2 = str_.match(/\]/g).length
			if(n1>n2) {
				str_ = str_.padEnd(str_.length+n1-n2,']')
			}else if(n1<n2) {
				str_ = str_.padStart(str_.length+n2-n1,'[')
			}
			var sOut_ = JSON.parse(str_)
			if((!thing=='BMS')&&sOut_.includes('0')) {
				return 'lim'
			}
			return sOut_
		}else {
			str_ = str_.toUpperCase()
			if(str_.length==0) {
				return '0'
			}
			if(str_.match(/[0WC_]/g).length==str_.length) {
				return str_
			}else {
				return 'lim'
			}
		}
	}catch {return 'lim'}
}
function stickDiagram(a,b,x1,x2,h,doLabels) {
	var diff = x2-x1
	ctx.fillRect(x1,canvas.height/2-h/2,1,h)
	if(Math.abs(diff)<1/2||b.length==0) {
		return 0
	}
	if(doLabels&&ctx.measureText(f(a)).width<diff) {
		ctx.fillText(f(a),x1,canvas.height/2-h/2)
	}
	var arrN = F(a,b,Math.log2(diff)+1)
	for(var i = 0; i<arrN.length; i++) {
		if(i==0) {
			stickDiagram(a,arrN[0],x1,(x1+x2)/2,h,false)
		}else {
			stickDiagram(arrN[i-1],arrN[i],x2-diff/(2**i),x2-diff/(2**(i+1)),h/(2**i),doLabels_)
		}
	}
}
function F(a,b,l) {
	var arr_ = []
	if(thing=='Y'||thing=='wY') {
		if(b=='lim') {
			var a__
			if(a[1]!=undefined) {
				a__=1+a[1]
			}else {
				a__=2
			}
			while(arr_.length<l) {
				arr_.push([1,a__])
				a__++
			}
		}
		if(b[b.length-1]==1) {
			var b2 = JSON.parse(JSON.stringify(b))
			while(b2[b2.length-1]==1) {
				b2.pop()
				if(b2+''==a+'') {
					b2.push(1)
					break
				}
			}
			while(b2.length<=b.length) {
				arr_.push(JSON.parse(JSON.stringify(b2)))
				b2.push(1)
			}
			return arr_
		}
		for(var i = 0; arr_.length<l;i++) {
			var bobby = expand(b,i)
			if(bobby[bobby.length-1]==1) {
				bobby.pop()
			}
			if(compare(a,bobby)) {
				continue
			}
			arr_.push(bobby)
		}
		return arr_
		var bobby = expand(b,0)
		if(b[b.length-1]==1&&bobby+''==a+'') {
			return []
		}
		var i = 0
		do {
			bobby = expand(b,i)
			if(bobby[bobby.length-1]==1) {
				bobby.pop()
			}
			i++
		} while(compare(a,bobby))
		return bobby
	}else if(thing=='BMS') {
		if(b[b.length-1].length==0) {
			var b2 = JSON.parse(JSON.stringify(b))
			while(b2[b2.length-1].length==0) {
				b2.pop()
				if(b2+''==a+'') {
					b2.push([])
					break
				}
			}
			while(b2.length<=b.length) {
				arr_.push(JSON.parse(JSON.stringify(b2)))
				b2.push([])
			}
			return arr_
		}
		for(var i = 0; arr_.length<l;i++) {
			var bobby = expand(b,i)
			if(bobby.length>0&&bobby[bobby.length-1].length==0) {
				bobby.pop()
			}
			if(compare(a,bobby)) {
				continue
			}
			arr_.push(bobby)
		}
		return arr_
	}else if(thing=='TONM') {
		if(b==a+'0C'||b==a||b+'0C'==a) {
			return [a]
		}
		if(a=='') {
			a = '0'
		}
		if(b.endsWith('0C')) {
			var b2 = b
			while(b2.endsWith('0C')&&b2!=a) {
				b2 = b2.slice(0,-2)
			}
			while(b2.length<=b.length) {
				arr_.push(b2)
				b2+='0C'
			}
			return arr_
		}
		if(b=='lim') {
			var s
			if(a=='0'||a=='') {
				s = 'W'
			}else {
				var n = deg(a)
				s = 'W'.padEnd(n+2,'_')
			}
			for(var i = 0; i<l; i++) {
				arr_.push(s)
				s+='_'
			}
			return arr_
		}else {
			var n = Math.max(deg(a),deg(b))
			var a2 = a_(a,n)
			var b2 = a_(b,n)
			for(var i = 0; arr_.length<l; i++) {
				var bobby = expand_(b2,n,i)
				if(!b.endsWith('00CC')) {
					if(bobby=='OOC') {
						continue
					}
					if(bobby.endsWith('OC')) {
						//continue
					}
				}
				if(bobby>a2) {
					var bob2 = rA_0(bobby,n)
					if((bob2!=arr_[arr_.length-1])&&(b.endsWith('00CC')||(bob2!=arr_[arr_.length-1]+'0C'))) {
						arr_.push(rA_0(bobby,n))
					}
				}
			}
			//w==000CC
			return arr_
		}
	}
}
function expand(arr,n) {
	return ex_(arr,n,true)
}
function f(x) {
	if(thing=='Y'||thing=='wY') {
		if(x.length==0) {
			return 0
		}
		if(!x.every(isOne)&&x[0]==1&&x[1]==1) {
			x.shift()
			return f(x)
		}
		return x+''
	}else if(thing=='BMS') {
		return JSON.stringify(x).replaceAll(']]',')').replaceAll('[[','(').replaceAll('],[',')(').replaceAll('[','(').replaceAll(']',')')
	}
	return x
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
	thing=sel.value
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
		case 'BMS':
		return BMS.apply(null,arguments)
		break
	}
}
function compare(n1,n2) {
	if(n1=='lim') {
		return true
	}
	if(n2=='lim') {
		return false
	}
	if(thing=='Y'||thing=='wY') {
		return lex(n1,n2,((a,b)=>(a-b)))>=0
	}else if(thing=='BMS') {
		return lex(n1,n2,((a,b)=>lex(a,b,((c,d)=>(c-d)))))>=0
	}else {
		var n = Math.max(deg(n1),deg(n2))
		return a_(n1,n)>=a_(n2,n)
	}
}
function lex(a,b,f__) {
	for(var i = 0; i<Math.min(a.length,b.length); i++) {
		if(f__(a[i],b[i])!=0) {
			return f__(a[i],b[i])
		}
	}
	if(i==Math.min(a.length,b.length)) {
		return a.length-b.length
	}
}