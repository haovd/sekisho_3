<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $locale = \Request::segment(1);
        if (in_array($locale, config('app.locales'))) {
            \App::setLocale($locale);
        }
//        \Schema::defaultStringLength(191);

        $this->getMenu();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $models = [
            'User'
        ];
        foreach($models as $model)
        app()->bind('App\Repositories\\'.$model.'Repository',
                'App\Repositories\Eloquent\Eloquent'.$model.'Repository');
    }

    public function getMenu()
    {
        $menus = config('menu');
        if ($menus) {
            usort($menus, function($a, $b) {
                return $a['order'] - $b['order'];
            });

            view()->share('backend_menus', $menus);
        }
    }
}
