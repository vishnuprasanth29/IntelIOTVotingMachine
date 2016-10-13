var nodemailer = require('nodemailer');
var mailer = function(){
	var ret = {}
var transporter = nodemailer.createTransport('SMTP', {
	service: "Gmail",
	auth: {
		user: "testevmiot@gmail.com",
		pass: "Test1234$$"
	}
});
var mailOptions = {
	from: '"Election Authority ?" <vishnu29vishnu@gmail.com>', 
	to: 'aravind.karanam@gmail.com',
	subject: 'voted',
	test: 'Hey!! You have casted your vote'
	};
ret.sendEmail = function(){
	transporter.sendMail(mailOptions, function(error, info){
		console.log("Email Sent");
	});
};
return ret;
};
module.exports=	mailer();
