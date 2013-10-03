var app = angular.module('app', []);
window.learnSelected = false;
app.factory('myService', function($http) {
	var myService = {
		async: function() {
			// $http returns a promise, which has a then function, which also returns a promise
			var promise = $http.get('data/data.xml').then(function (response) {
				// The return value gets picked up by the then in the controller.
				return response.data;
			});
			// Return the promise to the controller
			return promise;
		}
	};
	return myService;
});
app.filter('ie', function(){
	return function(v, yes, no){
		return v ? yes : no;
	};
});

app.controller('filterCtrl', function(myService, $scope) {
	$scope.xmlData = {};
	$scope.data = {};
	$scope.learnSelected = false;

	$scope.imageCollection = [];
	// priority fixes

	$scope.roomCollection = {'All_rooms':{text: 'All Rooms', selected: true, count: 0,priority:0}};
	// priority fixes end

	$scope.learnCollection = {};

	$scope.woodStyles = [{text: 'All', selected: true, count: 0, src: "filters/style_all.png"}];
	$scope.woodTypes = [{text: 'All', selected: true, count: 0, src: "filters/wood_all.png"}];
	$scope.woodColors = [{text: 'All', selected: true, count: 0, src: "filters/color1.png"}];
	$scope.woodCollections = [];
	
	$scope.woodStylesCol = {};
	$scope.woodTypesCol = {};
	$scope.woodColorsCol = {};
	$scope.woodCollectionsCol = {};

	$scope.pannel = {name: 'All Rooms', count: 0, totalcount: 0, index: 1};
	$scope.topInfoBlock = {title: '', description: '', attributs: []};
	var left_open = 0;
	var right_open = 0;

// priority fixes
	
 sortImages = function() {
  var tmp;
  for ( i = 0; i < $scope.imageCollection.length - 1; i++ ) {
   for ( j = i + 1; j < $scope.imageCollection.length; j++ ) {
    if(parseFloat($scope.imageCollection[i]._i_priority) > parseFloat($scope.imageCollection[j]._i_priority)) {
     tmp = $scope.imageCollection[i];
     $scope.imageCollection[i] = $scope.imageCollection[j];
     $scope.imageCollection[j] = tmp;
    }
   }
  }
 }
 $scope.roomsArray = function() {
  var result = [];
  angular.forEach($scope.roomCollection, function(room, id) {
   result.push(room);
  });
  return result;
 };
 $scope.learnsArray = function() {
  var result = [];
  angular.forEach($scope.learnCollection, function(learn, id) {
   result.push(learn);
  });
  return result;
 };

// priority fixes end


	myService.async().then(function(d) {
		var i = 0, j = 0, k = 0;
		var tmpHash = {}, tmpHash2 = {}, tmpHash3 = {}, tmpHash4 = {};
		
		$scope.xmlData = d;
		$scope.data = x2js.xml_str2json( $scope.xmlData );
		$scope.data = $scope.data.esperesso;

		for(i = 0; i < $scope.data.output_asArray.length; i++) {
			for( m = 0; m < $scope.data.output_asArray[i].style_asArray.length; m++) {

				if(typeof tmpHash[$scope.data.output_asArray[i].style_asArray[m]._name] == 'undefined') {
					var woodStyle = {text: $scope.data.output_asArray[i].style_asArray[m]._name, selected: false, count: 0, src: $scope.data.output_asArray[i].style_asArray[m]._src, description: $scope.data.output_asArray[i].style_asArray[m]._description};
					$scope.woodStyles.push(woodStyle);
					$scope.woodStylesCol[$scope.data.output_asArray[i].style_asArray[m]._name] = woodStyle;

					tmpHash[$scope.data.output_asArray[i].style_asArray[m]._name] = true;
				}
				for( j = 0; j < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray.length; j++) {
					if(typeof tmpHash2[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name] == 'undefined') {
						var woodType = {text: $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name, selected: false, count: 0, src: $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._src};
						$scope.woodTypes.push(woodType);
						$scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name] = woodType;
						
						tmpHash2[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name] = true;
					}
					for( k = 0; k < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray.length; k++) {
						if(typeof tmpHash3[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name] == 'undefined') {
							var woodColor = {text: $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name, selected: false, count: 0, src: $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._src};
							$scope.woodColors.push(woodColor);
							$scope.woodColorsCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name] = woodColor;
							
							tmpHash3[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name] = true;						
						}
						if($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray) {
							angular.forEach($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray, function(image, index){
								image.collection = $scope.data.output_asArray[i]._name;
								image.style = $scope.data.output_asArray[i].style_asArray[m]._name;
								image.type = $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name;
								image.color = $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name;
							});
							$scope.imageCollection = $scope.imageCollection.concat($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray);

							$scope.pannel.count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
							$scope.pannel.totalcount += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;

							$scope.woodStylesCol[$scope.data.output_asArray[i].style_asArray[m]._name].count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
							$scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name].count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
							$scope.woodColorsCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name].count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;

							$scope.woodStyles[0].count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
							$scope.woodTypes[0].count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
							$scope.woodColors[0].count += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
						}
					}
				}
			}
			var woodCollection = {text: $scope.data.output_asArray[i]._name, selected: false, index: i};
			$scope.woodCollections.push(woodCollection);
			$scope.woodCollectionsCol[$scope.data.output_asArray[i]._name] = woodCollection;
		}
		for(i = 0; i < $scope.imageCollection.length; i++) {
			if($scope.imageCollection[i]._room) {
				if(typeof $scope.roomCollection[$scope.imageCollection[i]._room] == "undefined") {

					// priority fixes

					$scope.roomCollection[$scope.imageCollection[i]._room] = {text: $scope.imageCollection[i]._room, selected: false, count: 1, priority: parseFloat($scope.imageCollection[i]._priority)};
				
					// priority fixes end


				} else {
					$scope.roomCollection[$scope.imageCollection[i]._room].count++;
				}
				$scope.roomCollection['All_rooms'].count++;
			}
		}
		if( $scope.data.hotspots_asArray && $scope.data.hotspots_asArray.length > 0) {
			if($scope.data.hotspots_asArray[0].img_asArray) {
				angular.forEach($scope.data.hotspots_asArray[0].img_asArray, function(room, i){
					if ( typeof $scope.learnCollection[room._room] != "object") {

						// priority fixes

						$scope.learnCollection[room._room] = {text: room._room, selected: false, collection: [], priority: parseFloat(room._priority)};
					
					// priority fixes end


					}
					$scope.learnCollection[room._room].collection.push(room);
				});
			}
		}
		start_slide();
	});
	$scope.fixCheckIssue = function(targetContainer, target) {
		var allSelected = true;
		var allDeSelected = true;
		if(target == targetContainer[0]) {
			if(targetContainer[0].selected == true) {
				for(i = 1; i < targetContainer.length; i++) {
					targetContainer[i].selected = false;
				}
				targetContainer[0].selected = true;
			} else {
				targetContainer[0].selected = true;
			}
		} else {
			for(i = 1; i < targetContainer.length; i++) {
				if(targetContainer[i].selected == false) {
					allSelected = false;
				}
				if(targetContainer[i].selected == true) {
					allDeSelected = false;
				}
			}
			if(allSelected || allDeSelected) {
				targetContainer[0].selected = true;
				for(i = 1; i < targetContainer.length; i++) {
					targetContainer[i].selected = false;
				}
			} else {
				targetContainer[0].selected = false;
			}
		}
	}
	$scope.updateFilter = function(targetContainer, target) {
		var tmpHash2 = {};
		var tmpHash3 = {};
		var tmpHash4 = {};
		var isSelectedExist = false;
		$scope.woodTypes = $scope.woodTypes.slice(0, 1);
		$scope.woodColors = $scope.woodColors.slice(0, 1);
		$scope.woodCollections = $scope.woodCollections.slice(0,0);
		
		isSelectedExist = false;
		for(i = 0; i < $scope.data.output_asArray.length; i++) {
			for(m = 0; m < $scope.data.output_asArray[i].style_asArray.length; m++) {
				if($scope.woodStyles[0].selected == true || $scope.woodStylesCol[$scope.data.output_asArray[i].style_asArray[m]._name].selected == true) {
					for( j = 0; j < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray.length; j++) {
						if(typeof tmpHash2[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name] == 'undefined') {
							$scope.woodTypes.push($scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name]);
							tmpHash2[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name] = true;
							if($scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name].selected) {
								isSelectedExist = true;
							}
						}
					}
				}
			}
		}
		if(isSelectedExist == false && $scope.woodTypes[0].selected == false) {
			$scope.woodTypes[0].selected = true;
			for(var woodTypeKey in $scope.woodTypesCol) {
				$scope.woodTypesCol[woodTypeKey].selected = false;
			}
			
		}
		isSelectedExist = false;
		for(i = 0; i < $scope.data.output_asArray.length; i++) {
			for(m = 0; m < $scope.data.output_asArray[i].style_asArray.length; m++) {
				if($scope.woodStyles[0].selected == true || $scope.woodStylesCol[$scope.data.output_asArray[i].style_asArray[m]._name].selected == true) {
					for( j = 0; j < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray.length; j++) {
						if($scope.woodTypes[0].selected == true || $scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name].selected == true) {
							for( k = 0; k < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray.length; k++) {
								if(typeof tmpHash3[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name] == 'undefined') {
									$scope.woodColors.push($scope.woodColorsCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name]);
									tmpHash3[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name] = true;
									if($scope.woodColorsCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name].selected == true) {
										isSelectedExist = true;
									}
								}
							}
						}
					}
				}
			}
		}
		if(isSelectedExist == false && $scope.woodColors[0].selected == false) {
			$scope.woodColors[0].selected = true;
			for(var woodColorKey in $scope.woodColorsCol) {
				$scope.woodColorsCol[woodColorKey].selected = false;
			}
		}
		for(i = 0; i < $scope.data.output_asArray.length; i++) {
			for(m = 0; m < $scope.data.output_asArray[i].style_asArray.length; m++) {
				if($scope.woodStyles[0].selected == true || $scope.woodStylesCol[$scope.data.output_asArray[i].style_asArray[m]._name].selected == true) {
					for( j = 0; j < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray.length; j++) {
						if($scope.woodTypes[0].selected == true || $scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name].selected == true) {
							for( k = 0; k < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray.length; k++) {
								if($scope.woodColors[0].selected == true || $scope.woodColorsCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name].selected == true) {
									if(typeof tmpHash4[$scope.data.output_asArray[i]._name] == 'undefined') {
										$scope.woodCollections.push($scope.woodCollectionsCol[$scope.data.output_asArray[i]._name]);
										tmpHash4[$scope.data.output_asArray[i]._name] = true;
									}
								}						
							}
						}
					}
				}
			}
		}
	}
	$scope.updateImage = function() {
		var i = 0, j = 0, k = 0, l = 0, imgCount = 0, selectedCollectionCnt = 0, selectedCollectionName = '';
		$scope.imageCollection = $scope.imageCollection.slice(0,0);
		for(l = 0; l < $scope.woodCollections.length; l++) {
			if($scope.woodCollections[l].selected == true) {
				i = $scope.woodCollections[l].index;
				for(m = 0; m < $scope.data.output_asArray[i].style_asArray.length; m++) {
					for( j = 0; j < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray.length; j++) {
						for( k = 0; k < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray.length; k++) {
							if($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray) {
								$scope.imageCollection = $scope.imageCollection.concat($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray);
								imgCount += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
							}
						}
					}
				}
				$scope.woodCollections[l].count = imgCount;
				selectedCollectionCnt++;
				selectedCollectionName = $scope.woodCollections[l].text;
			}
		}
		if(selectedCollectionCnt == 0) {
			for(i = 0; i < $scope.data.output_asArray.length; i++) {
				for(m = 0; m < $scope.data.output_asArray[i].style_asArray.length; m++) {
					if($scope.woodStyles[0].selected == true || $scope.woodStylesCol[$scope.data.output_asArray[i].style_asArray[m]._name].selected == true) {
						for( j = 0; j < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray.length; j++) {
							if($scope.woodTypes[0].selected == true || $scope.woodTypesCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j]._name].selected == true) {
								for( k = 0; k < $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray.length; k++) {
									if($scope.woodColors[0].selected == true || $scope.woodColorsCol[$scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k]._name].selected == true) {
										if($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray) {
											$scope.imageCollection = $scope.imageCollection.concat($scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray);
											imgCount += $scope.data.output_asArray[i].style_asArray[m].woodtype_asArray[j].color_asArray[k].img_asArray.length;
										}
									}						
								}
							}
						}
					}
				}
			}
			$scope.pannel.name = 'Filters';
			$scope.pannel.count = imgCount;
		} else {
			$scope.pannel.count = imgCount;
			if(selectedCollectionCnt == 1) {
				$scope.pannel.name = selectedCollectionName;
			} else {
				$scope.pannel.name = 'Collections';
			}
		}
		$scope.clearRoomFilter();
		$scope.clearLearnFilter();
		start_slide();
	}
	$scope.updateImageByRoom = function(room) {
		var i = 0, j = 0, k = 0, l = 0;
		var roomName = room.text;
		var cnt = 0;
		$scope.imageCollection = $scope.imageCollection.slice(0,0);
		angular.forEach($scope.data.output_asArray, function(output, i){
			angular.forEach(output.style_asArray, function(style, i){
				angular.forEach(style.woodtype_asArray, function(woodtype, j){
					angular.forEach(woodtype.color_asArray, function(color, k){
						if(color.img_asArray) {
							angular.forEach(color.img_asArray, function(img, l){
								if(img._room && roomName=='All Rooms') {
									$scope.imageCollection.push(img);
									cnt++;
								}else if(img._room && img._room == roomName) {
									$scope.imageCollection.push(img);
									cnt++;
								}
							});
						}
					});
				});
			});
		});
		$scope.pannel.name = room.text;
		$scope.pannel.count = cnt;
		$scope.clearCommonFilter();
		start_slide();
	}
	$scope.resetImageCollection = function() {
		var cnt = 0;
		$scope.imageCollection = $scope.imageCollection.slice(0,0);
		angular.forEach($scope.data.output_asArray, function(output, i){
			angular.forEach(output.style_asArray, function(style, i){
				angular.forEach(style.woodtype_asArray, function(woodtype, j){
					angular.forEach(woodtype.color_asArray, function(color, k){
						if(color.img_asArray) {
							$scope.imageCollection = $scope.imageCollection.concat(color.img_asArray);
							cnt += $scope.imageCollection.length;
						}
					});
				});
			});
		});
		$scope.pannel.count = $scope.pannel.totalcount;
		$scope.pannel.name = 'All Rooms';
		start_slide();
	}
	$scope.updateRoomCheck = function(self) {
		angular.forEach($scope.roomCollection, function(room, i){
			if(room.text==self.text) {
				room.selected = true;
			}else {
				room.selected = false;
			}
		});
		$scope.clearLearnFilter();
	}
	$scope.clearRoomFilter = function(isAll) {
		if(isAll) {
			angular.forEach($scope.roomCollection, function(room, roomid){
				room.selected = false;
			});
		} else {
			angular.forEach($scope.roomCollection, function(room, roomid){
				if(roomid != 'All_rooms') {
					room.selected = false;
				} else {
					room.selected = true;
				}
			});
		}
	}
	$scope.clearCommonFilter = function() {
		function deselectAll(collection, arr) {
			angular.forEach(collection, function(obj, key){
				obj.selected = false;
				arr.push(obj);
			});
		}
		$scope.woodStyles = $scope.woodStyles.slice(0, 1);
		$scope.woodTypes = $scope.woodTypes.slice(0, 1);
		$scope.woodColors = $scope.woodColors.slice(0, 1);
		$scope.woodCollections = $scope.woodCollections.slice(0,0);

		$scope.woodStyles[0].selected = true;
		$scope.woodTypes[0].selected = true;
		$scope.woodColors[0].selected = true;
		deselectAll($scope.woodStylesCol, $scope.woodStyles);
		deselectAll($scope.woodTypesCol, $scope.woodTypes);
		deselectAll($scope.woodColorsCol, $scope.woodColors);
		deselectAll($scope.woodCollectionsCol, $scope.woodCollections);
	}
	$scope.clearStyleFilter = function() {
		$scope.woodStyles[0].selected = true;
		angular.forEach($scope.woodStylesCol, function(woodStyle, name){
			woodStyle.selected = false;
		});
		$scope.updateFilter();
	}
	$scope.clearTypeFilter = function() {
		$scope.woodTypes[0].selected = true;
		angular.forEach($scope.woodTypesCol, function(woodType, name){
			woodType.selected = false;
		});
		$scope.updateFilter();
	}
	$scope.clearColorFilter = function() {
		$scope.woodColors[0].selected = true;
		angular.forEach($scope.woodColorsCol, function(woodColor, name){
			woodColor.selected = false;
		});
		$scope.updateFilter();
	}
	$scope.clearCollectionFilter = function() {
		angular.forEach($scope.woodCollectionsCol, function(woodStyle, name){
			woodStyle.selected = false;
		});
		$scope.updateFilter();
	}
	$scope.updateLearnCheck = function(param) {
		//room.collection.length();
		angular.forEach($scope.learnCollection, function(learn, i){
			if( param == learn ) {
				learn.selected = true;
			} else {
				learn.selected = false;
			}
		});
		$scope.clearRoomFilter(true);
		$scope.clearCommonFilter();
		$scope.learnSelected = true;
		window.learnSelected = true;
	}
	$scope.updateImageByLearn = function (learn) {
		var cnt = 0;
		$scope.imageCollection = $scope.imageCollection.slice(0,0);
		if (learn.selected) {
			angular.forEach(learn.collection, function(img, i){
				$scope.imageCollection.push(img);
				cnt++;
			});
			$scope.pannel.name = "Learn : " + learn.text;
			$scope.pannel.count = cnt;
			start_slide();
		}
	}
	$scope.clearLearnFilter = function () {
		angular.forEach($scope.learnCollection, function(learn, i){
			learn.selected = false;
		});
		$scope.learnSelected = false;
		window.learnSelected = false;
	}
	function updateTopInfoBlock(idx, description) {
		if(typeof idx == "number" && parseInt(idx) >= 0) {
			$scope.topInfoBlock.title = $scope.data.output_asArray[idx]._name;
			$scope.topInfoBlock.description = description;
			$scope.topInfoBlock.attributs = '';//$scope.data.output_asArray[idx].attribute_asArray;
			angular.forEach($scope.data.output_asArray[idx].attribute_asArray, function(attr, i){
				$scope.topInfoBlock.attributs += '<li class="minus-title">'+attr._name+'</li>';
				angular.forEach(attr.key_asArray, function(key, i){
					$scope.topInfoBlock.attributs += '<li class="minus-desc">'+key._value+'</li>';
				});
				//woodColor.selected = false;
			});
		}
	}
	function clearTopInfoBlock(idx) {
		$scope.topInfoBlock.title = '';
		$scope.topInfoBlock.description = '';
		$scope.topInfoBlock.attributs = [];
	}
	function start_slide(isNew) {
		if(!isNew) {
			$('#full-width-slider')
                .royalSlider('destroy');
                // priority fixes

                sortImages();
                // priority fixes end

		}





		var sliderContent = '';
		angular.forEach($scope.imageCollection, function(image, index){
			sliderContent += '<div id="' + index + '" class="rsContent library Alexandria urban cherry java">';
			if (image.spot_asArray) {
				angular.forEach(image.spot_asArray, function (spot, index) {
					sliderContent +=
						' <div class="xyHot" style="position:absolute;left:' + spot._left +
							';top:' + spot._top +
							';z-index:8888;cursor:pointer;" show="' + spot._src +'" hs-description="' + spot._text +
							'"><img src="images/spot@2x.png" style="width:75px; height:75px;"></div>';
				})
			}

			sliderContent += 	'<img class="slideImg" src="images/'+image._src+'" collection="'+image.collection+'" species="'+image.type+'" color="'+image.color+'" roomstyle="'+image.style+'" alt="" />';
			sliderContent += '</div>';
		});
		if($scope.imageCollection.length > 0) {
			if ($scope.imageCollection[0].style) {
				updateTopInfoBlock($scope.woodCollectionsCol[$scope.imageCollection[0].collection].index, $scope.woodStylesCol[$scope.imageCollection[0].style].description);
			}
		} else {
			clearTopInfoBlock();
		}
		$('#full-width-slider').html(sliderContent);
		
        $('#full-width-slider')
            .royalSlider({
                arrowsNav: false,
                loop: true,
                keyboardNavEnabled: true,
                controlsInside: false,
                imageScaleMode: 'fill',
                arrowsNavAutoHide: false,
                autoScaleSlider: true,
                autoScaleSliderWidth: 960,
                autoScaleSliderHeight: 410,
                controlNavigation: false,
                thumbsFitInViewport: false,
                navigateByClick: false,
                startSlideId: 0,
                autoPlay: false,
                transitionType: 'move',
                globalCaption: false,
                deeplinking: {
                    enabled: true,
                    change: false
                },
                //size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images 
                imgWidth: 1024,
                imgHeight: 628,
                autoPlay: {
                    // autoplay options go gere
                    enabled: false,
                    pauseOnHover: true
                }
            })/**/
        var slider = $('#full-width-slider').data('royalSlider');
        $('.infoBlock').slideUp();
		window.control = 1;
		$('#pom').attr({ 'src': 'images/plus.png' });
		
        if($scope.imageCollection.length > 0) {
			$scope.pannel.index = 1;
			coll = $('#' + slider.currSlide.id).find('img').attr('collection');
			spe = $('#' + slider.currSlide.id).find('img').attr('species');
			color = $('#' + slider.currSlide.id).find('img').attr('color');
			$('#dyn_coll').html(coll);
			$('#dyn_spe').html(spe);
			$('#dyn_color').html(color);
		} else {
			$scope.pannel.index = 0;
			$('#dyn_coll').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
			$('#dyn_spe').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
			$('#dyn_color').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		}

        slider.ev.on('rsAfterSlideChange', function (event) {
			$scope.$apply(function () {
				$scope.pannel.index = slider.currSlide.id + 1;
			});
            
            current = $('#rsImg');

			coll = $('#' + slider.currSlide.id).find('.slideImg').attr('collection');
            spe = $('#' + slider.currSlide.id).find('.slideImg').attr('species');
            color = $('#' + slider.currSlide.id).find('.slideImg').attr('color');
			style = $('#' + slider.currSlide.id).find('.slideImg').attr('roomstyle');
			if ( coll != "undefined") {
				if(window.control == 0 && $('#full-width-slider .rsContent').length > 1) {
					window.currentDown.slideUp(function(){
						$scope.$apply(updateTopInfoBlock($scope.woodCollectionsCol[coll].index, $scope.woodStylesCol[style].description));
					});
					$('#pom').attr({ 'src': 'images/plus.png' });
					current.slideDown();
					$('#pom').attr({ 'src': 'images/minus.png' });
					window.currentDown = current;
				} else {
					if ($scope.imageCollection[0].collection) {
						$scope.$apply(updateTopInfoBlock($scope.woodCollectionsCol[coll].index, $scope.woodStylesCol[style].description));
					}
				}
				$('#dyn_coll').html(coll);
				$('#dyn_spe').html(spe);
				$('#dyn_color').html(color);
			}
        })
    }

	/*$scope.rightSidebarClick = function($event) {
		//$event.preventDefault();
		if(window.right_open == 0){
//			$(".content-box, .header,.footer").animate({marginLeft:'-367px'},100)
					$('.sidebar-right').delay(30).animate({
						right: '-10',
					}, 50, 'easeOutExpo', function () {});
					$('.sidebar-left').animate({
						left: '-367px',
					}, 275, 'easeInOutExpo', function () {});
			window.right_open = 1;
					return false;

		}
		else {
//			$(".content-box, .header,.footer").animate({marginLeft:'0px'},100)
					$('.sidebar-left').animate({
						left: '-367px',
					}, 275, 'easeOutExpo', function () {});
					$('.sidebar-right').animate({
						right: '-377px',
					}, 150, 'easeInOutExpo', function () {$(window).resize();});

			window.right_open = 0;
		}
	}
	$scope.leftSidebarClick = function($event) {
		//$event.preventDefault();
		if(window.left_open == 0){
//			$(".content-box, .header,.footer").animate({marginLeft:'367px'},100)
					$('.sidebar-left').delay(30).animate({
						left: '0',
					}, 50, 'easeOutExpo', function () {});
					$('.sidebar-right').animate({
						right: '-377px',
					}, 100, 'easeInOutExpo', function () {});
			window.left_open = 1
				return false;
		}
		else {
//			$(".content-box, .header,.footer").animate({marginLeft:'0px'},100)
					$('.sidebar-left').animate({
						left: '-367px',
					}, 275, 'easeOutExpo', function () {});
					$('.sidebar-right').animate({
						right: '-377px',
					}, 150, 'easeInOutExpo', function () {$(window).resize();});
			window.left_open=0;
		}
	}
*/
});

