<?php

use Kreait\Firebase;

Route::get('/users', function (Firebase $firebase) {
    $users = $firebase
        ->getAuth()
        ->listUsers($defaultMaxResults = 50, $defaultBatchSize = 50);
    return response()->json(iterator_to_array($users));
});
