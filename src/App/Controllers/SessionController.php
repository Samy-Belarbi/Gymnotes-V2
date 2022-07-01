<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;

class SessionController extends AbstractController
{
    public function show(): void
    {
        $user = null;

        if (isset($_SESSION['user_id'])) {
            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);
            $script = 'session/session';
        } else {
            $script = 'access/access';
        }

        $this->checkForm();

        $this->display('session', [
            'title' => 'GymNotes',
            'script' => $script,
            'user' => $user
        ]);

    }
}