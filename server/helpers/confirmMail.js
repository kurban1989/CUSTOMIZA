exports.getLetter = (objectMessage) => {
  const { email } = objectMessage

  return {
    from: '<mail@customiza.ru>',
    to: email.replace(/'/g, ''),
    subject: 'Ссылка для подтверждения вашего аккаунта customiza.ru',
    text: `
      CUSTOMIZA.RU

        Ваш e-mail: ${email}
        _____________________________________________________________________________

        Ссылка для подтверждения вашего аккаунта: http://customiza.ru/confirm/${objectMessage.token}  
        _____________________________________________________________________________
          
        Данное письмо создано автоматически и не требует ответа.`
  }
}
