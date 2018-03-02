var rn1=0;
var rn2=0;
var rn3=0;
var rn4=0;
function stopPropagation(e) {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}


$(function () {
	$("#cancle").click(function(){ 
		$(".show").hide();
	})

	$(".maimglst a").bind("click",function(){
		var imgtype=$(this).parent().attr("title");
		$(".img-type").text(""+imgtype+"");
		
		var aratio=$(this).parent().attr("aratio");
		if(aratio&&aratio!=""){
			$(".img-type").attr("aratio",aratio);
		}else{
			$(".img-type").removeAttr("aratio");
		}
	});
	$("#poster-inputs").bind("click",function(){
		$(".img-type").text("qjdfm");
		var aratio="4";
	});
	'use strict';
	var console = window.console || { log: function () {} },
		$alert = $('.docs-alert'),
		$message = $alert.find('.message'),
		showMessage = function (message, type) {
			$message.text(message);
			if (type) {
				$message.addClass(type);
			}
			$alert.fadeIn();
			setTimeout(function () {
				$alert.fadeOut();
			}, 3000);
		};
	// Demo
	// -------------------------------------------------------------------------
	(function () {
		var $image = $('.img-container > img'),
        $dataX = $('#dataX'),
        $dataY = $('#dataY'),
        $dataHeight = $('#dataHeight'),
        $dataWidth = $('#dataWidth'),
        $dataRotate = $('#dataRotate'),
        options = {
			minContainerWidth:$(".modal-dialog .modal-body>div").css("width"),
			minContainerHeight: $(".modal-dialog .modal-body>div").css("height"),
			preview: '.img-preview',
			crop: function (data) {
				//console.log(data);
				$dataX.val(Math.round(data.x));
				$dataY.val(Math.round(data.y));
				$dataHeight.val(Math.round(data.height));
				$dataWidth.val(Math.round(data.width));
				$dataRotate.val(Math.round(data.rotate));
			}
        };
		$image.on({
			'build.cropper': function (e) {
				//console.log(e.type);
			},
			'built.cropper': function (e) {
				//console.log(e.type);
			},
			'dragstart.cropper': function (e) {
				//console.log(e.type, e.dragType);
			},
			'dragmove.cropper': function (e) {
				//console.log(e.type, e.dragType);
			},
			'dragend.cropper': function (e) {
				//console.log(e.type, e.dragType);
			},
			'zoomin.cropper': function (e) {
				//console.log(e.type);
			},
			'zoomout.cropper': function (e) {
				//console.log(e.type);
			}
		}).cropper(options);
    	// Methods
		$(".show").on('click', '[data-method]', function () {
			// var index = l	ayer.load(1, {shade: [0.8,'#000']});
			var data = $(this).data(),
			$target,
			result;
			if (data.method) {
				data = $.extend({}, data); // Clone a new one
				if (typeof data.target !== 'undefined') {
					$target = $(data.target);
					if (typeof data.option === 'undefined') {
						try {
							data.option = JSON.parse($target.val());
						} 
						catch (e) {
							console.log(e.message);
						}
					}
				}
				var type=$(".img-type").text().replace(/\s/g, "")
				if((typeof $(".cropper-canvas img").attr("src"))==='undefined'){
					return false;
				}
				result = $image.cropper(data.method, data.option);
				var ohtml = $(result).outerHtml();
				if( ohtml&&ohtml.indexOf("canvas")>=0  ){
					var layJuH = layer.load(2, {shade: [0.2,'#000'],skin: 'loadbg'});;
				}else{
					layer.closeAll('loading');
					return false;
				}	
				
				
				
				
						lrz(result.toDataURL())
				        	.then(function (rst) {
				        		 //0代表加载的风格，支持0-2
				        			// window.open(rst.base64)
				        			 var das="";
				        			 var type=$(".img-type").text().replace(/\s/g, "");
				        			 var userId = $("#userId").val();
				        			 var compressfmt = $("#compressfmt").val();
						      			$.ajax({
											url: '/upload/c',
											type:'post',
											data: {
											"pic":rst.base64,
											"name":type,
											"compressfmt":compressfmt,
											'uid':userId
											},
											dataType:"json",
											success:function(data){
												
												var imgUrl = data.url;
												console.log("SUCCESS===="+imgUrl);
												var name = data.name;
												if(name == "resImg"){/** tb_res.img */
													$(".resImg img").attr("src", imgUrl);
													$(".resImg input").attr("value", imgUrl);
												}else if(name == "resChildImg"){/** tb_res_attrib.prdpic(X) */
													var childHtml = '<a href="javscript:;" class="productimg mr-15 resImgInfo">'+
																		'<img src="'+imgUrl+'" alt="" class="uploadimg">'+
																		'<i class="img-close icon-remove-sign f-16"></i>'+
																		'<input type="hidden" >'+
																		'<input type="hidden" value="'+imgUrl+'">'+
																	'</a>';		
													$(".resChildImg").append(childHtml);
													if($(".resChildImg .uploadimg").length>3){
														$(".resChildImg .productimg").eq(0).hide();
													}
												}else if(name == "userImg"){/** tb_user.img */
													setUImg(imgUrl);
												}else if(name == "comlogo"){/** 公司LOGO */
													$("img[name='comlogo']").attr("src", imgUrl);
													$("input[name='ac.logo']").val(imgUrl);
												}else if(name == "businessLicense"){/** 公司营业执照 */
													$("img[name='businessLicense']").attr("src", imgUrl);
													$("input[name='ac.business_license']").val(imgUrl);
												}
												
												
												$(".show").hide();
												
												$(".close").click();
												$(".cropper-container.cropper-bg").remove();
												$(".img-container img").removeClass("cropper-hidden");
												
												layer.closeAll('loading');
											},
											error:function(){
												//error
												alert('图片保存失败');
												layer.closeAll('loading');
											}
										})
					        })
					        .catch(function (err){
					        	layer.closeAll('loading');
					        	 // console.log(err)
					            // 处理失败会执行
					        })
					        .always(function () {
					        	// console.log(1)
					            // 不管是成功失败，都会执行
					        });
				if ($.isPlainObject(result) && $target) {
					try {
						$target.val(JSON.stringify(result));
					} 
					catch (e) {
						console.log(e.message);
					}
				}
			}
		}).on('keydown', function (e) {
			var imgRatio= $(".img-type").attr("aratio");
			if(imgRatio){
				switch (e.which) {
					case 37:
						e.preventDefault();
						$image.cropper('move', -1, 0).cropper('aspectRatio',"1/1");
						break;
					case 38:
						e.preventDefault();
						$image.cropper('move', 0, -1).cropper('aspectRatio',"1/1");
						break;
					case 39:
						e.preventDefault();
						$image.cropper('move', 1, 0).cropper('aspectRatio',"1/1");
						break;
					case 40:
						e.preventDefault();
						$image.cropper('move', 0, 1).cropper('aspectRatio',"1/1");
						break;
				}
			}else{
				switch (e.which) {
					case 37:
						e.preventDefault();
						$image.cropper('move', -1, 0);
						break;
					case 38:
						e.preventDefault();
						$image.cropper('move', 0, -1);
						break;
					case 39:
						e.preventDefault();
						$image.cropper('move', 1, 0);
						break;
					case 40:
						e.preventDefault();
						$image.cropper('move', 0, 1);
						break;
				}
			}
			
		});
		// Import image
		var $inputImage = $('#inputImage'),
			URL = window.URL || window.webkitURL,
			blobURL;
		if (URL) {
			$inputImage.change(function (e) {
				//图片方向角 added by lzk
				var Orientation = null;
				var files = this.files,file;
				if (files && files.length) {
					file = files[0];
					if (/^image\/\w+$/.test(file.type)) {
						//获取照片方向角属性，用户旋转控制
						EXIF.getData(file, function() {
							EXIF.getAllTags(this); 
							Orientation = EXIF.getTag(this, 'Orientation');
						});
						
						var oReader = new FileReader();
						oReader.onload = function(e) {
							var image = new Image();
							image.src = e.target.result;
							image.onload = function() {
								var expectWidth = this.naturalWidth;
								var expectHeight = this.naturalHeight;
								
								if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
									expectWidth = 800;
									expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
								} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
									expectHeight = 1200;
									expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
								}
								var canvas = document.createElement("canvas");
								var ctx = canvas.getContext("2d");
								canvas.width = expectWidth;
								canvas.height = expectHeight;
								ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
								var base64 = null;
								var mpImg = new MegaPixImage(image);
								mpImg.render(canvas, {
									maxWidth: 800,
									maxHeight: 1200,
									quality: 0.8,
									orientation: Orientation
								});
									
								base64 = canvas.toDataURL("image/jpeg", 0.8);
								if (navigator.userAgent.match(/iphone/i)) {
									console.log('iphone');
								}else if (navigator.userAgent.match(/Android/i)) {// 修复android
								}else{
								}
								var boburl=dataURLtoBlob(base64);
								blobURL = URL.createObjectURL(boburl);
								console.log(blobURL)
								
								var imgtio=$(".img-type").attr("aratio");
								console.log(imgtio)
								if(imgtio&&imgtio!=""){
									if(imgtio==1){
										$image.cropper("setAspectRatio",1/1);
									}else{
										$image.cropper("setAspectRatio",imgtio);
									}
								}else{
									$image.cropper("setAspectRatio", NaN);
								}
								$image.one('built.cropper', function () {
									URL.revokeObjectURL(blobURL); // Revoke when load complete
								}).cropper('reset', true).cropper('replace', blobURL);
								
								$inputImage.val('');
							}
						}
						oReader.readAsDataURL(file);
					}else {
					}
				}
			});
		} 
		else {
			$inputImage.parent().remove();
		}
		$('.docs-options :checkbox').on('change', function () {
			var $this = $(this);
			options[$this.val()] = $this.prop('checked');
			$image.cropper('destroy').cropper(options);
		});
		//$('[data-toggle="tooltip"]').tooltip();
	}());
});
