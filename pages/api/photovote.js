import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'
import clientPromise from "../../lib/mongodb";
import { generateAuthToken } from '../../lib/auth';
import cookie from 'cookie';

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'DELETE'],
        origin: ['http://localhost:3000', 'https://dev3000.woyiswoy.com', 'https://mwitophapidev.vercel.app', 'https://openhouse.mwit.ac.th'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
        credentials: true,
    })
)
export default async function book(req, res) {
    await cors(req, res)
    res.setHeader('Access-Control-Allow-Origin', process.env.ORI_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Expose-Headers',
        'date, etag, access-control-allow-origin, access-control-allow-credentials'
    );
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("bioPhoto");
            const userCollection = client.db('mwitsc').collection("ophUser");
            const serverTIme = new Date()
            const timeCheck = Date.parse('11 Sep 2022 23:59:59 GMT+7') > serverTIme
            if (timeCheck) {
                collection.findOneAndUpdate({
                    name: data.name,
                }, {
                    $inc: { vote: 1 },
                }, (err, r) => {
                    if (r.value) {
                        userCollection.findOneAndUpdate({
                            _id: data.user._id
                        }, {
                            $addToSet: { book: data.name }
                        }, (er, rs) => {
                            if (rs.value) {
                                data.user.book.push(data.name)
                                const refreshToken = generateAuthToken(data.user);
                                res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: 'none',
                                    maxAge: 3600 * 24 * 7,
                                    path: '/',
                                }))
                                res.status(200).json({ ok: true, userData: data.user, vote: data.name });
                            } else {
                                res.status(401).json({ ok: false })
                            }
                        })

                    } else {
                        res.status(401).json({ ok: false })
                    }
                })
            } else {
                res.status(401).json({ ok: false })
            }

        } catch {
            res.status(401).json({ ok: false })
        }

    } else if (req.method === 'DELETE') {
        try {
            const data = req.body;
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("bioPhoto");
            const userCollection = client.db('mwitsc').collection("ophUser");
            const serverTIme = new Date()
            const timeCheck = Date.parse('11 Sep 2022 23:59:59 GMT+7') > serverTIme
            if (timeCheck) {
                collection.findOneAndUpdate({
                    name: data.name,
                }, {
                    $inc: { vote: -1 },
                }, (err, r) => {
                    if (r.value) {
                        userCollection.findOneAndUpdate({
                            _id: data.user._id
                        }, {
                            $pull: { book: data.name }
                        }, (er, rs) => {
                            if (rs.value) {
                                data.user.book = data.user.book.filter(b => b !== data.name)
                                const refreshToken = generateAuthToken(data.user);
                                res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: 'none',
                                    maxAge: 3600 * 24 * 7,
                                    path: '/',
                                }))
                                res.status(200).json({ ok: true, userData: data.user, vote: data.name });
                            } else {
                                res.status(401).json({ ok: false })
                            }
                        })

                    } else {
                        res.status(401).json({ ok: false })
                    }
                })
            } else {
                res.status(401).json({ ok: false })
            }
        } catch {
            res.status(401).json({ ok: false })
        }
    } else res.status(405).json({ ok: false });
};