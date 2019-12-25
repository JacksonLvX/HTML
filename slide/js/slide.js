$(function(){
	var $li=$('.slide_list li');
	
	//防止暴力操作开关
	var ismove = false;

	var nowli = 0; //即将要过来的幻灯片下标
	var prevli =0; //当前要走的幻灯片下标

	var $points_con = $('.points')
	//动态加载小圆点，首先获取幻灯片张数，有几张加几个小圆点
	var $len=$li.length;
	
	for(var i=0;i<$len;i++){
		var $newli = $('<li>');
		//默认第一个小圆点添加样式
		if(i==0){
			$newli.addClass('active');
		}
		$newli.appendTo($points_con);
	}

	$li.not(':first').css({'left':760});

	var $points=$('.points li');


	$points.click(function(){
		nowli=$(this).index();
		//如果点当前幻灯片小圆点，不做任何操作
		if(nowli==prevli){ 
			return;
		}
		// alert(nowli);
		move();
		//点击小圆点时添加样式
		$(this).addClass('active').siblings().removeClass('active');
	})

	//获取向前向后的箭头
	var $prev = $('.prev');
	var $next = $('.next');

	//点击向前箭头操作
	$prev.click(function() {
		//防止暴力操作
		if(ismove){
			return;
		}
		ismove=true;

		nowli--;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	});
	$next.click(function(){
		//防止暴力操作
		if(ismove){
			return;
		}
		ismove = true;

		nowli++;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	});

	//自动播放功能
	var $slide = $('.slide');
	function autoplay(){
		nowli++;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	}
	timer = setInterval(autoplay,3000);

	$slide.hover(function() {
		clearInterval(timer);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		timer=setInterval(autoplay,3000);
	});




	function move(){

		//针对向前向后箭头到边界时的操作

		if(nowli<0){
			nowli=$len-1;
			prevli=0;
			
			$li.eq(nowli).css({'left':-760});
			$li.eq(nowli).animate({'left':0},300);
			$li.eq(prevli).animate({'left':760},300,function(){
				ismove=false;
			});
			prevli=nowli;

			return ;
		}
		if(nowli>$len-1){
			nowli=0;
			prevli=$len-1;

			$li.eq(nowli).css({'left':760});
			$li.eq(nowli).animate({'left':0},300);
			$li.eq(prevli).animate({'left':-760},300,function(){
				ismove=false;
			});
			prevli=nowli;

			return;
		}



		if(nowli>prevli){ //如果从小到大点击 
			//把即将要过来的幻灯片放到右边
			$li.eq(nowli).css({'left':760});


			// $li.eq(nowli).animate({'left':0},300);
			$li.eq(prevli).animate({'left':-760},300);

			// prevli=nowli;
			// alert(prevli)
		}else{ //如果从大到小点击
			$li.eq(nowli).css({'left':-760});

			// $li.eq(nowli).animate({'left':0},300);
			$li.eq(prevli).animate({'left':760},300);

			// prevli=nowli;
			// alert(prevli)
		}

		//缩减代码
		$li.eq(nowli).animate({'left':0},300,function(){
			ismove=false;
		});
		prevli=nowli;
	}

});