<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;

class ConstructController extends AbstractController
{
    public function show(): void
    {
        $user = null;

        if (isset($_SESSION['user_id'])) {
            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);
        }

        $this->display('construction', [
            'title' => 'Articles',
            'user' => $user
        ]);

    }
}