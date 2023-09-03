function deg(str) {
	var out_ = 0
	for(var i = 0; i<str.length&&i>=0; i++) {
		i = str.indexOf('W',i)
		if(i<0) {
			break
		}
		var j = 0
		while(str[i+j+1]=='_') {
			j++
		}
		if(j>out_) {
			out_ = j
		}
	}
	return out_
}
function a_(str,n) {
	for(var i = 0; i<str.length&&i>=0;) {
		i = str.indexOf('W',i)
		if(i<0) {
			break
		}
		var j = 0
		while(str[i+j+1]=='_') {
			j++
		}
		var s2 = 'W'.padEnd(n-j+1,'C').padStart(2*(n-j)+1,'0')
		str = str.slice(0,i)+s2+str.slice(i+j+1)
		i+=s2.length
	}
	return str.replaceAll('0','O').replaceAll('W','Z')
}
function thin(str_) {
	return str_.replaceAll('0','1').replaceAll('C','0').replaceAll('W','2')
}
function rA_0(str,n) {
	return rA_(str.replaceAll('O','0').replaceAll('Z','W'),n)
}
function rA_(str,n) {
	if(n==0) {
		return str
	}
	str = str.replaceAll('W','W_')
	str = str.replaceAll('0W_C','W')
	return rA_(str,n-1)
}
function pre(a){let X=[];for(i of a)i=='C'?X.push([X.pop(),X.pop()]):X.push(i);return X[0]}
function post(a){return a.length<2?a:`${post(a[1])}${post(a[0])}C`}
function Cargs(a){return[post(pre(a)[0]),post(pre(a)[1])]}
function subterms(a){return a.length<2?[a]:[a].concat(subterms(post(pre(a)[0]))).concat(subterms(post(pre(a)[1])))}
function builtBelow(a,b,n){if(!n)return a<b;let l=[a],i=0;while(!(i>=l.length)){let t=l[i];if(i++,!builtBelow(t,b,n-1)){if(t>a)return!1;t.length>1&&(l=l.concat(Cargs(t).reverse()))}}return!0}
function fix(a){let b=0;for(i=0;i<a.length;i++)if(b+=(-1)**(a[i]=='C'),b==0)return a.slice(0,i);return a+'C'.repeat(Math.max(b-1,0))}
function sh(a,d){let x=0n,t=3n,r='';for(i of a)x=x*t+BigInt('COZ'.indexOf(i));for(x+=d;x;)r='COZ'[x%t]+r,x/=t;return r}
function std(a,n){if(a.length<2)return!0;let b=Cargs(a)[1],c=Cargs(a)[0];return!(!std(b,n)||!std(c,n)||b.length>1&&Cargs(b)[0]<c)&&builtBelow(c,a,n)}
function expand_(a,s,n) {let u=fix(a),l=a.length-1,q=0,m=-1n,i=0;while(u[l]=='C')l--;for(i=l+1;i<l+n+2;i++)for(q=sh(u.slice(0,i)+'C'.repeat(Math.max(i-u.length,0)),m);!std(fix(q),s);)u=fix(q),q=sh(q,m);return fix(q)}
function TONM(s,n) {
	if(s=='W') {
		n+=2
	}
	if(s=='lim') {
		return 'W'.padEnd(n+2,'_')
	}else {
		var N = deg(s)
		var s2 = a_(s,N)
		var bobby = expand_(s2,N,n)
		return rA_0(bobby,N)
	}
}