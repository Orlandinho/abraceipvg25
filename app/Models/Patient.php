<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    /** @use HasFactory<\Database\Factories\PatientFactory> */
    use HasFactory;

    protected $fillable = ['name', 'slug', 'email', 'dob', 'contact'];

    protected function casts(): array
    {
        return [
            'dob' => 'datetime',
        ];
    }
}
