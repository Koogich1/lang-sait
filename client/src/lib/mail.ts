import { Resend } from "resend";

const resend = new Resend("re_SvnJJFcG_Ena1bWc3826os8cPBy1duiAz");

const emailStyles = `
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #835BD2;
      text-align: center;
    }
    p {
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 10px;
      font-size: 16px;
      color: white;
      background-color: #835BD2;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  </style>
`;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@acyberg.com",
    to: email,
    subject: "Код подтверждения",
    html: `${emailStyles}
      <div class="container">
        <h2>Код подтверждения</h2>
        <p>Ваш код для авторизации на Acyberg.com:</p>
        <h3 style="text-align: center; color: #835BD2;">${token}</h3>
        <p>Пожалуйста, используйте этот код для продолжения.</p>
        <div class="footer">Спасибо,<br>Команда Acyberg</div>
      </div>
    `,
  });
};

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "mail@acyberg.com",
    to: email,
    subject: "Сброс пароля",
    html: `${emailStyles}
      <div class="container">
        <h2>Сброс пароля</h2>
        <p>Чтобы сбросить ваш пароль, нажмите на кнопку ниже:</p>
        <a href="${resetLink}" class="button">Сбросить пароль</a>
        <div class="footer">Если вы не запрашивали сброс, просто игнорируйте это письмо.<br>Спасибо,<br>Команда Acyberg</div>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "mail@acyberg.com",
    to: email,
    subject: "Подтверждение вашей электронной почты",
    html: `${emailStyles}
      <div class="container">
        <h2>Подтверждение почты</h2>
        <p>Привет!</p>
        <p>Чтобы подтвердить свою почту, нажмите на кнопку ниже:</p>
        <a href="${confirmLink}" class="button">Подтвердить почту</a>
        <div class="footer">Если вы не запрашивали создание аккаунта, просто игнорируйте это письмо.<br>Спасибо,<br>Команда Acyberg</div>
      </div>
    `,
  });
};

export const sendEmailVerification = async (email: string, userId: string) => {
  const resetLink = `${domain}/emailVerified/${userId}`;

  await resend.emails.send({
    from: "mail@acyberg.com",
    to: email,
    subject: "Подтверждение почты",
    html: `${emailStyles}
      <div class="container">
        <h2>Подтверждение почты</h2>
        <p>Привет!</p>
        <p>Чтобы подтвердить свою почту, нажмите на кнопку ниже:</p>
        <a href="${resetLink}" class="button">Подтвердить почту</a>
        <div class="footer">Если вы не запрашивали создание аккаунта, просто игнорируйте это письмо.<br>Спасибо,<br>Команда Acyberg</div>
      </div>
    `,
  });
};
