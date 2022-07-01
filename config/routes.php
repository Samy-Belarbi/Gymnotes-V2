<?php

return [
    '/' => [
        'App\Controllers\HomeController',
        'show'
    ],

    '/articles' => [
        'App\Controllers\HomeController',
        'show'
    ],

    '/interview' => [
        'App\Controllers\InterviewController',
        'show'
    ],

    '/access' => [
        'App\Controllers\AccessController',
        'show'
    ],

    '/session' => [
        'App\Controllers\SessionController',
        'show'
    ],

    '/create-session' => [
        'App\Controllers\CreateSessionController',
        'show'
    ],

    '/profile' => [
        'App\Controllers\ProfileController',
        'show'
    ],

    '/logout' => [
        'App\Controllers\LogoutController',
        'logout'
    ]
];