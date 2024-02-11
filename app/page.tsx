'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { CreateAlbumForm } from './form';
import { saveAlbum } from './store';

export default function Home() {

  const handleOnFormSubmit = async (album) => {
    console.log(album);
    await saveAlbum(album);
  }

  return (
    <main className={styles.main}>
      <h1>Music Sharing Frame for FC</h1>
      <CreateAlbumForm onSubmit={handleOnFormSubmit}></CreateAlbumForm>
    </main>
  );
}
