'use client'


import styles from "./page.module.css";
import { CreateAlbumForm } from './form';
import { saveAlbum } from './store';
import { Album } from './types'

export default function Home() {

  const handleOnFormSubmit = async (album: Album) => {
    await saveAlbum(album);
  }

  return (
    <main className={styles.main}>
      <h1>Music Sharing Frame for FC</h1>
      <CreateAlbumForm onSubmit={handleOnFormSubmit}></CreateAlbumForm>
    </main>
  );
}
