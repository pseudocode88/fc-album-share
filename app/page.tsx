'use client'

import styles from "./page.module.css";
import { CreateAlbumForm } from './form';
import { getAlbum, getAlbumCount, saveAlbum } from './store';
import { Album } from './types';
import { useState, useEffect } from "react";

type Props = {
  url: string,
  back: any
}

function FrameURL({ url, back }: Props) {
  return (
    <div className={styles.showUrl}>
      <div className={styles.controlGroup}>
        <h2 className={styles.subheading}>Frame created</h2>
        <p className={styles.muted}>Copy the url below and cast it away</p>
      </div>
      <div className={styles.cast}>
        <a href={url} target="_blank" className={styles.url}>{url}</a>
      </div>
      <button onClick={back}>Back</button>
    </div>
  )
}

export default function Home() {

  let [showUrl, setShowUrl] = useState(false);
  let [url, setUrl] = useState('');

  const handleOnFormSubmit = async (album: Album) => {
    await saveAlbum(album);
    setUrl(window.location.href + 'album/' + album.id);
    setShowUrl(true);
  }

  const onBack = () => {
    setShowUrl(false);
  }



  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>Share Your Favorite Albums on Farcaster</h1>
        <p>Express yourself through music with beautiful, shareable album frames. Share your music, share your style! Create your frame now!</p>
      </div>
      <div className={styles.formCard}>
        {showUrl ? <FrameURL url={url} back={onBack}></FrameURL> :
          <CreateAlbumForm onSubmit={handleOnFormSubmit}></CreateAlbumForm>
        }
      </div>
      {/* <img src="banner.png" /> */}
    </main>
  );
}
