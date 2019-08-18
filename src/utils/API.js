export const getProducts = () => {
  const promise = fetch('https://datainlife.ru/junior_task/get_products.php')
    .then(res => res.json());
  return promise;
};

export const addBasket = (product, successHandler, errorHandler) => {
  const postData = new FormData();
  postData.set('product', product);
  const request = new XMLHttpRequest();
  request.open("POST", 'https://datainlife.ru/junior_task/add_basket.php');
  request.send(postData);
  request.onload = () => {successHandler(request.responseText)}
  request.onerror = errorHandler;
};
