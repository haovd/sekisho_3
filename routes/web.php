<?php
/**@var \Illuminate\Routing\Route $router*/

$locale = \Request::segment(1);
if (!in_array($locale, config('app.locales'))) {
    $locale = '';
}
$router->get('/', function () {
    return view('welcome');
});
$router->get('home', function() {
   return view('layouts.master');
})->middleware('auth')->name('home');

$router->group(['namespace'=>'\App\Http\Controllers', 'prefix'=>$locale], function($router) {
    $router->get('login', 'Auth\LoginController@showLoginForm')->name('login')->middleware('guest');
    $router->post('login', 'Auth\LoginController@login');
    $router->get('logout', 'Auth\LoginController@logout')->name('logout');

    $router->resource('user', 'UserController');
});

