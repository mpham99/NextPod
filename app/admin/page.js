import Link from 'next/link';
import {deleteAlbum} from '@/app/actions/server-actions';
import {getAlbums} from "@/app/actions/client-actions";
import {Button} from '@/components/ui/button';

export default async function Admin() {
    const albums = await getAlbums();

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="relative flex items-center justify-center mb-6">
                <h1 className="text-3xl font-bold absolute left-1/2 -translate-x-1/2">Admin</h1>
                <Button asChild variant="outline" className="ml-auto">
                    <Link href="/admin/create" className="inline-block text-orange-600 hover:underline font-medium">
                        Create New
                    </Link>
                </Button>
            </div>

            <div className="max-w-6xl mx-auto mx-6 my-6">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="border-b bg-gray-100">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Artist</th>
                        <th className="p-3">Released Date</th>
                        <th className="p-3">Tracks</th>
                        <th className="p-3 text-center">Edit</th>
                        <th className="p-3 text-center">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {albums.map((album) => (
                        <tr key={album.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{album.id}</td>
                            <td className="p-3">{album.name}</td>
                            <td className="p-3">{album.artist}</td>
                            <td className="p-3">{album.released_date}</td>
                            <td className="p-3">{album.tracks}</td>
                            <td className="p-3 text-center">
                                <Link href={`/admin/edit/${album.id}`}
                                      className="text-blue-600 font-bold hover:underline">
                                    E
                                </Link>
                            </td>
                            <td className="p-3 text-center">
                                <form action={deleteAlbum.bind(null, album.id)}>
                                    <Button variant="ghost" size="sm"
                                            className="text-red-500 font-bold hover:underline px-2 py-1">
                                        D
                                    </Button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}