app.directive("ngTap", function() {
  return function($scope, $element, $attributes) {
    var tapped;
    tapped = false;
    $element.bind("click", function() {
      if (!tapped) {
        return $scope.$apply($attributes["ngTap"]);
      }
    });
    $element.bind("touchstart", function(event) {
      return tapped = true;
    });
    $element.bind("touchmove", function(event) {
      tapped = false;
      return event.stopImmediatePropagation();
    });
    return $element.bind("touchend", function() {
      if (tapped) {
        return $scope.$apply($attributes["ngTap"]);
      }
    });
  };
});
/*app.directive('ngTap', ['$parse', function ($parse) {
    return function (scope, element, attr) {
        var fn = $parse(attr['fastClick']);
        var initX, initY, endX, endY;
        var elem = element;
        var maxMove = 4;

        elem.bind('touchstart', function (event) {
            event.preventDefault();
            initX = endX = event.touches[0].clientX;
            initY = endY = event.touches[0].clientY;
            elem.bind('touchend', onTouchEnd);
            elem.bind('touchmove', onTouchMove);
        });

        function onTouchMove(event) {
            endX = event.touches[0].clientX;
            endY = event.touches[0].clientY;
        };

        function onTouchEnd(event) {
            elem.unbind('touchmove');
            elem.unbind('touchend');
            if (Math.abs(endX - initX) > maxMove) return;
            if (Math.abs(endY - initY) > maxMove) return;
            scope.$apply(function () { fn(scope, { $event: event }); });
        };
    };
} ]);*/
