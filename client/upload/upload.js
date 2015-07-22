Session.setDefault('counter', 0);

  Template.upload.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.upload.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });