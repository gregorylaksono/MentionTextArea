package cz.tactica.component.label;

import com.vaadin.server.FileResource;
import com.vaadin.server.Resource;
import com.vaadin.server.ThemeResource;
import com.vaadin.server.VaadinService;
import com.vaadin.ui.Image;
import com.vaadin.ui.UI;

public class UserMention {

	private String userId;
	private String name;
	private String imageUrl;
	private String telp;
	private Image image;
	
	public UserMention( String userId, String name, Image image, String telp){
		setUserId(userId);
		setName(name);
		setImage(image);
		setImageUrl(imageUrl);
		setTelp(telp);
	}
//	private String getResourceImgUrl(Resource res) {
//		String value = "";
//		if(res instanceof ThemeResource){
//			ThemeResource theme = (ThemeResource) res;
//			value = "VAADIN/themes/"+UI.getCurrent().getTheme()+"/"+theme.getResourceId();
//		}else if(res instanceof FileResource){
//			FileResource fRes = (FileResource) res;
//			value = path+fRes.getSourceFile().getName();
//		}else{
//			
//		}
//		return value;
//	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getTelp() {
		return telp;
	}
	public void setTelp(String telp) {
		this.telp = telp;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String image) {
		this.imageUrl = image;
	}
	public Image getImage() {
		return image;
	}
	public void setImage(Image image) {
		this.image = image;
	}


}
