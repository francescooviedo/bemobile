import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('clients', 'ClientsController')
  Route.resource('phones', 'PhonesController')
  Route.resource('addresses', 'AddressesController')
  Route.resource('products', 'ProductsController')
  Route.resource('sales', 'SalesController')
}).middleware('auth')

Route.post('/signup', 'UsersController.create')
Route.post('/login', 'LoginController.login')
