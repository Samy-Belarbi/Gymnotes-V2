<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\UserManager;
use App\Models\UserModel;

class UserController extends AbstractController
{
    public function register(): void
    {
        if (auth()->isAuthenticated()) {
            $this->redirect('/');
        }
        
        $this->display('users/register');
    }
    
    public function store(): void
    {
        if (auth()->isAuthenticated()) {
            $this->redirect('/');    
        }
        
        $manager = new UserManager();
        $user = $manager->findByMail($_POST['username']);
        
        $errors = $this->validForm($_POST);
        
        if (!empty($user)) {
            $errors['username'] = "Cet utilisateur existe déjà";
        }
        
        if (count($errors) > 0) {
            $_SESSION['error'] = $errors;
            $this->redirect('/register');
        }
        
        $manager->create([$user]);
        
        $this->redirect('/');
    }
    
    private function validForm(array $data): array
    {
        $errors = [];
        
        if (empty($data['username'])) {
            $errors['username'] = "Le nom utilisateur ne doit pas être vide";    
        }
        
        if (strlen($data['password']) < 6) {
            $errors['password'] = "Le mot de passe doit faire au-moins 6 caractères";
        }
        
        return $errors;
    }
    
    // LOGIN 
    public function login(): void
    {
        if (auth()->isAuthenticated()) {
            $this->redirect('/');    
        }
        
        $this->display('users/login');
    }

    // LOGOUT
    public function logout(): void
    {
        auth()->logout();
        $this->redirect('/');
    }
    
    public function auth(): void
    {
        if (auth()->isAuthenticated()) {
            $this->redirect('/');    
        }
        
        $manager = new UserManager();
        $user = $manager->findByUsername($_POST['username']);
        
        if ($user === null) {
            $_SESSION['error'] = [
                'username' => 'Les identifiants sont incorrects'   
            ];
            
            $this->redirect('/login');
        }
        
        if (! password_verify($_POST['password'], $user['password'])) {
            $_SESSION['error'] = [
                'username' => 'Les identifiants sont incorrects'   
            ];
            
            $this->redirect('/login');
        }
        
        auth()->login($user['id']);
        
        $this->redirect('/');
    }
}