<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpecialtyResource;
use App\Models\Specialty;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;
use Inertia\Response;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return inertia('specialties/index', [
            'specialties' => SpecialtyResource::collection(Specialty::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('specialties/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpecialtyRequest $request)
    {
        try {
            $newSpecialty = Specialty::create($request->validated());
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível cadastrar a nova especialidade');
        }

        return to_route('specialties.index')->alertSuccess("Especialidade {$newSpecialty->name} cadastrada com sucesso!");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Specialty $specialty)
    {
        return inertia('specialties/edit', [
            'specialty' => SpecialtyResource::make($specialty)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSpecialtyRequest $request, Specialty $specialty)
    {
        try {
            $specialty->update($request->validated());
        } catch (\Exception $e) {
            return back()->alertFailure('Não foi possível atualizar a especialidade');
        }

        return to_route('specialties.index')->alertSuccess("Especialidade {$specialty->name} atualizada com sucesso!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specialty $specialty)
    {
        try {
            $specialty->delete();
        } catch (\Exception $e) {
            return back()->alertFailure("Não foi possível apagar a especialidade {$specialty->name}.");
        }

        return to_route('specialties.index')->alertSuccess('Especialidade apagada com sucesso!');
    }
}
