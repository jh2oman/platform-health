Router.route('/', function () {
  this.layout('outer');
  this.render('records');
});
Router.route('/records', function () {
  this.layout('outer');
  this.render('records');
});
Router.route('/upload', function () {
  this.layout('outer');
  this.render('upload');
});

var imageStore = new FS.Store.GridFS("images", {
  path:'~uploads/full'
});

Images = new FS.Collection("images", {
	stores:[imageStore]
});

images = new Meteor.Collection('images');

Images.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});