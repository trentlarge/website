Template.appLayout.onRendered(function() {
	var token = (Iron.Location.get().path).split("/verify-email/")[1];
	console.log(token);

	console.log('chamou a template rapaz');

	if (token) {
		Accounts.verifyEmail(token, function(err) {
			if (err != null) {
				if (err.message == 'Verify email link expired [403]') {
					console.log('Sorry this verification link has expired.');

					bootbox.alert({
							size: 'small',
							message: "Sorry this verification link has expired.",
							callback: function(){

								Router.go('/');

							 }
					})

				}
			} else {

				//Creating transactionsId for new user;
				Meteor.call('createTransactions');

				bootbox.alert({
				    size: 'small',
				    message: "Your email address is successfully verified.",
				    callback: function(){

							Router.go('/');

						 }
				})


			}
		});
	}
});
