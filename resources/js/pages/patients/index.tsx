import { Button } from '@/components/cat-ui/button';
import PatientsTable from '@/components/patients-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { HeartPulse } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Patient {
    id: bigint;
    name: string;
    slug: string;
    email: string;
    dob: string;
    contact: string;
}

export default function Index({ patients }: { patients: Patient[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacientes" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-4 sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold">Pacientes</h1>
                                    <p className="mt-2 text-sm">Lista de pacientes cadastrados no sistema.</p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Button outline={true} href={route('patients.create')}>
                                        <HeartPulse className="size-3" />
                                        Novo Paciente
                                    </Button>
                                </div>
                            </div>
                            <PatientsTable patients={patients} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
