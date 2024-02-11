"use client";

import styles from "./form.module.css";
import { useOptimistic, useRef, useState, useTransition } from "react";
import { v4 as uuidv4 } from 'uuid';

export function CreateAlbumForm({ onSubmit }) {

    let formRef = useRef<HTMLFormElement>(null)

    let [errorAlbum, setErrorAlbum] = useState(false);
    let [errorArtist, setErrorArtist] = useState(false);
    let [errorSource, setErrorSource] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let isFormValid = true;

        let album = {
            id: uuidv4(),
            name: formData.get("album") as string,
            artist: formData.get("artist") as string,
            albumart: formData.get("albumart") as string,
            year: formData.get("year") as string,
            country: formData.get("country") as string,
            genre: formData.get("genre") as string,
            youtube: formData.get("youtube") as string,
            apple: formData.get("apple") as string,
            spotify: formData.get("spotify") as string
        };

        if (album.name.length === 0) {
            setErrorAlbum(true);
            isFormValid = false;
        } else {
            setErrorAlbum(false);
        }

        if (album.artist.length === 0) {
            setErrorArtist(true);
            isFormValid = false;
        } else {
            setErrorArtist(false);
        }

        if ((album.youtube.length + album.apple.length + album.spotify.length) <= 0) {
            setErrorSource(true);
            isFormValid = false;

        } else {
            setErrorSource(false);
        }

        if (isFormValid) {
            formRef.current?.reset();
            onSubmit(album);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            <div className={styles.controlGroup}>
                <h2 className={styles.subheading}>Album Details</h2>
                <p className={styles.muted}>Enter the details about the album that you like to share</p>
            </div>

            <div className={styles.controlGroup}>
                <label>Album name <span className={styles.required}>*</span></label>
                <input type="text" name="album"></input>
                {errorAlbum ? <span className={styles.error}>Album name is required</span> : null}
            </div>

            <div className={styles.controlGroup}>
                <label>Artist <span className={styles.required}>*</span></label>
                <input type="text" name="artist"></input>
                {errorArtist ? <span className={styles.error}>Artist name is required</span> : null}
            </div>

            <div className={styles.controlGroup}>
                <label>Album art (URL)</label>
                <input type="text" name="albumart"></input>
            </div>

            <div className={styles.controlGroup}>
                <label>Year</label>
                <input type="text" name="year"></input>
            </div>

            <div className={styles.controlGroup}>
                <label>Country</label>
                <input type="text" name="country"></input>
            </div>

            <div className={styles.controlGroup}>
                <label>Genre, Style and Mood (comma seperated)</label>
                <input type="text" placeholder="hip-hop, instrumental, rap, uplifing" name="genre"></input>
            </div>

            <div className={styles.controlGroup}>
                <h2 className={styles.subheading}>Sources</h2>
                <p className={styles.muted}>Copy paste the URL form atleast one source</p>
                {errorSource ? <span className={styles.error}>You need to enter atleast one source link</span> : null}
            </div>

            <div className={styles.controlGroup}>
                <label>Youtube</label>
                <input type="text" placeholder="" name="youtube"></input>
            </div>

            <div className={styles.controlGroup}>
                <label>Apple Music</label>
                <input type="text" placeholder="" name="apple"></input>
            </div>

            <div className={styles.controlGroup}>
                <label>Spotify</label>
                <input type="text" placeholder="" name="spotify"></input>
            </div>

            <div className={styles.controlGroup}>
                <button type="submit">Generate frame</button>
            </div>
        </form>
    );
}