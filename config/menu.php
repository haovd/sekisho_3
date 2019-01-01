<?php

return [
    'dashboard' => [
        'route'      => 'home',
        'permission' => [],
        'class'      => '',
        'icon'       => 'fa fa-dashboard',
        'name'       => 'dashboard',
        'text'       => 'menu.dashboard',
        'order'      => 1,
        'sub'        => [],
        'hide'       => 0
    ],
    'user' => [
        'name'      => 'user',
        'text'      =>  'menu.user',
        'route'     => 'user.index',
        'icon'      => 'fa fa-user',
        'order'     => 2,
        'hide'      => 0
    ],
];