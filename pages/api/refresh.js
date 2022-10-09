import { generateAuthToken } from "../../lib/auth";
import cookie from 'cookie';
import { verify } from "jsonwebtoken";
import clientPromise from "../../lib/mongodb";
import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['POST'],
        origin: ['http://localhost:3000', 'https://dev3000.woyiswoy.com', 'https://mwitophapidev.vercel.app', 'https://openhouse.mwit.ac.th'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
        credentials: true,
    })
)
export default async function handler(req, res) {
    await cors(req, res)
    if (req.method === 'POST') {
        res.setHeader('Access-Control-Allow-Origin', process.env.ORI_URL);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader(
            'Access-Control-Expose-Headers',
            'date, etag, access-control-allow-origin, access-control-allow-credentials'
        );
        try {
            var decoded = verify(cookie.parse(req.headers.cookie).auth, process.env.REFRESH_SECRET);
            delete decoded['iat']
            delete decoded['exp']
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("ophUser");
            const user = await collection.findOne({ _id: decoded._id });
            const refreshToken = generateAuthToken(user)
                // res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== 'development',
                //     sameSite: 'strict',
                //     maxAge: 3600 * 24 * 7,
                //     path: '/'
                // }))
            res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 3600 * 24 * 7,
                path: '/',
            }))

            res.status(200).json({ ok: true, ...decoded });
        } catch {
            res.status(401).json({ ok: false })
        }

    } else res.status(405).json({ ok: false });
};