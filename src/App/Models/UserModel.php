<?php

namespace App\Models;

use Library\Core\AbstractModel;

class UserModel extends AbstractModel
{
    private int $id;
    private string $firstname;
    private string $lastname;
    private string $gender;
    private int $age;
    private string $mail;
    private string $password;
    private string $plainPassword;

    public static function createUserFromMysqlData(array $data) : UserModel {
        $user = new UserModel();
        $user->setId($data[0]['ID']);
        $user->setFirstName($data[0]['Firstname']);
        $user->setLastName($data[0]['Lastname']);
        $user->setPassword($data[0]['Password']);
        $user->setGender($data[0]['Gender']);
        $user->setAge($data[0]['Age']);
        $user->setMail($data[0]['Mail']);

        return $user;
    }

    // SETTERS 

    public function setId(int $id) {
        $this->id = $id;
    }

    public function setFirstName(string $firstname) {
        $this->firstname = $firstname;
    }

    public function setLastName(string $lastname) {
        $this->lastname = $lastname;
    }

    public function setGender(string $gender) {
        $this->gender = $gender;
    }

    public function setAge(int $age) {
        $this->age = $age;
    }

    public function setMail(string $mail) {
        $this->mail = $mail;
    }

    public function setPassword(string $password) {
        $this->password = $password;
    }

    public function setPlainPassword(string $plainPassword) {
        $this->plainPassword = $plainPassword;
    }

    // GETTERS

    public function getId() : int {
        return $this->id;
    }

    public function getFirstName() : string {
        return $this->firstname;
    }

    public function getLastName() : string {
        return $this->lastname;
    }

    public function getGender() : string {
        return $this->gender;
    }

    public function getAge() : int {
        return $this->age;
    }

    public function getMail() : string {
        return $this->mail;
    }

    public function getPassword() : string {
        return $this->password;
    }

    public function getPlainPassword() : string {
        return $this->plainPassword;
    }

    // Check si l'user est valide
    public function validate(): bool {   

        $valid = true;
        
        if (strlen($this->plainPassword) < 8) {
            $valid = false;
            $_SESSION['password-short'] = 'password-short';
        }
        
        if (preg_match('/.+@.+\..+/', $this->mail) === 0) {
            $valid = false;
            $_SESSION['mail'] = 'error';
        }

        // Vérifier si les inputs sont nuls     
        if (strlen($this->lastname) < 1) {
            $valid = false;
            $_SESSION['lastname'] = 'null';
        }

        if (strlen($this->firstname) < 1) {
            $valid = false;
            $_SESSION['firstname'] = 'null';
        }

        if ($this->age === 0) {
            $valid = false;
            $_SESSION['age-null'] = 'null';
        }

        if (strlen($this->gender) < 1) {
            $valid = false;
            $_SESSION['gender-null'] = 'null';
        }
        
        return $valid;
    }

    public function eraseCredentials(): void {
        $this->plainPassword = null;
    }
}