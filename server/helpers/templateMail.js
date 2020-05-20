exports.getLetter = (objectMessage) => {
  const { email } = objectMessage

  return {
    from: '<mail@customiza.ru>',
    to: email.replace(/'/g, ''),
    subject: 'Поздравляем! Ваша заявка на бесплатную консультацию успешно принята.',
    text: `
      CUSTOMIZA.RU
    
        Данные вашей заявки: 
       -

        Email заявителя: ${email}
       -

        Номер вашей заявки: => ${objectMessage.id} <=   

       ( В случае дополнительных вопросов, "Номер заявки" является вашим идентификатором )
       -

        Дополнительный идентификатор вашей заявки: => ${objectMessage.key} <=  
       -
          
        *Данное письмо создано автоматически и не требует ответа*`
  }
}
