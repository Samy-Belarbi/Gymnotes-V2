<?php

namespace Library\Core;

class AbstractController
{
    public function display(string $template, array $data = [], string $layout = 'layout'): void
    {
        extract($data);
        require "src/App/Views/$layout.phtml";
    }
    
    public function redirect(string $path): void
    {
        header('Location: ' . url($path));
        exit();
    }
}