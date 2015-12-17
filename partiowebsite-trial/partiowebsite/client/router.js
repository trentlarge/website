Router.configure({
 layoutTemplate: 'appLayout',
	//routeControllerNameConverter: "upperCamelCase",
	//loadingTemplate: 'loadingData',
    // progressSpinner : false,
    // progressTick : false,
});


Router.route('/verify-email/:token', {name: 'emailverification', controller: 'EmailVerificationController'});
