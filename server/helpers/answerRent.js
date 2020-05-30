exports.getLetter = (objectMessage) => {
  const { email } = objectMessage

  return {
    from: '<mail@customiza.ru>',
    to: email.replace(/'/g, ''),
    subject: 'Поздравляем! Ваша заявка на Аренду программы принята!',
    text: `
      CUSTOMIZA.RU
    
        Данные вашей заявки: 
       -

       Email: ${email}
       -
       Телефон: ${objectMessage.phone}
       -
       Имя: ${objectMessage.name}
       -

       Заявка на программу(ы):
       ( ${objectMessage.programms.join('; ')} ). 

       -
        Идентификатор вашей заявки: => ${Math.ceil(Math.random() * 1000)} <=  
       -
         
        |  *Данное письмо создано автоматически и не требует ответа*  |`
  }
}
