
  Template.records.helpers({
    // returns the list of records you want displayed
    records: function () {
      var fileTypeFilter = Session.setDefault('fileType', 'All');
      var nameTypeFilter = Session.setDefault('nameType', '');
      var sortByName = Session.setDefault('sortName', 1);

      fileTypeFilter = Session.get('fileType');
      nameTypeFilter = Session.get('nameType');
      sortByName = Session.get('sortName');


        if (nameTypeFilter == '')
        {
          if (fileTypeFilter == 'All')
          {
            return PatientRecords.find({username: Meteor.user().username}, {sort: {name: sortByName}});
          }

          else
          {
            return PatientRecords.find({username: Meteor.user().username, filetype: fileTypeFilter}, {sort: {name: sortByName}});
          }
        }

        else
        {
            if (fileTypeFilter == 'All')
            {
              var n = '/.*' + nameTypeFilter + '.*/i';
              var reg = new RegExp(n);
              return PatientRecords.find({username: Meteor.user().username, name: new RegExp(nameTypeFilter)}, {sort: {name: sortByName}});
            }

            else
            {
              var n = '/.*' + nameTypeFilter + '.*/i';
              var reg = new RegExp(n);
              return PatientRecords.find({username: Meteor.user().username, filetype: fileTypeFilter, name: new RegExp(nameTypeFilter)}, {sort: {name: sortByName}});
            }
        }
    }
    // getUrl:function(){

    //   var record = PatientRecords.findOne(this.file._id);
    //   return record.file.getFileRecord();
    //}
  });

  Template.records.events({
    'click #add-record': function(){
      var myFile = $('#choose-file').get(0).files[0];
      var myFileObj = Images.insert(myFile); // Images is the FS collection for files
      // extract data from input fields AND insert a new record in the database
      var recName = $('#new-record-name').val();
      var recDescription = $('#new-record-description').val();
      var recDate = $('#new-record-date').val();
      var myFileType = $('#new-record-type').val();

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

    // **** SORTING *****
    'click #sort-name': function() {
      var sort = Session.get('sortName');
      
      if (sort == 1)
        sort = -1;
      else
        sort = 1;
      
      Session.set('sortName', sort)
    }
  });
  
  // // detect change in the search bar
  // $('#namefilter').on('input', function() {
  //   console.log($('#namefilter').val());
  // })
