<?php

namespace Library\Core;

use App\Models\UserModel;
use App\Models\UserManager;
use Library\Auth\Authentifier;

class AbstractController
{
    public function display(string $template, array $data = [], string $layout = 'layout'): void
    {
        extract($data);
        require "src/App/Views/$layout.phtml";
    }
    
    public function redirect(string $path): void
    {
        header('Location: ' . url($path));
        exit();
    }

    public function checkForm(): void {

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
                $this->redirect($_SERVER['PATH_INFO']);
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
                $this->redirect($_SERVER['PATH_INFO']);
            } else {
                $_SESSION['wrong-id'] = "wrong";
                $this->redirect($_SERVER['PATH_INFO']);
            }
        }
    }
}