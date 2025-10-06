import './scss/styles.scss/';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
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
import { IOrderRequest } from './types';

const events = new EventEmitter();

const cartModel = new Cart([], events);
const productsCatalog = new ProductCatalog([], events);
const buyer = new Buyer(events);
const header = new HeaderView(document.querySelector('.page__wrapper'), events);
const modal = new ModalView(document.querySelector('.modal'));
const gallery = new GalleryView(document.querySelector('.gallery'));
const cardBasket = new CardBasketView(document.querySelector('#card-basket'), events);
const basket = new BasketView(document.querySelector('#basket'), events);

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

events.on('card:open', (data: {card: string} ) => {
  const product = productsCatalog.getProductById(data.card);
  const cardPreview = new CardFullView(document.querySelector('#card-preview'), events);

  if (product.price === null) {
    cardPreview.disableButton();
  }

  const inCart = cartModel.cartProducts.some(item => item.id === product.id)

  if (inCart) {
    cardPreview.itemInBasket();
  }

  modal.content = cardPreview.render(product);
  modal.open();
})

events.on('card:buy', (data: {card: string} ) => {
  const product = productsCatalog.getProductById(data.card);

  const inCart = cartModel.cartProducts.some(item => item.id === product.id)
  if (inCart) {
    cartModel.deleteProduct(product.id);
  } else {
    cartModel.addProduct(product);
    basket.addItem(cardBasket.render(product));
  }

  basket.toggleSubmit(true);

  header.counter = cartModel.cartProducts.length;

  modal.close();
})

events.on('basket:open', () => {
  const itemsArray = cartModel.cartProducts.map((item, index) => {
    const cardInstance = new CardBasketView(document.querySelector('#card-basket'), events);
    cardInstance.counter = index + 1;
    return cardInstance.render(item);
  })

  basket.list = itemsArray;
  basket.price = cartModel.totalPrice(cartModel.cartProducts);

  const count = itemsArray.length;
  if (count === 0) {
    basket.toggleSubmit(false);
    basket.isEmpty();
  }

  modal.content = basket.render();
  modal.open();
})

events.on('basket:changed', ( data: {card: string} ) => {
  const product = productsCatalog.getProductById(data.card);
  cartModel.deleteProduct(product.id);

  const count = cartModel.cartProducts.length;
  if (count === 0) {
    basket.toggleSubmit(false);
    basket.isEmpty();
  }

  header.counter = cartModel.cartProducts.length;

  basket.price = cartModel.totalPrice(cartModel.cartProducts);
  modal.content = basket.render();
})

events.on('order:start', () => {
  const formOrder = new FormOrder(document.querySelector('#order'), events);
  modal.content = formOrder.render();
})

events.on('order:continued', (data: { address: string; payment: 'card' | 'cash' | '' }) => {
  const formContacts = new FormContacts(document.querySelector('#contacts'), events);
  modal.content = formContacts.render();

  buyer.address = data.address;
  buyer.payment = data.payment;
})

events.on('order:contacts', (data: { email: string; phone: string}) => {
  const successPopup = new SuccessView(document.querySelector('#success'), events);
  successPopup.price = cartModel.totalPrice(cartModel.cartProducts);
  modal.content = successPopup.render();

  buyer.email = data.email;
  buyer.phone = data.phone;

  const items = cartModel.cartProducts;
  const itemsIds = cartModel.cartProducts.map(p => p.id);

  if (buyer.buyerData.payment !== 'card' && buyer.buyerData.payment !== 'cash') {
    console.warn('Способ оплаты не выбран');
    return;
  }

  const orderData: IOrderRequest = {
      payment: buyer.buyerData.payment,
      email: buyer.buyerData.email,
      phone: buyer.buyerData.phone,
      address: buyer.buyerData.address,
      total: cartModel.totalPrice(items),
      items: itemsIds
  }

  api.createOrder(orderData)
    .then((response) => {
      console.log('Заказ успешно оформлен:', response);
    })
    .catch((err) => {
      console.log('Ошибка при отправке заказа:', err);
    })
});

events.on('order:finished', () => {
  modal.close();
  cartModel.clearCart();
  header.counter = cartModel.cartProducts.length;
  buyer.clearBuyerData();
})