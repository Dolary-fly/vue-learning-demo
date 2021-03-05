var app = new Vue({
	el: "#app",
	data: {
		keywords: '',
		songurl: '',
		zjcover: '',
		runflag: false,
		songsarr: [],
		commentarr: []
	},
	methods: {
		searchsong: function () {
			var that = this;
			axios.get('http://musicapi.leanapp.cn/search?keywords=' + this.keywords).then(function (
				response) {
				console.log(response.data.result.songs);
				that.songsarr = response.data.result.songs;
			})
		},
		playsong: function (songid, albumid) {
			var that = this;
			this.songurl = "https://music.163.com/song/media/outer/url?id=" + songid + ".mp3";
			axios.get('http://musicapi.leanapp.cn/album?id=' + albumid).then(function (response) {
				console.log(response.data.album.picUrl);
				that.zjcover = response.data.album.picUrl;
			}, function (err) {
				console.log("wrong");
			});
			// 更改animation-play-state的值
			var aArr = document.getElementsByClassName("autoRotate");
			if (this.runflag == false) {
				aArr[0].style.animationPlayState = "running";
				aArr[1].style.animationPlayState = "running";
				runflag = true;
			}
			axios.get("http://musicapi.leanapp.cn/comment/music?id=" + songid).then(function (response) {
				console.log(response.data.hotComments);
				that.commentarr = response.data.hotComments;
			}, function (err) {

			})
		},
		postbyaxios: function () {
			axios.post("http://autumnfish.cn/api/user/reg", {
				username: 'jack'
			}).then(function (response) {
				this.city
				console.log(response);
			})
		}
	}
})



var longestPalindrome = function (s) {

	// 暴力解法
	// var res=s.slice(0,1);
	// for(let i=0;i<s.length;i++){

	// 		for(let j=i+1;j<=s.length;j++){
	// 				let str=s.slice(i,j);
	// 				let strreverse=str.split('').reverse().join('');
	// 				if(strreverse==str&&str.length>res.length){
	// 						res=str;
	// 				}
	// 		}
	// }
	// return res;

	// 动态规划
	var maxlen = 1;
	var begin = 0;

	//声明了一个二维数组
	var dp = new Array(); //先声明一维
	for (var k = 0; k < s.length; k++) { //一维长度为i,i为变量，可以根据实际情况改变
		dp[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
		for (var j = 0; j < s.length; j++) { //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
			dp[k][j] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
		}
	}
	for (let i = 0; i < s.length; i++) { //初始化，对角线上都是单个字符，因此都是回文
		dp[i][i] = true;
	}

	for (let j = 1; j < length; j++) {
		for (let i = 0; i < j; i++) {
			if (s[i] != s[j]) {
				dp[i][j] = false;
			} else if (j - i < 3) {
				dp[i][j] = true;
			} else {
				dp[i][j] = dp[i + 1][j - 1];
			}
		}

		if (dp[i][j] && j - i + 1 > maxlen) {
			maxlen = j - i + 1;
			res = s.slice(i, j + 1);
		}
	}


	return res;

};