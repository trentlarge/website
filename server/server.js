
Kadira.connect('HBDrxrGMwsaZo8juo', '854de5d4-1bf7-4eef-999d-b5f10f39952b');

Meteor.methods({
	addEmail: function(email) {
		checkEmail = Match.Where(function (x) {
			check(x, String);
			return RegExp(/^\S+@\S+\.\S+$/).test(x);
		});
		alreadyExists = Match.Where(function(y) {
			return !Emails.find({email: y}).count();
		})

		try {check(email, checkEmail)} catch (err) {
            throw new Meteor.Error('Invalid-Email')
        }
		try {check(email, alreadyExists)} catch (err) {
            throw new Meteor.Error('Already-Exists')
        }

		Emails.insert({email: email});
	},
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      }
})
