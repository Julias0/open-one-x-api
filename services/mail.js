const sgMail = require('@sendgrid/mail');

const welcomeEmailTemplate = `
  <h1>
      Welcome to onex!
  </h1>
  <h2>
      Lets' get you started
  </h2>

  <p>
    Thank you so much for signing up for the beta programme. It means the world to have someone use a product that I am building and find it useful.
    I would love your feedback so feel free to drop me a mail at
    <a href='mailto: aiyushdhar@gmail.com'>aiyushdhar@gmail.com</a>
  </p>
  
  <h2>
    How to get started
  </h2>

  <p>
    You can head over to the meetings section and click on start a meeting. It will show you a bunch of templates which you can use to create a meeting.
  </p>
  <p>
    Each of the questions have a dedicated notes section and next steps section. Add details over there.
    Once saved, the details of the meeting will come up inside the meetings grid
  </p>
`

const resetPasswordTemplate = (appUrl, accessToken) => `
  <p>
      To reset your password
      <a href="${appUrl}/#/new_password?access_token=${accessToken}">
          click here
      </a>.
  </p> 
`

const successfulPasswordResetEmailTemplate = `
  <p>
      Your have succesfully changed your OneX password.
  </p> 
`

module.exports = {
  sendMail: async function (to, subject, html) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const mailConfig = {
      to,
      from: 'aiyushdhar@gmail.com',
      html,
      subject
    };
    console.log(mailConfig);
    return await sgMail.send(mailConfig);
  },
  sendWelcomeMail: async function (to) {
    console.log(to);
    return await this.sendMail(
      to,
      'Welcome to OneX',
      welcomeEmailTemplate
    );
  },
  sendResetPasswordMail: async function (to, accessToken) {
    return await this.sendMail(
      to,
      'Reset your OneX Password',
      resetPasswordTemplate(process.env.APP_URL, accessToken)
    );
  }
}