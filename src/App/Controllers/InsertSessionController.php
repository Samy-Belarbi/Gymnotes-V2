<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\ExerciceModel;
use App\Models\ExerciceManager;


class InsertSessionController extends AbstractController
{
    public function insert(): void
    {

        if (isset($_SESSION['user_id']) && !empty($_POST)) {
            $exoManager = new ExerciceManager();
            $week = $exoManager->getLastWeek($_SESSION['user_id']) + 1;

            foreach($_POST as $key => $value) {
                $exercice = new ExerciceModel();
                $arrayExercice = json_decode($value, true);

                $exercice->setDay($arrayExercice['day']);
                $exercice->setPlacement($arrayExercice['placement']);
                $exercice->setExerciceName($arrayExercice['name']);
                $exercice->setSets($arrayExercice['sets']);
                $exercice->setReps($arrayExercice['reps']);
                $exercice->setPerformance($arrayExercice['perf']);
                $exercice->setSetRest($arrayExercice['setsRest']);
                $exercice->setExerciceRest($arrayExercice['exoRest']);
                $exercice->setUserId($_SESSION['user_id']);
                $exercice->setWeek($week);
           
                $exoManager->createExercice($exercice);
                
            }

        } else {
            $this->redirect('/');
        }
    }

}
