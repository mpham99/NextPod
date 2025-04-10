import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Terminal} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

import {getAlbums, getAlbumDetail} from "@/app/actions/server-actions";
import Link from 'next/link';

export default async function AlbumDetailPage({params}) {
    const res = await getAlbumDetail(params.id);

    if (res.status !== 200) {
        return (
            <div className="flex justify-center pt-10">
                <Alert className="w-full max-w-2xl border-red-700 bg-red-300">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Uh oh!</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2">
                        <span>Item with ID {params.id} does not exist!</span>
                        <Button asChild variant="link" className="self-start pl-0">
                            <Link href="/collection">Back</Link>
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const album = await res.json();
    return (
        <div className="max-w-2xl mx-auto px-6 py-8">
            <Button asChild variant="link" className="mb-4">
                <Link href="/collection">← Back</Link>
            </Button>

            <Card className="bg-white">
                <CardContent className="p-4 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Album Details</h2>
                    <table className="w-full border-collapse">
                        <tbody className="text-sm">
                        <tr>
                            <td className="font-medium py-1 pr-4">ID</td>
                            <td>{album.id}</td>
                        </tr>
                        <tr>
                            <td className="font-medium py-1 pr-4">Name</td>
                            <td>{album.name}</td>
                        </tr>
                        <tr>
                            <td className="font-medium py-1 pr-4">Artist</td>
                            <td>{album.artist}</td>
                        </tr>
                        <tr>
                            <td className="font-medium py-1 pr-4">Released Date</td>
                            <td>{album.released_date}</td>
                        </tr>
                        <tr>
                            <td className="font-medium py-1 pr-4">Tracks</td>
                            <td>{album.tracks}</td>
                        </tr>
                        <tr>
                            <td className="font-medium py-1 pr-4">Description</td>
                            <td>{album.description}</td>
                        </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}

export async function generateStaticParams() {
    const albums = await getAlbums();

    return albums.slice(0, 10).map((album) => ({
        id: album.id.toString(),
    }));
}