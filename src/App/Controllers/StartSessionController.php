<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;

class StartSessionController extends AbstractController
{
    public function show(): void
    {

        if (isset($_SESSION['user_id'])) {
            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);
        } else {
            $this->redirect('/session');
        }

        $this->display('start-session', [
            'title' => 'Démarre ta séance !',
            'script' => 'session/start',
            'user' => $user
        ]);

    }
}