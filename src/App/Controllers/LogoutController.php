<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use Library\Auth\Authentifier;

class LogoutController extends AbstractController
{
    public function logout(): void
    {
        $authentifier = new Authentifier();
        $authentifier->logout();
        $this->redirect('/');
        exit;
    }
}