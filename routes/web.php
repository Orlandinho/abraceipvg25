<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::controller(PatientController::class)
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('pacientes', 'index')->name('patients.index');
        Route::get('pacientes/criar', 'create')->name('patients.create');
        Route::post('pacientes', 'store')->name('patients.store');
        Route::get('pacientes/{patient:slug}', 'show')->name('patients.show');
        Route::get('pacientes/{patient:slug}/editar', 'edit')->name('patients.edit');
        Route::patch('pacientes/{patient:slug}', 'update')->name('patients.update');
        Route::delete('pacientes/{patient}', 'destroy')->name('patients.destroy');
    });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
