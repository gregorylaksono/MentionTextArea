package cz.tactica.component.textarea;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.vaadin.annotations.JavaScript;
import com.vaadin.server.ThemeResource;
import com.vaadin.server.VaadinService;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.AbstractOrderedLayout;
import com.vaadin.ui.Component;
import com.vaadin.ui.CssLayout;
import com.vaadin.ui.CustomLayout;
import com.vaadin.ui.Image;
import com.vaadin.ui.JavaScriptFunction;
import com.vaadin.ui.Layout;
import com.vaadin.ui.UI;

import cz.tactica.component.label.UserMention;
import elemental.json.JsonArray;
@JavaScript({"jquery-1.7.1.min.js","MentionText.js"})
//@JavaScript({"MentionTextArea.js"})
public class MentionText extends AbstractJavaScriptComponent {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2073334046564980683L;
	
	public static final String CONTENT = "content";
	public static final String USER_ID = "id";
	private Map<String, String> message = new HashMap<String, String>();
	private SearchUser searchUserListeners = null;
	
	
	public MentionText(){
		CustomLayout layout = new CustomLayout("");	
		getState().themeUrl = "VAADIN/themes/"+UI.getCurrent().getTheme();
		addFunction("searchUser", new JavaScriptFunction() {
			
			@Override
			public void call(JsonArray arguments) {
				String searchToken = arguments.get(0).asString();
				if(searchUserListeners != null){
					List<UserMention> list = searchUserListeners.query(searchToken);
					CssLayout parent = new CssLayout();
					parent.addStyleName("hidden");
					parent.setWidth(0, Unit.PIXELS);
					parent.setHeight(0, Unit.PIXELS);
					String contentId = generateId();
					parent.setId(contentId);
					
					for(UserMention m: list){
						Image image = m.getImage();
						String data = m.getUserId()+"|"+m.getTelp()+"|"+m.getName();
						image.setId(data);
						parent.addComponent(image);
					}
					Layout layout = (Layout) UI.getCurrent().getContent();
					layout.addComponent(parent);
					
					com.vaadin.ui.JavaScript.getCurrent().execute("handleUserevent('"+contentId+"');");
				}
			}
		});
		
		addFunction("processMessage", new JavaScriptFunction() {
			
			@Override
			public void call(JsonArray arguments) {
				String id = arguments.get(0).asString();
				String content = arguments.get(1).asString();
				if(content.contains("<button class=\"user-mention\" userid=")){
					id = processId(content);
					content = processContent(content);
				}
				message.put(MentionText.CONTENT, content);
				message.put(MentionText.USER_ID, id);
			}
		});	
	}
//public static void main(String[] args){
//	String content = "<button class=\"user-mention\" userid=\"3\" contenteditable=\"false\">@ test 2</button><span id=\"text-end\"></span>asdasdsadsa";
//	processContent(content);
//}
	protected  String processId(String content) {
		String value = "";
		int userIdStartIndex = content.indexOf("userid");
		int userIdEndIndex = content.indexOf("contenteditable");
		
		value = content.substring(userIdStartIndex, userIdEndIndex);
		
		int startEqualsIndex = value.indexOf("=");
		value = value.substring(startEqualsIndex+2, value.length()-2);
		
		return value;
	}

	protected String processContent(String content) {
		String value = "";
		int contentStartIndex = content.indexOf("<span id=\"text-end\">");
		value = content.substring(contentStartIndex, content.length());
		int startCutIndex = value.indexOf("</span>");
		value = value.substring(startCutIndex, value.length());
		value = value.replace("</span>", "");
		return value;
	}

	protected String generateId() {
		String id = new SimpleDateFormat("ddMMyyHHmmssSS").format(new Date());
		
		return id;
	}

	public void setSearchUserListener(SearchUser search){
		searchUserListeners = search;
	}
	
	public Map<String, String> getValue(){		

		return message;
	}
	
	public String getMessage(){
		String msg = message.get(MentionText.CONTENT);
		return msg;
	}

	@Override
	protected MentionTextState getState() {

		return (MentionTextState) super.getState();
	}

	@Override
	public void attach() {
		Component parent = getParent();
		parent.setId("mentionTextArea");
		super.attach();
	}
	
	public void setInputPrompt(String input){
		getState().prompInput = input;
	}
	
	public interface SearchUser {
		public List<UserMention> query(String value);
		
	}

}

