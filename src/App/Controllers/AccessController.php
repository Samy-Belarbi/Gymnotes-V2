<?php

namespace App\Controllers;

use Library\Core\AbstractController;

class AccessController extends AbstractController
{
    public function show(): void
    {

        if (isset($_SESSION['user_id'])) {
            $this->redirect('/');
            exit;
        }

        $this->checkForm();

        $this->display('access', [
            'title' => 'Se connecter / Inscription',
            'script' => 'access/access'
        ]);

    }
}