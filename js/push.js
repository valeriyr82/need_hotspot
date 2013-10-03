window.left_open =0;
window.right_open = 0;
$(document).ready(function(){

$(window).resize(function(){

$('.sidebar-right').css({

'-webkit-transform':'translate3d('+$(window).width()+'px, 0, 0)'


})

})

$('.sidebar-right').css({

'-webkit-transform':'translate3d('+$(window).width()+'px, 0, 0)'


})
	$('.deploy-left-sidebar, .close-sidebar-left, .close-bottom-left, .close-bottom-right, .deploy-subscribe-form, .deploy-contact-form').click(function(){	return false;	})
	

	///////////////////////
	//Deploy Left Sidebar//
	///////////////////////
   $(".content-box,.header,.footer").on('click touchstart',function(){
		window.left_open =0;
		window.right_open = 0;
		$(".wrapper").css({'-webkit-transform':'translate3d(0,0,0)'})
       		$('.deploy-left-sidebar').removeClass('deploy-left-sidebar-active')
		$('.deploy-right-sidebar').removeClass('deploy-right-sidebar-active')

       
    });
	$(".close-sidebar-left, .close-bottom-left").click(function(){        
        $('.sidebar-left').animate({
            left: '-367px',
        }, 275, function () {});
        return false;
    });
	///////////////////////
	//Deploy Left Sidebar//
	///////////////////////
   $(".deploy-left-sidebar").on('click touchstart',function(){
if(left_open == 0){
$(".wrapper").css({'-webkit-transform':'translate3d(367px,0,0)'})
       // $('.sidebar-left').addClass('leftSlide');
       		$('.deploy-left-sidebar').addClass('deploy-left-sidebar-active')

        
left_open = 1
        return false;


}
else {

$(".wrapper").css({'-webkit-transform':'translate3d(0,0,0)'})
		$('.deploy-left-sidebar').removeClass('deploy-left-sidebar-active')

       
left_open=0;

}
    });

	//////////////////////
	//Close Left Sidebar//
	//////////////////////

    

	////////////////////////
	//Deploy Right Sidebar//
	////////////////////////
$('.deploy-right-sidebar').on('click touchstart',function(){
	
		if(right_open == 0){
		$(".wrapper").css({'-webkit-transform':'translate3d(-367px,0,0)'})

		$('.deploy-right-sidebar').addClass('deploy-right-sidebar-active')
				
		right_open = 1;
				return false;

		}
		else {

		$(".wrapper").css({'-webkit-transform':'translate3d(0,0,0)'})
		$('.deploy-right-sidebar').removeClass('deploy-right-sidebar-active')

				
		right_open = 0;
		}
	
    });
	
	///////////////////////
	//Close Right Sidebar//
	///////////////////////

   
	

});












