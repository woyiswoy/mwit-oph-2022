import clientPromise from "../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';
import { hashSync } from "bcryptjs";
import nodemailer from 'nodemailer';
const fs = require('fs');
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
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PASS
    }
});

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
        delete data['passconf']
        data.password = hashSync(data.password)
        data.email = data.email.toLowerCase()
        const client = await clientPromise;
        const collection = client.db('mwitsc').collection("ophUser");
        const verify = uuidv4();
        collection.update({
            email: data.email
        }, {
            $setOnInsert: {
                _id: uuidv4(),
                verify,
                book: [],
                ...data
            }
        }, {
            upsert: true
        }, (err, resp) => {
            // console.log('err', err);
            // console.log('res', resp);
            if (resp.upsertedCount === 0) {
                res.status(401).json({
                    message: 'Registeration Failed',
                    ok: false
                })
            } else {
                const mailOptions = {
                    from: 'MWIT Open House <openhouse@mwit.ac.th>',
                    to: data.email,
                    subject: 'ยืนยันอีเมล - ลงทะเบียน MWIT Open House 2022',
                    text: 'กรุณากดลิงก์ยืนยันอีเมลเพื่อเปิดใช้งานบัญชีในกิจกรรม MWIT Open House 2022 ของคุณดังนี้ https://openhouse.mwit.ac.th/verifyemail/?id=' + verify + ' หากคุณไม่ใช่ผู้ดำเนินการลงทะเบียนดังกล่าวกรุณาอย่ากด',
                    // html: '<b>เรียน ผู้ลงทะเบียนบัญชี MWIT Open House 2022</b><br><br>กรุณากดลิงก์ยืนยันอีเมลเพื่อเปิดใช้งานบัญชีในกิจกรรม MWIT Open House 2022 ของคุณดังนี้ https://openhouse.mwit.ac.th/verifyemail/' + verify + '<br>หากคุณไม่ใช่ผู้ดำเนินการลงทะเบียนดังกล่าวกรุณาอย่ากด'
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error)
                        res.status(401).json({
                            message: 'Registeration Failed',
                            ok: false
                        })
                    } else {
                        console.log(info)
                        res.status(200).json({ ok: true });
                    }
                });

            }
        });
        // console.log(req.body);

    } else res.status(405).json({ message: 'Method not Allowed' });
}