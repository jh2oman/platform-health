
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
    },
    images : function(){
      return Images.find({});
    },
    patientImage : function(id){
      return Images.find({_id: id});
    }
    // getUrl:function(){

    //   var record = PatientRecords.findOne(this.file._id);
    //   return record.file.getFileRecord();
    //}
  });

  Template.records.events({
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
    },
    'mouseenter .record-row':function(event, template){
      $(event.currentTarget).find('.share-record').toggle();
    },
    'mouseleave .record-row':function(event, template){
      $(event.currentTarget).find('.share-record').toggle();
    }

  });
  
  // // detect change in the search bar
  // $('#namefilter').on('input', function() {
  //   console.log($('#namefilter').val());
  // })
