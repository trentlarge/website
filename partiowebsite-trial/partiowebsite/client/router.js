Router.route('/', function () {
  this.render('appLayout');
});

Router.route('/verify-email/:token', {name: 'appLayout', controller: 'EmailVerificationController'});
