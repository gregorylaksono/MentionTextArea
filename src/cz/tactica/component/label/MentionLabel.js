//img.src="http://localhost:8080/resource/images/20130629_192932.jpg";
var state = null;
var imageUrl = null;
var connector = null;
window.cz_tactica_component_label_MentionLabel = function() {
	var e = this.getElement();
	state = this.getState();
	connector = this;
	
	var imgUrl = getUserImage(state.imageId);
	discard(state.layoutId);
	
	var id = state.labelId;
	
	var div = document.createElement('div');
	div.setAttribute("contenteditable",'false');
	div.id = 'comment-label_'+id;
	div.style.height = e.style.height;
	div.style.width = e.style.width;
	
	var name = state.name;
	var userCommentName = state.userName;
	var telpNo = state.telpNo;
	var message = state.message;
	var userId = state.userId;
	
	var buttonName = null;
	var userComment = createUserCommentElement(userCommentName);
	div.appendChild(userComment);
	if((name != null) && (telpNo != null) && (imgUrl != null) ){
		buttonName = createButtonNameLabel(id,userId, name, telpNo, imgUrl);
		div.appendChild(buttonName);
	}
	var labelId ='#comment-label_'+id; 
	var $input = $("<span style='margin-left:5px;'>"+message+"</span>");
	var messageSpan = createMessageLabel(message);
	e.appendChild(div);
	//div.appendChild(messageSpan);
	$(labelId).append($input);
}
function createUserCommentElement(userCommentName){
	var commentName = document.createElement("span");
	commentName.innerHTML = userCommentName;
	commentName.textContent = userCommentName;
	commentName.classList.add('default-label');
	return commentName;
}
function discard(){
	connector.deleteParent();
//	var layout = document.getElementById(layoutId);
//	if(layout != null){
//		var parent = layout.parentNode;
//		parent.removeChild(layout);				
//	}
	
	
}
function getUserImage(imageId){
	var image = document.getElementById(imageId);
	if(image != null){
		var imageUrl = image.getAttribute("src");		
	}else{
		return null;
	}
	return imageUrl;
}
function createMessageLabel(message){
	var msg = document.createElement('text');
	msg.innerHTML = msg;
	msg.textContent = msg;
	
	return msg;
}

function createButtonNameLabel(id, userId, name, telpNo, imgUrl){
	var button = document.createElement('button');
	button.setAttribute('contenteditable', 'false');
	button.setAttribute('userid', userId);
	button.classList.add('user-mention');
	button.id = id;
	button.onmouseover = function(){
		displayUserDetailLabel(id,imgUrl, name, userId, telpNo ); 
	}
	button.onmouseout= function(){
		closeUserPageLabel();
	}
	button.innerHTML = '@'+name;
	button.textContent = '@'+name;
	return button;
}

function closeUserPageLabel(){
	var userpage = document.getElementById("userdetail-popup");
	if(userpage != null){
		userpage.parentNode.removeChild(userpage);
	}
}
function displayUserDetailLabel(id,imgSrc, fullName,userId,telp ){
	var userMention = document.getElementById(id);
	
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
		
		var userImg = createOnHoverUserImageLabel(imgSrc);
		var userName = createOnHoverNameSectionLabel(fullName);
		var userTelp = createOnHoverTelpSectionLabel(telp);
		
		var textDiv = document.createElement("div");
		textDiv.classList.add("text-user");
		
		textDiv.appendChild(userName);
		textDiv.appendChild(userTelp);
		
		userDetail.appendChild(userImg);
		userDetail.appendChild(textDiv);
		
		var app = document.getElementsByClassName('v-app')[0];
		app.appendChild(userDetail);
	}
	function createOnHoverUserImageLabel(imgUrl){
		var img = document.createElement("img");
		img.src=imgUrl;
		img.style.height = "45px";
		img.style.width = "45px";
		img.className = "user-onhover-image";
		return img;
	}
	
	function createOnHoverNameSectionLabel(userName){
		var name = document.createElement("p");
		name.className = "user-onhover-name";
		name.innerHTML = userName;
		return name;
	}
	
	function createOnHoverTelpSectionLabel(telp){
		var name = document.createElement("p");
		name.className = "user-telp-name";
		name.innerHTML = telp;
		return name;
	}
}