package cz.tactica.component.label;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.SimpleFormatter;

import com.vaadin.annotations.JavaScript;
import com.vaadin.server.FileResource;
import com.vaadin.server.Resource;
import com.vaadin.server.ThemeResource;
import com.vaadin.server.VaadinService;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.CssLayout;
import com.vaadin.ui.Image;
import com.vaadin.ui.JavaScriptFunction;
import com.vaadin.ui.Layout;
import com.vaadin.ui.UI;

import elemental.json.JsonArray;

@JavaScript({"jquery-1.7.1.min.js","MentionLabel.js"})
public class MentionLabel extends AbstractJavaScriptComponent{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2632207775123889443L;
	private static int index=0;

	public MentionLabel(String userName, String userId, String name, String telpNo, Image image, String message){
		getState().userName = userName;
		if(userId == null)
			userId = " ";
		getState().userId = userId;
		if(name == null)
			name = " ";
		getState().name = name;
		if(telpNo == null){
			telpNo = " ";
		}
		getState().telpNo = telpNo;
		getState().message = message;
		index++;
		String id = String.valueOf(Calendar.getInstance().getTimeInMillis()+index);
		getState().labelId = id;		
		setWidth(null);
		setHeight(null);
		
		
		String layoutId ="temp-layout-"+id; 
		String imageId = "image-"+id;
		getState().layoutId = layoutId;
		getState().imageId = imageId;
		
		final CssLayout imageContainer = new CssLayout();
		
		if(image != null){
			imageContainer.addStyleName("hidden");
			image.setId(imageId);
			imageContainer.setId(layoutId);
			imageContainer.addComponent(image);
			Layout content = (Layout) UI.getCurrent().getContent();
			content.addComponent(imageContainer);			
		}
		
		addFunction("deleteParent", new JavaScriptFunction() {

			@Override
			public void call(JsonArray arguments) {
				Layout content = (Layout) UI.getCurrent().getContent();
				if(imageContainer.getParent() == content){
					content.removeComponent(imageContainer);			
					System.out.println("Called");
				}
				
			}
			
		});
		
	}
	


	@Override
	protected MentionLabelState getState() {

		return (MentionLabelState) super.getState();
	}


}
