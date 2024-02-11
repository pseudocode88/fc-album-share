"use server";

import clientPromise from "../lib/mongodb";
import { Album } from './types'

export async function saveAlbum(album: Album) {
    const client = await clientPromise;
    const db = client.db("fc-music-share");


    await db.collection("albums").insertMany([album]);
}

export async function getAlbum(id: string | string[]) {
    const client = await clientPromise;
    const db = client.db("fc-music-share");

    return await db.collection("albums").findOne({ id: id });
}