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
    private string $plainpassword;

    public static function createUserFromMysqlData(array $data) : UserModel {
        $user = new UserModel();
        $user->setId($data['ID']);
        $user->setFirstName($data['Firstname']);
        $user->setLastName($data['Lastname']);
        $user->setGender($data['Gender']);
        $user->setAge($data['Age']);
        $user->setMail($data['Mail']);

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

    public function setPlainPassword(string $plainpassword) {
        $this->plainpassword = $plainpassword;
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
        return $this->plainpassword;
    }

    // Check si l'user est valide
    public function validate(): bool
    {   
        $valid = true;
        
        if (strlen($this->plainPassword) < 8) {
            $valid = false;
            $_SESSION['error'] = 'password';
        }
        
        if (preg_match('/.+@.+\..+/', $this->email) === 0) {
            $valid = false;
            $_SESSION['mail'] = 'password';
        }
        
        return $valid;
    }

    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }
}