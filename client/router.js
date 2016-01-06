Router.route('/', function () {
  this.render('appLayout');
});

Router.route('/verify-email/:token', function(){
	var token = this.params.token;
	
	if (token) {
		Accounts.verifyEmail(token, function(err) {
			if (err != null) {
				if (err.message == 'Verify email link expired [403]') {
					bootbox.alert({ message: 'Sorry this verification link has expired.' })    		
				}
			} else {
				bootbox.alert({ message: 'Your email address is successfully verified.' })				
			}
		});
	}

	Router.go('/');
});
