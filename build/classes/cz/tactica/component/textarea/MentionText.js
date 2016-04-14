
var textAreaConnector = null;
var state = null;
var golbalEvent = null;
var themeUrl = null;
window.cz_tactica_component_textarea_MentionText = function() {
	var e = this.getElement();
	state = this.getState();
	textAreaConnector = this;
	
	var imageUrl = state.imageUrl;
	themeUrl = state.themeUrl;
	var placeholder = state.prompInput;
	document.onclick = clearPopupBody;
	
//	var url = window.location.href;
//	var imgUrl = url+themeUrl+imageUrl;
//	var img = document.createElement('img');
//	img.src = imgUrl;
	
	var div = document.createElement('div');
	
	div.setAttribute("contenteditable",'true');
	div.setAttribute("data-placeholder",placeholder);
	div.id = 'comment';
	div.className = 'comment-div';
	div.style.height = e.style.height;
	div.style.width = e.style.width;
	div.style.overflowY = 'auto';
	e.style.height = '100%';
	e.style.width = '100%';
	
	var appNAme = navigator.appName;
	var isMozilla = navigator.userAgent.search("Firefox") >= 0;
	var isIE = navigator.userAgent.search("MSIE") >= 0;
	if((appNAme == "Netscape") && !isMozilla){
		document.addEventListener("keyup", function(){
		    var isFocused = $('#comment').is(':focus');
		    if(isFocused){
		    	openPopup();
		    }
		});
	}
	
	if(isMozilla){
		document.addEventListener("keyup", function(event){
			var KeyID = event.keyCode;
		    var isFocused = $('#comment').is(':focus');
		    var div = document.getElementById('comment');
		    if(isFocused && KeyID == 8){
		    	var childerns = div.childNodes;
		    	var node = childerns[0];
		    	var nodeName = node.nodeName;
		    		if((nodeName == 'BUTTON') && childerns.length == 2){
		    			div.removeChild(node);
		    		}
		    	
		    }else{
		    	event.preventDefault();
		    }
		});
	}
	
	document.addEventListener("keydown", function(event){
		//up 38
		//down 40
		var popup = document.getElementById("popupname");
		if(popup != null){
			var code = event.keyCode;
			var parent = document.getElementById("user-container");
			if(code == 40){
				focusElement(parent, true);
			}
			else if(code == 38){
				focusElement(parent, false);
			}

		}
	});
	
	div.onfocus = function() {
		openPopup();
	}
	div.onclick = function() {
		//clearPopup();
	}
	div.oninput = function() {
		openPopup();	
	};
	div.onblur = function(){
		getMessage();
	};
	
	//var parent = document.getElementById('mentionTextArea');
	e.appendChild(div);
	//parent.appendChild(img);
}

