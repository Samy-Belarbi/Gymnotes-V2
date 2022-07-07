<?php

use Library\Http\NotFoundException;

try {
    session_start();
    require 'helpers.php';

    spl_autoload_register(function ($className) {
        $fileName = str_replace('\\', '/', $className);
        require "src/$fileName.php";
    });
    
    $route = $_SERVER['PATH_INFO'] ?? '/';
    
    $routes = require 'config/routes.php';
    
    if (isset($routes[$route])) {
        list($controllerName, $method) = $routes[$route];
        
        // Instanciation magique du contrôleur
        $controller = new $controllerName();
        $controller->$method();
    } else {
        throw new NotFoundException("La route n'existe pas");
    }
} catch (Exception $e) {
    if ($e instanceof NotFoundException) {
        header("HTTP/1.1 404 Not Found");
        require 'src/App/Views/404.phtml';
    }

    file_put_contents('logs/application.log', date('d/m/Y H:i:s') . " : " . $e->getMessage() . "\n", FILE_APPEND);
    exit();
}