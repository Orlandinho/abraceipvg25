<?php

use App\Http\Controllers\PatientController;
use App\Http\Controllers\SpecialtyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {

    Route::controller(PatientController::class)
        ->group(function () {
            Route::get('pacientes', 'index')->name('patients.index');
            Route::get('pacientes/criar', 'create')->name('patients.create');
            Route::post('pacientes', 'store')->name('patients.store');
            Route::get('pacientes/{patient:slug}', 'show')->name('patients.show');
            Route::get('pacientes/{patient:slug}/editar', 'edit')->name('patients.edit');
            Route::patch('pacientes/{patient:slug}', 'update')->name('patients.update');
            Route::delete('pacientes/{patient}', 'destroy')->name('patients.destroy');
        });

    Route::controller(SpecialtyController::class)
        ->group(function () {
            Route::get('especialidades', 'index')->name('specialties.index');
            Route::get('especialidades/criar', 'create')->name('specialties.create');
            Route::post('especialidades', 'store')->name('specialties.store');
            Route::get('especialidades/{specialty:slug}/editar', 'edit')->name('specialties.edit');
            Route::patch('especialidades/{specialty:slug}', 'update')->name('specialties.update');
            Route::delete('especialidades/{specialty}', 'destroy')->name('specialties.destroy');
        });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
