<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdatePatientRequest extends FormRequest
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
        if ($this->patient->slug === Str::slug($this->name)){
            $this->merge([
                'slug' => $this->patient->slug,
            ]);
            return;
        }
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
            'slug' => ['required', 'string', 'max:255', Rule::unique('patients')->ignore($this->patient->id)],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'contact' => ['nullable', 'string', 'min:14', 'max:15'],
            'dob' => ['required', 'date', 'date_format:Y-m-d', 'before:today'],
        ];
    }
}
