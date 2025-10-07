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
import { IBuyer, IOrderRequest } from './types';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const productsCatalog = new ProductCatalog([], events);
const cartModel = new Cart([], events);
const buyer = new Buyer(events);
const header = new HeaderView(document.querySelector('.page__wrapper'), events);
const modal = new ModalView(document.querySelector('.modal'));
const gallery = new GalleryView(document.querySelector('.gallery'));
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const successPopup = new SuccessView(cloneTemplate(successTemplate), events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);

const api = new WebLarekApi(API_URL, settings);

events.on('catalog:changed', () => {
  const cardsArray = productsCatalog.productsList.map((card) => {
    const cardInstance = new CardGalleryView(cloneTemplate(catalogCardTemplate), events);
    return cardInstance.render(card);
  })

  gallery.render( { catalog: cardsArray } );
}) 

try {
  const products = await api.fetchProducts();
  productsCatalog.productsList = products;
  console.log("С сервера пришли товары: ", products);
} catch (err) {
  console.error(err);
}

events.on('card:open', (data: {card: string} ) => {
  const product = productsCatalog.getProductById(data.card);
  const cardPreview = new CardFullView(cloneTemplate(previewCardTemplate), events);

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

  const inCart = cartModel.cartProducts.some(item => item.id === product.id);
  if (inCart) {
    cartModel.deleteProduct(product.id);
  } else {
    cartModel.addProduct(product);
  }

  modal.close();
})

events.on('cart:changed', () => {
  const itemsArray = cartModel.cartProducts.map((item, index) => {
    const cardInstance = new CardBasketView(cloneTemplate(basketCardTemplate), events);
    cardInstance.counter = index + 1;
    return cardInstance.render(item);
  })

  basket.list = itemsArray;
  header.counter = cartModel.cartQuantity;
  basket.price = cartModel.totalPrice(cartModel.cartProducts);
})

events.on('basket:open', () => {
  modal.content = basket.render();
  modal.open();
})

events.on('basket:changed', ( data: {card: string} ) => {
  const product = productsCatalog.getProductById(data.card);
  cartModel.deleteProduct(product.id);
})

events.on('order:start', () => {
  modal.content = formOrder.render();
  }
)

events.on('order:continued', () => {
  modal.content = formContacts.render();
  formOrder.valid = buyer.isValid();
})

events.on('order:field-changed', (data: { field: keyof IBuyer, value: string }) => {

  const { field, value } = data;

  if (field === 'payment') {
    buyer.payment = value as 'card' | 'cash' | '';
  } else if (field === 'email') {
    buyer.email = value;
  } else if (field === 'phone') {
    buyer.phone = value;
  } else if (field === 'address') {
    buyer.address = value;
  }

  formOrder.errors = buyer.buyerDataValidation()[data.field] ?? '';
  formContacts.errors = buyer.buyerDataValidation()[data.field] ?? '';

  const errorsAll = buyer.buyerDataValidation();
  formOrder.valid = !('payment' in errorsAll || 'address' in errorsAll);

  formContacts.valid = buyer.isValid();
});

events.on('order:contacts', () => {
  const items = cartModel.cartProducts;
  const itemsIds = cartModel.cartProducts.map(p => p.id);

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
      modal.content = successPopup.render();
      successPopup.price = response.total;
      cartModel.clearCart();
      header.counter = cartModel.cartQuantity;
      formOrder.inputValues = { values: ''};
      
      formContacts.inputValues = { values: ''};
      buyer.clearBuyerData();
    })
    .catch((err) => {
      console.log('Ошибка при отправке заказа:', err);
    })
});


events.on('order:finished', () => {
  modal.close();
});