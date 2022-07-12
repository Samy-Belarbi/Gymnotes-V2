<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;
use App\Models\ExerciceManager;
use App\Models\ExerciceModel;

class ProfileController extends AbstractController
{
    public function show(): void
    {

        if (isset($_SESSION['user_id'])) {
            $exercices = [];

            $userManager = new UserManager();
            $user = $userManager->findById($_SESSION['user_id']);

            $exerciceManager = new ExerciceManager();
            $exercicesData = $exerciceManager->getExercicesOfTheDay($_SESSION['user_id']);

            if (!empty($exercicesData)) {
                foreach($exercicesData as $exerciceData) {
                    $exercice = $exerciceManager->createExerciceFromMysqlData($exerciceData);
                    $exercices[] = $exercice;
                }
            }

        } else {
            $this->redirect('/access');
            exit;
        }

        $this->display('profile', [
            'title' => $user->getFirstName(),
            'script' => 'profile/profile',
            'user' => $user,
            'exercices' => $exercices
        ]);

    }
}