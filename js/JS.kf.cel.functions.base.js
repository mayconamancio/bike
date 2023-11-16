/**
* FunÃ§Ãµes base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.amazingMenu();
			Common.bannerResponsive();
			Common.bannersCount();
			Common.callCartLinkShow();
			// Common.shelfColors();
			// Common.buyInShelf();
			Common.floatBarMiniCart();
			// Common.smartyQuantity();
			// Common.smartyBuyButton();
			Common.smartCart();
			Common.cartAddProduct();
			Common.callSmartPrice();
		},
		ajaxStop: function() {
			// Common.smartyQuantity();
			// Common.smartyBuyButton();
			Common.callSmartPrice();
		},
		windowOnload: function() {
			Common.facebookLikebox();
		},
		buyInShelf: function() {
			var fn = function(){
				$(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous:not('.remove-href')").not('.qd-on-bb').addClass("show qd-on-bb").click(function(e) {
					e.preventDefault();
					var $t = $(this);

					Common.buyInShelfOpenModal($t.getParent(".wrapper-buy-button-asynchronous").find("input[class*='buy-button-asynchronous-product-url']" || "").attr("class").replace(/[^0-9]+/gi, ""), $t.getParent(".shelf-qd-v1-buy-button").find(".qd-sq-quantity").val() || 1);
				});
			};
			fn();

			// AÃ§Ãµes
			$(".qd-v1-modal").on("hidden.bs.modal", function(){
				$(this).removeClass("shelf-qd-v1-buy-button-modal");
			});

			// No callback do infinity scroll
			$(window).on("QuatroDigital.is_Callback", function(){
				fn();
			});
		},
		floatBarMiniCart: function() {
			var miniCart = $(".show-minicart-on-hover");
			$(".floating-qd-v1-content .header-qd-v1-cart-link").mouseenter(function() {
				miniCart.not(this).mouseover();
			});
		},
		buyInShelfOpenModal: function(productId, qty){
			var modal = $(".qd-v1-modal");

			modal.addClass("shelf-qd-v1-buy-button-modal");

			// Header
			var header = modal.find(".modal-header");
			var modalContent = header.closest(".modal-content");
			modalContent.addClass("buy-in-shelf-open-modal-custom");
			header.children(":not(.close)").remove();
			header.append('<h3>Escolha a variaÃ§Ã£o do produto</h3>');

			var iframe = $('<iframe src="/modal-sku?idproduto=' + productId + '&qty=' + qty + '" frameborder="0"></iframe>');
			modal.find(".modal-body").empty().append(iframe);
			modal.modal();

			iframe.load(function() {
				try{
					var $t = $(this);
					$t.height($t.contents().find("body").outerHeight(true) + 5);
				}
				catch(e){if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				modal.modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		},
		amazingMenu:function(){
			$('.header-qd-v1-main-amazing-menu').QD_amazingMenu();

			// Amazing Menu Responsivo
			$(".header-qd-v1-amazing-menu-toggle").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});

			$(".floating-qd-v1-call-amazing-menu").click(function() {
				$("body").toggleClass('qd-am-toggle');
			});

			var wrapperMobile = $(".header-qd-v1-main-amazing-menu-mobile-wrapper");

			wrapperMobile.QD_amazingMenu();

			wrapperMobile.find('> ul > li.qd-am-has-ul a[href="#"]').click(function(evt) {
				evt.preventDefault();
				$(this).parent().toggleClass('qd-am-dropdown-active');
			});

			wrapperMobile.after('<span class="btn-close-mobile"><i class="fa fa-times-circle"></i></span>');

			$(".btn-close-mobile").click(function(){
				$("body").removeClass('qd-am-on');
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/BikesKF" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/BikesKF"><a href="https://www.facebook.com/BikesKF">KF Bikes</a></blockquote></div></div>');
		},
		bannerResponsive : function(){
			$(".banner-qd-v1-responsive .box-banner a, .qd-placeholder .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr( "href", href.replace(/(col-)?(xs|sm|md|lg|hidden-xs|hidden-sm|hidden-md|hidden-lg)(-([0-9]{1,2}))?,?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : str );
					return "";
				}) );

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		callCartLinkShow: function() {
			if ($(window).width() < 750){
				$(".header-qd-v1-cart-link").click(function(evt) {
					evt.preventDefault();

					$(".v2-vtexsc-cart").toggleClass('cart-show');
				});
			}
		},
		smartyQuantity: function() {
			$(".shelf-qd-v1-buy-button").QD_smartQuantity({
				buyButton: ".btn-add-buy-button-asynchronous"
			});
			// $(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous").QD_smartQuantity();
		},
		shelfColors: function() {
			$(".prateleira").QD_coresPrateleira({
				checkDuplicateUri : false,
				groupSkuByDimension : false,
			});
		},
		smartyBuyButton: function() {
			$(".header-qd-v1-cart-link").QD_buyButton({
				buyButton: ".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous"
			});
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		smartCart: function() {
			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function(data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function() {
						wrapper.find(".qd-ddc-prodQtt").each(function() {
							var $t = $(this);
							$t.add($t.next('.qd-ddc-prodRemove')).wrapAll('<div class="qd-ddc-prodAction"></div>');
						});
					}
				},
				buyButton: {
					buyButton: ""
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$(".header-qd-v1-cart-link").click(function(evt) {
				console.log("clique do smart cart");
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		cartAddProduct: function() {
			var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('qd-v1-modal-add-product-cart modal').removeClass('qd-v1-modal');

			modal.find('.modal-body').append('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Produto adicionado com sucesso!</p>');

			$(window).on("cartProductAdded.vtex", function() {
				modal.modal();

				setTimeout(function() {
					modal.modal('hide');
				}, 8000);
			});
		},
		callSmartPrice: function() {
			var wrapper = $("li[layout]:not(.qd-smart-price-on)").addClass('qd-smart-price-on');
			if (!wrapper.length)
				return

			wrapper.find(".shelf-qd-v1-price").append('<div class="qd-sp-best-discount">com <span class="qd-sp-display-discount boleto">desconto no boleto</span></div>');
			wrapper.find(".shelf-qd-v1-price-detail").append('<div class="qd-sp-best-price">ou <span class="qd_displayPrice">R$ </span></div>');

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='boleto']",
				wrapperElement: wrapper,
				productPage:{
					isProductPage: false
				}
			});
		}
	};

	var Home = {
		init: function() {
			Home.cycle2();
			Home.bannerSliderMobile();
			Home.bannerCarouselHome();
			Home.shelfCarouselHome();
			Home.organizeSideMenuCollection();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		cycle2: function() {
			var elem = $(".slider-qd-v1-full");

			if (elem.find('.box-banner').length <= 1)
				elem.addClass("qd-1");

			if(typeof $.fn.cycle !== "function")
				return;

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
			});

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".slider-qd-v1-responsive-pager",
				prev: ".slider-qd-v1-cycle-prev",
				next: ".slider-qd-v1-cycle-next"
			});
		},
		bannerSliderMobile: function() {
			if (!$.fn.owlCarousel)
				return;

			$(".mobile-slider-qd-v1-wrapper").each(function() {
				$(this).owlCarousel({
					navigation : true,
					slideSpeed : 300,
					paginationSpeed : 400,
					singleItem:true,
					transitionStyle : "fade"
				});
			});
		},
		bannerCarouselHome:function(){
			var wrapper = $('.carousel-qd-v1-banner');

			// Titulo
			wrapper.each(function(){
				var wrap = $(this);
				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
			});

			wrapper.owlCarousel({
				items: 5,
				navigation: true,
				pagination: false
			});
		},
		shelfCarouselHome: function() {
			var wrapper = $('.shelf-qd-v1-carousel, .qd-category-collections');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
			});


			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		organizeSideMenuCollection: function() {
			var wrapper = $(".qd-category-collections");
			var htmlItem = '<div class="col-xs-12 item"><div class="row"></div></div>';
			var htmlSideMenuWrapper = '<div class="col-xs-12 col-sm-5 col-md-3 htmlSideMenuWrapper"></div>';
			var htmlCollectionWrapper = '<div class="col-xs-12 col-sm-7 col-md-9 htmlCollectionWrapper"></div>';
			var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

			wrapper.find('.box-banner:not(".qd-on")').addClass("qd-on").each(function() {
				$t = $(this);

				$t.after(htmlSideMenuWrapper);

				$('.htmlSideMenuWrapper:not(".qd-on")').addClass("qd-on").append(wrapper.find($t));

				var collectionTitle = ($t.getParent(".htmlSideMenuWrapper").find("+ .heading-1")) || "";

				if ($t.getParent(".htmlSideMenuWrapper").find("+ .heading-1 + .prateleira").length > 0)
					var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-1 + .prateleira");
				else
					var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .prateleira");

				$t.getParent('.htmlSideMenuWrapper').after(htmlCollectionWrapper);

				$('.htmlCollectionWrapper:not(".qd-on")').addClass("qd-on").append(collectionTitle, collection);

				$t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper").after(itemSideMenuCollection);

				$('.itemSideMenuCollection:not(".qd-on")').addClass("qd-on").find("> div").append($t.getParent(".htmlSideMenuWrapper"), $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper"));
			});
		},
	};

	var Departament = {
		init: function() {
			Search.sideMenuFilterAdjust();
			Search.emptySearch();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
			Search.moveBrandFilter();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".search-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		hideExtendedMenu:function(){
			$(".search-qd-v1-navigator ul").each(function(){
				var $t = $(this);
				var li = $t.find(">li:not('.qd-removed')");
				var qtt = 7;

				if(li.length <= qtt)
					return;

				var liHide = li.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				var linkShowMore=$('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				$t.after(linkShowMore);
				var moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				$t.append(moreLi);

				function click(){
					liHide.stop(true, true).slideToggle(function(){
						if(li.filter(":visible").length > qtt){
							linkShowMore.addClass("minus").text("Mostrar menos filtros");
							moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
						}
						else{
							linkShowMore.removeClass("minus").text("Mostrar mais filtros");
							moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
						}
					});
				};

				moreLi.bind("click.qd_viewMore", click);
				linkShowMore.bind("click.qd_viewMore", click);
			});
		}
	};

	var Search = {
		init: function () {
			Search.sideMenuFilterAdjust();
			Search.emptySearch();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.organizeSearchV2();
			Search.shelfLineFix();
			Search.moveBrandFilter();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		emptySearch:function () {
			if ($('.busca-vazio').length>0) {
				$('.search-qd-v1-no-result').show();
			};

			if ($('body').is(".busca-vazia"))
				$('.search-qd-v1-no-result').show();
		},
		organizeSearchV2: function() {
			var searchQDResult = $(".search-qd-v2-result");
			var wrap = $(".search-qd-v2-result-wrap-content .search-qd-v2-result-wrap");

			// REMOVE ITENS DUPLICADOS
			searchQDResult.find('.resultItemsWrapper + .searchResultsTime, .resultItemsWrapper + .searchResultsTime + .sub').remove();

			// ADICIONAR E ORGANIZA OS ELEMENTOS
			wrap.prepend('<div class="search-qd-v2-result-content row"> <div class="search-qd-v2-result-item-1 col-xs-12 col-sm-3 col-md-3"></div> <div class="search-qd-v2-result-item-2 col-xs-12 col-sm-6 col-md-3"></div> <div class="search-qd-v2-result-item-3 col-xs-12 col-sm-3 col-md-6"></div> </div>');
			$(".search-qd-v2-result-content .search-qd-v2-result-item-1").append(searchQDResult.find(".search-qd-v2-navigator"));
			$(".search-qd-v2-result-content .search-qd-v2-result-item-2").append(searchQDResult.find(".searchResultsTime"));
			$(".search-qd-v2-result-content .search-qd-v2-result-item-3").append(searchQDResult.find(".sub"));

			wrap.find('.search-qd-v2-navigator').prepend('<div class="search-qd-v2-navigator-btn-toggle"></div>');

			// CLICK PARA EXIBIR O MENU
			wrap.find(".search-qd-v2-navigator-btn-toggle").click(function() {
				wrap.find('.search-qd-v2-navigator .navigation').toggle();
			});

			$("body").attr("data-qd-scroll-limit", "200,370");
		},
		shelfLineFix: function() {
			var curTop;
			var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

			var shelf = wrapper.children("ul").removeClass('qd-first-line');
			shelf.first().addClass("qd-first-line");

			var setFirst = function() {
				shelf.each(function(){
					var $t = $(this);

					if($t.is(".qd-first-line")){
						curTop = $t.offset().top;
						shelf = shelf.not($t);
						return;
					}

					var offsetTop = $t.offset().top;
					if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
						shelf = shelf.not($t);
					else{
						$t.addClass("qd-first-line");
						return false;
					}
				});

				if(shelf.length)
					setFirst();
			};
			setFirst();
		},
		sideMenuFilterAdjust:function() {
			function getSearchUrl() {
				var url;
				var preg = /\/buscapagina\?.+&PageNumber=/i;

				$("script:not([src])").each(function () {
					var content = this.innerHTML;
					if (content.indexOf("buscapagina") > -1) {
						url = preg.exec(content);
						return false;
					}
				});
				return url;
			};

			var filteredAutomaker = (decodeURIComponent((getSearchUrl() || ['']).pop()).toLocaleLowerCase().match(/specificationfilter_32\:([^&]+)/i) || ['']).pop();

			$('h5.HideModelo-Versao +ul a').each(function() {
				var $t = $(this);
				var txt  = $t.text().split('-');
				var automaker = (txt.shift()).trim().toLowerCase();
				$t.text(txt.join('-'));

				if(automaker != filteredAutomaker)
					$t.closest('li').hide().addClass('qd-removed');
			});
		},
		moveBrandFilter: function() {
			var brand = $(".search-qd-v1-navigator ul.Marca");
			brand.add(brand.prev("h5")).appendTo(".search-single-navigator");
		}
	};

	var Product = {
		run: function() {},
		init: function () {
			Product.zoomFix();
			Product.shelfCarouselProduct();
			Product.openShipping();
			Product.seeDescription();
			// Product.skuUrlHash();
			Product.skuListSelection();
			Product.smartPriceProduct();
			// Product.hideUniqueSkuOption();
			// Product.smartQuantity(); // executar apÃ³s o "skuListSelection"
			// Product.smartyBuyButton(); // executar apÃ³s o "skuListSelection"
			// Search.shelfColors();
			Product.notifymeShow();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
			Product.smartPriceProduct();
		},
		windowOnload: function () {},
		notifymeShow: function() {
			var notifyWrapper = $(".portal-notify-me-ref");

			var checkVisibleNotify = function() {
				if (notifyWrapper.find(".sku-notifyme").is(":visible")){
					notifyWrapper.parent().parent().attr('class', "").addClass('col-xs-12');
					$(document.body).addClass('notify-active');
				}
				else {
					notifyWrapper.parent().parent().removeClass('col-xs-12').attr('class', "col-xs-12 col-sm-6");
					$(document.body).removeClass('notify-active');
				}
			}

			$(document).on("skuSelected.vtex", function(e, sku) {
				checkVisibleNotify();
			});

			checkVisibleNotify();
		},
		zoomFix: function(){
			var overlay = $("<div class='qdZoomInvisibleOverlay' />");
			$("#image").prepend(overlay).on("mouseout", ".zoomPad", function(){ overlay.hide(); }).on("mouseover", ".zoomPad", function(){ overlay.show(); });
		},
		shelfCarouselProduct: function() {
			var wrapper = $('.qd-collections-wrap ');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-2').insertBefore(wrap);
			});


			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		openShipping: function() {
			ShippingValue();
		},
		hideUniqueSkuOption : function(){
			$(".sku-selector-container [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		addCloseBtnFreightTable: function() {
			var elem = $(".freight-values");

			if (!$("#calculoFrete").length) $(".product-shipping").hide();
			else $(".product-shipping").show();

			if (elem.length > 0 && elem.is(":visible"))
				$("<span class='close'/>").bind("click", function() {
					elem.fadeToggle("fast","linear");
				}).appendTo(elem);
		},
		seeDescription: function() {
			$(".product-qd-v1-link-description").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-qd-v1-description").offset().top - 100
				}, 900, 'swing');
			});
		},
		skuUrlHash: function() {
			var sku = $.bbq.getState("sku");
			if(sku && !$(".skuList.qd-sku-list-selected-by-click").length){
				var skuList = $("a.buy-button[href*='sku=" + sku + "'], input.sku-notifyme-skuid[value='" + sku + "']").first().getParent(".skuList");
				var src = (skuList.find(".imageSku img:first").attr("src") || "").match(/ids\/[0-9]+/i);
				if(typeof src === "object" && typeof src[0] === "string" && !$(".image-zoom [src*='" + src[0] + "']").length)
					skuList.trigger("selectSku.qd_click");
				else if(!$(".skuList.qd-sku-list-selected").length)
					skuList.trigger("selectSku.qd_click");
			}
		},
		skuListSelection:function(){
			if (!$(".product-qd-v1-sku-selection .imageSku").length > 0)
				return;

			$(document.body).addClass('sku-in-list');

			var wrapper = $(".product-qd-v1-sku-selection");

			wrapper.find(".skuList").each(function(){
				$(this).addClass("product-qd-v1-sku-in-list");

				if ($(window).width() >= 500){
					$(this).addClass('no-xs');
				}
			});

			wrapper.find(".buy-button").each(function(){
				$(this).wrap('<div class="qd-v1-buy-button-content"></div>');
			});

			wrapper.find(".portal-notify-me-ref").each(function() {
				var $t = $(this);

				$t.find(".notifyme").addClass("qd-notifyme-hide");
				$t.getParent(".skuList").addClass("qd-sku-unavaliable");

				var btn = $('<div class="notifyme-btn-wrap"><button class="btn btn-xs notifyme-btn">Avise-me</button></div>');
				btn.find("button").click(function() {
					btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
					btn.addClass("qd-notifyme-hide");
				});
				$(this).prepend(btn);
			});

			wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
		},
		smartQuantity: function() {
			$(".product-qd-v1-sku-selection-box").QD_smartQuantity();
		},
		smartyBuyButton: function() {
			$(".header-qd-v1-cart-link").QD_buyButton({
				buyButton: ".product-qd-v1-sku-selection-box .buy-button"
			});
		},
		smartPriceProduct: function() {
			// $(".productPrice").append('<div class="qd-sp-best-discount">com <span class="qd-sp-display-discount">desconto de 0% Boleto, DepÃ³sito ou Transf.</span></div>')
			// 	.append('<div class="qd-sp-best-price">Por <span class="qd_displayPrice">R$ </span></div>');

			$(".productPrice:not(.qd-on)").addClass("qd-on").append('<div class="qd-sp-best-price">ou <span class="qd_displayPrice">R$ </span></div>').append('<div class="qd-sp-best-discount"><span class="qd-sp-display-discount">no boleto.</span></div>');
			$(".price-installments:not(.qd-on)").addClass("qd-on").insertBefore(".price-best-price");

			$(".product-qd-v1-stamps .flag").QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				productPage:{
					wrapperElement: ".product-qd-v1-sku-selection-box",
					changeNativePrice: false,
					isProductPage: true
				}
			});
		},
		hideUniqueSkuOption : function(){
			$(".sku-selector-container [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {
			Institutional.sidemenuToggle();
			Institutional.contactForm();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".institucional-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		contactForm: function() {
			// if(!$(document.body).is(".atendimento"))
				// return;

			var form = $(".form-contact");
			// form.find("#qd_form_phone").mask("(99) 9999-9999?9");

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if(!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length? "+55" + phone: null;

							$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function(data) { sendData(null); } }); } });

							var sendData = function(ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										ip: ip,
										userId: userId,
										phone: phone,
										email: email,
										fullName: $form.find("#qd_form_name").val() || null,
										message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										subject: $form.find("#qd_form_subject").val() || null
									}),
									success: function(data){ $form.find(".form-succes").removeClass("hide"); },
									error: function() { alert("Desculpe, nÃ£o foi possÃ­vel enviar seu formulÃ¡rio!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email, dataType: "json", headers: {Accept: "application/vnd.vtex.ds.v10+json"}, success: function(data) {if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function() {saveContact(null); if(typeof console == "object" && typeof console.warn == 'function') console.warn('Houve um erro ao tentar buscar os dados do usuÃ¡rio na entidade CL'); } });
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bootstrapCssFix: function() {
			var styleSheets = document.styleSheets;
			for (var i = 0; i < styleSheets.length; i++) {
				if ((styleSheets[i].href || "").indexOf('io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css') > -1) {
					styleSheets[i].disabled = true;
					break;
				}
			}
		}
	};
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".departamento, .categoria")) Departament.windowOnload();
			else if (body.is(".resultado-busca")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".departamento, .categoria")) Departament.ajaxStop();
			else if (body.is(".resultado-busca")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".departamento, .categoria")) Departament.init();
			else if (body.is(".resultado-busca")) Search.init();
			else if (body.is(".produto")) Product.init();
			else if (body.is(".listas")) List.init();
			else if (body.is(".institucional")) Institutional.init();
			else if (body.is(".orders")) Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});

		Common.run();
		if (location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
		else if (location.pathname.search(/^(\/giftlist|\/list\/)/) == 0)
			List.run();
	})();
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* Quatro Digital Newsletter // 5.0 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(f){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
//* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g, "\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie= [c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1})); return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});
var $Cookies = Cookies.noConflict();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.14 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],
a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;
window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&
window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&
g();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(l){i a,n,k,p;a=2a;B("4"!==F a.15.I){n={X:"/7-1R-V",1n:4(){},1i:4(){}};i m=4(a,b){B("1v"===F w&&"W"!==F w.1a&&"W"!==F w.14&&"W"!==F w.1k){i c;"1v"===F a?(a.2h("[1M 1D 1B]\\n"),c=a):c=["[1M 1D 1B]\\n"+a];B("W"===F b||"1T"!==b.O()&&"2C"!==b.O())B("W"!==F b&&"14"===b.O())J{w.14.1l(w,c)}M(g){J{w.14(c.Y("\\n"))}M(e){}}1t J{w.1a.1l(w,c)}M(g){J{w.1a(c.Y("\\n"))}M(e){}}1t J{w.1k.1l(w,c)}M(g){J{w.1k(c.Y("\\n"))}M(e){}}}};a.15.1m=4(){i f=a(r);f.C(4(b){a(r).v("7-8-G-"+b)});f.1d().v("7-8-1d");f.1U().v("7-8-1U");x f};a.15.I=4(){};l=4(a){i b={j:"2p%3%1O%3%6%3%5",2c:"2k%3%6%3%5",28:"27%3%K%3%6%3%5",1Y:"1X%3%R%3%6%3%5",20:"1V%3%S%3%6%3%5",2j:"c-1h%3%K%3%6%3%5",U:"-1h%3%R%3%6%3%5","U-":"1h%3%S%3%6%3%5","H%3%":"1O%3%K%3%6%3%5","H%3%2":"2B%3%R%3%6%3%5","H%3%25":"2u%3%S%3%6%3%5","H%3%2t":"2l%3%6%3%5","P%25":"1f%6%3%5","P%2o":"2%K%3%6%3%5","P%3":"%R%3%6%3%5","P%3%":"S%3%6%3%5","U-2s":"f%3%K%3%6%3%5","U-P":"%3%R%3%6%3%5","U-P%":"3%S%3%6%3%5","H%3%2r":"1X%3%K%3%6%3%5","H%3%2q":"1V%3%R%3%6%3%5","H%3%2m":"f%3%S%3%6%3%5"};x 4(a){i g,e,d,h;e=4(a){x a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"2D"+e("o")+"n"];g=4(a){x 2A(2z(a.11(/\\./g,"\\2v").11(/[a-2w-Z]/g,4(a){x 2x.2y(("Z">=a?2E:21)>=(a=a.22(0)+13)?a:a-26)})))};23(i q 1Z b){B(g(a[[d[9],e("o"),d[12],d[e(13)]].Y("")])===q+b[q]){h="24"+d[17]+"e";2i}h="f"+d[0]+"2e"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"2f",d[9]].Y("")].2g("2d%1y%1o%1H%1e%1b%1e%29%2b%2n%1f%33%1f%3d%1e%1b%1y%1o%1H%3e%1b")&&(e=!0);x[h,e]}(a)}(l);B(!3f(l[0]))x l[1]?m("\\3b\\36\\1E \\38\\T\\3a\\3r\\1F\\T\\1F\\1E \\3s\\T\\3o\\T \\3j\\2F\\3k\\T L\\3m\\T!"):!1;p=4(f){i b,c,g;g=f.D(".3h");b=g.1C(".7-8-1g");c=g.1C(".7-8-1G");B(b.E||c.E)b.10().v("7-8-1g-1L"),c.10().v("7-8-1G-1L"),a.35({X:k.X,2N:"2O",2P:4(e){i d=a(e);b.C(4(){i h,c;c=a(r);h=d.D("2J[2K=\'"+c.1z("1N-1s-1r")+"\']");h.E&&(h.C(4(){a(r).1q(".2S-1g").1u().1x(c)}),c.1w())}).v("7-8-1K-1P");c.C(4(){i c={},b;b=a(r);d.D("30").C(4(){B(a(r).1Q().1c().O()==b.1z("1N-1s-1r").1c().O())x c=a(r),!1});c.E&&(c.C(4(){a(r).1q("[31*=\'32\']").1u().1x(b)}),b.1w())}).v("7-8-1K-1P")},1a:4(){m("N\\1S 2Z 2Y\\2U 2T 2V 2W 1W V. A X \'"+k.X+"\' 34.")},2R:4(){k.1i.1p(r);a(1A).1I("1J.8.1i",f)},2I:2H})};a.I=4(f){i b=f.D("Q[2Q]").C(4(){i c,b;c=a(r);B(!c.E)x m(["3l 1W V n\\1S 3p",f],"1T");c.D("G >Q").10().v("7-8-3n-Q");c.D("G").C(4(){i b=a(r),c;c=b.19(":37(Q)");c.E&&b.v("7-8-3c-"+c.1d().1Q().1c().2L().11(/\\./g,"").11(/\\s/g,"-").O())});b=c.D(">G").1m();c.v("7-1R-V");b=b.D(">Q");b.C(4(){i b=a(r);b.D(">G").1m().v("7-8-2X");b.v("7-8-1j-V");b.10().v("7-8-1j")});b.v("7-8-1j");i e=0,d=4(a){e+=1;a=a.19("G").19("*");a.E&&(a.v("7-8-2G-"+e),d(a))};d(c);c.2M(c.D("Q")).C(4(){i b=a(r);b.v("7-8-"+b.19("G").E+"-G")})});p(b);k.1n.1p(r);a(1A).1I("1J.8.1n",f)};a.15.I=4(f){i b=a(r);B(!b.E)x b;k=a.3q({},n,f);b.3i=39 a.I(a(r));x b};a(4(){a(".3g").I()})}})(r);',62,215,'|||25C2|function|25A8oe|25A8pbz|qd|am||||||||||var|||||||||this||||addClass|console|return||||if|each|find|length|typeof|li|jjj|QD_amazingMenu|try|25A8igrkpbzzrepr||catch||toLowerCase|qrixsovxrf|ul|25A8igrkpbzzreprorgn|25A8igrkpbzzreprfgnoyr|u0391|qrirybc|menu|undefined|url|join||parent|replace|||info|fn||||children|error|82|trim|first|D1|C2|banner|xsovxrf|ajaxCallback|dropdown|warn|apply|qdAmAddNdx|callback|B8|call|getParent|value|qdam|else|clone|object|hide|insertBefore|E0|attr|window|Menu|filter|Amazing|u0472|u2202|collection|84|trigger|QuatroDigital|content|wrapper|QD|data|25A8xsovxrf|loaded|text|amazing|u00e3o|alerta|last|rf|do|xrf|xsov|in|xsovx|122|charCodeAt|for|tr|||vxrf|xso|8F|jQuery|CF|xs|qu|ls|rc|indexOf|unshift|break|qriryb|ovxrf|8qrixsovxrf|25A8qrixsovxr|83d|25C|jj|25A8qrixsovx|25A8qrixsov|qrixsovxr|25A|A8xsovxrf|u00a8|zA|String|fromCharCode|encodeURIComponent|escape|5A8xsovxrf|aviso|ti|90|u0abd|level|3E3|clearQueueDelay|img|alt|replaceSpecialChars|add|dataType|html|success|itemscope|complete|box|obter|u00edvel|os|dados|column|poss|foi|h2|class|colunas|A1g|falho|qdAjax|u00c3|not|u221a|new|u2113|u0e17|elem|A1|C5|eval|qd_amazing_menu_auto|qd_am_code|exec|u0aef|u01ac|UL|u0472J|has|u0ae8|encontrada|extend|u00a1|u03a1'.split('|'),0,{}));
/* * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010 * http://benalman.com/projects/jquery-bbq-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function n(b){b=f.json?JSON.stringify(b):String(b);return f.raw?b:encodeURIComponent(b)}function m(b,e){var a;if(f.raw)a=b;else a:{var d=b;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));a=f.json?JSON.parse(d):d;break a}catch(g){}a=void 0}return c.isFunction(e)?e(a):a}var l=/\+/g,f=
c.cookie=function(b,e,a){if(void 0!==e&&!c.isFunction(e)){a=c.extend({},f.defaults,a);if("number"===typeof a.expires){var d=a.expires,g=a.expires=new Date;g.setTime(+g+864E5*d)}return document.cookie=[f.raw?b:encodeURIComponent(b),"=",n(e),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b?void 0:{};for(var d=document.cookie?document.cookie.split("; "):[],g=0,l=d.length;g<l;g++){var h=d[g].split("="),k;
k=h.shift();k=f.raw?k:decodeURIComponent(k);h=h.join("=");if(b&&b===k){a=m(h,e);break}b||void 0===(h=m(h))||(a[k]=h)}return a};f.defaults={};c.removeCookie=function(b,e){if(void 0===c.cookie(b))return!1;c.cookie(b,"",c.extend({},e,{expires:-1}));return!c.cookie(b)}});
/* Quatro Digital - Smart Quantity // 1.9 // Carlos Vinicius // Todos os direitos reservados */
(function(t){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var f=function(d,b){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),e=d):e=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
e)}catch(f){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(f){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(f){console.warn(e.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,setQuantityByUrl:!0},n=function(h,b){function e(c,g,a){b.setQuantityByUrl?c.val(((location.search||"").match(p)||[b.initialValue]).pop()):c.val(b.initialValue);c.change(function(){try{var c=d(this),
a=parseInt(c.val().replace(q,""));!isNaN(a)&&a>b.initialValue?c.val(a):c.val(b.initialValue);c.trigger("QuatroDigital.sq_change",this)}catch(g){f(g.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});g.click(function(a){a.preventDefault();c.val((parseInt(c.val())||b.initialValue)+1).change()});a.click(function(a){a.preventDefault();c.val((parseInt(c.val())||b.initialValue+1)-1).change()});c.change()}function m(c,g,a){c.on("QuatroDigital.sq_change",function(){(d(this).val()||
0)<=b.initialValue?(a.addClass("qd-sq-inactive"),g.removeClass("qd-sq-inactive")):(g.addClass("qd-sq-inactive"),a.removeClass("qd-sq-inactive"))})}function n(c,d){c.on("QuatroDigital.sq_change",function(){try{if(!(d[0].hostname||"").length)return f("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var a=d[0].search||"";-1<a.toLowerCase().indexOf("qty=")?d[0].search=a.replace(l,"qty="+(parseInt(c.val())||("number"==typeof b.initialValue?b.initialValue:
1))+"&"):d[0].search="qty="+(parseInt(c.val())||("number"==typeof b.initialValue?b.initialValue:1))+"&"+(d[0].search||"").replace(l,"");var e=((d.attr("href")||"").match(r)||[""]).pop()+"";c.attr("data-sku-id",e);if(e.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(a=0;a<skuJson.skus.length;a++)skuJson.skus[a].sku==e&&c.attr("data-sku-price",skuJson.skus[a].bestPrice)}catch(k){f(k.message)}})}var q=/[^0-9-]/gi,p=/qty\=([0-9]+)/i,r=/sku\=([0-9]+)/i,l=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=
d(this),g=c.find(b.buyButton),a=c.find(b.qttInput),h=c.find(b.btnMore),k=c.find(b.btnMinus);if(!g.length&&null!==b.buyButton||!a.length)return f("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(a.is(".qd-sq-on"))return f(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",a],"info");a.addClass("qd-sq-on");m(a,h,k);null!==b.buyButton&&n(a,g);e(a,h,k);d(window).on("vtex.sku.selected",function(){a.change()})}catch(l){f(l.message)}})};
d.fn.QD_smartQuantity=function(f){var b=d(this);b.qdPlugin=new n(b,d.extend({},m,f));d(window).trigger("QuatroDigital.sq_callback");return b};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);
/* Quatro Digital - Smart Buy Button // 1.18 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,c,r=a({}),l=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(k){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,f){function b(a){c.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!c.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function h(e){e=e||a(c.buyButton);e.each(function(){var d=a(this);d.is(".qd-sbb-on")||(d.addClass("qd-sbb-on"),d.is(".btn-add-buy-button-asynchronous")&&!d.is(".remove-href")||d.data("qd-bb-active")||(d.data("qd-bb-active",1),d.children(".qd-bb-productAdded").length||d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),d.is(".buy-in-page-button")&&c.isProductPage()&&p.call(d),b(d)))});c.isProductPage()&&
!e.length&&l("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,p,m;k=a(g);m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,d){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(c.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},c.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return c.isSmartCheckout||(l("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(d){window._Quatro_Digital_dropDown.getOrderForm=
d;a.fn.simpleCart(!0,void 0,!0)},{lastSku:d});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(c.isSmartCheckout&&c.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&h(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(d){e.unbind("click");b(e);a(this).unbind(d)}),a(window).load(function(){e.unbind("click");b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};
m.clickBuySmartCheckout=function(){var e=a(this),d=e.attr("href")||"";if(-1<d.indexOf(c.selectSkuMsg))return!0;d=d.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(c.execDefaultAction(e))return e.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");r.queue(function(b){if(!c.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(d))return b();var f=function(b,f){var g=d.match(/sku\=([0-9]+)/ig),h=[],k;if("object"===typeof g&&
null!==g)for(var l=g.length-1;0<=l;l--)k=parseInt(g[l].replace(/sku\=/ig,"")),isNaN(k)||h.push(k);c.productPageCallback.call(this,b,f,d);m.buyButtonClickCallback.call(this,b,f,d,h);m.prodAdd(e,d.split("ku=").pop().split("&").shift());"function"===typeof c.asyncCallback&&c.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};c.fakeRequest?(f(null,"success"),b()):a.ajax({url:d,complete:f}).always(function(){b()})})};m.buyButtonClickCallback=function(a,
b,c,f){try{"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c,f)}catch(g){l("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};h();"function"===typeof c.callback?c.callback.call(this):l("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var n=a.Callbacks();a.fn.QD_buyButton=function(g,f){var b=a(this);"undefined"!==typeof f||"object"!==typeof g||g instanceof
a||(f=g,g=void 0);c=a.extend({},t,f);var h;n.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g)});n.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,c){h.prodAdd(b,c)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,c,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",
function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){n.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital - sessionStorage // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - sessionStorage]\n"),a=b):a=["[Quatro Digital - sessionStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdSessionStorage=window.qdSessionStorage||{};var f="undefined"!==typeof sessionStorage&&"undefined"!==typeof sessionStorage.setItem&&"undefined"!==typeof sessionStorage.getItem;window.qdSessionStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;sessionStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),sessionStorage.setItem(b+"_expiration",
d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento da sess\u00e3o. Detalhes: ",g.message],"alerta")}};window.qdSessionStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(sessionStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(sessionStorage.removeItem&&(sessionStorage.removeItem(b),sessionStorage.removeItem(b+"_expiration")),null):sessionStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento da sess\u00e3o. Detalhes: ",
d.message],"alerta")}}})();
/*http://phpjs.org/functions/utf8_encode/*/
function utf8_encode(b){if(null===b||"undefined"===typeof b)return"";b+="";var d="",f,g,h=0;f=g=0;for(var h=b.length,e=0;e<h;e++){var a=b.charCodeAt(e),c=null;if(128>a)g++;else if(127<a&&2048>a)c=String.fromCharCode(a>>6|192,a&63|128);else if(55296!=(a&63488))c=String.fromCharCode(a>>12|224,a>>6&63|128,a&63|128);else{if(55296!=(a&64512))throw new RangeError("Unmatched trail surrogate at "+e);c=b.charCodeAt(++e);if(56320!=(c&64512))throw new RangeError("Unmatched lead surrogate at "+(e-1));a=((a&1023)<<
10)+(c&1023)+65536;c=String.fromCharCode(a>>18|240,a>>12&63|128,a>>6&63|128,a&63|128)}null!==c&&(g>f&&(d+=b.slice(f,g)),d+=c,f=g=e+1)}g>f&&(d+=b.slice(f,h));return d};
/*http://phpjs.org/functions/md5/*/
if("function"!==typeof qd_md5)var qd_md5=function(p){var h=function(b,a){var d,c,f,e,g;f=b&2147483648;e=a&2147483648;d=b&1073741824;c=a&1073741824;g=(b&1073741823)+(a&1073741823);return d&c?g^2147483648^f^e:d|c?g&1073741824?g^3221225472^f^e:g^1073741824^f^e:g^f^e},k=function(b,a,d,c,f,e,g){b=h(b,h(h(a&d|~a&c,f),g));return h(b<<e|b>>>32-e,a)},l=function(b,a,d,c,f,e,g){b=h(b,h(h(a&c|d&~c,f),g));return h(b<<e|b>>>32-e,a)},m=function(b,a,c,d,e,f,g){b=h(b,h(h(a^c^d,e),g));return h(b<<f|b>>>32-f,a)},n=
function(b,a,c,d,f,e,g){b=h(b,h(h(c^(a|~d),f),g));return h(b<<e|b>>>32-e,a)},q=function(b){var a="",c="",d;for(d=0;3>=d;d++)c=b>>>8*d&255,c="0"+c.toString(16),a+=c.substr(c.length-2,2);return a},e=[],f,r,t,u,v,b,a,d,c;p=this.utf8_encode(p);e=function(b){var a,c=b.length;a=c+8;for(var d=16*((a-a%64)/64+1),e=Array(d-1),f=0,g=0;g<c;)a=(g-g%4)/4,f=g%4*8,e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(p);b=1732584193;a=4023233417;d=2562383102;c=271733878;p=
e.length;for(f=0;f<p;f+=16)r=b,t=a,u=d,v=c,b=k(b,a,d,c,e[f+0],7,3614090360),c=k(c,b,a,d,e[f+1],12,3905402710),d=k(d,c,b,a,e[f+2],17,606105819),a=k(a,d,c,b,e[f+3],22,3250441966),b=k(b,a,d,c,e[f+4],7,4118548399),c=k(c,b,a,d,e[f+5],12,1200080426),d=k(d,c,b,a,e[f+6],17,2821735955),a=k(a,d,c,b,e[f+7],22,4249261313),b=k(b,a,d,c,e[f+8],7,1770035416),c=k(c,b,a,d,e[f+9],12,2336552879),d=k(d,c,b,a,e[f+10],17,4294925233),a=k(a,d,c,b,e[f+11],22,2304563134),b=k(b,a,d,c,e[f+12],7,1804603682),c=k(c,b,a,d,e[f+13],
12,4254626195),d=k(d,c,b,a,e[f+14],17,2792965006),a=k(a,d,c,b,e[f+15],22,1236535329),b=l(b,a,d,c,e[f+1],5,4129170786),c=l(c,b,a,d,e[f+6],9,3225465664),d=l(d,c,b,a,e[f+11],14,643717713),a=l(a,d,c,b,e[f+0],20,3921069994),b=l(b,a,d,c,e[f+5],5,3593408605),c=l(c,b,a,d,e[f+10],9,38016083),d=l(d,c,b,a,e[f+15],14,3634488961),a=l(a,d,c,b,e[f+4],20,3889429448),b=l(b,a,d,c,e[f+9],5,568446438),c=l(c,b,a,d,e[f+14],9,3275163606),d=l(d,c,b,a,e[f+3],14,4107603335),a=l(a,d,c,b,e[f+8],20,1163531501),b=l(b,a,d,c,e[f+
13],5,2850285829),c=l(c,b,a,d,e[f+2],9,4243563512),d=l(d,c,b,a,e[f+7],14,1735328473),a=l(a,d,c,b,e[f+12],20,2368359562),b=m(b,a,d,c,e[f+5],4,4294588738),c=m(c,b,a,d,e[f+8],11,2272392833),d=m(d,c,b,a,e[f+11],16,1839030562),a=m(a,d,c,b,e[f+14],23,4259657740),b=m(b,a,d,c,e[f+1],4,2763975236),c=m(c,b,a,d,e[f+4],11,1272893353),d=m(d,c,b,a,e[f+7],16,4139469664),a=m(a,d,c,b,e[f+10],23,3200236656),b=m(b,a,d,c,e[f+13],4,681279174),c=m(c,b,a,d,e[f+0],11,3936430074),d=m(d,c,b,a,e[f+3],16,3572445317),a=m(a,d,
c,b,e[f+6],23,76029189),b=m(b,a,d,c,e[f+9],4,3654602809),c=m(c,b,a,d,e[f+12],11,3873151461),d=m(d,c,b,a,e[f+15],16,530742520),a=m(a,d,c,b,e[f+2],23,3299628645),b=n(b,a,d,c,e[f+0],6,4096336452),c=n(c,b,a,d,e[f+7],10,1126891415),d=n(d,c,b,a,e[f+14],15,2878612391),a=n(a,d,c,b,e[f+5],21,4237533241),b=n(b,a,d,c,e[f+12],6,1700485571),c=n(c,b,a,d,e[f+3],10,2399980690),d=n(d,c,b,a,e[f+10],15,4293915773),a=n(a,d,c,b,e[f+1],21,2240044497),b=n(b,a,d,c,e[f+8],6,1873313359),c=n(c,b,a,d,e[f+15],10,4264355552),
d=n(d,c,b,a,e[f+6],15,2734768916),a=n(a,d,c,b,e[f+13],21,1309151649),b=n(b,a,d,c,e[f+4],6,4149444226),c=n(c,b,a,d,e[f+11],10,3174756917),d=n(d,c,b,a,e[f+2],15,718787259),a=n(a,d,c,b,e[f+9],21,3951481745),b=h(b,r),a=h(a,t),d=h(d,u),c=h(c,v);return(q(b)+q(a)+q(d)+q(c)).toLowerCase()};
/* Cores Na Prateleira // 11.3 // Carlos Vinicius [QUATRO DIGITAL] // Todos os direitos reservados */
// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(5(H,r){S("5"!==M r.3o.3p){r.3o.3p=5(){};8 E,h,F,B,G=-1<62.5O.1o.1w().3R("5S"),l=5(h,q){S("20"===M 1d){8 b;"20"===M h?(h.3I("[29 1Q]\\n"),b=h):b=["[29 1Q]\\n"+h];"19"===M q||"1q"!==q.1w()&&"3E"!==q.1w()?"19"!==M q&&"1v"===q.1w()?1d.1v.1T(1d,b):1d.2k.1T(1d,b):1d.3N.1T(1d,b)}},u=5(h,q){S("20"===M 1d&&G){8 b;"20"===M h?(h.3I("[29 1Q]\\n"),b=h):b=["[29 1Q]\\n"+h];"19"===M q||"1q"!==q.1w()&&"3E"!==q.1w()?"19"!==M q&&"1v"===q.1w()?1d.1v.1T(1d,b):1d.2k.1T(1d,b):1d.3N.1T(1d,b)}},C=!1;1x{2e.4U(2e.4V({a:"b"})),C=!0}1y(J){l("5s 5B n\\14 4m 5u a 2e 5v","1v")}8 I={3F:"1L[5w]",6D:"N\\14 1s 6y\\21 1I 6x 6z\\2K\\6B 6R 6M.",3s:"6L: R$ #3y",2x:"R$ ",6N:".K-3G[6O=\'6w\']",2T:!1,4n:!1,2X:!1,4z:!1,3D:!0,2z:!1,46:!1,4j:!0,4l:!1,1G:11,40:!1,4f:!0,2Q:!0,1j:6g,2q:4,3b:2,37:11,2R:{1M:36,22:36},2a:"3A",2n:!0,1l:["6b"],2l:[11],3k:11,50:!0,52:5(){},3f:5(){},4d:5(h,q,b,f,a){},2H:5(h,q,b){1x{U h.1p(/(69\\/[0-9]+\\-)([0-9]+\\-[0-9]+)/i,"$1"+q+"-"+b)}1y(f){U l(["3i 2E 3f \'2H\'. ",f.1B],"1q"),""}},4S:5(h,q,b,f){f(!1)},1g:!0,4e:2,3H:30,5f:3,6h:"/6u-6X"},A=5(h){8 q={j:"6n%P%3W%P%1i%P%1k",6m:"6l%P%1i%P%1k",6j:"6k%P%3q%P%1i%P%1k",6o:"6p%P%3g%P%1i%P%1k",6t:"6s%P%3a%P%1i%P%1k",6q:"c-3z%P%3q%P%1i%P%1k",3S:"-3z%P%3g%P%1i%P%1k","3S-":"3z%P%3a%P%1i%P%1k","3e%P%":"3W%P%3q%P%1i%P%1k","3e%P%2":"6i%P%3g%P%1i%P%1k","3e%P%25":"68%P%3a%P%1i%P%1k"};U 5(b){8 f,a,d,e;a=5(a){U a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];b=b["d"+d[16]+"c"+d[17]+"m"+a(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"67"+a("o")+"n"];f=5(a){U 66(64(a.1p(/\\./g,"\\65").1p(/[a-2U-Z]/g,5(a){U 6a.6f(("Z">=a?6e:6c)>=(a=a.6d(0)+13)?a:a-26)})))};1c(8 c 1t q){S(f(b[[d[9],a("o"),d[12],d[a(13)]].2L("")])===c+q[c]){e="6v"+d[17]+"e";2o}e="f"+d[0]+"6P"+a(d[1])+""}a=!1;-1<b[[d[12],"e",d[0],"6Q",d[9]].2L("")].3R("6V%3T%3U%84%3h%82%3h%6S%6T%6K%3O%6J%3O%6A%3h%82%3T%3U%84%6I%82")&&(a=!0);U[e,a]}(h)}(H);S(!6H(A[0]))U A[1]?l("\\6G\\6E\\3Z \\6F\\1X\\63\\5T\\3V\\1X\\3V\\3Z \\5t\\1X\\5x\\1X \\5y\\5C\\5A\\1X L\\5z\\1X!"):!1;r.3o.3p=5(A){1x{r("");8 q=/5r\\:\\/\\/[a-z\\-\\.]+(?=\\/)/i,b=r.5i(!0,{},I,A),f={5k:11,2r:11,34:11,2s:11,39:0,2A:!1,5g:[],5l:[],3B:{},4a:{},2p:11,5q:{},4L:5(){f.3J()},3J:5(){8 a=f.2p;0<a.V&&a.2M(5(a){8 b=1S(1u);b.3Y("7-3L")||f.3C(b,a)})},3C:5(a,d){8 e=a.6(b.3F).2W(".5p");S(1>e.V)U l("1Q n\\14 5o \\n ("+e.3G+")"),!1;a.Q("7-3L");e.2M(5(a){8 g,e,k,m,v,D,y,t,p,w,x;g=r(1u);!0===b.3D&&f.4C(g);e=g.6(".5n");k=g.6(".7-5D");D=d.3Q()+"38"+a.3Q();p=5(a,d){8 c,k;v=f.49(a,D);m=b.2n?f.2n(v,d):v;0<v.V&&0===m.V&&u("O 1z 3j "+d+" 4o "+a.V+\' 5E 1R 5V 5U 56\\55 o 5W 4P 5X\\2K\\14 n\\14 61 47 1K 2S 60 1z. 5Z-5Y 3l 5R 5Q o 5J 5I 2S a 5H\\2K\\5F\\14 "1l".\',"1q");g.6(".7-2y 2g").Q("7-2t");x=m.V;(b.2X||b.4z)&&e.Q("1e").W("15");8 t=11;S("5"===M b.3k&&(t=b.3k(g),"1C"===M t&&""!==t||"5L"===M t))1c(8 l=0;l<m.V;l++)S(m[l][1]==t){k=m[l];m[l]=m[0];m[0]=k;2o}S(x>=b.3b)1c(x>b.2q&&(g.6(".4t").Q("1e").W("15"),g.6(".Y-1Z-K-5P").1A(x)),l=0;l<x;l++){8 p,z;p=m[l][1];z=m[l][0].2I();k=z.1p(q,"");S(b.2z&&!h.K[p].44)u(["O K \\3m"+p+"\\27 1s 3n 2D n\\14 4o 5N. 5M: ",g],"1v");2b{S(b.4n&&(y=k==(g.6(".1O:2j").X("1o")||"").2I().1p(q,""))){u("O K \\3m"+p+"\\27 1s 3n 2D 4m o 4v 2m 5G o 1z 5m 4x 4y.\\n 4s: "+k,"1v");6U}S(b.4j&&0<g.6(".7-2F[4h=\'"+k+"\']").V)u("O K \\3m"+p+"\\27 1s 3n 2D j\\8o 8n 8l 4N 4x 4y 8v o 4v 2m.\\n 4s: "+k,"1v");2b S(c=g.1f("Y-1Z-K-3c")||0,g.1f("Y-1Z-K-3c",c+1),c>=b.2q-1){g.6(".4t").Q("Y-1Z-3M-K-81");2o}2b""!==p&&(c=1S("<1m 1h=\'7-2F 7-83"+(c-1)+" 7-7Y"+p+" 15\' "+(t==p?\'1f-7T-K="1"\':"")+"><1m 1h=\'7-7U\'><a 1o=\'"+(b.2Q?z+"#K="+p:z)+"\' 1h=\'Y-5c\'></a></1m><1m 1h=\'7-7V\'></1m></1m>"),c.X({4h:k,3j:p}),e.2P(f.4g(g,p,c,z,D)))}}e.Q("Y-1Z-8e-3c-"+e.6(".7-2F").V);w=g.6(".7-2F");w.V>=b.3b&&w.W("15");w.2j().Q("7-8c");r(1D).1V("1U.8b",{1L:g,41:e,1f:h})};b.46?(a=k.6("1L").1A().2I().1Y("|"),G&&""===k.6("1L").1A().2I()&&u("O 3d 1z n\\14 57 8a 47 86.\\n 7W: "+(g.6(".1O[45]:2j").X("45")||"[T\\7X n\\14 80]"),"1v"),p(a)):(t=g.6(".48").2h(),k=g.6(".31").2h(),"19"===M t&&l(["N\\14 1s 2G\\21 1I o 8g 2c 1z 2E 3d \\8t\\27.",g]),"19"===M k&&l("N\\14 1s 2G\\21 1I a 8u 2c 1z 2E 3d \\8p\\27."),f.43(5(a,b){p(a,t);r(1D).1V("1U.8q",{1L:g,41:e})},t,k,g))})},43:5(a,d,e,c){b.1g&&E.5a(1u,a,d,e,c)},8i:5(a){8 b,e,c=[a];b=a.6(".48").2h();e=a.6(".31").2h();"19"!==M b&&"19"!==M e&&(c=[b,e,a]);U c},49:5(a,b){8 e={},c=[],g,n,k;k=a.V;S(2>k&&""===a[0])U c;1c(8 m=0;m<k;m++)g=a[m].1Y(";"),n=g.4A(),g=g.2O(),"19"!=M n&&("19"==M e[g]?e[g]=[n]:e[g].1a(n));1c(8 f 1t e){k=e[f].V;n=[];S(3<k){8 h,l;g=2N(k/3,10);h=k%3;l=2*g;1c(m=0;m<g;m++)n.1a(e[f][m]),n.1a(e[f][m+g]),n.1a(e[f][m+l]);1==h?n.1a(e[f][k-1]):2==h&&(n.1a(e[f][k-1]),n.1a(e[f][k-2]))}2b n=e[f];c.1a([n.2O(),f])}U c},2n:5(a,d){S(!b.1g||!b.4f)U a;8 e,c,g,f;e=[];h.1b=h.1b||{};S("19"!==M h.1b[d]&&"20"===M h.1b[d].1P&&0<h.1b[d].1P.V)U e.7h(h.1b[d].1P);1c(8 k 1t a)S("5"!==M a[k]){f=a[k][1];g=h.K[f];c=[];1c(8 m 1t b.1l)"5"!==M b.1l[m]&&"1C"===M g.1l[b.1l[m]]&&c.1a(b.1l[m]);h.1b[g.1n]=h.1b[g.1n]||{};1c(8 v 1t c)"5"!==M c[v]&&(h.1b[g.1n][g.1l[c[v]]]=h.1b[g.1n][g.1l[c[v]]]||[],h.1b[g.1n].1P=h.1b[g.1n].1P||[],h.1b[g.1n][g.1l[c[v]]].V||(e.1a(a[k]),h.1b[g.1n].1P.1a(a[k])),h.1b[g.1n][g.1l[c[v]]].1a(f))}U e},4g:5(a,d,e,c,g){e.Q("7-5e");f.5d(a,d,a.6(".7-4E"),b.4e,e,c,g);b.4d(a,e,f.4a,f.3B,d);U e},2z:5(a,b,e,c,g,n){f.4k(a,b,e,c,g)},4k:5(a,d,e,c,g){f.4Y(e,c);f.4O(e,c,d);e.4c("7d.4b",5(){1x{a.6(".23").W("23");e.Q("23");S(b.2T){f.2r=a.6(".3w").7e().7i();f.34=a.6(".1O:2j").X("1o")||"";8 d=a.6(".7-1N");f.2s=[d.1E()||"",d.X("1h")||""]}f.42(c,a,g);f.2A=!0;r(1D).1V("1U.7o",{1f:c[0],1L:a,2m:g})}1y(k){l(k.1B)}});b.2T&&e.4c("7S.4b",5(){1x{a.6(".23").W("23"),f.3X(a),f.2A=!1,r(1D).1V("1U.7m",{1f:c[0],1L:a,2m:g})}1y(b){l(b.1B)}});U e},42:5(a,d,e){8 c,g,n,k,m,h,l,y,t,p,w,x;d.Q("7-33");a=a[0];a.44||a.7k||b.2X?(c=d.6(".3t"),t=a.7l||a.7c,p=b.1g?a.7b/2w:a.73,w=b.1g?a.4i/2w:a.4u,c.Q("1e").W("15"),d.6(".3v").Q("15").W("1e"),c.6(".72").1A(b.2x+f.24(b.1g?a.4i/2w:a.4u)),d.6(".7-1N").1E(b.3s.1p("#3y",f.24(p-w))),w<p?(c.6(".4w").Q("1e").W("15").6(".71").1A(b.2x+f.24(p)),d.6(".7-1N").Q("1e").W("15")):(c.6(".4w").Q("15").W("1e"),d.6(".7-1N").Q("15").W("1e")),1<t?(p=c.6(".4r").Q("1e").W("15"),p.6(".6Z").1A(t),p.6(".70").1A(b.2x+f.24(b.1g?a.74/2w:a.7a)),c.6(".4q").Q("15").W("1e")):(c.6(".4r").Q("15").W("1e"),c.6(".4q").Q("1e").W("15"))):(d.6(".3t").Q("15").W("1e"),d.6(".3v").Q("1e").W("15"));c=a.4J||a.2u;b.4l&&(7p(b.1G)||11===b.1G?d.6(".Y-2C").1E(c):b.40&&(c||"").V>b.1G?(c=(c||"").4p(0,b.1G+1).1Y(" "),c.4A(),d.6(".Y-2C").1E(c.2L(" ")+" ...")):(c||"").V>b.1G?d.6(".Y-2C").1E((c||"").4p(0,b.1G)+" ..."):d.6(".Y-2C").1E(c||""));c=d.6(".1O");""!==e&&c.X("1o",e.1p(q,""));c.X("1o",b.2Q?c.X("1o")+"#K="+(a.K||a.1H):c.X("1o"));g=d.6(".7-2y");n=d.6(".7-58");k=g.6(".7-2t");c=k[0];e=k.X("1M")||c.7L;c=k.X("22")||c.7Q;b.1g&&"3A"==b.2a&&(b.2a={1M:e,22:c});x=5(a,c){8 e=a.K||a.1H;m=f.35(a,b.3H,b.1g,c);S("1C"!==M c||""!==m[0])h=d.6("2g[2f*=\'"+(m[0].1Y("?").2O()||k.X("2f"))+"\']:2W(\'.7-59\')"),l=0<h.V?!0:!1,n.3M(),l?(k.1r(!0).W("Y-1F").2d(b.1j),n.32(),d.6(".7-2v").1r(!0).W("Y-1F").2d(b.1j),h.1r(!0).Q("Y-1F").28(b.1j,1),h.X("1f-K",e),"1C"===M c&""!==c&&h.X("1f-K-2Z",c),h.7N("[1f-K=\'"+e+"\']").1r(!0).Q("Y-1F").28(b.1j,1)):(y=r(\'<2g 2f="\'+(m[0]||k.X("2f"))+\'" 2V="" 1h="7-2v" 7E="7D:7v;" 1f-K="\'+e+\'" />\'),"1C"===M c&""!==c&&y.X("1f-K-2Z",c),y.7u(5(){f.2A?(k.1r(!0).W("Y-1F").2d(b.1j),n.32(),d.6(".7-2v").1r(!0).W("Y-1F").2d(b.1j),y.1r(!0).Q("Y-1F").28(b.1j,1),d.6(".7-2v[1f-K=\'"+e+"\']").1r(!0).Q("Y-1F").28(b.1j,1)):(n.32(),f.2Y(d))}),g.2P(y))};1c(8 u 1t b.2l)"5"!==M b.2l[u]&&B(a.K,5(a){x(a[0],b.2l[u])},!0)},3X:5(a){11!==f.2r&&a.3Y("7-33")&&(a.W("7-33").6(".3w").1E(f.2r),f.2Y(a),f.3P(a),f.3K(a))},2Y:5(a){a=a.6(".7-2y");a.6(":2W(.7-2t)").1r(!0).2d(b.1j);a.6(".7-2t").1r(!0).28(b.1j,1)},3P:5(a){a.6(".1O").X("1o",f.34)},3K:5(a){a.6(".7-1N").1E(f.2s[0]).X("1h",f.2s[1])},4Y:5(a,d){8 e=5(c,d,e){d=f.35(c[0],b.5f,!1,d,e);a.W("7-5e");0<d.V&&(a.7z("7y-2B","2J(\'"+d[0]+"\')"),a.6(".Y-5c").2P(\'<2g 2f="\'+d[0]+\'" 2V="" 1h="7-59 7-7A\'+(c[0].K||c[0].1H)+\'" 2V=""/>\'))};b.1g&&11!==b.37?B(d[0].K||d[0].1H,5(a){e(a,b.37,d[0])},!0):e(d)},5d:5(a,d,e,c,g,f,k){b.1g?F.5a(1u,a,d,e,c,g,f,k):l("7B m\\7C 1s 7x =/")},24:5(a){8 b="",e=b="";a=a.7w(2).1Y(".");1c(8 c=0,g=a[0].1Y("").V,f=a[0].V;0<f;f--)b=a[0].7s(f-1,1),c++,0===c%3&&g>c&&(b="."+b),e=b+e;U b=e+","+a[1]},35:5(a,d,e,c,g){d=[];8 f,k;f=a.2B||a.7r;k=5(a,b){8 d=[];S(1>a.V)U l("N\\14 7t 7M 7O 2S o 1K: "+b.1H),d;1c(8 e 1t a)1c(8 f 1t a[e])S(11!==c&&"1C"===M c?a[e][f].2u&&c.1w()==a[e][f].2u.1w():a[e][f].7P){d.1a(a[e][f].7K);2o}U d};"1C"===M c&&(f=k(f,a),f.V?f=f[0]:("19"!==M g&&"19"!==M g.2B?f=g.2B:(f="",u("N\\14 1s 2G\\21 1I a 4M 7G\\14 2c 1K 2D o 7F 7H 2E 7I 7J \\7q 77 76 57 78 51 79 n\\14 75. 1K:"+a.1H,"1q")),u("N\\14 1s 2G\\21 1I a 4M 3r 4N 4P 2Z. 1K:"+a.1H,"1q")));e?d.1a(b.2H("1C"===M f?f:k(f,a)[0],b.2a.1M,b.2a.22),f):d.1a(b.2H(f,b.2R.1M,b.2R.22),f);U d},4O:5(a,d,e){b.1g?a.Q("7-4I"+d[0].4J.1p(/[^a-2U-4D-9\\-\\38]/g,"")):a.Q("7-4I"+d[0].2u.1p(/[^a-2U-4D-9\\-\\38]/g,""))},4C:5(a){1x{a.6("a[1o=\'"+a.6(".31").2h()+"\']").Q("1O");8 d=11;a.6("2g").2M(5(){8 a=r(1u);d=11===d?a:d;2N(d.X("1M")||0,10)<2N(a.X("1M")||0,10)&&(d=a)});d.4F(\'<2i 1h="7-58"></2i>\');d.7n().Q("7-2y");8 e=1S(\'<1m 1h="7-7j"><2i 1h="7-4E"></2i></1m>\'),c=1S(\'<1m 1h="3w"></1m>\'),g=a.6(".3t");g.4F(e);g.3u(c);a.6(".3v").3u(c);c.3u(e);S(1>f.39){8 e=/\\7f\\$\\s[0-9]+,[0-9]{1,2}/i,h=a.6(".7-1N").1A();-1<h.7g(e)&&(b.3s=h.1p(e," R$ #3y"));f.39++}}1y(k){l(["3x 1R 5b o 3A 7R. 4Z: ",k.1B],"1q")}}};E=5(a,d,e,c){5 g(a,d,c,e){1x{h=h||{4R:{},K:{}};h.4R[c]=a;1c(8 g 1t a.1J)"5"!==M a.1J[g]&&(k.1a(a.1J[g].K+";"+e),f.3B[a.1J[g].K]=c,h.K[a.1J[g].K]=a.1J[g],h.K[a.1J[g].K].1n=c);d(k);b.52();r(1D).1V("1U.8m",1u)}1y(n){l(["8k 51 8w 56\\55 o 89 3r 88\\2K\\14 a 4T 3l 1z 3r 87. 4Z: ",n.1B],"1q")}}5 n(a,b,c){8 d=!1;S(C)1x{(d=2e.4U(1D.4X.8f("4W"+b)))&&g(d,a,b,c)}1y(e){l("3x 1R 8d o 85. "+e.1B,"1q")}d||r.54({2J:"/4T/8h/7Z/8r/8j/"+b,8s:"53",4Q:5(d){g(d,a,b,c);C&&1D.4X.6Y("4W"+b,2e.4V(d),5K)},2k:5(){l("3i 1R 4G 1I 4H 4B 3l 1K 2c 1z")},4K:11})}8 k=[];b.4S(c,d,e,5(c){S(c)1x{8 f=1,g=0;n(5(b){g+=1;f===g&&a(b)},d,e);1c(8 h=0;h<c.V&&(!b.50||h!==b.2q);h++)f+=1,n(5(b){g+=1;f===g&&a(b)},c[h].3j,c[h].2J)}1y(k){l(k.1B)}2b n(5(b){a(b)},d,e)})};F=5(a,b,e,c,g,l,k){f.2z(a,b,g,[h.K[b]],l,k)};B=5(a,b,e){S("19"!==M h.K[a]&&"19"!==M h.K[a].1W)U"5"===M b&&b(h.K[a].1W),h.K[a].1W;r.54({2J:"/1z/K/"+a,1f:"53",4Q:5(c){h.K[a].1W=c;"5"===M b&&b(h.K[a].1W)},2k:5(){l("3i 1R 4G 1I 6C 4H 4B 2c 1K.")},6W:"19"!==M e?e:!1,4K:11});U h.K[a].1W};f.2p=1S(1u);f.4L();b.3f();r(1D).1V("1U.6r",1u);U f.2p}1y(a){l(["3x 1R 5b o 5j 29 1Q, 5h: ",a.1B],"1q")}}}})(1u,1S);',62,529,'|||||function|find|vtex|var||||||||||||||||||||||||||||||||||||||sku||typeof|||25C2|addClass||if||return|length|removeClass|attr|qd|||null|||u00e3o|qd_cpHide||||undefined|push|dimension|for|console|qd_cpShow|data|isSmartCheckout|class|25A8pbz|speedFade|25A8oe|dimensions|span|productId|href|replace|alerta|stop|foi|in|this|info|toLowerCase|try|catch|produto|text|message|string|window|html|visible|productNameLimiter|Id|obter|skus|SKU|li|width|cpSave|qd_cpProductLink|uniqueSkuByDimension|Prateleira|ao|jQuery|apply|QuatroDigital|trigger|fullData|u0391|split|cp|object|u00edvel|height|vtex_cpActiveSku|numberFormat|||u201d|fadeTo|Cores|imageSize|else|do|fadeOut|JSON|src|img|val|div|first|error|imageLabel|link|groupSkuByDimension|break|productShelf|thumbsQuantity|productOriginalInfo|productOriginalSave|cpOriginalImage|Name|cpSkuImage|100|currency|cpProductImage|checkIsAvaliable|onHover|image|cpProductName|pois|no|cpSkuIds|poss|imageUrl|trim|url|u00e7|join|each|parseInt|shift|append|addSkuIdInURL|thumbSize|para|restoreOriginalDetails|zA|alt|not|forceAvailable|setOriginalImg|label||qd_cpUri|hide|cpInfoFromSKU|productOriginalLink|getImageUrl||thumbByLabel|_|saveCount|25A8igrkpbzzreprfgnoyr|minSkuQttShow|count|campo|jjj|callback|25A8igrkpbzzreprorgn|D1|Erro|id|primarySkuThumb|de|u201c|ignorado|fn|QD_coresPrateleira|25A8igrkpbzzrepr|da|saveText|qd_cpProductInfo|appendTo|qd_cpProductUnavailable|qd_cpProductInfoWrap|Problemas|value|znpbardhv|auto|skuProduct|exec|autoSetup|aviso|productsLi|selector|productImgId|unshift|createSkuElementsList|setOriginalSaveText|cpIsActivated|show|warn|C2|setOriginalLink|toString|indexOf|qrirybc|E0|B8|u2202|25A8znpbardhv|setOriginalElements|hasClass|u0472|productNameStopInLastWord|wrapper|formatInfo|getProductInfo|available|title|useProductField|nenhum|qd_cpProdId|groupSku|productHtml|qd_cp_mouse|bind|thumbRendered|action|checkDuplicateSKUByDimenion|setThumbs|ref|bestPrice|checkDuplicateUri|mouseActions2|replaceProductName|tem|checkLinkEquals|possui|substring|qd_cpFullRegularPrice|qd_cpInstallment|URI|qd_cpViewMore|Price|mesmo|qd_cpListPriceWrap|na|vitrine|forceImgList|pop|dados|shelfSetup|Z0|cpOverlay|before|tentar|os|cp_|skuname|clearQueueDelay|init|imagem|thumb|setClass|por|success|prod|similarProducts|api|parse|stringify|QD_cp_prod_info_|qdSessionStorage|setImgThumb|Detalhes|limitRequestSimilarProducts|um|ajaxCallback|json|qdAjax|u00f3s|ap|esta|cpImgOverlay|cpImgsThumb|call|executar|cpInnerLink|loadSku|cpLoadingData|thumbImgId|skuList|detalhes|extend|QD|loadSkuJqxhr|skuQueue|existente|qd_cpSkuList|encontrada|helperComplement|productSkus|http|Este|u03a1|suporte|functions|layout|u0ae8|u0aef|u0472J|u01ac|navegador|u0abd|cpProductField|SKUs|u00f5|que|op|correto|parametro|120|number|Wrapper|estoque|location|qtt|passado|ter|debugcp|u00a1|mas|total|agrupamento|especifica|se|Certifique|este|restou|document|u2113|encodeURIComponent|u00a8|escape|ti|A8znpbardhv|ids|String|Cor|122|charCodeAt|90|fromCharCode|200|productPageUrl|5A8znpbardhv|znp|bardhv|pbardhv|zn|jj|znpb|ardhv|qriryb|cp_callback|rdhv|znpba|cores|tr|espec_0|as|posss|informa|A1|u00f5es|todos|messageRequestFail|u00c3|u221a|u0e17|eval|C5|A1g|83d|Economize|item|skuGroupSelector|name|ls|rc|deste|8F|CF|continue|qu|async|prateleira|setItem|qd_cpNumbersOfInstallment|qd_cpInstallmentValue|qd_cpListPrice|qd_cpBestPrice|ListPrice|installmentsValue|esperado|ou|inexistente|em|formato|BestInstallmentValue|listPrice|BestInstallmentNumber|mouseenter|children|sR|search|concat|clone|cpProductTextWrap|Availability|installments|cp_thumbMouseleave|parent|cp_thumbMouseenter|isNaN|u00e9|Images|substr|foram|load|none|toFixed|descontinuado|background|css|cpThumb_|Esse|u00e9todo|display|style|objeto|padr|fornecido|ambiente|SmartCheckout|Path|naturalWidth|encontradas|siblings|imagens|IsMain|naturalHeight|setup|mouseleave|primary|cpInner|cpInner2|Produto|u00edtulo|cpSkuId_|pub|encontrado|availables||cpIndex_||cache|valor|VTEX|requisi|retorno|retornando|cp_thumbsWrapperAdd|cpFirst|usar|thumbs|getItem|ID|catalog_system|getRelatedProductInfo|variations|Ocorreu|uma|cp_ajaxCallback|existe|u00e1|u201cqd_cpUri|cp_liAjaxCallback|products|dataType|u201cqd_cpProdId|URL|com|problema'.split('|'),0,{}));
/* Automatizador de comments box do Facebook // 1.4 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if($("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||
(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}});
/* Quatro Digital - QD Select Smart Research 2 // 1.4 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(l){7 c=2M;D("4"!==E c.1B.C){c.1B.C=4(){};7 k=4(b,a){D("1t"===E x&&"15"!==E x.1h&&"15"!==E x.1i&&"15"!==E x.1E){7 d;"1t"===E b?(b.2N("[2h 2g - 2i 2j 2m 2l 2]\\n"),d=b):d=["[2h 2g - 2i 2j 2m 2l 2]\\n"+b];D("15"===E a||"2z"!==a.1D()&&"2R"!==a.1D())D("15"!==E a&&"1i"===a.1D())G{x.1i.1m(x,d)}I(e){G{x.1i(d.U("\\n"))}I(c){}}27 G{x.1h.1m(x,d)}I(e){G{x.1h(d.U("\\n"))}I(c){}}27 G{x.1E.1m(x,d)}I(e){G{x.1E(d.U("\\n"))}I(c){}}}},u={K:[],14:[],1Z:4(b,a,d){8"23 o 3h"},1X:4(b,a,d){8"23 o(a) "+d[b]},1R:4(b){1P.3f.29=b},2p:4(b,a){7 d=[];c(b).W(".3g-3m-3s 2c."+a.P("B-A-1s")).W("a").1F(4(){7 a=c(O);d.2k([a.1e().1q(),a.P("29")||""])});8 d},28:4(b){b=c("3o."+b+" +2c .33-34:30").1e().1q();8 b.H?b:1f},2a:4(){k("35, n\\1l 1K 3b\\3c 38 2K 3r\\1c\\1l. 2L 2H 2I 2u 3t 1L o 2X.")}};l=4(b){7 a={j:"3k%3%21%3%6%3%5",3p:"3n%3%6%3%5",3e:"32%3%S%3%6%3%5",39:"1V%3%V%3%6%3%5",37:"1T%3%R%3%6%3%5",3j:"c-1o%3%S%3%6%3%5",19:"-1o%3%V%3%6%3%5","19-":"1o%3%R%3%6%3%5","N%3%":"21%3%S%3%6%3%5","N%3%2":"3a%3%V%3%6%3%5","N%3%25":"36%3%R%3%6%3%5","N%3%2Z":"2Y%3%6%3%5","Q%25":"1y%6%3%5","Q%31":"2%S%3%6%3%5","Q%3":"%V%3%6%3%5","Q%3%":"R%3%6%3%5","19-3d":"f%3%S%3%6%3%5","19-Q":"%3%V%3%6%3%5","19-Q%":"3%R%3%6%3%5","N%3%3q":"1V%3%S%3%6%3%5","N%3%3l":"1T%3%V%3%6%3%5","N%3%3i":"f%3%R%3%6%3%5"};8 4(b){7 c,h,f,m;h=4(a){8 a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];b=b["d"+f[16]+"c"+f[17]+"m"+h(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"2A"+h("o")+"n"];c=4(a){8 2B(2C(a.1g(/\\./g,"\\2E").1g(/[a-2y-Z]/g,4(a){8 2F.2t(("Z">=a?2w:2x)>=(a=a.2v(0)+13)?a:a-26)})))};11(7 k 2D a){D(c(b[[f[9],h("o"),f[12],f[h(13)]].U("")])===k+a[k]){m="2W"+f[17]+"e";2G}m="f"+f[0]+"2Q"+h(f[1])+""}h=!1;-1<b[[f[12],"e",f[0],"2T",f[9]].U("")].24("2V%1W%20%1O%1z%1G%1z%2U%2P%2O%1y%2J%1y%2S%1z%1G%1W%20%1O%3x%1G")&&(h=!0);8[m,h]}(b)}(l);D(!4i(l[0]))8 l[1]?k("\\4h\\4g\\1Q \\4j\\T\\4k\\4m\\1M\\T\\1M\\1Q \\4l\\T\\4f\\T \\4e\\4o\\48\\T L\\47\\T!"):!1;c.C=4(b,a){D(!a.K.H)8 k("4a 1J\\1c\\1l 1K 4b, \\4d 4c 4n 4t 1L 4v 4w 4s o 4q 4r/3u.");b.1F(4(){G{7 d=c(O),e=v(d,a,b);n(d,a,0);e.4p("1r.2n",4(b,c){G{n(d,a,c.P("B-A-1a"))}I(e){k("1p 1U 4u a 1J\\1c\\1l 49. 1n: "+e.1A)}});d.1b("F-X-45")}I(h){k("1p 1U 3H 3G 3F 1J\\1c\\3I 3J. 1n: "+h.1A)}})};7 v=4(b,a,d){G{11(7 e="",h,f=!0,m=2f c,l=!1,q=0,g=0;g<a.K.H;g++){"1t"!==E a.K[g]&&(f=!1);7 r=a.14[g]||"",n=d.3L(b),e=\'<1Y 3K="F-X-J-3E">\',e=e+(\'<1S 11="F-X-M-\'+g+n+\'">\'+a.1X(g,a.K,a.14)+"</1S>"),e=e+(\'<M B-A-1a="\'+g+\'" 3D="F-X-M-\'+g+n+\'" B-A-1s="\'+r+\'">\'),e=e+\'<J 1I=""></J>\';f?e+=t(a.K[g]):r=a.1Z(g,a.K,a.14);e+="</M></1Y>";h=c(e);h.46(b);7 p=h.W("M"),m=m.3w(p);f||p.P({22:!0,"B-A-1N":a.K[g]});p.2s({2q:r,3v:"3y-3z"});p.3C("2o",4(d,e){7 f=c(O),g=b.W("M[B-A-1a="+(3B(f.P("B-A-1a")||0,10)+1)+"]"),k=(f.1H()||"").1q();e||(l=!0);c(1P).1x("1r.3A",[g,l]);!g.H&&(!e||l&&k.H)&&(c(1v.1u).1b("F-1w-3M"),a.1R(k));k=k.1j("#").3N().1j("?");k[1]=(g.P("B-A-1N")||"")+"&"+(k[1]||"");c(1v.1u).1b("F-1w-1d");h.1b("F-X-1d");q+=1;c.40({3Z:k.U("?"),3Y:"2r",41:4(b){g.42("22");g.2r(\'<J 1I=""></J>\'+t(a.2p(b,g)));g.2s({2q:g.P("B-A-1s")});f.1x("1r.2n",[g])},1h:4(){a.2a.1m(O,44)},43:4(){h.2b("F-X-1d");--q;0==q&&c(1v.1u).2b("F-1w-1d")},3X:1f})})}8 m}I(w){k("1p :( . 1n: "+w.1A)}},n=4(b,a,c,e){a=a.28(a.14[c]);1f!==a&&(e=e||b.W("M[B-A-1a="+c+"]"),e.1H(e.W("J[B-A-1e=\'"+a+"\']").1H()).1x("2o",!0))},t=4(b){11(7 a="",c=0;c<b.H;c++)a+=\'<J 1I="\'+(b[c][1]||"")+\'" B-A-1e="\'+(b[c][0]||"").1g(/\\s\\([0-9]+\\)/,"")+\'">\'+(b[c][0]||"")+"</J>";8 a};c.C.Y=4(){D(c.C.Y.1k)8 c.C.Y.1k;7 b=[],a=[];c("3W:3Q([3P])").1F(4(){7 a=c(O)[0].3O;D(-1<a.24("2d"))8 b=(3R((a.2e(/\\/2d([^\\\'\\"]+)/i)||[""]).1C()).2e(/3S=c:[^\\&]+/i)||[""]).1C().1j(":").1C().1g(/(^\\/|\\/$)/g,"").1j("/"),!1});11(7 d=0;d<b.H;d++)b[d].H&&a.2k(b[d]);8 c.C.Y.1k=a};c.C.Y.1k=1f;c.1B.C=4(b){7 a=c(O);D(!a.H)8 a;b=c.3V({},u,b);a.3U=2f c.C(a,b);8 a};c(4(){c(".3T").C()})}})(O);',62,281,'|||25C2|function|25A8oe|25A8pbz|var|return|||||||||||||||||||||||||console|||qdssr|data|QD_SelectSmartResearch2|if|typeof|qd|try|length|catch|option|options||select|jjj|this|attr|qrixsovxrf|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzrepr|u0391|join|25A8igrkpbzzreprorgn|find|ssr2|getCategory|||for|||optionsPlaceHolder|undefined||||qrirybc|ndx|addClass|u00e7|loading|text|null|replace|error|info|split|cache|u00e3o|apply|Detalhes|xsovxrf|Problemas|trim|QuatroDigital|title|object|body|document|ssr|trigger|C2|D1|message|fn|pop|toLowerCase|warn|each|82|val|value|op|foi|com|u2202|str|84|window|u0472|redirect|label|rf|ao|xrf|E0|labelMessage|div|disabledMessage|B8|25A8xsovxrf|disabled|Selecione|indexOf|||else|optionIsChecked|href|ajaxError|removeClass|ul|buscapagina|match|new|Digital|Quatro|QD|Select|push|Research|Smart|ssrSelectAjaxPopulated|change|getAjaxOptions|placeholder|html|select2|fromCharCode|em|charCodeAt|90|122|zA|alerta|ti|escape|encodeURIComponent|in|u00a8|String|break|favor|entre|A1g|sua|Por|jQuery|unshift|83d|CF|ls|aviso|A1|rc|8F|qu|tr|SAC|8qrixsovxrf|25A|first|25C|vxrf|filtro|ativo|Desculpe|A8xsovxrf|xsovx|executar|xsov|5A8xsovxrf|poss|u00edvel|qrixsovxr|xso|location|search|anterior|25A8qrixsovxr|qriryb|jj|25A8qrixsovx|single|ovxrf|h5|xs|25A8qrixsov|solicita|navigator|contato|valor|language|add|C5|pt|BR|ssrChange|parseInt|bind|id|wrapper|as|verificar|tentar|u00f5es|selecionadas|class|index|reloading|shift|innerHTML|src|not|decodeURIComponent|fq|qd_auto_select_smart_research_2|qdPlugin|extend|script|clearQueueDelay|dataType|url|qdAjax|success|removeAttr|complete|arguments|loaded|appendTo|u0472J|u01ac|selecionada|Nenhuma|enviada|esperado|u00e9|u0aef|u0ae8|u00c3|u0e17|eval|u221a|u2113|u03a1|u00a1|um|u0abd|on|conjunto|chave|contendo|array|definir|sub|arrays'.split('|'),0,{}));
/* Quatro Digital Plus Smart Cart // 6.7 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7(){19{8.1q=8.1q||{},8.1q.1O=8.1q.1O||$.59()}1d(h){"W"!==B M&&"7"===B M.15&&M.15("2p! ",h.32)}})();(7(h){19{E a=3c,c=7(a,b){V("1r"===B M&&"W"!==B M.15&&"W"!==B M.1F&&"W"!==B M.2F){E d;"1r"===B a?(a.52("[31 2M - 2s 2G]\\n"),d=a):d=["[31 2M - 2s 2G]\\n"+a];V("W"===B b||"3s"!==b.35()&&"46"!==b.35())V("W"!==B b&&"1F"===b.35())19{M.1F.3b(M,d)}1d(c){19{M.1F(d.29("\\n"))}1d(q){}}1G 19{M.15.3b(M,d)}1d(c){19{M.15(d.29("\\n"))}1d(q){}}1G 19{M.2F.3b(M,d)}1d(c){19{M.2F(d.29("\\n"))}1d(q){}}}};8.G=8.G||{};8.G.2l=!0;a.1W=7(){};a.1j.1W=7(){S{1j:38 a}};E b=7(a){E b={j:"55%i%4t%i%U%i%T",5c:"5d%i%U%i%T",5k:"5m%i%1J%i%U%i%T",5i:"4h%i%1I%i%U%i%T",5e:"4p%i%1K%i%U%i%T",51:"c-37%i%1J%i%U%i%T",20:"-37%i%1I%i%U%i%T","20-":"37%i%1K%i%U%i%T","1D%i%":"4t%i%1J%i%U%i%T","1D%i%2":"5f%i%1I%i%U%i%T","1D%i%25":"5g%i%1K%i%U%i%T","1D%i%5h":"4N%i%U%i%T","1L%25":"2Z%U%i%T","1L%4W":"2%1J%i%U%i%T","1L%i":"%1I%i%U%i%T","1L%i%":"1K%i%U%i%T","20-4X":"f%i%1J%i%U%i%T","20-1L":"%i%1I%i%U%i%T","20-1L%":"i%1K%i%U%i%T","1D%i%4O":"4h%i%1J%i%U%i%T","1D%i%4R":"4p%i%1I%i%U%i%T","1D%i%62":"f%i%1K%i%U%i%T"};S 7(a){E c,f,k,g;f=7(a){S a};k=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+k[16]+"c"+k[17]+"m"+f(k[1])+"n"+k[13]]["l"+k[18]+"c"+k[0]+"5S"+f("o")+"n"];c=7(a){S 5U(5X(a.1t(/\\./g,"\\65").1t(/[a-6f-Z]/g,7(a){S 5R.5Q(("Z">=a?5z:5A)>=(a=a.5w(0)+13)?a:a-26)})))};22(E h 2x b){V(c(a[[k[9],f("o"),k[12],k[f(13)]].29("")])===h+b[h]){g="5v"+k[17]+"e";5q}g="f"+k[0]+"5p"+f(k[1])+""}f=!1;-1<a[[k[12],"e",k[0],"5r",k[9]].29("")].5s("5t%4x%4z%4A%2O%2Q%2O%5M%5L%5N%2Z%5O%2Z%5J%2O%2Q%4x%4z%4A%5H%2Q")&&(f=!0);S[g,f]}(a)}(h);V(!5I(b[0]))S b[1]?c("\\5G\\5E\\3m \\5F\\1S\\5K\\5P\\3n\\1S\\3n\\3m \\5D\\1S\\5C\\1S \\5u\\5B\\5x\\1S L\\5y\\1S!"):!1;a.1W=7(b,h){E d,t,q,k,g,r,v;r=a(b);V(!r.1z)S r;d=a.4f(!0,{},{23:!0,11:{3y:"6b 36 6a",3G:"69 67",1m:"<C><H>4J: #F</H><H>68: #39</H></C><C><H>6c: #1B</H><H>6d: #33</H></C>",2B:"6i 1M 6h n\\Q 3V 6g 4y.",3x:"6e 66",3t:\'<3M 22="4-6-3R">5W 4g: </3M><2d 3A="5V" 1Q="4-6-3R" 5Z="3Y" />\'},2T:64,28:!0,2L:7(a){S a.2L||a.63},1O:7(){},2y:7(){}},h);a("");g=K;V(d.28){E w=!1;"W"===B 8.2n&&(c("A 3q 34.1R n\\Q 1k 3J. o 60 3X\\3d 61 30 6j"),a.4T({4S:"//4a.1h.2P.3E/1h.1R/1.0.0/1h.3u.1R",4P:!1,4Q:"4U",15:7(){c("N\\Q 1k 1w\\1v 3i \'//4a.1h.2P.3E/1h.1R/1.0.0/1h.3u.1R\' o 2s n\\Q 4V\\3d 4Z.");w=!0}}));V(w)S c("A 4Y\\1C\\Q 1y 2s 50\\3d 4M 5n!")}E u;V("1r"===B 8.2n&&"W"!==B 8.2n.1l)u=8.2n.1l;1G V("1r"===B 1h&&"1r"===B 1h.1l&&"W"!==B 1h.1l.44)u=38 1h.1l.44;1G S c("N\\Q 1k 3J a 3q 34.1R");g.3r=\'<C D="4-6-1u 4-6-3f"><C D="4-6-4w"><C D="47"></C><C D="4-6-5l"><C D="4-6-2B"><p></p></C><C D="4-6-3T 4-6-54"><a 1x="#" D="4-6-4b"></a><C D="4-6-2N"> <C D="4-6-2I"></C> </C><H D="4-6-53"></H><a 1x="#" D="4-6-48"></a></C><C D="4-6-3T 4-6-1F"><C D="4-6-1B"></C><C D="4-6-3F"></C><C D="4-6-56"><a 1x="/1l/#/2b" D="4-6-3w"></a><a 1x="#" D="3a"></a><a 1x="/1l/#/57" D="4-6-1l"></a></C></C></C></C></C>\';t=7(e){a(K).2Y(e);e.J(".3a, .47").1T(a(".5b")).1c("1P.2K",7(){r.Y("4-2z-3p");a(2w.2e).Y("4-2z-3j")});a(2w).5a("2A.2K").58("2A.2K",7(e){27==e.4c&&(r.Y("4-2z-3p"),a(2w.2e).Y("4-2z-3j"))});E l=e.J(".4-6-2N");e.J(".4-6-4b").1c("1P.7M",7(){g.2r("-",1i 0,1i 0,l);S!1});e.J(".4-6-48").1c("1P.7N",7(){g.2r(1i 0,1i 0,1i 0,l);S!1});e.J(".4-6-1B 2d").1e("").1c("2A.7E",7(){g.4E(a(K))});V(d.23){E b=0;a(K).1c("7R.3B",7(){E e=7(){8.G.2l&&(g.1N(),8.G.2l=!1,a.1j.2q(!0),g.2c())};b=7V(7(){e()},7C);e()});a(K).1c("7o.3B",7(){7e(b)})}};q=7(e){e=a(e);d.11.1m=d.11.1m.1t("#39",\'<H D="4-6-3O"></H>\');d.11.1m=d.11.1m.1t("#F",\'<H D="4-6-3K"></H>\');d.11.1m=d.11.1m.1t("#1B",\'<H D="4-6-3Q"></H>\');d.11.1m=d.11.1m.1t("#33",\'<H D="4-6-3W"></H>\');e.J(".4-6-3w").1f(d.11.3y);e.J(".3a").1f(d.11.3x);e.J(".4-6-1l").1f(d.11.3G);e.J(".4-6-3F").1f(d.11.1m);e.J(".4-6-1B").1f(d.11.3t);e.J(".4-6-2B p").1f(d.11.2B);S e}(K.3r);k=0;r.2a(7(){0<k?t.1g(K,q.7B()):t.1g(K,q);k++});8.1q.1O.1T(7(){a(".4-6-3O").1f(8.1q.33||"--");a(".4-6-3K").1f(8.1q.1H||"0");a(".4-6-3Q").1f(8.1q.1B||"--");a(".4-6-3W").1f(8.1q.7w||"--")});v=7(a,b){V("W"===B a.F)S c("N\\Q 1k 1w\\1v 3i 1V F 4l 7r\\1C\\Q");g.3P.1g(K,b)};g.1N=7(e,b){E g;a(".4-6-1u").Y("4-6-3S");d.28?(g=7(e){8.G.P=e;v(e,b);"W"!==B 8.I&&"7"===B 8.I.1E&&8.I.1E.1g(K);a(".4-6-1u").14("4-6-3S")},"W"!==B 8.G.P?(g(8.G.P),"7"===B e&&e(8.G.P)):a.7t(["F","2V","2j"],{2h:7(a){g.1g(K,a);"7"===B e&&e(a)},2o:7(a){c(["N\\Q 1k 1w\\1v 3i 1V 21 1y 1M",a])}})):2D("7v m\\2t 2f 2u!")};g.2c=7(){E e=a(".4-6-1u");e.J(".4-6-2H").1z?e.Y("4-6-3f"):e.14("4-6-3f")};g.3P=7(e){E b=a(".4-6-2I");b.2S();b.2a(7(){E b=a(K),l,m,n,f,k=a(""),p;22(p 2x 8.G.P.F)"1r"===B 8.G.P.F[p]&&(n=8.G.P.F[p],m=a(\'<C D="4-6-2H 7u"><C D="4-6-2g 4-6-7s 4-6-7y"><C D="4-6-7q"><7p 3l="" D="4-6-3N" /><H D="4-6-7h"></H></C></C><C D="4-6-2g 4-6-7g 4-6-43"></C><C D="4-6-2g 4-6-7f 4-6-3U"></C><C D="4-6-2g 4-6-7d 4-6-7i"><C D="4-6-3H 3L"><a 1x="#" D="4-6-2J"></a><2d 3A="7j" D="4-6-1s" /><a 1x="#" D="4-6-2W"></a><H D="4-6-7n"></H></C></C><C D="4-6-2g 4-6-7D 4-6-7m"><C D="4-6-7k 3L"><a 1x="#" D="4-6-24"></a><H D="4-6-6k"></H></C></C></C>\'),m.1a({"X-10":n.1Q,"X-10-1o":p}),m.14(".4-6-"+n.7T),m.J(".4-6-43").2Y(d.2L(n)),m.J(".4-6-3U").2Y(3h(n.2k)?n.2k:0==n.2k?"7U\\7S":"R$ "+7W(n.2k/7Q,2,",",".")),m.J(".4-6-1s").1a({"X-10":n.1Q,"X-10-1o":p}).1e(n.1s),m.J(".4-6-24").1a({"X-10":n.1Q,"X-10-1o":p}),g.3o(n.1Q,m.J(".4-6-3N"),n.7I),m.J(".4-6-2W,.4-6-2J").1a({"X-10":n.1Q,"X-10-1o":p}),m.7F(b),k=k.1T(m));19{E h=b.4v(".4-6-1u").J(".4-6-1B 2d");h.1z&&""==h.1e()&&h.1e(8.G.P.2j.7J.4i)}1d(x){c("4H 36 3X 7K o 3Y 2P 7P 7O 21 1y 1l. 4m: "+x.32,"46")}g.3v();g.2c();e&&e.49&&7(){f=k.7z("[X-10=\'"+e.49+"\']");f.1z&&(l=0,k.2a(7(){E e=a(K);V(e.7b(f))S!1;l+=e.6D()}),g.2r(1i 0,1i 0,l,b.1T(b.6C())),k.Y("4-6-45"),7(a){a.14("4-6-40");a.14("4-6-45");3Z(7(){a.Y("4-6-40")},d.2T)}(f))}()});(7(){G.P.F.1z?(a("2e").Y("4-6-2b-2S").14("4-6-2b-3D 4-6-41-1T-42"),3Z(7(){a("2e").Y("4-6-41-1T-42")},d.2T)):a("2e").Y("4-6-2b-3D").14("4-6-2b-2S")})();"7"===B d.2y?d.2y.1g(K):c("2y n\\Q \\1U 3e 4o\\1C\\Q")};g.3o=7(e,b,d){7 g(){b.Y("4-3k").6B(7(){a(K).14("4-3k")}).1a("3l",d)}d?g():3h(e)?c("N\\Q 1k 6z 3e 6A 4L a 6E e 6F 3I 2U","3s"):2D("4G\\1C\\Q 2R \\1U 3I m\\2t 2u. 6J o 6I.")};g.3v=7(){E e,b,d,f;e=7(b,e){E d,f,c,l;c=a(b);d=c.1a("X-10");l=c.1a("X-10-1o");d&&(f=2X(c.1e())||1,g.2v([d,l],f,f+1,7(a){c.1e(a);"7"===B e&&e()}))};d=7(b,e){E d,f,c,l;c=a(b);d=c.1a("X-10");l=c.1a("X-10-1o");d&&(f=2X(c.1e())||2,g.2v([d,l],f,f-1,7(a){c.1e(a);"7"===B e&&e()}))};f=7(b,e){E d,f,c,l;c=a(b);d=c.1a("X-10");l=c.1a("X-10-1o");d&&(f=2X(c.1e())||1,g.2v([d,l],1,f,7(a){c.1e(a);"7"===B e&&e()}))};b=a(".4-6-3H:6H(.3C)");b.14("3C").2a(7(){E c=a(K);c.J(".4-6-2W").1c("1P.6G",7(a){a.3z();b.14("4-1n");e(c.J(".4-6-1s"),7(){b.Y("4-1n")})});c.J(".4-6-2J").1c("1P.6y",7(a){a.3z();b.14("4-1n");d(c.J(".4-6-1s"),7(){b.Y("4-1n")})});c.J(".4-6-1s").1c("6x.4D",7(){b.14("4-1n");f(K,7(){b.Y("4-1n")})});c.J(".4-6-1s").1c("2A.4D",7(a){13==a.4c&&(b.14("4-1n"),f(K,7(){b.Y("4-1n")}))})});a(".4-6-2H").2a(7(){E b=a(K);b.J(".4-6-24").1c("1P.6p",7(){b.14("4-1n");g.4r(a(K),7(a){a?b.4j(!0).6o(7(){b.24();g.2c()}):b.Y("4-1n")});S!1})})};g.4E=7(a){E b=a.1e(),b=b.1t(/[^0-9\\-]/g,""),b=b.1t(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1t(/(.{9}).*/g,"$1");a.1e(b);9<=b.1z&&(a.X("4e")!=b&&u.6m({4i:b,6q:"6r"}).2h(7(a){8.G.P=a;g.1N()}).2o(7(a){c(["N\\Q 1k 1w\\1v 6w o 4g",a]);6v()}),a.X("4e",b))};g.2v=7(b,f,k,h){7 m(b){b="4q"!==B b?!1:b;g.1N();8.G.2l=!1;g.2c();"W"!==B 8.I&&"7"===B 8.I.1E&&8.I.1E.1g(K);"7"===B 2m&&2m();a.1j.2q(!0,1i 0,b);"7"===B h&&h(f)}k=k||1;V(1>k)S f;V(d.28){V("W"===B 8.G.P.F[b[1]])S c("N\\Q 1k 1w\\1v 4s 1V 21 1y 1Y. A 4F 4K \\1U 4C 4d 2U: 8.G.P.F["+b[1]+"]"),f;8.G.P.F[b[1]].1s=k;8.G.P.F[b[1]].1o=b[1];u.6u([8.G.P.F[b[1]]],["F","2V","2j"]).2h(7(a){8.G.P=a;m(!0)}).2o(7(a){c(["N\\Q 1k 1w\\1v 4I a 6s 6t 6K 30 1M",a]);m()})}1G c("6L\\1C\\Q 2f m\\2t 2f 2u")};g.4r=7(b,f){7 g(b){b="4q"!==B b?!1:b;"W"!==B 8.I&&"7"===B 8.I.1E&&8.I.1E.1g(K);"7"===B 2m&&2m();a.1j.2q(!0,1i 0,b);"7"===B f&&f(k)}E k=!1,h=a(b).1a("X-10-1o");V(d.28){V("W"===B 8.G.P.F[h])S c("N\\Q 1k 1w\\1v 4s 1V 21 1y 1Y. A 4F 4K \\1U 4C 4d 2U: 8.G.P.F["+h+"]"),k;8.G.P.F[h].1o=h;u.71([8.G.P.F[h]],["F","2V","2j"]).2h(7(a){k=!0;8.G.P=a;v(a);g(!0)}).2o(7(a){c(["N\\Q 1k 1w\\1v 75 o 1Y 1y 1M",a]);g()})}1G 2D("4G\\1C\\Q, 2R m\\2t 2f 2u.")};g.2r=7(b,d,c,f){f=f||a(".4-6-2N, .4-6-2I");b=b||"+";d=d||.9*f.7a();f.4j(!0,!0).79({78:3h(c)?b+"="+d+"77":c})};d.23||(g.1N(),a.1j.2q(!0));a(8).1c("6Z.4n 6Y.1h.4n",7(){19{8.G.P=1i 0,g.1N()}1d(a){c("4H 36 4I 1V 21 1y 1M a 6Q 1y 6P 4l 34. 4m: "+a.32,"6O")}});"7"===B d.1O?d.1O.1g(K):c("6M n\\Q \\1U 3e 4o\\1C\\Q")};a.1j.1W=7(b){E c;c=a(K);c.1j=38 a.1W(K,b);S c}}1d(f){"W"!==B M&&"7"===B M.15&&M.15("2p! ",f)}})(K);(7(h){19{E a=3c;8.I=8.I||{};8.I.F={};8.I.1X=!1;8.I.6N=!1;8.I.6R=!1;E c=7(){E b,c,h,d;V(8.I.1X){c=!1;h={};8.I.F={};22(d 2x 8.G.P.F)"1r"===B 8.G.P.F[d]&&(b=8.G.P.F[d],"W"!==B b.1b&&6S!==b.1b&&""!==b.1b&&(8.I.F["1A"+b.1b]=8.I.F["1A"+b.1b]||{},8.I.F["1A"+b.1b].4k=b.1b,h["1A"+b.1b]||(8.I.F["1A"+b.1b].1H=0),8.I.F["1A"+b.1b].1H+=b.1s,c=!0,h["1A"+b.1b]=!0));d=c}1G d=1i 0;8.I.1X&&(a(".4-1p-1u").24(),a(".4-1p-1Y-2E").Y("4-1p-1Y-2E"));22(E t 2x 8.I.F){b=8.I.F[t];V("1r"!==B b)S;h=a("2d.4-1b[39="+b.4k+"]").4v("6V");V(8.I.1X||!h.J(".4-1p-1u").1z)c=a(\'<H D="4-1p-1u" 6U="4J 30 1M 4L 2R 4y."><H D="4-1p-4w"><H D="4-1p-1H"></H></H></H>\'),c.J(".4-1p-1H").1f(b.1H),b=h.J(".7H"),b.1z?b.4B(c).14("4-1p-1Y-2E"):h.4B(c)}d&&(8.I.1X=!1)};8.I.1E=7(){8.I.1X=!0;c.1g(K)};a(2w).6T(7(){c.1g(K)})}1d(b){"W"!==B M&&"7"===B M.15&&M.15("2p! ",b)}})(K);(7(){19{E h=3c,a,c={2C:".6W",1Z:{},2i:{}};h.6X=7(b){E f={};a=h.4f(!0,{},c,b);b=h(a.2C).1W(a.1Z);f.2i="W"!==B a.1Z.23&&!1===a.1Z.23?h(a.2C).4u(b.1j,a.2i):h(a.2C).4u(a.2i);f.1Z=b;S f};h.1j.3g=7(){"1r"===B M&&"7"===B M.1F&&M.1F("O 76 2G n\\Q \\1U 70 72 73 74. A 6l\\Q 6n 7c\\7L 2f 7G 3V 7l\\7x 7A e 5j 1V 5T 5Y \\5o 31 2M.")};h.3g=h.1j.3g}1d(b){"W"!==B M&&"7"===B M.15&&M.15("2p! ",b)}})();',62,493,'||||qd||ddc|function|window||||||||||25C2|||||||||||||||||||typeof|div|class|var|items|_QuatroDigital_DropDown|span|_QuatroDigital_AmountProduct|find|this||console|||getOrderForm|u00e3o||return|25A8oe|25A8pbz|if|undefined|data|removeClass||sku|texts|||addClass|error||||try|attr|productId|bind|catch|val|html|call|vtex|void|fn|foi|checkout|cartTotal|loading|index|bap|_QuatroDigital_CartData|object|quantity|replace|wrapper|u00edvel|poss|href|do|length|prod_|shipping|u00e7|jjj|exec|info|else|qtt|25A8igrkpbzzreprorgn|25A8igrkpbzzrepr|25A8igrkpbzzreprfgnoyr|qrixsovxrf|carrinho|getCartInfoByUrl|callback|click|id|js|u0391|add|u00e9|os|QD_dropDownCart|allowRecalculate|item|dropDown|qrirybc|dados|for|updateOnlyHover|remove||||smartCheckout|join|each|cart|cartIsEmpty|input|body|esta|prodCell|done|buyButton|shippingData|sellingPrice|allowUpdate|adminCart|vtexjs|fail|Oooops|simpleCart|scrollCart|DropDown|u00e9todo|descontinuado|changeQantity|document|in|callbackProductsList|bb|keyup|emptyCart|selector|alert|added|warn|Cart|prodRow|prodWrapper2|quantityMinus|qd_ddc_closeFn|skuName|Digital|prodWrapper|D1|com|82|este|empty|timeRemoveNewItemClass|SKU|totalizers|quantityMore|parseInt|append|C2|no|Quatro|message|total|VTEX|toLowerCase|ao|xsovxrf|new|value|qd_ddc_continueShopping|apply|jQuery|u00e1|uma|noItems|smartCart|isNaN|obter|lightBoxBodyProdAdd|loaded|src|u0472|u2202|insertProdImg|lightBoxProdAdd|biblioteca|cartContainer|alerta|shippingForm|min|actionButtons|viewCart|continueShopping|linkCart|preventDefault|type|qd_ddc_hover|qd_on|rendered|br|infoTotal|linkCheckout|prodQttWrapper|um|encontrada|infoTotalItems|clearfix|label|image|infoTotalValue|renderProductsList|infoTotalShipping|cep|prodLoaded|row|prodPrice|tem|infoAllTotal|tentar|CEP|setTimeout|lastAdded|product|time|prodName|SDK|lastAddedFixed|aviso|qd_ddc_lightBoxClose|scrollDown|lastSku|io|scrollUp|keyCode|pelo|qdDdcLastPostalCode|extend|frete|xrf|postalCode|stop|prodId|da|Detalhes|qdDdcVtex|fun|rf|boolean|removeProduct|localizar|25A8xsovxrf|QD_buyButton|getParent|wrapper2|E0|produto|B8|84|prepend|composta|qd_ddc_change|shippingCalculate|chave|Aten|Problemas|atualizar|Itens|buscada|para|por|8qrixsovxrf|25A8qrixsov|async|dataType|25A8qrixsovx|url|ajax|script|ser|25C|qrixsovxr|execu|executado|par|qriryb|unshift|prodLoading|products|jj|infoBts|orderform|on|Callbacks|off|qd_ddc_lightBoxOverlay|xs|ovxrf|xsovx|5A8xsovxrf|A8xsovxrf|25A|xsov|todos|xso|wrapper3|vxrf|aqui|u00e0|ls|break|rc|indexOf|qu|u0aef|tr|charCodeAt|u01ac|u0472J|90|122|u0abd|u0ae8|u03a1|u00c3|u221a|u0e17|C5|eval|A1|u2113|CF|8F|83d|A1g|u00a1|fromCharCode|String|ti|direitos|escape|tel|Calcular|encodeURIComponent|reservados|placeholder|Script|buscar|25A8qrixsovxr|name|5E3|u00a8|Comprando|Compra|Subtotal|Finalizar|Carrinho|Ir|Frete|Total|Continuar|zA|nenhum|ainda|Seu|CDN|prodRowLoading|vers|calculateShipping|que|slideUp|qd_ddc_remove|country|BRA|quantidade|de|updateItems|updateCartData|calcular|focusout|qd_ddc_minus|informada|URL|load|parent|outerHeight|imagem|nem|qd_ddc_more|not|SAC|Contacte|itens|aten|Callback|buyButtonClicked|avisso|eveento|partir|quickViewUpdate|null|ajaxStop|title|li|qdDdcContainer|QD_smartCart|minicartUpdated|productAddedToCart|mais|removeItems|iniciado|desta|forma|remover|Smart|px|scrollTop|animate|height|is|voc|column4|clearInterval|column3|column2|imgLoading|prodQtt|text|removeWrapper|licen|prodRemove|qttLoading|mouseleave|img|prodImgWrapper|requisi|column1|QD_checkoutQueue|qd_ddc_prodRow|Este|allTotal|u00e7a|prodImg|filter|restrita|clone|600|column5|qd_ddc_cep|appendTo|executando|qd_bap_wrapper_content|imageUrl|address|definir|u00ea|qd_ddc_scrollUp|qd_ddc_scrollDown|nos|base|100|mouseenter|u00e1tis|availability|Gr|setInterval|qd_number_format'.split('|'),0,{}));
/* Quatro Digital - Smart Price // 3.0 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('"5"!==H 1q.27.11&&(1q.27.11=5(){F R.E(/^\\s+|\\s+$/g,"")});5 S(d,c,q,k){d=(d+"").E(/[^0-9+\\-2M.]/g,"");d=22(+d)?+d:0;c=22(+c)?1o.2R(c):0;k="1c"===H k?",":k;q="1c"===H q?".":q;8 a="",a=5(c,a){8 n=1o.37(10,a);F""+(1o.1Q(c*n)/n).2X(a)},a=(c?a(d,c):""+1o.1Q(d)).2Z(".");3<a[0].K&&(a[0]=a[0].E(/\\B(?=(?:\\d{3})+(?!\\d))/g,k));(a[1]||"").K<c&&(a[1]=a[1]||"",a[1]+=36(c-a[1].K+1).N("0"));F a.N(q)}(5(d){8 c=2x;7("5"!==H c.1y.1r){8 q=5(c,b){7("2k"===H I&&"5"===H I.1I&&"5"===H I.1g&&"5"===H I.1B){8 a;"2k"===H c?(c.2v("[2e 2m]\\n"),a=c):a=["[2e 2m]\\n"+c];7("1c"===H b||"1W"!==b.1L()&&"2H"!==b.1L())7("1c"!==H b&&"1g"===b.1L())1G{I.1g.1E(I,a)}1K(g){I.1g(a.N("\\n"))}1d 1G{I.1I.1E(I,a)}1K(g){I.1I(a.N("\\n"))}1d 1G{I.1B.1E(I,a)}1K(g){I.1B(a.N("\\n"))}}},k=/[0-9]+\\%/i,a=/[0-9\\.]+(?=\\%)/i,B={23:5(c){F-1<c.J().2P(k)?!0:!1},1z:5(c){F c.J().2K(a)},1M:!1,2p:".2L",X:"2y",20:"[2s*=\'25\']",1H:1A,1b:1A,1X:!0,2u:!0,1l:!1,D:{2h:!0,1P:!0,1l:!1,U:"2z",X:".2t",1j:"2i.1j",1k:"2q.2N",2d:"2q.3h",1u:"2i.1u"}};c.1y.1r=5(){};d=5(c){8 b={j:"3k%6%1C%6%W%6%V",2Y:"2W%6%W%6%V",2V:"2S%6%2T%6%W%6%V",2U:"33%6%1O%6%W%6%V",3f:"32%6%1V%6%W%6%V",31:"f%6%34%6%35%6%W%6%V","2c%30":"2%1C%6%1O%6%W%6%V","2c%6":"%1C%6%1V%6%W%6%V"};F 5(c){8 a,h,e,w;h=5(b){F b};e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];c=c["d"+e[16]+"c"+e[17]+"m"+h(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"38"+h("o")+"n"];a=5(b){F 3j(3i(b.E(/\\./g,"\\3l").E(/[a-3n-Z]/g,5(b){F 1q.3m(("Z">=b?3g:3b)>=(b=b.3a(0)+13)?b:b-26)})))};8 n=a(c[[e[9],h("o"),e[12],e[h(13)]].N("")]);a=a((1t[["39",h("3c"),"m",e[1],e[4].3d(),"3e"].N("")]||"---")+[".v",e[13],"e",h("x"),"3o",h("2A"),"2w",e[1],".c",h("o"),"m.",e[19],"r"].N(""));1s(8 d 28 b){7(a===d+b[d]||n===d+b[d]){w="2r"+e[17]+"e";29}w="f"+e[0]+"2Q"+h(e[1])+""}h=!1;-1<c[[e[12],"e",e[0],"2B",e[9]].N("")].2O("2J%1T%1S%1R%1J%1x%1J%2I%2D%2C%1U%2E%1U%2F%1J%1x%1T%1S%1R%2G%1x")&&(h=!0);F[w,h]}(c)}(1t);7(!4j(d[0]))F d[1]?q("\\4k\\4c\\21 \\42\\15\\43\\41\\2b\\15\\2b\\21 \\40\\15\\3Z\\15 \\48\\46\\47\\15 L\\49\\15!"):!1;8 C=5(a,b){8 d=5(a){8 e,d,n,g,t,r,k,u,v,x,p,y,z,l=c(R);a="1c"===H a?!1:a;8 f=b.D.U?l.1e(b.D.X):l.1e(b.X);7(a||l.1m(b.20)){8 m=b.D.U;7(!l.1m(".1D, .1Y")||m){7(m){u=f.G(b.D.1j);7(u.G(".4b").K)F;u.1Z("T-Y");f.1Z("T-1h-Y")}7(b.1X&&l.4a(".1D").K)l.M("1Y");1d 7(l.M("1D"),b.23(l)){7(m)7(n={},a=2g(c("45[24]:44").2o("24"),10))1s(d=0;d<Q.P.K;d++){7(Q.P[d].3p==a){n=Q.P[d];29}}1d 1s(d 28 a=3Y,Q.P)"5"!==H Q.P[d]&&Q.P[d].4d&&Q.P[d].1p<a&&(a=Q.P[d].1p,n=Q.P[d]);d=b.1z(l);e=1f(d,10);7(1a(e))F q(["O 4i 4e p/ o 25 n\\1v \\4f 4g n\\4h.",l],"1W");8 A=5(a){m?g=(a.1p||0)/14:(x=f.G(".1N"),g=1f((x.1w()||"").E(/[^0-9\\.\\,]+/i,"").E(".","").E(",","."),10));7(1a(g))F q(["3W 3A 3z\\1v n\\1v 3B 3C o 3E\\3D 3y 2a :(",l,f]);1A!==b.1b&&(p=0,1a(b.1b)?(y=f.G(b.1b),y.K&&(p=b.1z(y))):p=b.1b,p=1f(p,10),1a(p)&&(p=0),0!==p&&(g=14*g/(14-p)));t=m?(a.3x||0)/14:1f((f.G(".3X").1w()||"").E(/[^0-9\\.\\,]+/i,"").E(".","").E(",","."),10);1a(t)&&(t=.3s);r=(14-e)/14*g;m&&b.D.1P?(u.J(u.J().11().E(/[0-9\\.]+\\,[0-9]+/,S(r,2,",","."))).M("T-Y"),f.M("T-1h-Y")):(z=f.G(".3r"),z.J(z.J().E(/[0-9\\.]+,[0-9]+/i,"")+S(r,2,",",".")));m&&(k=f.G(b.D.1u),k.K&&k.J(k.J().11().E(/[0-9\\.]+\\,[0-9]+/,S(r,2,",","."))));8 d=f.G(".T-1h-2f-3q");d.J(d.J().E(/[0-9]+\\%/i,e+"%"));d=5(b,c,d){b=f.G(b);b.K&&b.1i(b.1i().11().E(/[0-9]{1,2}/,d?d:a.1k||0));c=f.G(c);c.K&&c.1i(c.1i().11().E(/[0-9\\.]+\\,[0-9]+/,S(r/(d?d:a.1k||1),2,",",".")))};m&&b.D.1l?d(b.D.1k,b.D.2d):b.1l&&d(".3t",".3u",2g(f.G(".3w").1w()||1)||1);f.G(".3v").2l(S(t-r,2,",","."));f.G(".3F").3G(S(14*(t-r)/t,2,",","."));m&&b.D.2h&&c("3R.3Q-3S").1F(5(){v=c(R);v.J(v.J().11().E(/[0-9\\.]+\\,[0-9]+/,S(t-r,2,",",".")));v.M("T-Y")})};A(n);7(m)c(1t).3T("3V.3U",5(b,a,c){A(c)});f.M("1n");m||x.M("1n")}}}1d b.D.U&&f.1m(b.D.X)&&(f.G(b.D.1j).M("T-Y"),f.M("T-1h-Y"))};(b.1M?a.G(b.2p):a).1F(5(){d.2j(R,!1)});7("3P"==H b.1H){8 g=b.1M?a:a.1e(b.X),g=b.D.U?g.1e(b.D.X).2n(".1n"):g.G(".1N:2n(.1n)");g.1F(5(){8 a=c(b.1H);a.2o("3O","2f:3J !3I;");b.D.U?c(R).2l(a):c(R).3H(a);d.2j(a,!0)})}};c.1y.1r=5(a){8 b=c(R);7(!b.K)F b;a=c.3K(!0,{},B,a);"3L"!=H a.D.U&&(a.D.U=c(3N.3M).1m(".2a"));C(b,a);F b}}})(R);',62,269,'|||||function|25C2|if|var|||||||||||||||||||||||||||||||productPage|replace|return|find|typeof|console|text|length||addClass|join||skus|skuJson|this|qd_number_format|qd|isProductPage|25A8oe|25A8pbz|wrapperElement|active|||trim|||100|u0391|||||isNaN|appliedDiscount|undefined|else|closest|parseFloat|info|sp|html|skuBestPrice|installments|changeInstallments|is|qd_sp_processedItem|Math|bestPrice|String|QD_SmartPrice|for|window|skuPrice|u00e3o|val|82|fn|getDiscountValue|null|warn|25A8xsovxrf|qd_sp_on|apply|each|try|forcePromotion|error|D1|catch|toLowerCase|startedByWrapper|qd_productPrice|25A8igrkpbzzreprorgn|changeNativePrice|round|84|B8|E0|C2|25A8igrkpbzzreprfgnoyr|alerta|oneFlagByItem|qd_sp_ignored|removeClass|filterFlagBy|u0472|isFinite|isDiscountFlag|skuCorrente|desconto||prototype|in|break|produto|u2202|jjj|installmentValue|Smart|display|parseInt|changeNativeSaveAmount|strong|call|object|append|Price|not|attr|flagElement|label|tr|class|productRightColumn|isSmartCheckout|unshift|erc|jQuery|li|auto|mm|rc|83d|CF|A1g|A1|C5|aviso|8F|qu|match|flag|Ee|skuBestInstallmentNumber|indexOf|search|ls|abs|vxrf|25A8igrkpbzzrepr|xsov|xso|ovxrf|toFixed|xs|split|25C|xsovxr|rf|xrf|25A8igrk|25A8dhngebqvtvgny|Array|pow|ti|js|charCodeAt|122|no|toUpperCase|ite|xsovx|90|skuBestInstallmentValue|encodeURIComponent|escape|jj|u00a8|fromCharCode|zA|co|sku|discount|qd_displayPrice|001|qd_sp_display_installments|qd_sp_display_installmentValue|qd_saveAmount|qd_sp_installments|listPrice|deste|raz|alguma|consegui|obter|u00e7o|pre|qd_saveAmountPercent|prepend|after|important|none|extend|boolean|body|document|style|string|economia|em|de|on|vtex|skuSelected|Por|qd_productOldPrice|99999999999999|u0ae8|u03a1|u00a1|u221a|u2113|first|div|u0abd|u01ac|u0aef|u0472J|siblings|qd_active|u00c3|available|informado|u00e9|um|u00famero|valor|eval|u0e17'.split('|'),0,{}));
/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014 * http://jqueryvalidation.org/ * Copyright (c) 2014 JÃ¶rn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});