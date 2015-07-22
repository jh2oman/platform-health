/* common.js */

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

PatientRecords = new Mongo.Collection("records");