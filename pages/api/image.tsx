import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { getAlbum } from '@/app/store';
import satori from "satori";
import { join } from 'path';
import * as fs from "fs";


const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')

const fontFiles = {
    robotoRegular: join(process.cwd(), 'font/roboto/roboto-regular.ttf'),
    robotoBold: join(process.cwd(), 'font/roboto/roboto-bold.ttf'),
    robotoBlack: join(process.cwd(), 'font/roboto/roboto-black.ttf'),
    robotoMedium: join(process.cwd(), 'font/roboto/roboto-medium.ttf')
}

let fontData = fs.readFileSync(fontPath)

const font = {
    robotoRegular: fs.readFileSync(fontFiles.robotoRegular),
    robotoBold: fs.readFileSync(fontFiles.robotoBold),
    robotoBlack: fs.readFileSync(fontFiles.robotoBlack),
    robotoMedium: fs.readFileSync(fontFiles.robotoMedium)
}

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
                display: 'flex',
                position: 'relative',
                width: '100%',
                height: '100%',
                background: '#ffffff',
            },
            wrapperimg: {
                width: '100%',
                height: '100%',
                filter: 'blur(24px)',
                position: 'absolute',
                opacity: '0.7'
            },

            card: {
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: '#ffffff99',
                padding: "32px 32px 32px 32px",
                boxSizing: 'border-box',
                gap: 32
            },
            cardimage: {
                display: 'flex',
                width: '40%',
                flexShrink: 0,
            },
            image: {
                margin: 0,
                borderRadius: 12,
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 6px 24px rgba(0,0,0,0.08)"
            },
            carddetails: {
                display: 'flex',
                flexShrink: 1,
                flexDirection: 'column',
                gap: '24px'
            },
            name: {
                fontFamily: 'Roboto',
                fontSize: 24,
                fontWeight: 800,
                lineHeight: 1.35,
                margin: 0,
                color: "#333333"
            },
            artist: {
                fontSize: 18,
                fontFamily: 'Roboto',
                fontWeight: 700,
                lineHeight: 1.35,
                margin: 0,
                color: "#333333"
            },

            year: {
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 1.5,
                margin: 0,
                color: "#808080"
            },

            genre: {
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.4,
                margin: 0
            },

            titleWrapper: {
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
            }

        }

        const svg = await satori(
            <div style={style.wrapper}>
                <div style={style.wrapperimg}></div>
                <div style={style.card}>
                    <div style={style.cardimage}>
                        <img style={style.image} src={album.albumart} />
                    </div>
                    <div style={style.carddetails}>
                        <div style={style.titleWrapper}>
                            <h1 style={style.name}>{album.name}</h1>
                            <h2 style={style.artist}>by {album.artist}</h2>
                        </div>
                        <p style={style.year}>{album.year} • {album.country} • {album.genre}</p>
                    </div>
                </div>
            </div>
            ,
            {
                width: 600, height: 280, fonts: [{
                    data: font.robotoRegular,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400
                }, {
                    data: font.robotoBold,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 700
                }, {
                    data: font.robotoBlack,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 800
                }, {
                    data: font.robotoMedium,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 500
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