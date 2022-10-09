import clientPromise from "../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';
import { compareSync } from "bcryptjs";
import cookie from 'cookie';
import { generateAuthToken } from "../../lib/auth";
import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['POST', 'GET', 'OPTIONS'],
        origin: ['http://localhost:3000', 'https://dev3000.woyiswoy.com', 'https://mwitophapidev.vercel.app', 'https://openhouse.mwit.ac.th'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
        credentials: true,
    })
)
export default async function login(req, res) {
    await cors(req, res)
    if (req.method === 'POST') {
        res.setHeader('Access-Control-Allow-Origin', process.env.ORI_URL); //req.headers.origin
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        // access-control-expose-headers allows JS in the browser to see headers other than the default 7
        res.setHeader(
            'Access-Control-Expose-Headers',
            'date, etag, access-control-allow-origin, access-control-allow-credentials'
        );
        const client = await clientPromise;
        const collection = client.db('mwitsc').collection("ophUser");
        const user = await collection.findOne({ email: req.body.email.toLowerCase() });
        if (user && user.verify !== true) {
            res.status(401).json({ message: 'v', ok: false });
        } else if (user && compareSync(req.body.password, user.password)) {
            const refreshToken = generateAuthToken(user);
            res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 3600 * 24 * 7,
                path: '/',
            }))
            res.status(200).json({ message: 'OK', ok: true, ...user });
        } else {
            res.status(401).json({ message: 'm', ok: false });
        }
        // console.log(req.body);

    } else res.status(405).json({ message: 'Method not Allowed' });
}