function focusElement(parent, isIncrement){
	var childs = parent.childNodes;
	var index = 0;
	for(var i=0; i<childs.length; i++){
		var child = childs[i];
		if(document.activeElement == child){
			index = i;
			if(isIncrement){
				index++;		
			}else{
				index--;		
			}
			break;
		}
	}
	
	var element = null;
	if(index == parent.childNodes.length){
		element = parent.childNodes[parent.childNodes.length];
	}
	else{
		element = parent.childNodes[index];
	}
	if(element !=null){
		element.focus();		
	}
}

	function openPopup(){
		var commentDiv = document.getElementById("comment");
		var test = commentDiv.outerText;
		if(test == null){
			test = commentDiv.textContent;
		}
			var at = test.substring(0,1);
//			if("@" == at ){
			if("@" == at && test.length == 1){
				isStartOpen = true;
				var commentDivPos = commentDiv.getBoundingClientRect();
				var top = commentDivPos.top + 30;
				var left = commentDivPos.left;
				var popup = document.getElementById("popupname");
				if(popup == null){
					var div = getDiv(left, top);
					var app = document.getElementsByClassName('v-app')[0];
					//var $input = $("<input name='myField' type='text' id='searchInput' class='mention-search-text' onblur='clearPopup();' onkeydown='processName(this)'; oninput='searchUser();' />");
					var $input = $("<input name='myField' type='text' id='searchInput' class='mention-search-text' onkeydown='processName(event,this)'; oninput='searchUser();' />");
					app.appendChild(div);
					$('#popupname').append($input);
					
					
					var searchInput = document.getElementById("searchInput");
					searchInput.focus();
				}
				
			}
	}
	
	function getDiv(x,y){
		var div1 = document.createElement('div');
		div1.id = 'popupname';
		div1.style.position = 'fixed';
		div1.style.top = y+"px";
		div1.style.left = x+"px";
		div1.style.width = "190px";
		div1.style.height = "214px";
		div1.style.padding = "5px";
		div1.style.overflowX = 'hidden';
		div1.className = 'popup-mention';

		return div1;
	}
	
	function searchUser(){
		var searchInput = document.getElementById("searchInput");
		var value = searchInput.value;
		textAreaConnector.searchUser(value);
		
		var div = document.getElementById('popupname');
		div.classList.add("progress-on");
	}
	function clearPopup(){
		clearPopupDiv();
		var commentDiv = document.getElementById("comment");
		commentDiv.innerText = "";
	}
	function clearPopupDiv(){
		var popup = document.getElementById('popupname');
		if(popup != null){
			var parent = popup.parentNode;
			if(parent !=null){
				parent.removeChild(popup);
			}			
		}
	}	
	function clearPopupBody(){

		var commentDiv = document.getElementById("comment");
		var test = commentDiv.outerText;
		if(test == null){
			test = commentDiv.textContent;
		}
		var at = test.substring(0,1);
		if("@" == at && test.length == 1){
			clearPopupDiv();
			var div = document.getElementById("comment");
			div.innerText = '';
			div.textContent = '';
		}
		
	}
	function processName(event, element){
		golbalEvent = event;
		var div = document.getElementById("comment");
		if(event.keyCode == 13) {
			var value = element.value;
			var obj = checkName(value);
			if(obj != null){
				insertNameIntoText(obj);				
			}
		}		
		else if(event.keyCode == 27){
			div.innerText = '';
			div.textContent = '';
			clearPopupDiv();
			div.focus();
		}
		
	}
	function checkName(value){
		var parent =  document.getElementById('user-container');
		var childerns = parent.childNodes;
		
		var imgSrc = '';
		var userId = '';
		var fullName = '';
		
		var obj = new Object();
		
		for(var i = 0; i<childerns.length; i++){
			var child = childerns[i];
			userId = child.id.substring(0,4);
			var style = child.classList[0];
			if(style == 'user-element-item'){
				var id = child.id;
				var childOfChild = child.childNodes;
				for(var j=0; j<childOfChild.length; j++){
					var tag = childOfChild[j];
					var nodeName = tag.nodeName;
					if(nodeName == 'IMG'){
						imgSrc = tag.src;
					}else {
						var text = tag.innerText;
						if(text != null){
							fullName = text;
						}else{
							fullName = tag.textContent;
						}
							
					}
					
					if(tag.innerText == value){
						obj.imSrc = imgSrc;
						obj.fullName = fullName;
						obj.userId = userId;
						return obj;
					}
				}
			}
		}
		return null;
	}
	function insertNameIntoText(obj){
		var div = document.getElementById("comment");
		var button = createButton(obj);
		var spanText = createSpan();
		div.innerText = '';
		div.textContent = '';
		div.appendChild(button);
		div.appendChild(spanText);
		clearPopupDiv();
		golbalEvent.preventDefault();
		div.focus();
		
		var caret = 2; 
		var range = document.createRange();
		range.setStart(div, caret);
		range.setEnd(div, caret);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
	function createSpan(){
		var span = document.createElement('span');
		span.id = 'text-end';
		//span.classList.add('user-mention');
		return span;
	}
	function createButton(value){
		var button = document.createElement('button');
		button.setAttribute('contenteditable', 'false');
		button.setAttribute('userid', value.userId);
		button.classList.add('user-mention');
		button.onmouseover = function(){
			displayUserDetail(value.imgSrc,value.fullName, value.userId, value.telp ); 
		}
		button.onmouseout= function(){
			closeUserPage();
		}
		button.innerHTML = '@ '+value.fullName;
		return button;
	}
	
	function getMessage(){
		var div = document.getElementById('comment');
		var childerns = div.childNodes;
		var id = '';
		var message = '';
		var isMozilla = navigator.userAgent.search("Firefox") >= 0;
		if(isMozilla){
			 message = div.innerHTML;
		}else{
			for(var i=0;i<childerns.length; i++){
				var child = childerns[i];
				var nodeName = child.nodeName;
				if(nodeName == 'BUTTON'){
					id = child.getAttribute('userid');
				}else if(nodeName == 'SPAN'){
					message = child.innerText;
				}else if(nodeName == '#text') {
					message = child.innerText;
					if(message==null){
						message = child.textContent;
					}
				}else if(nodeName == 'DIV') {
					var msg = child.innerText;
					if(msg==null){
						msg = child.textContent;
					}
					message = message+'<p>'+msg+'</p>';
				}	
				
			}	
		}
		
		
		textAreaConnector.processMessage(id, message);
	}
	
	function getUserData(id){
		var layout = document.getElementById(id);
		var childerns = layout.childNodes;
		var obj = new Array();
		for(var i=0;i<childerns.length; i++){
			var child = childerns[i];
			var node = child.nodeName;
			var imageUrl = null;
			var name = null;
			var telp = null;
			var userId = null;
			if(node == 'IMG'){
				imageUrl = child.getAttribute("src");
				var data = child.id;
				var types = data.split("|");
				userId = types[0];
				telp = types[1];
				name = types[2];
				var person = [imageUrl , userId, name, telp ];
				obj.push(person);
			}
		}
	return obj;
	}
	
	function handleUserevent(id){
		var obj = getUserData(id);
		discard(id);
		var parent =  document.getElementById('user-container');
		if(parent == null){
			parent = createUserDivParent();			
		}else{
			while(parent.firstChild){
				parent.removeChild(parent.firstChild);
			}
		}

		for (var i=0; i<obj.length; i++) {
			var user = obj[i];
			
			var userId = user[1];
			var userName = user[2];
			var telp = user[3];
			var imageUrl = user[0];
			var url = imageUrl;
			
			var userDiv = createUserDiv(userId, userName, url, telp);
			parent.appendChild(userDiv);
		}
		var popup = document.getElementById("popupname");
		popup.appendChild(parent);
		popup.classList.remove("progress-on");
		
	}
	
	function discard(id){
		var layout = document.getElementById(id);
		var parent = layout.parentNode;
		parent.removeChild(layout);
	}
	
	function createUserDivParent(){
		var div = document.createElement("div");
		div.className = 'user-element-parent';
		div.id = 'user-container';
		return div;
	}
	
	function createUserDiv(userId, userName, url, telp){
		var div = document.createElement("div");
		div.id = "user-"+userId;
		div.className = 'user-element-item';
		div.setAttribute("tabindex","-1");
		div.onclick = function() {
			select(url, userName, userId, telp);
		}
		div.onkeydown=function(event){
			var code = event.keyCode;
			if(code == "13"){
				select(url, userName, userId, telp);
				event.preventDefault();
			}
		};
		
		var img = createUserImage(url);
		var name = createNameSection(userName);
		
		div.appendChild(img);
		div.appendChild(name);
		return div;
	}
	
	function select(url, userName, userId, telp){
		var obj = new Object();
		obj.imgSrc = url;
		obj.fullName = userName;
		obj.userId = userId;
		obj.telp = telp;
		selectUser(obj);
	}
	
	function createUserImage(url){
		var img = document.createElement("img");
		img.src=url;
		img.style.height = "100%";
		img.className = "user-mention-image";
		return img;
	}
	
	function createNameSection(userName){
		var name = document.createElement("p");
		name.className = "user-mention-name";
		name.innerHTML = userName;
		return name;
	}
	
	function selectUser(obj){
		insertNameIntoText(obj);
	}
	function displayUserDetail(imgSrc, fullName,userId,telp ){
		var userMention = document.getElementsByClassName("user-mention")[0];
		
		var spanUser = userMention.getBoundingClientRect();
		
		var userPageExisting = document.getElementById("userdetail-popup");
		if(userPageExisting == null){
			var userDetail = document.createElement('div');
			var top = spanUser.top + 35;
			var left = spanUser.left;
		
			userDetail.id = 'userdetail-popup';
			userDetail.classList.add("arrow_box");
			userDetail.style.position = 'fixed';
			userDetail.style.top = top+"px";
			userDetail.style.left = left+"px";
			userDetail.style.width = "145px";
			userDetail.style.height = "45px";
			userDetail.style.boxShadow = "-5px 4px 15px -2px rgba(82,82,82,1)";
			
			var userImg = createOnHoverUserImage(imgSrc);
			var userName = createOnHoverNameSection(fullName);
			var userTelp = createOnHoverTelpSection(telp);
			
			var textDiv = document.createElement("div");
			textDiv.classList.add("text-user");
			
			textDiv.appendChild(userName);
			textDiv.appendChild(userTelp);
			
			userDetail.appendChild(userImg);
			userDetail.appendChild(textDiv);
			
			var app = document.getElementsByClassName('v-app')[0];
			app.appendChild(userDetail);
		}
		
	}
	
	function createOnHoverUserImage(url){
		var img = document.createElement("img");
		img.src=url;
		img.style.height = "45px";
		img.style.width = "45px";
		img.className = "user-onhover-image";
		return img;
	}
	
	function createOnHoverNameSection(userName){
		var name = document.createElement("p");
		name.className = "user-onhover-name";
		name.innerHTML = userName;
		return name;
	}
	
	function createOnHoverTelpSection(telp){
		var name = document.createElement("p");
		name.className = "user-telp-name";
		name.innerHTML = telp;
		return name;
	}

	function closeUserPage(){
		var userpage = document.getElementById("userdetail-popup");
		if(userpage != null){
			userpage.parentNode.removeChild(userpage);
		}
	}
	