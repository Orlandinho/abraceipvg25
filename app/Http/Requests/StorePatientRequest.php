<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->makeSlugFromName($this->name)),
        ]);
    }

    public function makeSlugFromName($name): string
    {
        $slug = Str::slug($name);

        $count = Patient::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:patients'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'contact' => ['nullable', 'string', 'min:14', 'max:15'],
            'dob' => ['required', 'date', 'date_format:Y-m-d', 'before:today'],
        ];
    }
}
