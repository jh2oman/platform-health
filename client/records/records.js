
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
    },

    // **** SORTING *****
    'click #sort-name': function(event, template) {
      var sort = Session.get('sortName');
      
      if (sort == 1){
        sort = -1;
        template.$('#sort-name-arrow').removeClass('fa-angle-down').addClass('fa-angle-up');
      }
      else{
        template.$('#sort-name-arrow').removeClass('fa-angle-up').addClass('fa-angle-down');
        sort = 1;
      }

      Session.set('sortName', sort)
    }

  });
  
  // // detect change in the search bar
  // $('#namefilter').on('input', function() {
  //   console.log($('#namefilter').val());
  // })
