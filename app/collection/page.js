import Link from "next/link";
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {getAlbums} from "@/app/collection/actions";


export default async function Collection() {
    const albums = getAlbums();
    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Music Album Collection</h1>
            <div className="space-y-4">
                {albums.map((album) => (
                    <Card key={album.id}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <p className="font-semibold">#{album.id}</p>
                                <p>{album.name}</p>
                            </div>
                            <Button asChild variant="link" className="text-blue-600 hover:underline">
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}