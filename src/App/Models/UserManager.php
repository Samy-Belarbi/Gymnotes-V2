<?php

namespace App\Models;

use App\Models\UserModel;
use Library\Core\AbstractModel;
use PDO;

class UserManager extends AbstractModel {

    public function createUser(UserModel $user): void
    {
        $this->db->execute('INSERT INTO users (Firstname, Lastname, Gender, Age, Mail, Password) VALUES (:firstname, :lastname, :gender, :age, :mail, :password)', [
            'firstname' => $user->getFirstName(),
            'lastname' => $user->getLastName(),
            'mail' => $user->getMail(),
            'gender' => $user->getGender(),
            'age' => $user->getAge(),
            'password' => $user->getPassword()
        ]);
        
    }
    
    function findById(int $id) : ?UserModel {

        $query = $this->db->getResults('SELECT * FROM users WHERE ID = :id', [
            'id' => $id
        ]);
        
        if ($query === null) {
            return null;
        }
        
        return UserModel::createUserFromMysqlData($query);

    }

    public function findByEmail(string $mail): ?UserModel
    {
        $query = $this->db->getResults('SELECT * FROM users WHERE mail = :mail', [
            'mail' => $mail
        ]);
      
        if (empty($query)) {
            return null;
        }
        
        return UserModel::createUserFromMysqlData($query);
    }
}