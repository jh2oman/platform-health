
  Template.records.helpers({
    records: function () {
      return PatientRecords.find({username: Meteor.user().username}); // return ALL records in the DB
    }
  });

  Template.records.events({
    'click #add-record': function(){
      // extract data from input fields AND insert a new record in the database
      var recName = $('#new-record-name').val();
      var recDescription = $('#new-record-description').val();
      var recDate = $('#new-record-date').val();
      var myFileId = Session.get('currFile');
      var myUrl = Session.get('url');

      if(!recName || !myFileId)
        alert('ERROR: Record cannot be created without a Record Name OR valid File Attachment');
      else
      {
        $('#myModal').modal('toggle');
        $('#new-record-name').val('');
        $('#new-record-description').val('');
        $('#new-record-date').val('');
        // insert the record
        PatientRecords.insert({
          name: recName,
          description: recDescription,
          dateOfRecord: recDate,
          createdAt: new Date(),
          file: myFileId,
          fileUrl : myUrl,
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      }
    },

    // upload a file
    'click #upload-file': function() {
      var myFile = $('#choose-file').get(0).files[0];
      var fileObj = Images.insert(myFile); // Images is the FS collection for files
      console.log(fileObj.url);
      Session.set('currFile', fileObj);
      Session.set('url', fileObj.url);
    }
  });