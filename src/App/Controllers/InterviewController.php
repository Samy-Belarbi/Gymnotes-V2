<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;

class InterviewController extends AbstractController
{
    public function show(): void
    {
        $user = null;

        if (isset($_SESSION['user_id'])) {
            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);
            $script = 'interview/interview';
        } else {
            $script = 'access/access';
        }

        $this->checkForm();

        $this->display('interview', [
            'title' => 'Questionnaire GymNotes',
            'script' => $script,
            'user' => $user
        ]);

    }
}