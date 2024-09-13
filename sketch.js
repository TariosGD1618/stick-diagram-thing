//stick diagramming by TariosGD1618, algorithm for Y, 0-Y and w-Y sequence expansion by Naruyoko (and BMS-0-Y conversion), algorithm for TON expansion by solarzone, algorithm for BMS expansion by koteitan
BigInt.prototype.toJSON = function () {
	return this.toString()+'n'
}
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
var thing = 'Y'
var MinOrd = toNot(inp1.value)
var MaxOrd = toNot(inp2.value)
stickDiagram(MinOrd,MaxOrd,0,canvas.width,canvas.height,doLabels_)
function toNot(str_) {
	if(str_.toLowerCase()=='lim') {
		return 'lim'
	}
	try {
		if(thing=='0Y'||thing=='Y'||thing=='wY'||thing=='PrSS'||thing=='BMS') {
			var sOut_
			if(thing!='BMS') {
				if(str_.length==0) {
					return []
				}
				if(str_=='0') {
					return []
				}
				str_ = '['+str_.replaceAll(/[^0123456789,]/g,'')+']'
				sOut_ = JSON.parse(str_)
				if(sOut_.includes('0')&&thing!='PrSS') {
					return 'lim'
				}
				for(var i = 0; i<sOut_.length; i++) {
					sOut_[i] = BigInt(sOut_[i])
				}
			}else {
				str_ = str_.replaceAll(/[^0123456789,\(\)\[\]]/g,'')
				str_ = '['+str_.replaceAll('(','[').replaceAll(')',']').replaceAll('][','],[')
				if(!str_.startsWith('[')) {
					str_ = '['+str_
				}
				if(!str_.endsWith(']')) {
					str_ += ']'
				}
				if(!str_.endsWith(']]')) {
					str_ += ']'
				}
				if(!str_.startsWith('[[')) {
					str_ = '[' + str_
				}
				sOut_ = JSON.parse(str_)
				for(var i = 0; i<sOut_.length; i++) {
					for(var j = 0; j<sOut_[i].length; j++) {
						sOut_[i][j] = BigInt(sOut_[i][j])
					}
					while(sOut_[i][sOut_[i].length-1]==0) {
						sOut_[i].pop()
					}
				}
				if(sOut_.length>1&&!sOut_[1].every(x=>(x==1))) {
					return 'lim'
				}
			}
			if(sOut_[0]!=(thing!='PrSS'&&thing!='BMS')) {
				return 'lim'
			}
			var max_std_above = 'lim'
			for(var i = 0;; i++) {//this loop should always terminate assuming the well-foundedness of the system
				for(var j = 0;; j++) {
					var expanded = expand(max_std_above,j)
					if(compare(expanded,sOut_)) {
						max_std_above = expanded
						break
					}
					if(expanded.length>sOut_.length) {
						return 'lim'
					}
				}
				if(compare(sOut_,max_std_above)) {
					return sOut_
				}
			}
		}else {
			str_ = str_.toUpperCase().replaceAll(/[^0WC_]/g,'')
			if(str_.length==0) {
				return '0'
			}
			var N____ = deg(str_)
			var s2____ = fix(a_(str_,N____).replaceAll(/[^OCZ]/g,''))
			if(!std(s2____,N____)) {
				return 'lim'
			}
			str_ = rA_0(s2____,N____)
			if(compare(str_,expand('lim',N____))) {
				return 'lim'
			}
			return str_
		}
	}catch {return 'lim'}
}
function stickDiagram(a,b,x1,x2,h,doLabels) {
	var diff = x2-x1
	ctx.fillRect(Math.floor(x1),canvas.height/2-h/2,1,h)
	if(doLabels&&ctx.measureText(f(a,lab.value)).width<diff) {
		ctx.fillText(f(a,lab.value),x1,canvas.height/2-h/2)
	}
	if(Math.abs(diff)<1/2||b==undefined||b.length==0) {
		return 0
	}
	var arrN = getFundamentalSequence(a,b,Math.log2(diff)+1)
	for(var i = 0; i<=arrN.length; i++) {
		if(i==0) {
			stickDiagram(a,arrN[0],x1,(x1+x2)/2,h,false)
		}else {
			stickDiagram(arrN[i-1],arrN[i],x2-diff/(2**i),x2-diff/(2**(i+1)),h/(2**i),doLabels_)
		}
	}
}
function getFundamentalSequence(a,b,l) {
	if(a.toString()==b.toString()) {
		return []
	}
	var arr_ = [a]
	var n = 0
	for(var i = 0; arr_.length<=l;i++) {
		//console.log(JSON.stringify(a),JSON.stringify(b),i)
		var bobby = expand(b,i)
		//console.log(JSON.stringify(a),JSON.stringify(bobby),compare(a,bobby))
		if(n>15) {
			break
		}
		if(compare(a,bobby)||compare(arr_[arr_.length-1],bobby)) {
			if(compare(bobby,a)) {
				n++
			}
			continue
		}
		n = 0
		arr_.push(bobby)
	}
	arr_.shift()
	return arr_
}
function expand(arr,n) {
	return ex_(arr,n,true)
}
function f(x,lv) {
	if(!lv) {
		lv = 'a'
	}
	if(x=='lim') {
		return x
	}
	if(thing=='0Y'||thing=='Y'||thing=='wY'||thing=='PrSS') {
		if(x[1]>2||lv=='a') {
			return x+''
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
	if(thing!=sel.value) {
		if(inp1.value.length!=0) {
			MinOrd = conv(MinOrd,thing,sel.value)
		}
		MaxOrd = conv(MaxOrd,thing,sel.value)
		thing=sel.value
		if(inp1.value.length!=0) {
			inp1.value = f(MinOrd)
			if(MinOrd=='lim') {
				inp1.value = ''
				MinOrd = toNot(inp1.value)
			}
		}
		inp2.value = f(MaxOrd)
		if(inp1.value.length==0) {
			MinOrd = toNot(inp1.value)
		}
	}else {
		MinOrd = toNot(inp1.value)
		if(inp1.value.length!=0) {
			inp1.value = f(MinOrd)
		}
		MaxOrd = toNot(inp2.value)
		inp2.value = f(MaxOrd)
	}
	if(lab.value=='n') {
		doLabels_ = false
	}else {
		doLabels_ = true
	}
	ctx.fillStyle = 'black'
	ctx.fillRect(0,0,canvas.width,canvas.height)
	ctx.fillStyle = 'white'
	if(compare(MinOrd,MaxOrd)) {
		inp1.value = ''
		MinOrd = toNot(inp1.value)
	}
	try {
		stickDiagram(MinOrd,MaxOrd,0,canvas.width,canvas.height,doLabels_)
	}catch {
		inp2.value = 'lim'
		stik_(a)
	}
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
function conv(not,n1,n2) {
	if(not=='lim') {
		if(n1=='PrSS'&&n2=='TONM') {
			return 'W'
		}
		if(n1=='PrSS'&&n2=='BMS') {
			return [[],[1n,1n]]
		}
		if(n1=='PrSS'&&n2=='0Y') {
			return [1n,3n]
		}
		if(n1=='TONM'&&n2=='0Y') {
			return [1n,4n,9n,10n]
		}
		if(n1=='TONM'&&n2=='BMS') {
			return [[],[1n,1n,1n],[2n,2n,1n],[3n]]
		}
		if((n1=='BMS'||n1=='0Y')&&(n2=='Y'||n2=='wY')) {
			return [1n,3n]
		}
		if(n1=='TONM'&&(n2=='Y'||n2=='wY')) {
			return [1n,2n,4n,8n,14n,15n]
		}
		if(n1=='PrSS'&&(n2=='Y'||n2=='wY')) {
			return [1n,2n,4n]
		}
		if(n1=='Y'&&n2=='wY') {
			return [1n,4n]
		}
		return 'lim'
	}
	if(compare(not,conv('lim',n2,n1))) {
		return 'lim'
	}
	if(n1=='BMS'&&n2=='PrSS') {
		for(var i = 0; i<not.length&&not[i].length<2; i++){}
		if(i==not.length) {
			var N2 = []
			for(var j = 0; j<not.length; j++) {
				N2[j] = 0n
				if(not[j].length>0) {
					N2[j] = not[j][0]
				}
			}
			return N2
		}else {
			return 'lim'
		}
	}if(n2=='BMS'&&n1=='PrSS') {
		var N2 = []
		for(var i = 0; i<not.length; i++) {
			N2[i] = []
			if(not[i]!=0) {
				N2[i] = [not[i]]
			}
		}
		return N2
	}if(n1=='PrSS'&&(n2=='0Y'||n2=='Y'||n2=='wY')) {
		return conv(conv(not,'PrSS','BMS'),'BMS','0Y')
	}if(n1=='BMS'&&n2=='0Y') {
		return BMSt0Y(not)
	}if((n1=='0Y'||n1=='Y'||n1=='wY')&&n2=='PrSS') {
		return conv(conv(not,'0Y','BMS'),'BMS','PrSS')
	}if(n1=='0Y'&&n2=='BMS') {
		var max_std_above = 'lim'
		for(var i = 0;; i++) {
			for(var j = 0;; j++) {
				var expanded = BMS(max_std_above,j)
				if(compare(conv(expanded,n2,n1),not,n1)) {
					max_std_above = expanded
					break
				}
			}
			if(compare(not,conv(max_std_above,n2,n1),n1)) {
				return max_std_above
			}
		}
	}
	return 'lim'
}
function ex_() {
	switch(sel.value) {
		case 'Y':
		return Y.apply(null,arguments)
		break
		case 'wY':
		return wY.apply(null,arguments)
		break
		case '0Y':
		return _0Y.apply(null,arguments)
		break
		case 'BMS':
		return BMS.apply(null,arguments)
		break
		case 'TONM':
		return TONM.apply(null,arguments)
		break
		case 'PrSS':
		return PrSS.apply(null,arguments)
		break
	}
}
function compare(n1,n2,ntype) {//>=
	if(n1=='lim') {
		return true
	}
	if(n2=='lim') {
		return false
	}
	if(!ntype) {
		ntype = thing
	}
	if(n1.length==0) {
		return n2.length==0
	}
	if(n2.length==0) {
		true
	}
	if(ntype=='0Y'||ntype=='Y'||ntype=='wY'||ntype=='PrSS') {
		return lex(n1,n2,((a,b)=>(a-b)))>=0
	}else if(ntype=='BMS') {
		for(var i = 0; i<n1.length; i++) {
			if(n1[i][n1[i].length-1]==0) n1[i].pop()
		}
		for(var i = 0; i<n2.length; i++) {
			if(n2[i][n2[i].length-1]==0) n2[i].pop()
		}
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
	return 0
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