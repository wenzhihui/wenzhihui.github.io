window.onload=function(){
	banner();
}
//公共方法
function addTransition(obj){
	obj.style.transition="all .5s";
	obj.style.webkitTransition="all .5s";
}

function removeTransition(obj){
	obj.style.transition="none";
	obj.style.webkitTransition="none";
}

function setTranslate(obj,translateX){
	obj.style.transform="translateX("+translateX+"px)";
	obj.style.webkitTransform="translateX("+translateX+"px)";
}

function addEvent(obj,callback){
	obj.addEventListener("transitionend",callback);
	obj.addEventListener("webkitTransitionend",callback);
}



	
	
function banner(){
	//获取dom元素
	var banner =document.querySelector(".zjr_banner");
	//获取宽度
	var width =banner.offsetWidth;
	//获取图片盒子
	var imagBox=banner.querySelector("ul:nth-child(1)")
	//获取小圆点盒子 
	var pointBox=banner.querySelector("ul:last-child");
	//获取所有的小圆点
	var points=pointBox.querySelectorAll("li");
	console.log(points);
	console.log(width);
	
	
	var index = 1;
	//自动轮播
	var timer=setInterval(function(){
		index++;
		var translate = -index*width;
		addTransition(imagBox);
		setTranslate(imagBox,translate);
		
	},3000)
	addEvent(imagBox,function(){
		if(index>=5){
			index=1;
			//清楚过渡
			removeTransition(imagBox);
			setTranslate(imagBox,-index*width);
		}else if(index<=0){
			index=5
		}
		
		setPoint();
	})
	
	function setPoint(){
	for(var i=0;i<points.length;i++){
		points[i].className="";
			
	}
	points[index-1].className="xyd";
	}
	
	//图片能滑动
	var startX=0;
	var moveX=0;
	var distanceX=0;
	var isMove =false;
	//如果distanceX=moveX - stanrtX
	//如果为正：右滑  index--
	//如果为负：左滑  index++
	
	imagBox.addEventListener('touchstart',function(){
		startX =event.touches[0].clientX;
	})
	
	imagBox.addEventListener('touchmove',function(){
		removeTransition(imagBox);
		moveX =event.touches[0].clientX;
		distanceX=moveX-startX;
		var translate = -index*width+distanceX;
		setTranslate(imagBox,translate);
	})
	
	imagBox.addEventListener('touchend',function(){
		//滑动不超过一定的距离，吸附回去
		if(Math.abs(distanceX)>width/2){
			//滑动 超过1/2，滚动到下一张或上一张
			if(distanceX>0){
				index--
			}else if(distanceX){
				index++
			}
		}
		
		addTransition(imagBox);
		setTranslate(imagBox,-index*width);
		clearInterval(timer);
		timer=setInterval(function(){
			index++;
			var translate=-index*width;
			addTransition(imagBox);
			setTranslate(imagBox,translate);
		},3000)
	})
}


var remenApp=angular.module('remenApp',[]);
remenApp.controller('remenController',['$scope','$http',function($scope,$http){
	$http({
		url:'index.json'
	}).then(function(d){
		$scope.data=d.data;
//		$scope.artists=d.data[0].artists;
		console.log($scope.data)
	});
}]);

