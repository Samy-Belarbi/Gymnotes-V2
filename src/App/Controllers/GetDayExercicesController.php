<?php

namespace App\Controllers;

use Library\Core\AbstractController;
use App\Models\ExerciceManager;

class GetDayExercicesController extends AbstractController
{
    public function returnExercices(): void
    {
        $exerciceManager = new ExerciceManager();

        $todayExercices = $exerciceManager->getExercicesOfTheDay($_SESSION['user_id']);

        echo json_encode($todayExercices);
    }
}