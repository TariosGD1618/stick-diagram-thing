function BMS(arr,n) {
	if(arr=='lim') {
		var outArr = [[],[]]
		for(var i = 0; i<n; i++) {
			outArr[1].push(1)
		}
		return outArr
	}
	var arr2 = JSON.parse(JSON.stringify(arr.slice(0,-1)))
	if(n==1) {
		return arr2
	}
	var s = 0
	for(var i of arr) {
		if(i.length==0) {
			continue
		}
		while(i[i.length-1]==0) {
			i.pop()
		}
		s = Math.max(s,i.length)
	}
	if(arr[arr.length-1].length==0) {
		arr.pop()
		return arr
	}
	function p(X,Y) {
		var X2 = X
		if(Y==0) {
			while(arr[X2][Y]>=arr[X][Y]&&X2>-1) {
				X2--
			}
		}else {
			var bobbo = false
			while(nAt(X2,Y)>=nAt(X,Y)&&X2>-1) {
				X2 = p(X2,Y-1)
			}
		}
		return X2
	}
	function nAt(A,B) {
		try {
			return arr[A].length>B?arr[A][B]:0
		}catch {
			return 0
		}
	}
	var t = arr[arr.length-1].length-1
	console.log(t)
	var badRoot = p(arr.length-1,arr[arr.length-1].length-1)
	var goodPart = JSON.parse(JSON.stringify(arr.slice(0,badRoot)))
	var badPart = JSON.parse(JSON.stringify(arr.slice(badRoot,-1)))
	arr2 = goodPart
	if(n==0) {
		return goodPart
	}
	var arr3 = []
	for(var i = 0; i<badPart.length; i++) {
		arr3.push([])
		for(var j = 0; j<t; j++) {
			arr3[i][j] = 0
			var a_ = arr[arr.length-1][j]-nAt(badRoot,j)
			if(i==0) {
				arr3[i][j] = a_
				continue
			}
			var i2 = badRoot+i
			while(i2>0) {
				i2 = p(i2,j)
				if(i2==badRoot) {
					arr3[i][j] = a_
					break
				}
			}
		}
	}
	for(var i = 0; i<n; i++) {
		for(var j = 0; j<badPart.length; j++) {
			var arrIns = JSON.parse(JSON.stringify(badPart[j]))
			for(var k = 0; k<t; k++) {
				if(k>=arrIns.length) {
					arrIns.push(0)
				}
				arrIns[k]+=i*arr3[j][k]
			}
			while(arrIns[arrIns.length-1]==0) {
				arrIns.pop()
			}
			arr2.push(arrIns)
		}
	}
	return arr2
}