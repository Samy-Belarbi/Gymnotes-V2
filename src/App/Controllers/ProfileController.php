<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;

class ProfileController extends AbstractController
{
    public function show(): void
    {

        if (isset($_SESSION['user_id'])) {
            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);
        } else {
            $this->redirect('/access');
            exit;
        }

        $this->display('profile', [
            'title' => $user->getFirstName(),
            'script' => 'profile/profile',
            'user' => $user
        ]);

    }
}