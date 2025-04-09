import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {getAlbums, getAlbumDetail} from "@/app/collection/actions";
import Link from 'next/link';

export default async function AlbumDetailPage({params}) {
    const res = await getAlbumDetail(params.id);

    const album = await res.json();
    return (
        <div className="max-w-2xl mx-auto px-6 py-8">
            <Button asChild variant="link" className="mb-4">
                <Link href="/collection">← Back</Link>
            </Button>

            <Card>
                <CardContent className="p-4">
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