<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;
use App\Models\UserModel;
use Library\Auth\Authentifier;

class AccessController extends AbstractController
{
    public function show(): void
    {

        if (isset($_SESSION['user_id'])) {
            $this->redirect('/');
            exit;
        }

        if (isset($_POST['firstname'])) {
            $user = new UserModel();
            $user->setFirstName($_POST['firstname'] ?? "");
            $user->setLastName($_POST['lastname'] ?? "");
            $user->setGender($_POST['gender'] ?? "");
            $user->setAge($_POST['age'] ?? 0);
            $user->setMail($_POST['mail'] ?? "");
            $user->setPassword(password_hash($_POST['password'], PASSWORD_ARGON2ID) ?? "");
            $user->setPlainPassword($_POST['password'] ?? "");
            $user->validate();

            if ($user->validate()) {
                $userManager = new UserManager();
                $userManager->createUser($user);
                $logUser = $userManager->findByEmail($user->getMail());
                $auth = new Authentifier();
                $auth->login($logUser->getId());
                $this->redirect('/');
                exit;
            } else {
                $this->redirect('/access');
                exit;
            }
        }

        if (isset($_POST['mail-login'])) {
            $user = new UserModel();
            $user->setMail($_POST['mail-login'] ?? "");
            $userManager = new UserManager();
            $logUser = $userManager->findByEmail($user->getMail());

            if ($logUser !== null 
            && password_verify($_POST['password-login'], $logUser->getPassword())) {
                $auth = new Authentifier();
                $auth->login($logUser->getId());
                $this->redirect('/');
                exit;
            } else {
                $_SESSION['wrong-id'] = "wrong";
                $this->redirect('/access');
                exit;
            }
        }

        $this->display('access', [
            'title' => 'Se connecter / Inscription',
            'script' => 'access/access'
        ]);

    }
}