package cz.tactica.component.label;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.annotation.WebServlet;

import com.vaadin.annotations.Theme;
import com.vaadin.annotations.VaadinServletConfiguration;
import com.vaadin.server.FileResource;
import com.vaadin.server.Resource;
import com.vaadin.server.ThemeResource;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinService;
import com.vaadin.server.VaadinServlet;
import com.vaadin.server.VaadinServletService;
import com.vaadin.ui.Alignment;
import com.vaadin.ui.Button;
import com.vaadin.ui.Button.ClickEvent;
import com.vaadin.ui.Button.ClickListener;
import com.vaadin.ui.CssLayout;
import com.vaadin.ui.Embedded;
import com.vaadin.ui.Image;
import com.vaadin.ui.Label;
import com.vaadin.ui.TextArea;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;

import cz.tactica.component.textarea.MentionText;
import cz.tactica.component.textarea.MentionText.SearchUser;

@SuppressWarnings("serial")
@Theme("mentiontextarea")
public class MentiontextareaUI extends UI {

	@WebServlet(value = "/*", asyncSupported = true)
	@VaadinServletConfiguration(productionMode = false, ui = MentiontextareaUI.class)
	public static class Servlet extends VaadinServlet {
	}

	@Override
	protected void init(VaadinRequest request) {
		final VerticalLayout layout = new VerticalLayout();
		layout.setHeight(500, Unit.PIXELS);
		layout.setMargin(true);
		setContent(layout);
		
		//testPicture(layout);
		testMentionTextArea(layout);
		testMentionLabel(layout);
		
		//TextArea e = new TextArea();
		//layout.addComponent(e);
	}

	private void testPicture(VerticalLayout layout) {
		Resource s = new FileResource(new File("C:/Users/Greg/Desktop/data/Test/blankphoto.jpg"));
		Image a = new Image();
		a.setData("this data");
		a.setSource(s);
		
		Image b = new Image();
		b.setData("this data");
		b.setSource(s);
		
		layout.addComponent(a);
		layout.addComponent(b);
	}

	private void testMentionLabel(VerticalLayout layout) {
		Resource s = new FileResource(new File("C:/Users/Greg/Desktop/Test/blankphoto.jpg"));
		Resource t = new ThemeResource("image/default-user.png");
		
		Image image1 = new Image();
		image1.setSource(s);
		
		Image image2 = new Image();
		image2.setSource(t);
		
		MentionLabel label1 = new MentionLabel("Blablabla",null,null, "081280142404", image1, "<p>Greg</p><p>This is the message</p>");
		MentionLabel label2 = new MentionLabel("Blablabla",null,null, "081280142404", image2, "This is the message");
		//MentionLabel label = new MentionLabel("VAADIN/themes/mentiontextarea/",null,null, null, null, "This is the message");
		layout.addComponent(label1);
		layout.addComponent(label2);
		
		layout.setComponentAlignment(label1, Alignment.TOP_LEFT);
		layout.setComponentAlignment(label1, Alignment.BOTTOM_LEFT);
	}

	private void testMentionTextArea(VerticalLayout layout) {

		//
		final MentionText textArea = new MentionText();
		textArea.setSearchUserListener(new SearchUser() {
			
			@Override
			public List<UserMention> query(String value) {
				
				List<UserMention>mentions = new ArrayList<UserMention>();
				
				Image i = new Image();
				i.setSource(new FileResource(new File("C:/Users/Greg/Desktop/Test/blankphoto.jpg")));
				UserMention user1 = new UserMention("1", "Gregory Laksono",i, "08128012404" );
				UserMention user2 = new UserMention("2", "test 1", i, "08128012404" );
				UserMention user3 = new UserMention("3", "test 2", i, "08128012404" );
				
				mentions.add(user1);
				mentions.add(user2);
				mentions.add(user3);
				
				return mentions;
			}
		});
		layout.addComponent(textArea);
		
		Button b = new Button("Message");
		b.addClickListener(new ClickListener() {
			
			@Override
			public void buttonClick(ClickEvent event) {
				Map<String, String> map = textArea.getValue(); 
				String userId = map.get(MentionText.USER_ID);
				String content = map.get(MentionText.CONTENT);
				System.out.println("Content:"+content);
				System.out.println("UserId:"+userId);
			}
		});
		layout.addComponent(b);
		
	}
	
	public String convertResourceUrl(Resource resource){
		String url = "";
		
		CssLayout layout = new CssLayout();
		layout.setWidth(1, Unit.PIXELS);
		layout.setHeight(1, Unit.PIXELS);
		
		return url;
	}
}