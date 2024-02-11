import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { getAlbum } from '@/app/store';
import satori from "satori";
import { join } from 'path';
import * as fs from "fs";


const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')
let fontData = fs.readFileSync(fontPath)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log('api/image');

    try {
        const albumId = req.query['id']

        if (!albumId) {
            return res.status(400).send('Missing album ID');
        }

        let album = await getAlbum(albumId);


        if (!album) {
            return res.status(400).send('Missing album ID');
        }

        const style = {
            wrapper: {
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: 'f4f4f4',
                padding: 50,
                lineHeight: 1.2,
                fontSize: 24,
            }
        }

        const svg = await satori(
            <div style={style.wrapper}>
                <div>
                    <div>
                        <img src={album.art} />
                    </div>
                    <div>
                        <h1>{album.name}</h1>
                        <h2>by {album.artist}</h2>
                        <p>{album.year} • {album.country}</p>
                        <p>{album.genre}</p>
                    </div>
                </div>
            </div>
            ,
            {
                width: 600, height: 400, fonts: [{
                    data: fontData,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400
                }]
            })

        // Convert SVG to PNG using Sharp
        const pngBuffer = await sharp(Buffer.from(svg))
            .toFormat('png')
            .toBuffer();

        // Set the content type to PNG and send the response
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'max-age=10');
        res.send(pngBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating image');
    }
}