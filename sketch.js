//stick diagramming and BMS expansion algorithm by TariosGD1618, algorithm for Y and w-Y sequence expansion by Naruyoko, algorithm for TON expansion by solarzone
const inp = document.querySelectorAll('input')
const inp1 = inp[0]
const inp2 = inp[1]
const inp3 = inp[2]
const inp4 = inp[3]
const Sel = document.querySelectorAll('select')
const sel = Sel[0]
const lab = Sel[1]
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
			if(thing!='BMS'&&str_.length==0) {
				return [1n]
			}
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
			for(var i = 0; i<sOut_.length; i++) {
				if(typeof sOut_[i] == 'object') {
					for(var j = 0; j<sOut_[i].length; j++) {
						sOut_[i][j] = BigInt(sOut_[i][j])
					}
				}else if(typeof sOut_[i] == 'number') {
					sOut_[i] = BigInt(sOut_[i])
				}
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
	ctx.fillRect(Math.floor(x1),canvas.height/2-h/2,1,h)
	if(Math.abs(diff)<1/2||b==undefined||b.length==0) {
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
	if(a.toString()==b.toString()) {
		return []
	}
	var arr_ = []
	if(thing=='Y'||thing=='wY') {
		if(b[b.length-1]==1) {
			var b2 = arrCopy(b)
			while(b2[b2.length-1]==1) {
				b2.pop()
				if(b2+''==a+'') {
					b2.push(1n)
					break
				}
			}
			while(b2.length<=b.length) {
				arr_.push(arrCopy(b2))
				b2.push(1n)
			}
			return arr_
		}
	}else if(thing=='BMS') {
		if(b[b.length-1].length==0) {
			var b2 = arrArrCopy(b)
			while(b2[b2.length-1].length==0) {
				b2.pop()
				if(b2+''==a+'') {
					b2.push([])
					break
				}
			}
			while(b2.length<=b.length) {
				arr_.push(arrArrCopy(b2))
				b2.push([])
			}
			return arr_
		}
	}else if(thing=='TONM') {
		if(b==a+'0C') {
			return [a]
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
	}
	
	for(var i = 0; arr_.length<l;i++) {
		var bobby = expand(b,i)
		if(compare(a,bobby)||(arr_.length>0&&compare(arr_[arr_.length-1],bobby))) {
			continue
		}
		arr_.push(bobby)
	}
	return arr_
}
function expand(arr,n) {
	return ex_(arr,n,true)
}
function f(x) {
	if(thing=='Y'||thing=='wY') {
		if(x[1]>2||lab.value=='a') {
			return x+''
		}else {
			return Y__(x)
		}
	}else if(thing=='BMS') {
		var str = ''
		for(var i of x) {
			str+='('+i.toString()+')'
		}
		return str
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
inp3.addEventListener('change', stik_2)
inp4.addEventListener('change', stik_2)
sel.addEventListener('change', stik_)
lab.addEventListener('change', stik_)
function stik_(a) {
	thing=sel.value
	if(lab.value=='n') {
		doLabels_ = false
	}else {
		doLabels_ = true
	}
	ctx.fillStyle = 'black'
	ctx.fillRect(0,0,canvas.width,canvas.height)
	ctx.fillStyle = 'white'
	stickDiagram(toNot(inp1.value),toNot(inp2.value),0,canvas.width,canvas.height,doLabels_)
}
function stik_2(a) {
	canvas.width=Number(inp3.value)
	canvas.height=Number(inp4.value)
	stik_(0)
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
		case 'TONM':
		return TONM.apply(null,arguments)
		break
	}
}
function compare(n1,n2) {
	if(n1.length==0) {
		return n2.length==0
	}
	if(n2.length==0) {
		true
	}
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
function arrArrCopy(arrarr) {
	var arrarr2 = []
	for(var i of arrarr) {
		var arr2 = []
		for(var j of i) {
			arr2.push(j)
		}
		arrarr2.push(arr2)
	}
	return arrarr2
}
function arrCopy(arr) {
	var arr2 = []
	for(var j of arr) {
		arr2.push(j)
	}
	return arr2
}
function Y__(x) {
	//return x.toString()
	function A(s) {
		if((s.split('')).every(x=>((x!='+')&&(x!='×')&&(x!='^')))) {
			return s
		}
		return '('+s+')'
	}
	if(x.length==0) {
		return '0'
	}
	if(x.every(x=>(x==1))) {
		return (x.length-1).toString()
	}
	if(x[x.length-1]==1) {
		var x2 = arrCopy(x)
		var n = 0
		while(x2[x2.length-1]==1) {
			x2.pop()
			n++
		}
		return Y__(x2)+'+'+n
	}
	if(x.length==2&&x[1]==2) {
		return 'ω'
	}
	var arr = []
	for(var i = 0; i<x.length; i++) {
		if(x[i]==1) {
			arr.push([])
		}
		arr[arr.length-1].push(x[i])
	}
	if(arr.length>1) {
		var str = ''
		for(var i = 0; i<arr.length;) {
			if(i<arr.length-1&&!compare(arr[i],arr[i+1])) {
				i++
				continue
			}
			var i2 = i+1
			while(i2<arr.length&&arr[i].toString()==arr[i2].toString()) {
				i2++
			}
			var s2 = ''
			if(i2==i+1) {
				s2 = Y__(arr[i])
			}else {
				s2 = A(Y__(arr[i]))+'×'+(i2-i)
			}
			if(i2<arr.length) {
				str+=s2+'+'
			}else {
				str+=s2
			}
			i = i2
		}
		return str
	}
	var arr = []
	for(var i = 1; i<x.length; i++) {
		if(x[i]==2) {
			arr.push([1])
		}
		try {
			arr[arr.length-1].push(x[i])
		}catch {
			console.log(x)
			return x.toString()
		}
	}
	if(arr.length>1) {
		var str = ''
		for(var i = 0; i<arr.length;) {
			if(i<arr.length-1&&!compare(arr[i],arr[i+1])) {
				i++
				continue
			}
			var i2 = i+1
			while(i2<arr.length&&arr[i].toString()==arr[i2].toString()) {
				i2++
			}
			var s2 = ''
			if(i2==i+1) {
				s2 = Y__(arr[i])
			}else {
				s2 = A(Y__(arr[i]))+'^'+(i2-i)
			}
			if(i2<arr.length) {
				str+=s2+'×'
			}else {
				str+=s2
			}
			i = i2
		}
		return str
	}
	if(x[2]==3) {
		var x2 = arrCopy(x)
		x2.shift()
		for(var i = 0; i<x2.length; i++) {
			x2[i]--
		}
		return 'ω^'+A(Y__(x2))
	}
	var l3 = x.lastIndexOf(3n)
	if(l3 > 0) {
		var s1 = A(Y__(x.slice(0,l3)))
		var x2 = x.slice(l3)
		x2.unshift(2n)
		for(var i = 0; i<x2.length; i++) {
			x2[i]--
		}
		return s1+'^'+A(Y__(x2))
	}
	var l4 = x.lastIndexOf(4n)
	var arra_ = []
	for(var i = l4; i<x.length&&x[i]!=5; i++) {
		arra_.push(x[i])
	}
	for(var I = 2; I<l4;) {
		while((x[I]!=4||x[I+arra_.length]>5)&&I<l4) {
			I++
		}
		for(var j = 0; j<arra_.length; j++) {
			if(arra_[j]!=x[I+j]) {
				break
			}
		}
		if(j==arra_.length) {
			break
		}
		I++
	}
	var arra2 = []
	for(var i = 1; i<arra_.length; i++) {
		arra2.push(arra_[i]-5n)
	}
	var p1 = x.slice(0,I)
	var p2 = x.slice(I)
	if(p1.length<=2) {
		p1 = []
	}
	if(arra2.toString()==p1.toString()) {
		p1 = [1n]
	}
	var p22 = []
	for(var i = 0; i<p2.length;) {
		p22.push(p2[i]-3n)
		for(var j = 0; j<arra_.length; j++) {
			if(arra_[j]!=p2[i+j]) {
				break
			}
		}
		if(j<arra_.length) {
			i++
		}else {
			i+=arra_.length
		}
	}
	var x2 = p1.concat(p22)
	if(arra_.length==1) {
		return 'ε'+A(Y__(x2))
	}else if(arra_.length==2&&arra_[1]==6) {
		return 'ζ'+A(Y__(x2))
	}else if(arra_.length==3&&arra_[1]==6&&arra_[2]==6) {
		return 'η'+A(Y__(x2))
	}else if(arra_.length==3&&arra_[1]==6&&arra_[2]==8) {
		return 'Γ'+A(Y__(x2))
	}else if(arra_[1]==6) {
		if(x2.length>1||arra_[2]<8||arra_[3]<9) {
			return 'φ('+toPhi_(arra2)+','+Y__(x2)+')'
		}else {
			return 'φ('+toPhi_(arra2)+')'
		}
	}
	return x.toString()
}//1,2,4,6,8,4,6,7,9,11,13,1
function toPhi_(x) {
	if(x.length<2||x[1]<2) {
		x.unshift(1n,1n)
	}
	if(x[0]==1&&(x.length<=1||x[1]<3)) {
		return Y__(x)
	}
	var arra = []
	for(var i = 0; i<x.length; i++) {
		if(x[i]==1||i==0) {
			arra.push([])
		}
		arra[arra.length-1].push(x[i])
	}
	var arr3 = []
	for(var i = 0; i<arra.length; i++) {
		var strt = arrCopy(arra[i])
		if(strt.lastIndexOf(2n)!=-1) {
			strt = strt.slice(0,strt.lastIndexOf(2n))
		}
		while(i<arra.length-1) {
			var strt2 = arra[i+1]
			if(strt2.lastIndexOf(2n)!=-1) {
				strt2 = strt2.slice(0,strt2.lastIndexOf(2n))
			}
			if(strt.toString()!=strt2.toString()) {
				break
			}
			arra[i] = arra[i].concat(arra[i+1])
			for(var j = i+1; j<arra.length-1; j++) {
				arra[j] = arra[j+1]
			}
			arra.pop()
		}
		var a2 = []
		for(var j = 0; j<arra[i].length;) {
			a2.push(arra[i][j])
			if(arra[i][j]==1) {
				j++
				while(arra[i][j]>2n&&j<arra[i].length) {
					j++
				}
			}else {
				j++
			}
		}
		if(a2.length<=1||a2[1]==1) {
			a2.unshift(1n)
		}
		strt.shift()
		for(var j = 0; j<strt.length; j++) {
			strt[j]-=2n
		}
		if(strt.length<=1||strt[1]==1) {
			strt.unshift(1n)
		}
		arr3.push([strt,a2])
	}
	if(arr3[0][0].length<=1||arr3[0][0][1]==1) {
		var array_ = []
		for(var i = 0; i<arr3.length; i++) {
			array_[arr3[i][0].length-1] = Y__(arr3[i][1])
		}
		var st = ''
		for(var i = 0; i<array_.length; i++) {
			if(i>0) {
				st = ','+st
			}
			if(array_[i]==undefined) {
				st = '0'+st
			}else {
				st = array_[i]+st
			}
		}
		return st
	}
	var st = ''
	for(var i = 0; i<arr3.length; i++) {
		st+=Y__(arr3[i][1])+'@'
		if(arr3[i][0].length<2||arr3[i][0][1]<3) {
			st+=Y__(arr3[i][0])
		}else {
			st+='('+toPhi_(arr3[i][0])+')'
		}
		if(i<arr3.length-1) {
			st+=','
		}
	}
	return st
}