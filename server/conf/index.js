// TO DO Перед продакшеном сменить статический токен на динамическое подтверждение
const configObjects = {
  get ID () {
    return ''
  },
  get token () {
    return '-iG9-'
  },
  get idForGetToken () {
    return ''
  },
  get nodemailer () {
    return {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'mail@.ru',
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
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  },
  get jwt () {
    return {
      secret: 'customiza',
      expiresIn: '30d',
      shortExpiresIn: '1h'
    }
  },
  get recaptcha () {
    return {
      // local host
      // secret: '-5sQ6Ny-3q7',
      // sitekey: ''
      secret: '',
      sitekey: ''
    }
  }
}

module.exports = configObjects
