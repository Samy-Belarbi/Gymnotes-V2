<?php

namespace App\Models;

use Library\Core\AbstractModel;

class ExerciceModel extends AbstractModel
{
    private int $id = 0;
    private string $exerciceName;
    private int $placement;
    private int $sets;
    private int $reps;
    private int $setRest;
    private int $exerciceRest;
    private string $performance;
    private string $day;
    private int $week;
    private int $userId;

    // SETTERS 

    public function setId(int $id) {
        $this->id = $id;
    }

    public function setExerciceName(string $exerciceName) {
        $this->exerciceName = $exerciceName;
    }

    public function setPlacement(int $placement) {
        $this->placement = $placement;
    }

    public function setSets(int $sets) {
        $this->sets = $sets;
    }

    public function setReps(int $reps) {
        $this->reps = $reps;
    }

    public function setRest(int $setRest) {
        $this->setRest = $setRest;
    }

    public function setSetRest(int $setRest) {
        $this->setRest = $setRest;
    }

    public function setExerciceRest(int $exerciceRest) {
        $this->exerciceRest = $exerciceRest;
    }

    public function setPerformance(string $performance) {
        $this->performance = $performance;
    }

    public function setDay(string $day) {
        $this->day = $day;
    }

    public function setWeek(string $week) {
        $this->week = $week;
    }

    public function setUserId(int $userId) {
        $this->userId = $userId;
    }

    // GETTERS

    public function getId() : int {
        return $this->id;
    }

    public function getExerciceName() : string {
        return $this->exerciceName;
    }

    public function getPlacement() : int {
        return $this->placement;
    }

    public function getSets() : int {
        return $this->sets;
    }

    public function getSetRest() : int {
        return $this->setRest;
    }

    public function getReps() : int {
        return $this->reps;
    }

    public function getRest() : int {
        return $this->setRest;
    }

    public function getExerciceRest() : int {
        return $this->exerciceRest;
    }

    public function getPerformance() : string {
        return $this->performance;
    }

    public function getDay() : string {
        return $this->day;
    }

    public function getWeek() : int {
        return $this->week;
    }

    public function getUserId() : int {
        return $this->userId;
    }

}