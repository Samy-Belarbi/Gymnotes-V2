<?php

namespace App\Models;

use App\Models\ExerciceModel;
use Library\Core\AbstractModel;

class ExerciceManager extends AbstractModel {

    public function createExercice(ExerciceModel $exercice): void
    {

        $this->db->execute('INSERT INTO exercices (Name, Placement, Sets, Reps, Set_rest, Exercice_rest, Performance, Day, Week, User_id) 
                        VALUES (:name, :placement, :sets, :reps, :set_rest, :exercice_rest, :performance, :day, :week, :user_id)', [
            'name' => $exercice->getExerciceName(),
            'placement' => $exercice->getPlacement(),
            'sets' => $exercice->getSets(),
            'reps' => $exercice->getReps(),
            'set_rest' => $exercice->getSetRest(),
            'exercice_rest' => $exercice->getExerciceRest(),
            'performance' => $exercice->getPerformance(),
            'day' => $exercice->getDay(),
            'week' => $exercice->getWeek(),
            'user_id' => $exercice->getUserId()
        ]);
        
    }

    public static function createExerciceFromMysqlData(array $data) : ExerciceModel {
        $exercice = new ExerciceModel();
        $exercice->setId($data['ID']);
        $exercice->setExerciceName($data['Name']);
        $exercice->setPlacement($data['Placement']);
        $exercice->setSets($data['Sets']);
        $exercice->setReps($data['Reps']);
        $exercice->setSetRest($data['Exercice_rest']);
        $exercice->setExerciceRest($data['Exercice_rest']);
        $exercice->setPerformance($data['Performance']);
        $exercice->setDay($data['Day']);
        $exercice->setWeek($data['Week']);
        $exercice->setUserId($data['User_id']);

        return $exercice;
    }
    

    function getExercicesOfTheDay(int $id) : ?array {
        $day = $this->getDay();
        $query = $this->db->getResults('SELECT * FROM exercices WHERE User_id = :id AND Day = :day AND WEEK = :week', [
            'id' => $id,
            'day' => $day,
            'week' => $this->getLastWeek($id)
        ]);

        return $query;
    }

    function getLastWeek(int $id) : int {
        $query = $this->db->getResults('SELECT Week FROM exercices WHERE User_id = :id ORDER BY Week DESC LIMIT 1', [
            'id' => $id
        ]);

        if (empty($query)) {
            return 1;
        }

        return $query[0]['Week'];
    }

    function getDay() : string {
        $days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        return $days[date('w')];
    }

}