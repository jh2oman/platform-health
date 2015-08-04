Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
})


Template.outer.events({
  "click #menu-toggle":function(event, template){
  	event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
    $(event.currentTarget).attr('id', 'menu-toggle-replace');
  },
  "click #main-content, click":function(event, template){
  	if($("#wrapper").hasClass("toggled"))
  	{
  	event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
    template.$('#menu-toggle-replace').attr('id', 'menu-toggle');


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
  },
  "click #networkLink":function(event,template){
    Router.go('/network');
    if($("#wrapper").hasClass("toggled"))
    {
    event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
    }
  },
  "click #messagingLink":function(event,template){
    Router.go('/messaging');
    if($("#wrapper").hasClass("toggled"))
    {
    event.preventDefault();
    template.$("#wrapper").toggleClass("toggled");
    }
  },
  'click #add-record': function(){
      var file = $('#choose-file').get(0).files[0];
      var fileObj = Images.insert(file);
      console.log('Upload result: ', fileObj);
      images.insert({
        name:'image',
        file:fileObj
      });
      myFileId = fileObj._id;
      var recName = $('#new-record-name').val();
      var recDescription = $('#new-record-description').val();
      var recDate = $('#new-record-date').val();
 var myFileType = $('#new-record-type').val();
      if(!recName || !myFileId)
        alert('ERROR: Record cannot be created without a Record Name OR valid File Attachment');
      else
      {
        $('#myModal').modal('toggle');
        $('#new-record-name').val('');
        $('#new-record-description').val('');
        $('#new-record-date').val('');

        $('#new-record-type').val('*** Choose File Type ***');


        // insert the record
        PatientRecords.insert({
          name: recName,
          description: recDescription,
          dateOfRecord: recDate,
          createdAt: new Date(),
          fileId: myFileId,
          filetype: myFileType,
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      }
    }
});