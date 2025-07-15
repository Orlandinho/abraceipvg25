<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict(! app()->environment('production'));

        JsonResource::withoutWrapping();

        RedirectResponse::macro('alertSuccess', function (string $message, string $title = 'Sucesso!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'success',
                'title' => $title
            ]);
        });

        RedirectResponse::macro('alertFailure', function (string $message, string $title = 'Erro!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'failure',
                'title' => $title
            ]);
        });

        RedirectResponse::macro('alertWarning', function (string $message, string $title = 'Atenção!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'attention',
                'title' => $title
            ]);
        });
    }
}
