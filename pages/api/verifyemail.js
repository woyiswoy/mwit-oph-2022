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
        const data = req.body;
        const client = await clientPromise;
        const collection = client.db('mwitsc').collection("ophUser");
        const verify = data.verify
        collection.findOneAndUpdate({
            verify
        }, {
            $set: {
                verify: true
            }
        }, (err, resp) => {
            // console.log('err', err);
            // console.log('res', resp);
            if (resp.value === null) {
                res.status(401).json({
                    message: 'Verification Failed',
                    ok: false
                })
            } else {
                res.status(200).json({ ok: true });
            }
        });
        // console.log(req.body);

    } else res.status(405).json({ message: 'Method not Allowed' });
}