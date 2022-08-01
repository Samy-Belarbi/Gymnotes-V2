<?php

return [
    '/' => [
        'App\Controllers\HomeController',
        'show'
    ],

    '/articles' => [
        'App\Controllers\ConstructController',
        'show'
    ],

    '/tracker' => [
        'App\Controllers\ConstructController',
        'show'
    ],

    '/team' => [
        'App\Controllers\ConstructController',
        'show'
    ],

    '/free-month' => [
        'App\Controllers\ConstructController',
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
    ],

    '/insertSession.php' => [
        'App\Controllers\InsertSessionController',
        'insert'
    ],

    '/getDayExercices.php' => [
        'App\Controllers\GetDayExercicesController',
        'returnExercices'
    ],

    '/start-session' => [
        'App\Controllers\StartSessionController',
        'show'
    ]
];