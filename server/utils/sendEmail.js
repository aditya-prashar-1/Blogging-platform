import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const msg = {
    to: options.email,
    from: 'adiprashar1807@gmail.com', // Your verified sender
    subject: options.subject,
    html: options.html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully via @sendgrid/mail');
  } catch (error) {
    console.error('Error sending email with @sendgrid/mail:', error);
    if (error.response) {
      // Log the detailed error from SendGrid's API
      console.error(error.response.body);
    }
    // Re-throw the error to be caught by the controller
    throw error;
  }
};

export default sendEmail;