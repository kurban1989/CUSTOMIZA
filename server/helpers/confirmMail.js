exports.getLetter = (objectMessage) => {
  const { email } = objectMessage

  return {
    from: '<mail@customiza.ru>',
    to: email.replace(/'/g, ''),
    subject: 'Ссылка для подтверждения вашего аккаунта customiza.ru',
    text: `
      CUSTOMIZA.RU

        Ваш e-mail: ${email}
        __

        Ссылка для подтверждения вашего аккаунта: http://customiza.ru/confirm/${objectMessage.token}  
        __
          
        Данное письмо создано автоматически и не требует ответа.`
  }
}
