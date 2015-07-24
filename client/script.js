Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
})


Template.outer.events({
  "click #menu-toggle":function(event, template){
  	event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
  },
  "click #main-content, click":function(event, template){
  	if($("#wrapper").hasClass("toggled"))
  	{
  	event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
  	}
  },
  "click #recordsLink":function(event,template){
  	Router.go('/records');
  	if($("#wrapper").hasClass("toggled"))
  	{
  	event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
  	}
  },
  "click #uploadLink":function(event,template){
  	Router.go('/upload');
  	if($("#wrapper").hasClass("toggled"))
  	{
  	event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
  	}
  }
});