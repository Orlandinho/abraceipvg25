import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/cat-ui/table';
import { DeleteItem } from '@/components/delete-item';
import { Link } from '@inertiajs/react';
import { differenceInYears, format } from 'date-fns';
import { SquarePen } from 'lucide-react';

interface Patient {
    id: bigint;
    name: string;
    slug: string;
    email: string;
    dob: string;
    contact: string;
}
export default function PatientsTable({ patients }: { patients: Patient[] }) {
    const formattedAge = (date: string) => {
        const yearOld: number = differenceInYears(Date.now(), new Date(date));

        return yearOld > 1 ? yearOld + ' anos' : yearOld + ' ano';
    };

    const formattedDob = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    return (
        <Table striped grid dense className="rounded-sm border [--gutter:--spacing(2)] sm:[--gutter:--spacing(0)]">
            <TableHead>
                <TableRow>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>E-mail</TableHeader>
                    <TableHeader>Data Nasc</TableHeader>
                    <TableHeader>Idade</TableHeader>
                    <TableHeader>Contato</TableHeader>
                    <TableHeader className="relative w-0">
                        <span className="sr-only">Actions</span>
                    </TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                            <Link href={`/pacientes/${patient.slug}`}>
                                <span className="hover:underline">{patient.name}</span>
                            </Link>
                        </TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{formattedDob(patient.dob)}</TableCell>
                        <TableCell>{formattedAge(patient.dob)}</TableCell>
                        <TableCell>{patient.contact ?? <span className="text-zinc-400">Não informado</span>}</TableCell>
                        <TableCell className="flex items-center gap-x-2">
                            <Link href={route('patients.edit', patient.slug)}>
                                <SquarePen className="size-4 text-green-600 hover:text-green-400" />
                            </Link>
                            <DeleteItem
                                item={patient}
                                text={`Os dados do/a paciente ${patient.name} serão excluídos. Deseja prosseguir?`}
                                path="patients.destroy"
                                key={patient.id}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
