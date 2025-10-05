import './scss/styles.scss/';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { IBuyer, IApi, IOrderRequest } from './types';
import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/models/ProductCatalog';
import { API_URL, settings } from './utils/constants';
import { WebLarekApi } from './components/communication/WebLarekApi';
import { HeaderView } from './components/view/Header';
import { GalleryView } from './components/view/Gallery';
import { ModalView } from './components/view/Modal';
import { CardGalleryView } from './components/view/CardGallery';
import { CardFullView } from './components/view/CardFullView';
import { CardBasketView } from './components/view/CardBasket';
import { BasketView } from './components/view/Basket';
import { EventEmitter } from './components/base/Events';
import { SuccessView } from './components/view/Success';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { ICardBase } from './components/view/CardBase';

// тесты продуктового каталога:
// const productsModel = new ProductCatalog();
// productsModel.productsList = apiProducts.items;
// console.log('Массив товаров из каталога: ', productsModel.productsList);
// console.log('Данные о товаре с id 854cef69-976d-4c2a-a18c-2aa45046c390: ', productsModel.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'));
// productsModel.selectedProductId = '854cef69-976d-4c2a-a18c-2aa45046c390';
// console.log('Выбранный по id товар из каталога: ', productsModel.selectedProduct);

// // тесты корзины:
// const cartModel = new Cart(apiProducts.items);
// console.log('Новый объект корзины: ', cartModel);
// console.log('Массив товаров из корзины: ', cartModel.cartProducts);
// const productData = {
//     id: '1a',
//     image: 'img',
//     title: 'курс по фронтенду',
//     category: 'обучение',
//     price: 10000
// }
// cartModel.addProduct(productData);
// console.log('Обновлённый массив с новым товаром: ', cartModel.cartProducts);
// cartModel.deleteProduct('854cef69-976d-4c2a-a18c-2aa45046c390');
// console.log('Обновлённый массив после удаления товара: ', cartModel.cartProducts);
// console.log('Сумма всех товаров в корзине: ', cartModel.totalPrice(apiProducts.items));
// console.log('Количество товаров в корзине: ', cartModel.cartQuantity);
// console.log('Доступность товара с id 854cef69-976d-4c2a-a18c-2aa45046c390 для продажи ', cartModel.checkAvailability('854cef69-976d-4c2a-a18c-2aa45046c390'));
// console.log('Доступность товара с id 1a для продажи ', cartModel.checkAvailability('1a'));
// cartModel.clearCart();
// console.log('Очищенная корзина: ', cartModel.cartProducts);


// // тесты покупателя:
// const dianaData: IBuyer = {
//     payment: 'card',
//     email: 'dianapopova@mail.com',
//     phone: '+79680605636',
//     address: 'Москва, ул. Новый Арбат, 6'
// }

// const dianaModel = new Buyer(dianaData);
// console.log('Новый покупатель: ', dianaModel);
// dianaModel._payment = 'cash';
// dianaModel._email = 'diasko_98@mail.ru';
// dianaModel._phone = '+77777777777';
// dianaModel._address = 'Москва, ул. Никулинская, 23';
// console.log('Обновлённый покупатель: ', dianaModel);
// console.log('Данные о пользователе: ', dianaModel.buyerData);
// console.log('Проверка, что переданные строки в информации о пользователе не пустые: ', dianaModel.buyerDataValidation());
// dianaModel.clearBuyerData();
// console.log('Данные о пользователе очищены: ', dianaModel);

// const productsApiModel = new ProductCatalog();
// const api = new WebLarekApi(API_URL, settings);
// try {
//   const products = await api.fetchProducts();
//   productsApiModel.productsList = products;
//   console.log("С сервера пришли товары: ", products);
// } catch (err) {
//   console.error(err);
// }


// const events = new EventEmitter();

// events.onAll((event) => {
//   console.log(event.eventName, event.data);
// })

// // тест хэдера:
// const header = new HeaderView(document.querySelector('.page__wrapper'), events);
// header.counter = 3;

// тест полной карточки:
// const cardPreview = new CardFullView(document.querySelector('#card-preview'), events);
// cardPreview.category = "софт-скил";
// cardPreview.price = 750;
// cardPreview.alt = 'Пусто';
// cardPreview.title = '+1 час в сутках';
// cardPreview.src = './src/images/Subtract.svg';
// cardPreview.description = 'Если планируете решать задачи в тренажёре, берите два.';

// const gallery = new GalleryView(document.querySelector('.gallery'));
// gallery.catalog = cardPreview.render();


// тест карточек в галерее:
// const cardGallery = new CardGalleryView(document.querySelector('#card-catalog'), events);
// cardGallery.category = "софт-скил";
// cardGallery.price = 750;
// cardGallery.alt = 'Пусто';
// cardGallery.title = '+1 час в сутках';
// cardGallery.src = './src/images/Subtract.svg';

// const gallery = new GalleryView(document.querySelector('.gallery'));
// gallery.catalog = cardGallery.render();


// тест карточки в корзине:
// const cardBasket = new CardBasketView(document.querySelector('#card-basket'));
// cardBasket.price = 750;
// cardBasket.title = '+1 час в сутках';

// const gallery = new GalleryView(document.querySelector('.gallery'));
// gallery.catalog = cardBasket.render();


// тест модального окна:
// const modal = new ModalView(document.querySelector('.modal'));
// modal.open();
// modal.content = cardBasket.render();


// тест последнего экрана
// const success = new SuccessView(document.querySelector('#success'));
// success.price = 2344;

// const modal = new ModalView(document.querySelector('.modal'));
// modal.open();
// modal.content = success.render();

// тест формы заказа:
// const formOrder = new FormContacts(document.querySelector('#contacts'), events);
// const gallery = new GalleryView(document.querySelector('.gallery'));
// formOrder.inputValues = { address: '' };
// gallery.catalog = formOrder.render();

const events = new EventEmitter();

const cartModel = new Cart();
const header = new HeaderView(document.querySelector('.page__wrapper'), events);
const modal = new ModalView(document.querySelector('.modal'));
const gallery = new GalleryView(document.querySelector('.gallery'));
const cardGallery = new CardGalleryView(document.querySelector('#card-catalog'), events);
const cardPreview = new CardFullView(document.querySelector('#card-preview'), events);
const cardBasket = new CardBasketView(document.querySelector('#card-basket'), events);
const formOrder = new FormOrder(document.querySelector('#order'), events);
const formContacts = new FormContacts(document.querySelector('#contacts'), events);
const productsCatalog = new ProductCatalog();

const api = new WebLarekApi(API_URL, settings);

events.on('cards:loaded', () => {
  const cardsArray = productsCatalog.productsList.map((card) => {
    const cardInstance = new CardGalleryView(document.querySelector('#card-catalog'), events);
    return cardInstance.render(card);
  })

  gallery.render( { catalog: cardsArray } );
}) 

try {
  const products = await api.fetchProducts();
  productsCatalog.productsList = products;
  console.log("С сервера пришли товары: ", products);
  events.emit('cards:loaded');
} catch (err) {
  console.error(err);
}

events.on('card:open', (card) => {

  console.log(card);

  
  modal.open();

  // const { card } = data;
  // const { title, category, image, price } = productsCatalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390");
  // const _card = { title, category, image, price };
  // cardPreview.render(_card);
})
