
  Template.records.helpers({
    // returns the list of records you want displayed
    records: function () {
      var fileTypeFilter = Session.setDefault('fileType', 'All');
      var nameTypeFilter = Session.setDefault('nameType', '');

      fileTypeFilter = Session.get('fileType');
      nameTypeFilter = Session.get('nameType');

      if (nameTypeFilter == '')
      {
        if (fileTypeFilter == 'All')
        {
          return PatientRecords.find({username: Meteor.user().username});
        }

        else
        {
          return PatientRecords.find({username: Meteor.user().username, filetype: fileTypeFilter});
        }
      }

      else
      {
          if (fileTypeFilter == 'All')
          {
            var n = '/.*' + nameTypeFilter + '.*/i';
            var reg = new RegExp(n);
            return PatientRecords.find({username: Meteor.user().username, name: new RegExp(nameTypeFilter)});
          }

          else
          {
            var n = '/.*' + nameTypeFilter + '.*/i';
            var reg = new RegExp(n);
            return PatientRecords.find({username: Meteor.user().username, filetype: fileTypeFilter, name: new RegExp(nameTypeFilter)});
          }
      }
    }
  });

  Template.records.events({
    'click #add-record': function(){
      // extract data from input fields AND insert a new record in the database
      var recName = $('#new-record-name').val();
      var recDescription = $('#new-record-description').val();
      var recDate = $('#new-record-date').val();
      var myFileType = $('#new-record-type').val();
      var myFileObj = Session.get('currFile');

      myFileId = myFileObj._id;
      console.log(myFileObj);
      console.log(myFileId);

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
          file: myFileObj,
          filetype: myFileType,
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      }
    },

    // upload a file
    'click #upload-file': function() {
      var myFile = $('#choose-file').get(0).files[0];
      var fileObj = Images.insert(myFile); // Images is the FS collection for files
      Session.set('currFile', fileObj);
    },

    // delete a record
    'click .delete-task': function() {
      PatientRecords.remove({_id: this._id});
      Images.remove({_id: this.file._id});
    },

    'change #filefilter': function() {
      var newFileFilter = $('#filefilter').val();
      Session.set('fileType', newFileFilter);
    },

    'keyup #namefilter': function(event, records) {
      var newNameFilter = $('#namefilter').val();
      Session.set('nameType', newNameFilter);
    }
  });
  
  // // detect change in the search bar
  // $('#namefilter').on('input', function() {
  //   console.log($('#namefilter').val());
  // })