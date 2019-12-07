// TO DO Перед продакшеном сменить статический токен на динамическое подтверждение
const configObjects = {
  get ID () {
    return ''
  },
  get token () {
    return '-iG9-'
  },
  get idForGetToken () {
    return '8cb0630b72e04bd0859fcd770189976a'
  },
  get nodemailer () {
    return {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'mail@customiza.ru',
        pass: ''
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    }
  },
  get mysql () {
    return {
      host: 'localhost',
      port: '3306',
      user: '',
      password: '',
      database: ''
    }
  }
}

module.exports = configObjects
