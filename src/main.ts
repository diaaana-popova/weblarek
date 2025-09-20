import './scss/styles.scss/';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { IBuyer, IApi, IOrderRequest } from './types';
import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/models/ProductCatalog';
import { API_URL, settings } from './utils/constants';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/communication/WebLarekApi';

// тесты продуктового каталога:
const productsModel = new ProductCatalog();
productsModel.productsList = apiProducts.items;
console.log('Массив товаров из каталога: ', productsModel.productsList);
console.log('Данные о товаре с id 854cef69-976d-4c2a-a18c-2aa45046c390: ', productsModel.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'));
productsModel.selectedProductId = '854cef69-976d-4c2a-a18c-2aa45046c390';
console.log('Выбранный по id товар из каталога: ', productsModel.selectedProduct);

// тесты корзины:
const cartModel = new Cart(apiProducts.items);
console.log('Новый объект корзины: ', cartModel);
console.log('Массив товаров из корзины: ', cartModel.cartProducts);
const productData = {
    id: '1a',
    image: 'img',
    title: 'курс по фронтенду',
    category: 'обучение',
    price: 10000
}
cartModel.addProduct(productData);
console.log('Обновлённый массив с новым товаром: ', cartModel.cartProducts);
cartModel.deleteProduct('854cef69-976d-4c2a-a18c-2aa45046c390');
console.log('Обновлённый массив после удаления товара: ', cartModel.cartProducts);
console.log('Сумма всех товаров в корзине: ', cartModel.totalPrice(apiProducts.items));
console.log('Количество товаров в корзине: ', cartModel.cartQuantity);
console.log('Доступность товара с id 854cef69-976d-4c2a-a18c-2aa45046c390 для продажи ', cartModel.checkAvailability('854cef69-976d-4c2a-a18c-2aa45046c390'));
console.log('Доступность товара с id 1a для продажи ', cartModel.checkAvailability('1a'));
cartModel.clearCart();
console.log('Очищенная корзина: ', cartModel.cartProducts);


// тесты покупателя:
const dianaData: IBuyer = {
    payment: 'card',
    email: 'dianapopova@mail.com',
    phone: '+79680605636',
    address: 'Москва, ул. Новый Арбат, 6'
}

const dianaModel = new Buyer(dianaData);
console.log('Новый покупатель: ', dianaModel);
dianaModel._payment = 'cash';
dianaModel._email = 'diasko_98@mail.ru';
dianaModel._phone = '+77777777777';
dianaModel._address = 'Москва, ул. Никулинская, 23';
console.log('Обновлённый покупатель: ', dianaModel);
console.log('Данные о пользователе: ', dianaModel.buyerData);
console.log('Проверка, что переданные строки в информации о пользователе не пустые: ', dianaModel.buyerDataValidation());
dianaModel.clearBuyerData();
console.log('Данные о пользователе очищены: ', dianaModel);


const baseApi: IApi = new Api(API_URL, settings);
const api = new WebLarekApi(baseApi);
const products = await api.fetchProducts(); 
const productsApiModel = new ProductCatalog();
productsApiModel.productsList = products;
console.log('С сервера пришли товары: ', products);