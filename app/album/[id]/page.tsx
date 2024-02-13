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

    const fcMetadata: Record<string, string> = {
        "fc:frame": "vNext",
        "fc:frame:image": `${process.env['HOST']}api/image?id=${id}`
    };

    if (album?.youtube?.length > 0) {
        fcMetadata[`fc:frame:button:1`] = 'Youtube';
        fcMetadata[`fc:frame:button:1:action`] = 'link';
        fcMetadata[`fc:frame:button:1:target`] = album?.youtube;
    }

    if (album?.apple?.length > 0) {
        fcMetadata[`fc:frame:button:2`] = 'Apple Music';
        fcMetadata[`fc:frame:button:2:action`] = 'link';
        fcMetadata[`fc:frame:button:2:target`] = album?.apple;
    }

    if (album?.spotify?.length > 0) {
        fcMetadata[`fc:frame:button:3`] = 'Spotify';
        fcMetadata[`fc:frame:button:3:action`] = 'link';
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

export default async function Page({ params }: Props) {

    const album = await getAlbum(params.id);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.heading}>
                    <h1>Share Your Favorite Albums on Farcaster</h1>
                    <p>Express yourself through music with beautiful, shareable album frames. Share your music, share your style! Create your frame now!</p>
                    <a className={styles.backbutton} href="/">Share your albums →</a>
                </div>
                <div className={styles.formCard}>
                    <div>
                        <div className={styles.wrapper}>
                            <div className={styles.imageWrapper}>
                                <img src={album?.albumart}></img>
                            </div>
                            <div className={styles.detailsWrapper}>
                                <div className={styles.titleWrapper}>
                                    <p className={styles.name}>{album?.name}</p>
                                    <p className={styles.artist}>by {album?.artist}</p>
                                </div>
                                <p className={styles.genre}>
                                    {album?.year}{album?.year ? ' • ' : null}
                                    {album?.country}{album?.country ? ' • ' : null}
                                    {album?.genre}
                                </p>
                            </div>
                        </div>
                        <div className={styles.linkWrapper}>
                            {album?.youtube ? <a href={album?.youtube} target="_blank">Youtube <span className={styles.newtab}>⎋</span></a> : null}
                            {album?.spotify ? <a href={album?.spotify} target="_blank">Spotify <span className={styles.newtab}>⎋</span></a> : null}
                            {album?.apple ? <a href={album?.apple} target="_blank">Apple Music <span className={styles.newtab}>⎋</span></a> : null}
                        </div>
                    </div>
                </div>
                <p className={styles.credit}>Made by <a href="https://warpcast.com/pseudocode">@pseudocode</a></p>
                {/* <img src={process.env['HOST'] + 'api/image?id=' + params.id}></img> */}
            </main>
        </>
    );

}