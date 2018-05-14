// Accessing the Service that we just created
const nodemailer = require('nodemailer');

var PaymentService = require('../services/payments.service')
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'saylemoneytest', // generated ethereal user
        pass: '2018saylemoney' // generated ethereal password
    }
});

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getPayments = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var Payments = await PaymentService.getPayments({}, page, limit)

        // Return the Payments list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: Payments, message: "Succesfully Payments Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

function sendemail(payment) {
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Sayle Money" <test@saylemoney.com>', // sender address
        to: payment.customer, // list of receivers
        subject: 'Sayle Money :' + payment.product, // Subject line
        text: ' Sayle Money ' + payment.product, // plain text body
        html: '<b> Customer  ' + payment.customer + '</b> <br> <b> Product ' + payment.product + '</b> <br> Quantity <b> ' + payment.quantity + '</b> <br> Amount <b> ' + payment.amount + '</b> <br><br><br><img src="https://s3.eu-west-3.amazonaws.com/saylemoney/sayle.png">' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}
exports.createPayment = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var Payment = {
        product: req.body.product,
        amount: req.body.amount,
        quantity: req.body.quantity,
        customer: req.body.customer
    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdPayment = await PaymentService.createPayment(Payment)
        sendemail(createdPayment)


        return res.status(201).json({ status: 201, data: createdPayment, message: "Succesfully Created Payment" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Payment Creation was Unsuccesfull" })
    }
}

exports.updatePayment = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body.id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body.id;

    console.log(req.body)

    var Payment = {
        id,
        amount: req.body.amount ? req.body.amount : null,
        product: req.body.product ? req.body.product : null,
        quantity: req.body.quantity ? req.body.quantity : null,
        customer: req.body.customer ? req.body.customer : null,
    }

    try {
        var updatedPayment = await PaymentService.updatePayment(Payment)
        sendemail(updatedPayment)
        return res.status(200).json({ status: 200, data: updatedPayment, message: "Succesfully Updated Tod" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removePayment = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await PaymentService.deletePayment(id)
        return res.status(204).json({ status: 204, message: "Succesfully Payment Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}