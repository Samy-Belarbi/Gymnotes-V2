<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;
use App\Models\ExerciceManager;
use App\Models\UserModel;

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

            if (!empty($_POST) && strlen($_POST['password']) > 7) {
                $userEditPassword = new UserModel();
                $userEditPassword->setPlainPassword(password_hash($_POST['password'], PASSWORD_ARGON2ID));
                $userEditPassword->setId($_SESSION['user_id']);

                $userManager->updatePassword($userEditPassword);
            }

            if (!empty($_POST) && strlen($_POST['password']) <= 7) {
                $_SESSION['short-password'] = 'Votre mot de passe doit comporter un minimum de 8 caractères.';
            }


        } else {
            $this->redirect('/access');
            exit;
        }

        $this->display('profile', [
            'title' => $user->getFirstName(),
            'script' => 'access/profile',
            'user' => $user,
            'exercices' => $exercices
        ]);

    }
}