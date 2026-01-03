export type Language = 'uz' | 'ru'

export const translations = {
    // Navigation
    nav: {
        home: { uz: 'Bosh sahifa', ru: 'Главная' },
        search: { uz: 'Qidirish', ru: 'Поиск' },
        orders: { uz: 'Buyurtmalar', ru: 'Заказы' },
        profile: { uz: 'Profil', ru: 'Профиль' },
        login: { uz: 'Kirish', ru: 'Войти' },
        register: { uz: "Ro'yxatdan o'tish", ru: 'Регистрация' },
        logout: { uz: 'Chiqish', ru: 'Выйти' },
    },

    // Home page
    home: {
        title: { uz: "O'zbekiston Xizmatlar Bozori", ru: 'Рынок услуг Узбекистана' },
        subtitle: { uz: "Kerakli xizmatni toping yoki o'z xizmatlaringizni taklif eting", ru: 'Найдите нужную услугу или предложите свои услуги' },
        searchPlaceholder: { uz: 'Xizmat yoki ism qidiring...', ru: 'Поиск услуги или имени...' },
        popularCategories: { uz: 'Mashhur kategoriyalar', ru: 'Популярные категории' },
        allCategories: { uz: 'Barcha kategoriyalar', ru: 'Все категории' },
        featuredProviders: { uz: 'Tavsiya etilgan ustalar', ru: 'Рекомендуемые мастера' },
        viewAll: { uz: 'Barchasini ko\'rish', ru: 'Смотреть все' },
    },

    // Categories
    categories: {
        plumber: { uz: 'Santexnik', ru: 'Сантехник' },
        electrician: { uz: 'Elektrik', ru: 'Электрик' },
        barber: { uz: 'Sartarosh', ru: 'Парикмахер' },
        chef: { uz: 'Oshpaz', ru: 'Повар' },
        cleaner: { uz: 'Tozalash', ru: 'Уборка' },
        driver: { uz: 'Haydovchi', ru: 'Водитель' },
        teacher: { uz: "O'qituvchi", ru: 'Учитель' },
        repairman: { uz: "Ta'mirchi", ru: 'Ремонтник' },
        painter: { uz: "Bo'yoqchi", ru: 'Маляр' },
        carpenter: { uz: 'Duradgor', ru: 'Плотник' },
        tailor: { uz: 'Tikuvchi', ru: 'Портной' },
        photographer: { uz: 'Fotograf', ru: 'Фотограф' },
        hotel: { uz: 'Mehmonxona', ru: 'Гостиница' },
        restaurant: { uz: 'Restoran', ru: 'Ресторан' },
        beauty: { uz: 'Go\'zallik saloni', ru: 'Салон красоты' },
        fitness: { uz: 'Fitnes trener', ru: 'Фитнес тренер' },
        courier: { uz: 'Kuryer', ru: 'Курьер' },
        other: { uz: 'Boshqa', ru: 'Другое' },
    },

    // Auth
    auth: {
        email: { uz: 'Email', ru: 'Email' },
        password: { uz: 'Parol', ru: 'Пароль' },
        confirmPassword: { uz: 'Parolni tasdiqlang', ru: 'Подтвердите пароль' },
        name: { uz: 'Ism', ru: 'Имя' },
        surname: { uz: 'Familiya', ru: 'Фамилия' },
        phone: { uz: 'Telefon', ru: 'Телефон' },
        loginTitle: { uz: 'Hisobingizga kiring', ru: 'Войдите в аккаунт' },
        registerTitle: { uz: "Yangi hisob yarating", ru: 'Создайте новый аккаунт' },
        noAccount: { uz: "Hisobingiz yo'qmi?", ru: 'Нет аккаунта?' },
        hasAccount: { uz: 'Hisobingiz bormi?', ru: 'Есть аккаунт?' },
        selectRole: { uz: 'Rolni tanlang', ru: 'Выберите роль' },
        client: { uz: 'Mijoz', ru: 'Клиент' },
        provider: { uz: 'Xizmat ko\'rsatuvchi', ru: 'Мастер' },
        forgotPassword: { uz: 'Parolni unutdingizmi?', ru: 'Забыли пароль?' },
    },

    // Profile
    profile: {
        editProfile: { uz: 'Profilni tahrirlash', ru: 'Редактировать профиль' },
        myServices: { uz: 'Mening xizmatlarim', ru: 'Мои услуги' },
        addService: { uz: "Xizmat qo'shish", ru: 'Добавить услугу' },
        address: { uz: 'Manzil', ru: 'Адрес' },
        workAddress: { uz: 'Ish manzili', ru: 'Рабочий адрес' },
        cardNumber: { uz: 'Karta raqami', ru: 'Номер карты' },
        rating: { uz: 'Reyting', ru: 'Рейтинг' },
        reviews: { uz: 'Sharhlar', ru: 'Отзывы' },
        services: { uz: 'Xizmatlar', ru: 'Услуги' },
        orders: { uz: 'Buyurtmalar', ru: 'Заказы' },
        completedOrders: { uz: 'Bajarilgan', ru: 'Выполненные' },
        save: { uz: 'Saqlash', ru: 'Сохранить' },
        cancel: { uz: 'Bekor qilish', ru: 'Отмена' },
    },

    // Services
    service: {
        serviceName: { uz: 'Xizmat nomi', ru: 'Название услуги' },
        servicePrice: { uz: 'Narxi', ru: 'Цена' },
        serviceDescription: { uz: 'Tavsif', ru: 'Описание' },
        selectCategory: { uz: 'Kategoriya tanlang', ru: 'Выберите категорию' },
        priceFrom: { uz: 'dan', ru: 'от' },
        priceTo: { uz: 'gacha', ru: 'до' },
        sum: { uz: "so'm", ru: 'сум' },
        perHour: { uz: 'soatiga', ru: 'в час' },
        perItem: { uz: 'dona', ru: 'штука' },
    },

    // Search
    search: {
        title: { uz: 'Xizmat qidirish', ru: 'Поиск услуг' },
        filters: { uz: 'Filtrlar', ru: 'Фильтры' },
        sortBy: { uz: 'Saralash', ru: 'Сортировка' },
        sortByPrice: { uz: 'Narx bo\'yicha', ru: 'По цене' },
        sortByRating: { uz: 'Reyting bo\'yicha', ru: 'По рейтингу' },
        sortByName: { uz: 'Ism bo\'yicha', ru: 'По имени' },
        lowToHigh: { uz: 'Pastdan yuqoriga', ru: 'По возрастанию' },
        highToLow: { uz: 'Yuqoridan pastga', ru: 'По убыванию' },
        noResults: { uz: 'Natija topilmadi', ru: 'Результаты не найдены' },
        showOnMap: { uz: 'Xaritada ko\'rsatish', ru: 'Показать на карте' },
    },

    // Orders
    order: {
        myOrders: { uz: 'Mening buyurtmalarim', ru: 'Мои заказы' },
        newOrder: { uz: 'Yangi buyurtma', ru: 'Новый заказ' },
        selectDate: { uz: 'Kunni tanlang', ru: 'Выберите дату' },
        selectTime: { uz: 'Vaqtni tanlang', ru: 'Выберите время' },
        orderDetails: { uz: 'Buyurtma tafsilotlari', ru: 'Детали заказа' },
        totalPrice: { uz: 'Jami narx', ru: 'Общая цена' },
        confirmOrder: { uz: 'Buyurtmani tasdiqlash', ru: 'Подтвердить заказ' },
        cancelOrder: { uz: 'Bekor qilish', ru: 'Отменить заказ' },
        completeOrder: { uz: 'Yakunlash', ru: 'Завершить' },
        pending: { uz: 'Kutilmoqda', ru: 'Ожидает' },
        accepted: { uz: 'Qabul qilindi', ru: 'Принят' },
        inProgress: { uz: 'Bajarilmoqda', ru: 'В процессе' },
        completed: { uz: 'Bajarildi', ru: 'Завершен' },
        cancelled: { uz: 'Bekor qilindi', ru: 'Отменен' },
        shareLocation: { uz: 'Lokatsiya ulashish', ru: 'Поделиться местоположением' },
        viewLocation: { uz: 'Lokatsiyani ko\'rish', ru: 'Посмотреть местоположение' },
    },

    // Chat
    chat: {
        typeMessage: { uz: 'Xabar yozing...', ru: 'Напишите сообщение...' },
        sendPhoto: { uz: 'Rasm yuborish', ru: 'Отправить фото' },
        sendVoice: { uz: 'Ovozli xabar', ru: 'Голосовое сообщение' },
        sendLocation: { uz: 'Lokatsiya yuborish', ru: 'Отправить локацию' },
        recording: { uz: 'Yozilmoqda...', ru: 'Запись...' },
    },

    // Reviews
    review: {
        leaveReview: { uz: 'Sharh qoldiring', ru: 'Оставьте отзыв' },
        yourRating: { uz: 'Sizning bahongiz', ru: 'Ваша оценка' },
        yourComment: { uz: 'Sizning sharhingiz', ru: 'Ваш комментарий' },
        submit: { uz: 'Yuborish', ru: 'Отправить' },
        thankYou: { uz: 'Rahmat!', ru: 'Спасибо!' },
    },

    // Common
    common: {
        loading: { uz: 'Yuklanmoqda...', ru: 'Загрузка...' },
        error: { uz: 'Xatolik yuz berdi', ru: 'Произошла ошибка' },
        success: { uz: 'Muvaffaqiyatli!', ru: 'Успешно!' },
        confirm: { uz: 'Tasdiqlash', ru: 'Подтвердить' },
        delete: { uz: "O'chirish", ru: 'Удалить' },
        edit: { uz: 'Tahrirlash', ru: 'Редактировать' },
        close: { uz: 'Yopish', ru: 'Закрыть' },
        back: { uz: 'Orqaga', ru: 'Назад' },
        next: { uz: 'Keyingi', ru: 'Далее' },
        or: { uz: 'yoki', ru: 'или' },
    },
}

export function t(key: string, lang: Language): string {
    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = (value as Record<string, unknown>)[k]
        } else {
            return key
        }
    }

    if (value && typeof value === 'object' && lang in value) {
        return (value as Record<Language, string>)[lang]
    }

    return key
}
