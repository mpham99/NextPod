import Link from "next/link";
import {Card, CardContent} from '/components/ui/card';
import {Button} from '@/components/ui/button';
import {getAlbums} from "@/app/actions/server-actions";


export default async function Collection() {
    const albums = await getAlbums();
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="max-w-7xl w-full px-6 py-10">
                <h1 className="text-3xl font-bold text-center mb-8">Music Album Collection</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {albums.map((album) => (
                        <Card key={album.id} className="shadow-sm bg-white">
                            <CardContent className="px-5 py-1 flex items-center justify-between h-full">
                                <div>
                                    <div className="flex items-baseline space-x-2">
                                        <p className="text-lg font-semibold text-gray-800">#{album.id}</p>
                                        <p className="text-lg text-gray-700">{album.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mt-1">{album.artist}</p>
                                    </div>
                                </div>
                                <div className="flex items-center h-full">
                                    <Button asChild variant="outline" className="shrink-0">
                                        <Link href={`/collection/${album.id}`}>more</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}