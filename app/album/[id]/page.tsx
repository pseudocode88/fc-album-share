import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";
import styles from "../../page.module.css";
import { getAlbum } from '@/app/store';


type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id
    const album = await getAlbum(id)

    console.log(id, album);

    const fcMetadata: Record<string, string> = {
        "fc:frame": "vNext",
        "fc:frame:image": `${process.env['HOST']}/api/image?id=${id}`
    };

    if (album?.youtube?.length > 0) {
        fcMetadata[`fc:frame:button:1`] = 'link';
        fcMetadata[`fc:frame:button:1:target`] = album?.youtube;
    }

    if (album?.apple?.length > 0) {
        fcMetadata[`fc:frame:button:2`] = 'link';
        fcMetadata[`fc:frame:button:2:target`] = album?.apple;
    }

    if (album?.spotify?.length > 0) {
        fcMetadata[`fc:frame:button:3`] = 'link';
        fcMetadata[`fc:frame:button:3:target`] = album?.spotify;
    }


    return {
        title: album?.name,
        openGraph: {
            title: album?.name,
            images: [`/api/image?id=${id}`],
        },
        other: {
            ...fcMetadata,
        },
        metadataBase: new URL(process.env['HOST'] || '')
    }
}

export default async function Page({ params }: { params: { id: string } }) {

    return (
        <>
            <main className={styles.main}>
                <h1>Hello</h1>
            </main>
        </>
    );

}