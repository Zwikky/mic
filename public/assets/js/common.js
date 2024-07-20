//---------------------- Start Bootstrap Tooltip ----------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


//--------------------- Start Data Table -------------------------
       // $(document).ready(function () {
//            $('#DT_load').DataTable();
//			"scrollY":        "200px",
//        	"scrollCollapse": true,
//			fixedHeader: true,
//        });
		
		$(document).ready(function() {
    	$('#DT_load').DataTable( {
        "scrollY":        "330px",
        "scrollCollapse": true,
        //"paging":         false,
		"pagingType": "full_numbers"
    } );
} );

//------------------------- Start Advance Search --------------------
    $(".ShowSearch").click(function () {
	$(".AdvSearchMask").show();
	});
	
	//$(document).click(function (e) {
	//	if (!$(e.target).hasClass("ShowSearch") 
	//		&& $(e.target).parents(".AdvSearchMask").length === 0) 
	//	{
	//		$(".AdvSearchMask").hide();
	//	}
	//});

//#region Auto Search
$(document).ready(function(){
 $(".AutoSearchflip").click(function () {
	$(".AutoSearch_List").show();
	});
 
 $(".AutoSearchflip1").click(function () {
	$(".AutoSearch_List1").show();
	});
 
 $(".AutoSearchflip2").click(function () {
	$(".AutoSearch_List2").show();
	});
 
 $(".AutoSearchflip3").click(function () {
	$(".AutoSearch_List3").show();
	});
 
 $(".AutoSearchflip4").click(function () {
	$(".AutoSearch_List4").show();
	});
 
 $(".AutoSearchflip5").click(function () {
	$(".AutoSearch_List5").show();
	});
});
 
	$(document).click(function (e) {
		if (!$(e.target).hasClass("AutoSearchflip") 
			&& $(e.target).parents(".AutoSearch_List").length === 0) 
		{
			$(".AutoSearch_List").hide();
		}
		
		if (!$(e.target).hasClass("AutoSearchflip1") 
			&& $(e.target).parents(".AutoSearch_List1").length === 0) 
		{
			$(".AutoSearch_List1").hide();
		}
		
		if (!$(e.target).hasClass("AutoSearchflip2") 
			&& $(e.target).parents(".AutoSearch_List2").length === 0) 
		{
			$(".AutoSearch_List2").hide();
		}
		
		if (!$(e.target).hasClass("AutoSearchflip3") 
			&& $(e.target).parents(".AutoSearch_List3").length === 0) 
		{
			$(".AutoSearch_List3").hide();
		}
		
		if (!$(e.target).hasClass("AutoSearchflip4") 
			&& $(e.target).parents(".AutoSearch_List4").length === 0) 
		{
			$(".AutoSearch_List4").hide();
		}
		
		if (!$(e.target).hasClass("AutoSearchflip5") 
			&& $(e.target).parents(".AutoSearch_List5").length === 0) 
		{
			$(".AutoSearch_List5").hide();
		}
	});
//#endregion	
//------------------ Start  Date Picker -------------------
    $(function () {
      $(".DatePick").datepicker({
		changeMonth: 'true',
      	changeYear: 'true',
		dateFormat: 'dd/mm/yy',
		});
    });
	
	
//--------------------- Start Left Menu Trogle --------------------
        function imagefun() {
            var Image_Id = document.getElementById('getImage');
			if (Image_Id.src.match("/Assets/images/leftmenu-arrow-right.png")) {
				Image_Id.src = "/Assets/images/leftmenu-arrow.png";
            }
            else {
				Image_Id.src = "/Assets/images/leftmenu-arrow-right.png";
            }
        }        

    
//------------------ Start Hide & Show Div -----------------
	function show(target) {
   		document.getElementById(target).style.display = 'block';
	}
	function hide(target) {
		document.getElementById(target).style.display = 'none';
	}

//------------------------- Start wizard picture  --------------------

$(document).ready(function(){
		$("#wizard-picture").change(function(){
			readURL(this);
		});
	});
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
	
			reader.onload = function (e) {
				$('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

//#region Start Multiselect 
jQuery('.MedicalConditions').multiselect({
    columns: 1,
    placeholder: 'Select',
    search: true,
	//selectAll: true
});

//#endregion



//---------------------- Start Tab Next & Previous ----------------------
		function NextTab(id) {
			debugger;
			var previousid = id - 1;
			$("#tabpanel" + previousid).removeClass('active');
			$("#navTab" + previousid).removeClass('show active');
			$("#tabpanel" + id).addClass('active');
			$("#navTab" + id).addClass('show active');
		}
		function PreviousTab(id) {
			debugger;
			var previousid = id + 1;
			$("#tabpanel" + previousid).removeClass('active');
			$("#navTab" + previousid).removeClass('show active');
			$("#tabpanel" + id).addClass('active');
			$("#navTab" + id).addClass('show active');
		}

////#region---------------------- Div Hide 5 Seconds  ---------------------
//$(function () {
//	setTimeout(function () { $(".SucessMsg").fadeOut(1500); }, 2000)
//})
////#endregion


