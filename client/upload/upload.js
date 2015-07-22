Session.setDefault('counter', 0);

  Template.upload.helpers({
    counter: function () {
      return Session.get('counter');

  Template.upload.helpers({
    images : function(){
      return Images.find();
    }
  });

  Template.upload.events({

    'click input[type = "submit"]' : function(){
      var file = $('#fileUpload').get(0).files[0];
      var fileObj = Images.insert(file);
      console.log('Upload result: ', fileObj);
      images.insert({
        name:'image',
        file:fileObj
      });
    } 
  });
