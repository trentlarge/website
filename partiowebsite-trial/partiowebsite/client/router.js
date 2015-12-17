Router.route('/', 'partiowebsite');
Router.route('/verify-email/:token', {name: 'emailverification', controller: 'EmailVerificationController'});
