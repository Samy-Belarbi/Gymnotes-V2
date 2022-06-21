<?php

namespace App\Models;

use App\Models\UserModel;
use PDO;

class UserManager {

    public function createUser(UserModel $user): void
    {
        $userId = $this->db->execute('INSERT INTO Users (Firstname, Lastname, Gender, Age, Mail, Password) VALUES (:firstname, :lastname, :gender, :age, :mail, :password)', [
            'firstname' => $user->getFirstName(),
            'lastname' => $user->getLastName(),
            'gender' => $user->getGender(),
            'age' => $user->getAge(),
            'mail' => $user->getMail(),
            'password' => $user->getPassword()
        ]);
        
    }
    
    function findById(int $id) : ?UserModel {

        $query = $this->database->prepare('SELECT * FROM Users WHERE id = :id');
        $query->execute([
            'id' => $id
        ]);
        
        $rawData = $query->fetch(PDO::FETCH_ASSOC);
        
        if ($rawData === false) {
            return null;
        }
        
        return UserModel::createUserFromMysqlData($rawData);

    }

    public function findByEmail(string $email): ?UserModel
    {
        $query = $this->database->prepare('SELECT * FROM users WHERE email = :email');
        $query->execute([
            'email' => $email
        ]);
        
        $rawData = $query->fetch(PDO::FETCH_ASSOC);
        
        if ($rawData === false) {
            return null;
        }
        
        return UserModel::createUserFromMysqlData($rawData);
    }
}