import {getAlbumDetail} from "@/app/actions/server-actions";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ClientForm from "@/app/admin/edit/[id]/client-form";

export default async function Edit({params}) {
    const res = await getAlbumDetail(params.id);

    if (res.status !== 200) {
        return (
            <div className="flex justify-center pt-10">
                <Alert className="w-full max-w-2xl border-red-700 bg-red-300">
                    <Terminal className="h-4 w-4"/>
                    <AlertTitle>Uh oh!</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2">
                        <span>Item with ID {params.id} does not exist!</span>
                        <Button asChild variant="link" className="self-start pl-0">
                            <Link href="/admin">Back</Link>
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const album = await res.json();
    return (
        <div className="max-w-xl mx-auto px-6 py-6">
            <Button asChild variant="link" className="mb-4">
                <Link href="/admin">← Back</Link>
            </Button>
            <ClientForm album={album} />
        </div>
    );
}