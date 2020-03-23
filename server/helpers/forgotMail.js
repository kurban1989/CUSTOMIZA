exports.getLetter = (objectMessage) => {
  const { email } = objectMessage

  return {
    from: '<mail@customiza.ru>',
    to: email.replace(/'/g, ''),
    subject: 'Ссылка для восстановления пароля customiza.ru',
    text: `
      CUSTOMIZA.RU

        Ваш e-mail: ${email}
        _____________________________________________________________________________

        Ссылка для восстановления пароля: http://customiza.ru/reset/${objectMessage.token}  

        ( Данная ссылка будет доступна в течении часа )
        _____________________________________________________________________________
          
        Данное письмо создано автоматически и не требует ответа.`
  }
}
