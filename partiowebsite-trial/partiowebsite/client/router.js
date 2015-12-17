Router.route('/');
Router.route('/verify-email/:token', {name: 'emailverification', controller: 'EmailVerificationController'});
