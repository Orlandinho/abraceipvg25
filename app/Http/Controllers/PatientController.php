<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class PatientController extends Controller
{
    public function index(): Response
    {
        return inertia('patients/index', [
            'patients' => PatientResource::collection(Patient::all())
        ]);
    }

    public function create(): Response
    {
        return inertia('patients/create');
    }

    public function store(StorePatientRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $newPatient = Patient::create($validated);
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível cadastrar os dados do/a paciente.');
        }

        return to_route('patients.index')->alertSuccess("Paciente {$newPatient->name} cadastrado com sucesso!");
    }

    public function show(Patient $patient): Response
    {
        return inertia('patients/show', [
            'patient' => PatientResource::make($patient)
        ]);
    }

    public function edit(Patient $patient): Response
    {
        return inertia('patients/edit', [
            'patient' => PatientResource::make($patient)
        ]);
    }

    public function update(UpdatePatientRequest $request, Patient $patient): RedirectResponse
    {
        try {
            $patient->update($request->validated());
        } catch (\Exception $e) {
            return back()->alertFailure("Não foi possível atualizar os dados do/a paciente {$patient->name}.");
        }

        return to_route('patients.index')->alertSuccess("Dados do/a paciente {$patient->name} atualizados com sucesso!");
    }

    public function destroy(Patient $patient)
    {
        try {
            $patient->delete();
        } catch (\Exception $e) {
            return back()->alertFailure("Não foi possível apagar os dados do/a paciente {$patient->name}.");
        }

        return to_route('patients.index')->alertSuccess("Dados excluídos!");
    }
}
