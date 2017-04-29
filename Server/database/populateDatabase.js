var mongoose = require('mongoose');
var productsModels = mongoose.model('products');

const items = [
  {name: "Manhattan", description: " ", price: 70.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-manhattan.jpg", type: "drinks"},
  {name: "Brooklyn", description: " ", price: 85.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-Brooklyn.jpg", type: "drinks"},
  {name: "Daiquiri", description: " ", price: 123.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-daiquiri.jpg", type: "drinks"},
  {name: "Margarita", description: " ", price: 65.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-margarita.jpg", type: "drinks"},
  {name: "Sidecar", description: " ", price: 90.50, image: "http://www.seriouseats.com/images/2014/11/20141101-cognac-sidecar-carey-jones.jpg", type: "drinks"},
  {name: "Jack Rose", description: " ", price: 140.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-jack-rose.jpg", type: "drinks"},
  {name: "Negroni", description: " ", price: 50.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-negroni.jpg", type: "drinks"},
  {name: "Whiskey Sour", description: " ", price: 77.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-whiskey-sour.jpg", type: "drinks"},
  {name: "Cosmopolitan", description: " ", price: 190.00, image: "http://www.seriouseats.com/images/2015/03/20150323-cocktails-vicky-wasik-cosmopolitan.jpg", type: "drinks"},

  {name: "Tacos", description: "Orden de 3", price: 45.00, image: "https://s-media-cache-ak0.pinimg.com/736x/82/6e/49/826e4956d1c31983f616bd6a3e4fd878.jpg", type: "fastfood"},
  {name: "Hamburguesa", description: "Con Papas", price: 58.00, image: "https://s-media-cache-ak0.pinimg.com/564x/90/3c/9b/903c9b8b5ae4a142bd18878dfd4ccce8.jpg", type: "fastfood"},
  {name: "Pizza", description: "Pepperoni", price: 103.50, image: "http://bombolobiscottine.com/wp-content/uploads/2016/06/Amore.jpg", type: "fastfood"},
  {name: "Burritos", description: "Orden de 2", price: 35.50, image: "https://s-media-cache-ak0.pinimg.com/originals/93/70/b6/9370b64383f475ca86927ba8460bebf2.jpg", type: "fastfood"},
  {name: "HotDog", description: "Salchicha de Pavo", price: 27.00, image: "http://wallpaper.pickywallpapers.com/ipad/preview/taste-of-chicago-hot-dog-and-fries.jpg", type: "fastfood"},
  {name: "Quesadillas", description: "Con Queso", price: 21.00, image: "https://s-media-cache-ak0.pinimg.com/736x/21/ed/cb/21edcb288d52d5a0b9bc64708687ced7.jpg", type: "fastfood"},
  {name: "Sandwich", description: "Club Sandwich", price: 42.50, image: "http://www.foodpost.ca/wp-content/uploads/2015/02/Southern-Tuna-Salad-Sandwich-3.jpg", type: "fastfood"},
  {name: "Maruchan", description: "Camarón con Chile", price: 10.00, image: "https://c1.staticflickr.com/8/7054/8689380639_7bda9d513d_z.jpg", type: "fastfood"},
  {name: "Nachos", description: "Extra Queso", price: 25.00, image: "http://elcocinerocasero.com/imagen/receta/500/500/2016-03-07-11-02/salsa-de-queso-cheddar.jpeg", type: "fastfood"},

  {name: "Blueberry Tart", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/0908/tart-blueberry_gal.jpg?itok=MSgkwlaW", type: "desserts"},
  {name: "Peanut Brownies", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/food-recipes/recipe-collections/0707/pb-brownies_gal.jpg?itok=W63QikpG", type: "desserts"},
  {name: "Coconut Macaroons", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/1303/coconut-macaroons_gal.jpg?itok=3yZySiJK", type: "desserts"},
  {name: "Chewy Spice Cookies", description: " ", price: 35.000, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/1010/ginger-ictcrop_gal.jpg?itok=f49TZAnv", type: "desserts"},
  {name: "Applesauce Spice Cake", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/food-recipes/recipe-collections/0611/cake-icecream_gal.jpg?itok=mxOhRVEG", type: "desserts"},
  {name: "Lemon Cheesecake Pie", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/1211/lemon-cheesecake-pie-ictcrop_gal.jpg?itok=xkjke9Jp", type: "desserts"},
  {name: "Raspberry Parfait", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_horz/public/image/images/photo-gallery/ddd-peach-raspberry_gal.jpg?itok=bQb8Tn17", type: "desserts"},
  {name: "Pumpkin Cheesecake", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_horz/public/image/images/1211/pumpkin-cheesecake-ictcrop_gal.jpg?itok=Obik3vwQ", type: "desserts"},
  {name: "Strawberry Shortcake", description: " ", price: 35.00, image: "http://cdn-image.realsimple.com/sites/default/files/styles/rs_photo_gallery_vert/public/image/images/food-recipes/recipe-collections/0405/strawberry-shortcake_gal.jpg?itok=e6Nh3MB9", type: "desserts"},
];


items.map(data => {
  const item = new productsModels(data);
  item.save();
});
