exports.getLetter = (objectMessage) => {
  const { email } = objectMessage

  return {
    from: '<mail@customiza.ru>',
    to: 'srybakov@yandex.ru',
    subject: 'Заявка на аренду программы 1С.',
    text: `
      CUSTOMIZA.RU
    
        Данные заявки: 
       ___________________

        Email заявителя: ${email}
       ---
       Имя заявителя:
       ${objectMessage.name}
       ---
       Телефон заявителя:
       ${objectMessage.phone}
       ---

        Желаемые программы:
       ( ${objectMessage.programms.join('; ')} ).  
       ---
          
        *Данное письмо создано автоматически*`
  }
}
