"use server";

import clientPromise from "../lib/mongodb";


export async function saveAlbum(album) {
    const client = await clientPromise;
    const db = client.db("fc-music-share");


    await db.collection("albums").insertMany([album]);
}

export async function getAlbum(id) {
    const client = await clientPromise;
    const db = client.db("fc-music-share");

    return await db.collection("albums").findOne({ id: id });
}