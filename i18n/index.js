const posts = require('./posts')

module.exports = {
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        onlyUsers: 'Only users can leave comments.',
        checkPasswordReplay: 'Password mismatch',
        checkPassword: 'Password must be at least 6 characters long',
        NewPassword: 'Enter a new password',
        successfulRegistration: 'registration was successful, to continue you need to confirm your account, for this you need to click on the link sent to your e-mail.',
        confirmSuccess: 'your account has been successfully verified',
        Hello: 'Hello',
        ConfirmEmail: 'Send a confirmation email to your e-mail?',
        'E-mail not verified': 'E-mail not verified',
        'Password reset link expired': 'Password reset link expired',
        'The entered e-mail is not registered': 'The entered e-mail is not registered',
        HeaderForgotPassword: 'To recover your password, enter your e-mail',
        MessageForgotPassword: 'An email has been sent to your e-mail with a link to reset your password.',
        ForgotPassword: 'Forgot your password?',
        RestorePassword: 'Restore password',
        Save: 'Save',
        ErrorCaptcha: 'Prove that you are not a robot.',
        DeleteConfirmUser: 'Are you sure you want to delete the user without the possibility of recovery?',
        Cancel: 'Cancel',
        OK: 'OK',
        NewUser: 'New user',
        EditingUser: 'User editing',
        SearchUser: 'Search user',
        Search: 'Search',
        clear: 'Clear',
        edit: 'Edit',
        delete: 'Delete',
        Active: 'Active',
        Blocked: 'Blocked',
        Phone: 'Phone',
        RoleUser: 'User role',
        StatusUser: 'User status',
        'The entered e-mail is already registered': 'The entered e-mail is already registered',
        ErrorLogin: 'Email or password is incorrect',
        Administrator: 'Administrator',
        Employee: 'Employee',
        User: 'User',
        MyProfile: 'My profile',
        Users: 'Users',
        Cases: 'Cases',
        LogInToYourAccount: 'Log in to your account',
        LogOrReg: 'Log in or registration',
        LogIn: 'Log in',
        LogOut: 'Log out',
        Registration: 'Registration',
        UserRegistration: 'User registration',
        Email: 'E-mail',
        Password: 'Password',
        PasswordReplay: 'Password replay',
        Name: 'Name',
        Surname: 'Surname',
        labelLangText: 'eng',
        'Your comment': 'Your comment',
        'Get free consultation on 1C': 'Get free consultation',
        'Free call in Russia': 'Free call in Russia',
        mainH1: 'Free advice on accounting, accounting, automation of accounting based on 1C configurations',
        'Leave a request for a free consultation for questions related to 1C!': 'Leave a request for a free consultation on the maintenance and automation of accounting and work in the 1C program.',
        'How can I call you': 'How can I call you',
        'Your email': 'Your email',
        'Your telephone': 'Your telephone',
        'Your question': 'Your question',
        'I agree to the processing': 'I agree to the processing',
        'personal data': 'personal data',
        'How will we help you?': 'How will we help you?',
        'Online counseling': 'Online counseling',
        'Help choosing a configuration': 'Help choosing a configuration',
        'Implement selected solutions': 'Implement selected solutions',
        'What do you end up with?': 'What do you end up with?',
        'Employee Competency': 'Employee Competency',
        'Right choice and embedded solution': 'Right choice and embedded solution',
        'Designed by revision documentation': 'Designed by revision documentation',
        'Our latest cases': 'Our latest cases',
        'Date of the application': 'Date of the application',
        'CUSTOMIZA Blog': 'CUSTOMIZA Blog',
        'Reply from CUSTOMIZA': 'Reply from CUSTOMIZA',
        'Read completely': 'Read completely',
        'Question': 'Question',
        'Go to the section with articles': 'Go to the section with articles',
        'Rent 1C from CUSTOMIZA': 'Rent 1C from CUSTOMIZA',
        'The advantage of renting': 'The advantage of renting',
        'Leave a request for rental programs 1C': 'Leave a request for rental programs 1C',
        'Choose a rental program': 'Choose a rental program',
        'Our contacts': 'Our contacts',
        'Head Office Address:': 'Head Office Address:',
        footerText: 'Professional advice on installing, configuring and using any 1C platforms and configurations',
        '© All rights reserved.': '© All rights reserved.',
        'Drop file here or click to upload': 'Drop file here or click to upload',
        'successfully uploaded': 'successfully uploaded',
        'Remove file': 'Remove file',
        sm: 'System message',
        checkForm: 'Check the correctness of filling out the form!',
        successForm: 'Your application has been sent successfully! Information about the status of the application and its number is sent to your Email',
        badRequest: 'Server Error Occurred',
        errLoadFile: 'Error: File type not allowed!',
        'Solved cases': 'Solved cases',
        'Create case': 'Create case',
        'Short title': 'Short title',
        'useful': 'useful',
        'Articles': 'articles',
        'Rent 1C': 'Rent 1C',
        'Atelier PO': 'Atelier PO',
        'save': 'save',
        'Blog': 'Blog',
        'Create article': 'Create article',
        'Show all articles': 'Show all articles',
        'Show all articles for users': 'Show all articles for users',
        'Header article': 'Header article',
        'Post right away': 'Post right away',
        'Article successfully saved': 'Article successfully saved',
        'Article updated successfully': 'Article updated successfully',
        'successfully saved': 'successfully saved',
        'preview': 'preview',
        'read more': 'read more',
        'comments': 'comments',
        leave: 'leave',
        add: 'add',
        rateOnlyRegUsers: 'May vote only to registered users',
        DeleteConfirmComment: 'Confirm comment deletion?',
        DeleteConfirmCase: 'Confirm case deletion?',
        by: 'by',
        and: 'and',
        'advice': 'advice',
        customer: 'customer',
        TitleImg: 'Enlarged image',
        'show all cases': 'show all cases',
        posts: {
          ...posts.en
        }
      },
      ru: {
        onlyUsers: 'Только пользователи могут оставлять комментарии. ',
        checkPasswordReplay: 'Пароли не совпадают',
        checkPassword: 'Длина пароля должна быть не меньше 6 символов',
        NewPassword: 'Введите новый пароль',
        successfulRegistration: 'регистрация прошла успешно, для продолжения необходимо подтвердить аккаунт, для этого необходимо перейти по ссылке отправленной на ваш e-mail.',
        confirmSuccess: 'ваш аккаунт успешно подтвержден',
        Hello: 'Здравствуйте',
        ConfirmEmail: 'Отправить на ваш e-mail письмо с сылкой для подтверждения?',
        'E-mail not verified': 'E-mail не подтвержден',
        'Password reset link expired': 'Время действия ссылки для восстановления пароля истекло',
        'The entered e-mail is not registered': 'Введенный e-mail не зарегистрирован',
        HeaderForgotPassword: 'Для восстановления пароля введите свой e-mail',
        MessageForgotPassword: 'На ваш e-mail отправлено письмо с ссылкой для восстановления пароля.',
        ForgotPassword: 'Забыли пароль?',
        RestorePassword: 'Восстановить пароль',
        Save: 'Сохранить',
        ErrorCaptcha: 'Докажите, что вы не робот.',
        DeleteConfirmUser: 'Вы действительно хотите удалить пользователя без возможности восстановления?',
        Cancel: 'Отмена',
        OK: 'Да',
        NewUser: 'Новый пользователь',
        EditingUser: 'Редактирование пользователя',
        SearchUser: 'Поиск пользователя',
        Search: 'Поиск',
        clear: 'Очистить',
        edit: 'Редактировать',
        delete: 'Удалить',
        Active: 'Активен',
        Blocked: 'Заблокирован',
        Phone: 'Телефон',
        RoleUser: 'Роль пользователя',
        StatusUser: 'Статус пользователя',
        'The entered e-mail is already registered': 'Введенный e-mail уже зарегистрирован',
        ErrorLogin: 'E-mail или пароль не верен',
        Administrator: 'Администратор',
        Employee: 'Сотрудник',
        User: 'Пользователь',
        MyProfile: 'Мой профиль',
        Users: 'Пользователи',
        Cases: 'Кейсы',
        'Create case': 'Создать кейс',
        'Short title': 'Краткий заголовок',
        LogInToYourAccount: 'Войти в личный кабинет',
        LogIn: 'Войти',
        LogOrReg: 'Войти или зарегистрироваться',
        LogOut: 'Выйти',
        Registration: 'Зарегистрироваться',
        UserRegistration: 'Регистрация пользователя',
        Email: 'E-mail',
        Password: 'Пароль',
        PasswordReplay: 'Повтор пароля',
        Name: 'Имя',
        Surname: 'Фамилия',
        labelLangText: 'рус',
        'Your comment': 'Ваш комментарий',
        'Get free consultation on 1C': 'Получить бесплатную консультацию',
        'Free call in Russia': 'Бесплатный звонок по России',
        mainH1: 'Бесплатные консультации по вопросам ведения учета, постановки учета, автоматизации учета на базе конфигураций 1С',
        'Leave a request for a free consultation for questions related to 1C!': 'Оставьте заявку на бесплатную консультацию по вопросам ведения и автоматизации учета и работе в программе 1C',
        'How can I call you': 'Как к вам обращаться',
        'Your email': 'Ваш email',
        'Your telephone': 'Ваш телефон',
        'Your question': 'Ваш вопрос',
        'I agree to the processing': 'Согласен на обработку',
        'personal data': 'персональных данных',
        'How will we help you?': 'Чем мы будем вам полезны?',
        'Online counseling': 'Онлайн консультирование',
        'Help choosing a configuration': 'Помощь при выборе конфигурации',
        'Implement selected solutions': 'Внедрение выбранных решений',
        'What do you end up with?': 'Что вы в итоге получите?',
        'Employee Competency': 'Повышение компетенции сотрудников',
        'Right choice and embedded solution': 'Правильно выбранное и внедренное решение',
        'Designed by revision documentation': 'Оформленная проектная документация на доработку',
        'Our latest cases': 'Наши последние кейсы',
        'Date of the application': 'Дата обращения',
        'Reply from CUSTOMIZA': 'Ответ от CUSTOMIZA',
        'CUSTOMIZA Blog': 'Блог CUSTOMIZA',
        'Read completely': 'Читать полностью',
        'Question': 'Вопрос',
        'Go to the section with articles': 'Перейти в раздел со статьями',
        'Rent 1C from CUSTOMIZA': 'Аренда 1С от CUSTOMIZA',
        'The advantage of renting': 'Преимущество аренды',
        'Leave a request for rental programs 1C': 'Оставьте заявку на аренду программ 1С',
        'Choose a rental program': 'Выберите программу для аренды',
        'Our contacts': 'Наши контакты',
        'Head Office Address:': 'Адрес головного офиса:',
        footerText: 'Профессиональные консультации по установке, настройке и использованию любых платформ и конфигураций 1C',
        '© All rights reserved.': '© Все права защищены.',
        'Drop file here or click to upload': 'Перетащите файл сюда или нажмите, чтобы загрузить',
        'successfully uploaded': 'успешно загружен',
        'Remove file': 'Удалить файл',
        sm: 'Сообщение системы',
        checkForm: 'Проверьте правильность заполнения формы!',
        successForm: 'Ваша заявка успешно отправлена! Сведения о статусе заявки и её номер направлено на ваш Email',
        badRequest: 'Произошла серверная ошибка',
        errLoadFile: 'Ошибка: тип файла не допускается!',
        'Solved cases': 'Решенные кейсы',
        'useful': 'полезные',
        'Articles': 'статьи',
        'Rent 1C': 'Аренда 1С',
        'Atelier PO': 'Ателье ПО',
        'save': 'Сохранить',
        'Blog': 'Блог',
        'Create article': 'Создать статью',
        'Show all articles': 'Показать все статьи',
        'Show all articles for users': 'Показать все статьи для пользователей',
        'Header article': 'Заголовок статьи',
        'Post right away': 'Опубликовать сразу',
        'Article successfully saved': 'Статья успешно сохранена',
        'successfully saved': 'успешно сохранен',
        'Article updated successfully': 'Статья успешно обновлена',
        'preview': 'просмотр',
        'read more': 'Читать далее',
        'comments': 'комментарии ',
        leave: 'оставьте',
        add: 'добавить',
        rateOnlyRegUsers: 'Голосовать могут только зарегистрированные пользователи',
        DeleteConfirmComment: 'Подтвердждаете удаление комментария?',
        DeleteConfirmCase: 'Подтвердждаете удаление кейса?',
        by: 'по',
        and: 'и',
        'advice': 'советы',
        customer: 'заказчик',
        TitleImg: 'Увеличенное изображение',
        'show all cases': 'показать все кейсы',
        posts: {
          ...posts.ru
        }
      }
    }
  }
}
