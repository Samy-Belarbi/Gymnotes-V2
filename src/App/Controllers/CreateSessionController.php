<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;

class CreateSessionController extends AbstractController
{
    public function show(): void
    {
        $user = null;

        if (isset($_SESSION['user_id'])) {
            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);
        } 
        // else {
        //     header('Location: ' . url('/login'));
        // }

        $this->display('interview', [
            'title' => 'Crée ta séance !',
            'script' => 'session/create',
            'user' => $user
        ]);

    }
}