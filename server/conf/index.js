// TO DO Перед продакшеном сменить статический токен на динамическое подтверждение
const configObjects = {
  get ID () {
    return '628811'
  },
  get token () {
    return 'AgAEA7qjEcfrAAX-iG9-bAmI5Ugis3rseOiSRCw'
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
        pass: '56JomL'
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    }
  },
  get mysql () {
    return {
      host: '37.140.195.58',
      port: '3306',
      user: 'admin_customiza',
      password: 'v6Rq9KxOuu',
      database: 'admin_customiza'
    }
  },
  get jwt () {
    return {
      secret: 'customiza',
      expiresIn: '30d'
    }
  },
  get recaptcha () {
    return {
      // local host
      // secret: '6Lc8dOIUAAAAAD1ucQhVFUJsPuHL0-5sQ6Ny-3q7',
      // sitekey: '6Lc8dOIUAAAAAMVnPnhMBYSxEA3o7oCCKMaT7OvI'
      secret: '6LepeIIUAAAAAK3w4pqS7r6S_13gHChByVUvnbX0',
      sitekey: '6LepeIIUAAAAABPqWNU5ZqbRRVL5C6CoBnhYoj95'
    }
  }
}

module.exports = configObjects
