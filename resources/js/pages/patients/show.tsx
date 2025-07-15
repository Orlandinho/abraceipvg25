import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/cat-ui/description-list';
import { Heading } from '@/components/cat-ui/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { differenceInYears, format } from 'date-fns';

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

export default function Index({ patient }: { patient: Patient }) {
    const formattedAge = (date: string) => {
        const yearOld: number = differenceInYears(Date.now(), new Date(date));

        return yearOld > 1 ? yearOld + ' anos' : yearOld + ' ano';
    };

    const formattedDob = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={patient.name} />
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Heading>{patient.name}</Heading>

                            <DescriptionList className="mt-4">
                                <DescriptionTerm>E-mail</DescriptionTerm>
                                <DescriptionDetails>{patient.email}</DescriptionDetails>

                                <DescriptionTerm>Data de Nascimento</DescriptionTerm>
                                <DescriptionDetails>{formattedDob(patient.dob) + ' - ' + formattedAge(patient.dob)}</DescriptionDetails>

                                <DescriptionTerm>Contato</DescriptionTerm>
                                <DescriptionDetails>{patient.contact ?? <span className="text-zinc-400">Não informado</span>}</DescriptionDetails>
                            </DescriptionList>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
