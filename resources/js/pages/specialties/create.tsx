import { Button } from '@/components/cat-ui/button';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Especialty {
    name: string;
    can_attend: number;
}

export default function Index() {
    const { data, setData, post, processing, errors } = useForm<Required<Especialty>>({
        name: '',
        can_attend: 10,
    });

    const handleChange = (qtde: number) => {
        const numericValue = qtde.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        setData('can_attend', numericValue);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('specialties.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Especialidades" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="items-center p-6">
                            <div className="mb-6 sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold">Especialidades</h1>
                                    <p className="mt-2 text-sm">Lista de especialidades cadastradas no sistema.</p>
                                </div>
                            </div>
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid-cols grid gap-6 md:grid-cols-6">
                                    <div className="col-span grid gap-4 md:col-span-4">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Nome da especialidade"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="col-span grid gap-4 md:col-span-2">
                                        <Label htmlFor="can_attend">Qtde Atendimento</Label>
                                        <Input
                                            id="can_attend"
                                            type="text"
                                            required
                                            maxLength={2}
                                            tabIndex={2}
                                            autoComplete="description"
                                            value={data.can_attend}
                                            onChange={(e) => handleChange(e)}
                                            placeholder="Limite de atendimento por dia"
                                        />
                                        <InputError message={errors.can_attend} />
                                    </div>
                                </div>
                                <div className="mt-4 sm:flex-none">
                                    <Button color={'dark/white'} type="submit" tabIndex={3} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Cadastrar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
