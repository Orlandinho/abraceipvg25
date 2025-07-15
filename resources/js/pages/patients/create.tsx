import { Button } from '@/components/cat-ui/button';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Mask } from 'maska';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type NewPatientForm = {
    name: string;
    email: string;
    dob: string;
    contact: string;
};

export default function Create() {
    const mask = new Mask({ mask: ['(##) ####-####', '(##) #####-####'], eager: true });

    const { data, setData, post, processing, errors } = useForm<Required<NewPatientForm>>({
        name: '',
        email: '',
        dob: '',
        contact: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('patients.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Paciente" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid-cols grid gap-6 md:grid-cols-4">
                                    <div className="col-span grid gap-4 md:col-span-2">
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
                                            placeholder="Nome do Paciente"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="col-span grid gap-4 md:col-span-2">
                                        <div className="grid items-center">
                                            <Label htmlFor="email">E-mail</Label>
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            tabIndex={2}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="col-span grid gap-4">
                                        <div className="grid items-center">
                                            <Label htmlFor="dob">Data de Nasc</Label>
                                        </div>
                                        <Input
                                            id="dob"
                                            type="date"
                                            required
                                            tabIndex={3}
                                            autoComplete="dob"
                                            value={data.dob}
                                            onChange={(e) => setData('dob', e.target.value)}
                                        />
                                        <InputError message={errors.dob} />
                                    </div>

                                    <div className="col-span grid gap-4">
                                        <div className="grid items-center">
                                            <Label htmlFor="contact">Contato</Label>
                                        </div>
                                        <Input
                                            id="contact"
                                            type="text"
                                            tabIndex={4}
                                            autoComplete="contact"
                                            value={data.contact}
                                            onChange={(e) => setData('contact', mask.masked(e.target.value))}
                                            placeholder="(11) 91234-5678"
                                        />
                                        <InputError message={errors.contact} />
                                    </div>
                                </div>
                                <div className="mt-4 sm:flex-none">
                                    <Button color={'dark/white'} type="submit" tabIndex={5} disabled={processing}>
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
