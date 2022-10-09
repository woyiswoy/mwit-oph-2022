import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'
import clientPromise from "../../lib/mongodb";
import { generateAuthToken } from '../../lib/auth';
import cookie from 'cookie';
import nodemailer from 'nodemailer';

const bookProgram = [{
    id: 'mth',
    img: 'class_mth.png',
    above: 'Class @MWIT',
    title: 'Cath-Mom',
    below: 'สาขาวิชาคณิตศาสตร์และวิทยาการคำนวณ',
    detail: 'เป็นกิจกรรมแนะนำสาขาวิชา การจัดการเรียนการสอน สื่อต่างๆ และมีตัวอย่างโจทย์ปัญหาที่แก้ได้โดยบูรณาการความรู้ทางคณิตศาสตร์และวิทยาการคำนวณ ให้ผู้เข้าร่วมได้ร่วมแสดงความคิดเห็น ตอบคำถามชิงรางวัล',
    full: 30,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('25 Aug 2022 16:50:00 GMT+7'),
    end: Date.parse('25 Aug 2022 17:25:00 GMT+7'),
}, {
    id: 'phy',
    img: 'class_phy.png',
    above: 'Class @MWIT',
    title: "Let's Learn Physics",
    below: 'สาขาวิชาฟิสิกส์',
    detail: 'เรียนรู้สิ่งต่าง ๆ รอบตัวที่น่าสนใจด้วยหลักฟิสิกส์',
    full: 100,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('26 Aug 2022 16:50:00 GMT+7'),
    end: Date.parse('26 Aug 2022 17:25:00 GMT+7'),
}, {
    id: 'chm',
    img: 'class_chm.png',
    above: 'Class @MWIT',
    title: "Chemistry and Earth Science at MWIT (CES@MWIT)",
    below: 'สาขาวิชาเคมี',
    detail: 'ตัวอย่างการจัดการเรียนการสอนวิชาเคมี และวิทยาศาสตร์โลกและอวกาศ แบบ interactive',
    full: 50,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('25 Aug 2022 17:25:00 GMT+7'),
    end: Date.parse('25 Aug 2022 18:00:00 GMT+7'),
}, {
    id: 'bio',
    img: 'class_bio.png',
    above: 'Class @MWIT',
    title: "Taxo-Pokemon",
    below: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
    detail: 'กิจกรรมจัดจำแนกสิ่งมีชีวิตด้วยการ์ตูนในโปเกม่อน',
    full: 50,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('26 Aug 2022 17:25:00 GMT+7'),
    end: Date.parse('26 Aug 2022 18:00:00 GMT+7'),
}, {
    id: 'hpe',
    img: 'class_bio.png',
    above: 'Class @MWIT',
    title: "กีฬาพาเพลิน",
    below: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
    detail: 'พบตัวอย่างการเรียนรู้ในรายวิชาสุขศึกษาและพลศึกษา และเกม “แต่งกายสไตล์กีฬา” พร้อมทั้งคำแนะนำเรื่องการเรียนกับรุ่นพี่ที่น่ารัก',
    full: 50,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('26 Aug 2022 17:25:00 GMT+7'),
    end: Date.parse('26 Aug 2022 18:00:00 GMT+7'),
}, {
    id: 'fld',
    img: 'class_fld.png',
    above: 'Class @MWIT',
    title: "English is Fun: Jeopardy Style",
    below: 'สาขาวิชาภาษาต่างประเทศ',
    detail: 'Answering content-based questions using English through Jeopardy game format',
    full: 30,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('26 Aug 2022 16:50:00 GMT+7'),
    end: Date.parse('26 Aug 2022 17:25:00 GMT+7'),
}, {
    id: 'tha',
    img: 'class_lba.png',
    above: 'Class @MWIT',
    title: "Thai@MWIT",
    below: 'สาขาวิชาศิลปศาสตร์',
    detail: 'ทำกิจกรรมทดสอบทักษะและความรู้เกี่ยวกับภาษาไทย',
    full: 30,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('25 Aug 2022 17:25:00 GMT+7'),
    end: Date.parse('25 Aug 2022 18:00:00 GMT+7'),
}, {
    id: 'lba',
    img: 'class_lba.png',
    above: 'Class @MWIT',
    title: "Liberal Arts for Fun",
    below: 'สาขาวิชาศิลปศาสตร์',
    detail: 'เรียนรู้วิธีการเรียนแบบศิลปศาสตร์ ที่ผสมผสานวิชาสังคมศึกษาและศิลปะได้อย่างลงตัวและสนุกสนาน',
    full: 40,
    open: Date.parse('14 Aug 2022 18:00:00 GMT+7'),
    close: Date.parse('17 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('25 Aug 2022 16:50:00 GMT+7'),
    end: Date.parse('25 Aug 2022 17:25:00 GMT+7'),
}, {
    id: 'prj',
    img: 'projreg.png',
    above: 'การนำเสนอโครงงาน',
    title: "Science Project",
    below: 'ทุกสาขาวิชา',
    detail: 'รับชมการนำเสนอโครงงานของนักเรียน MWIT กว่า 90 โครงงานพร้อม Q&A session ที่เปิดโอกาสให้ผู้ชมถามข้อสงสัยกันได้',
    full: 10000,
    open: Date.parse('16 Aug 2022 12:00:00 GMT+7'),
    close: Date.parse('24 Aug 2022 23:59:59 GMT+7'),
    start: Date.parse('22 Aug 2022 16:50:00 GMT+7'),
    end: Date.parse('24 Aug 2022 18:00:00 GMT+7'),
}]

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PASS
    }
});

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
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("ophBook");
            const data = await collection.find().toArray()
            const dataOut = data.map(e => {
                delete e['cf']
                delete e['_id']
                const bookData = bookProgram.find((b) => e.id === b.id)
                return {...e, ...bookData }
            }).sort((a, b) => a.start - b.start)
            res.status(200).json({ ok: true, dataOut });
        } catch {
            res.status(401).json({ ok: false })
        }

    } else if (req.method === 'POST') {
        try {
            const data = req.body;
            const client = await clientPromise;
            const collection = client.db('mwitsc').collection("ophBook");
            const userCollection = client.db('mwitsc').collection("ophUser");
            const userBook = bookProgram.find(x => x.id === data.book)
            const serverTIme = new Date()
            const timeCheck = userBook.open <= serverTIme && userBook.close > serverTIme
            if (timeCheck) {
                collection.findOneAndUpdate({
                    id: data.book,
                    book: { $ne: userBook.full },
                    'cf._id': { $ne: data.user._id }
                }, {
                    $inc: { book: 1 },
                    $addToSet: { cf: { _id: data.user._id, email: data.user.email } }
                }, (err, r) => {
                    if (r.value) {
                        userCollection.findOneAndUpdate({
                            _id: data.user._id
                        }, {
                            $addToSet: { book: data.book }
                        }, (er, rs) => {
                            if (rs.value) {
                                data.user.book.push(data.book)
                                const refreshToken = generateAuthToken(data.user);
                                const mailOptions = {
                                    from: 'MWIT Open House <openhouse@mwit.ac.th>',
                                    to: data.user.email,
                                    subject: '[MWIT Open House 2022] ลิงก์สำหรับเข้าชมการนำเสนอโครงงาน - กิจกรรม Science Project',
                                    // text: 'ถึง นักเรียนทุกระดับชั้น\nเรียน ครูและเจ้าหน้าที่โรงเรียนมหิดลวิทยานุสรณ์\nเรื่อง ขออนุญาตแจ้งลิงก์สำหรับเข้าชมการนำเสนอโครงงานทาง YouTube Live Stream ในกิจกรรม Science Project ในงาน MWIT Open House 2022\nนักเรียน ครู และเจ้าหน้าที่ โรงเรียนมหิดลวิทยานุสรณ์สามารถรับชมการนำเสนอโครงงานของนักเรียน MWIT จำนวน 90 โครงงานพร้อม Q&A session ที่เปิดโอกาสให้ผู้ชมถามข้อสงสัย ได้ใน Live Session ของกิจกรรม MWIT Open House 2022: Science Project โดยสามารถเลือกเข้าชมห้องนำเสนอโครงงาน Room 1-6 ได้อย่างอิสระ และสามารถแสดงความคิดเห็นหรือถามคำถามกับผู้นำเสนอโครงงานในช่วง Q&A ทางช่อง Comment (ขอให้แสดงความคิดเห็นหรือถามคำถามอย่างสุภาพ) หากเกิดความขัดข้องในการถ่ายทอดสด สามารถแจ้งเข้ามาทางช่อง Comment ได้ และหากมีการเปลี่ยนแปลงลิงก์ ทีมงานจะแจ้งลิงก์ใหม่ให้ทราบทางอีเมลและช่อง Comment\nตารางเวลานำเสนอโครงงาน https://drive.google.com/file/d/16ix_rvw4FQW5BsANc7hfhNbzU8YBJbr9/view?usp=sharing\nลิงก์สำหรับเข้าชมการนำเสนอโครงงานทาง YouTube Live Stream\nห้องนำเสนอโครงงาน\n22 สิงหาคม 2565\n23 สิงหาคม 2565\n24 สิงหาคม 2565\nRoom 1\nhttps://youtu.be/LYsD3Jx-D58 \nhttps://youtu.be/CqE3KqIb8XI \nhttps://youtu.be/D6PP4WfrkH8 \nRoom 2\nhttps://youtu.be/B8VQgov_Tzs \nhttps://youtu.be/LWeSHtnpeqU \nhttps://youtu.be/8wQPKXQFcxc \nRoom 3\nhttps://youtu.be/WaYBTfWJFLA \nhttps://youtu.be/ikmT4_KY1XM \nhttps://youtu.be/NicZlfMb3TA \nRoom 4\nhttps://youtu.be/f_K_dEE9PEI \nhttps://youtu.be/6B292YOOmf0 \nhttps://youtu.be/bUnQTq1Z7f4 \nRoom 5\nhttps://youtu.be/R0ap1BLe9G8 \nhttps://youtu.be/ScWvc7N_DHQ \nhttps://youtu.be/bhtFRSBoI9k \nRoom 6\nhttps://youtu.be/EzuPe5gkS-8 \nhttps://youtu.be/Ss9TsDZjBwU \nhttps://youtu.be/pWEF0xDNmFI \n***ขอความร่วมมือไม่ส่งลิงก์ต่อให้บุคคลภายนอกที่ไม่ได้ลงทะเบียนกิจกรรม Science Project\nนอกจากนี้ยังสามารถเข้าชมโปสเตอร์ประชาสัมพันธ์โครงงานและบทคัดย่อของแต่ละโครงงานได้ที่ Online Exhibition ดังลิงก์นี้ https://openhouse.mwit.ac.th/sciproject/ และสามารถติดตามกิจกรรมในงาน MWIT Open House 2022 ได้ที่ \nWebsite:\nhttps://openhouse.mwit.ac.th/ \nFacebook:\nMWIT Open House\nhttps://www.facebook.com/MWITOpenHouse',
                                    html: '<!DOCTYPE html><html><head><base target="_top"><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped&display=swap" rel="stylesheet"><style type="text/css">body, table, th, td, span, ol, ul, li, p {font-family: "IBM Plex Sans Thai Looped", sans-serif !important;}table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px;}</style></head><body><p><b>เรียน</b> คุณ' + data.user.firstname + ' ' + data.user.lastname + ' โรงเรียน' + data.user.school + '<br><b>เรื่อง</b> แจ้งลิงก์สำหรับเข้าชมการนำเสนอโครงงานผ่านทาง YouTube Live Stream สำหรับผู้ลงทะเบียนกิจกรรม Science Project<br><br>ผู้ลงทะเบียนกิจกรรม Science Project สามารถรับชมการนำเสนอโครงงานของนักเรียน MWIT จำนวน 90 โครงงานพร้อม Q&A session ที่เปิดโอกาสให้ผู้ชมถามข้อสงสัย ได้ใน Live Session ของกิจกรรม MWIT Open House 2022: Science Project โดยสามารถเลือกเข้าชมห้องนำเสนอโครงงาน Room 1-6 ได้อย่างอิสระ และสามารถแสดงความคิดเห็นหรือถามคำถามกับผู้นำเสนอโครงงานในช่วง Q&A ทางช่อง Comment (ขอให้แสดงความคิดเห็นหรือถามคำถามอย่างสุภาพ) หากเกิดความขัดข้องในการถ่ายทอดสด สามารถแจ้งเข้ามาทางช่อง Comment ได้ และหากมีการเปลี่ยนแปลงลิงก์ ทีมงานจะแจ้งลิงก์ใหม่ให้ทราบทางอีเมลและช่อง Comment<br><br><b><u>ตารางเวลานำเสนอโครงงาน</u></b><br>https://drive.google.com/file/d/16ix_rvw4FQW5BsANc7hfhNbzU8YBJbr9/view?usp=sharing<br><br><b><u>ลิงก์สำหรับเข้าชมการนำเสนอโครงงานทาง YouTube Live Stream</u></b><br></p><table><tr><th>ห้องนำเสนอโครงงาน</th><th>22 สิงหาคม 2565</th><th>23 สิงหาคม 2565</th><th>24 สิงหาคม 2565</th></tr><tr><td>Room 1</td><td>https://youtu.be/LYsD3Jx-D58</td><td>https://youtu.be/CqE3KqIb8XI</td><td>https://youtu.be/D6PP4WfrkH8</td></tr><tr><td>Room 2</td><td>https://youtu.be/B8VQgov_Tzs</td><td>https://youtu.be/LWeSHtnpeqU</td><td>https://youtu.be/8wQPKXQFcxc</td></tr><tr><td>Room 3</td><td>https://youtu.be/WaYBTfWJFLA</td><td>https://youtu.be/ikmT4_KY1XM</td><td>https://youtu.be/NicZlfMb3TA</td></tr><tr><td>Room 4</td><td>https://youtu.be/f_K_dEE9PEI</td><td>https://youtu.be/6B292YOOmf0</td><td>https://youtu.be/bUnQTq1Z7f4</td></tr><tr><td>Room 5</td><td>https://youtu.be/R0ap1BLe9G8</td><td>https://youtu.be/ScWvc7N_DHQ</td><td>https://youtu.be/bhtFRSBoI9k</td></tr><tr><td>Room 6</td><td>https://youtu.be/EzuPe5gkS-8</td><td>https://youtu.be/Ss9TsDZjBwU</td><td>https://youtu.be/pWEF0xDNmFI</td></tr></table><p><i>***ขอความร่วมมือไม่ส่งลิงก์ต่อให้ผู้ที่ไม่ได้ลงทะเบียน</i><br><br>นอกจากนี้ยังสามารถเข้าชมโปสเตอร์ประชาสัมพันธ์โครงงานและบทคัดย่อของแต่ละโครงงานในรูปแบบ Online Exhibition ได้ที่ https://openhouse.mwit.ac.th/sciproject/<br><br>ขอแสดงความนับถือ<br>คณะทำงานกิจกรรม MWIT Open House 2022 โรงเรียนมหิดลวิทยานุสรณ์<br><br>ติดตามข่าวสารและกิจกรรมในงาน MWIT Open House 2022 เพิ่มเติมได้ที่<br><a href="https://openhouse.mwit.ac.th">เข้าสู่เว็บไซต์</a><br><a href="https://www.facebook.com/MWITOpenHouse ">Facebook: MWIT Open House</a><br><a href="https://m.me/mwitopenhouse">สอบถามข้อมูลเพิ่มเติม</a></p></body></html>'
                                };
                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log(error)
                                        res.status(401).json({ ok: false })
                                    } else {
                                        console.log(info)
                                        res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                                            httpOnly: true,
                                            secure: true,
                                            sameSite: 'none',
                                            maxAge: 3600 * 24 * 7,
                                            path: '/',
                                        }))
                                        res.status(200).json({ ok: true, userData: data.user, book: data.book });
                                    }
                                });
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
            const collection = client.db('mwitsc').collection("ophBook");
            const userCollection = client.db('mwitsc').collection("ophUser");
            const userBook = bookProgram.find(x => x.id === data.book)
            const serverTIme = new Date()
            const timeCheck = userBook.open <= serverTIme && userBook.close > serverTIme
            if (timeCheck) {
                collection.findOneAndUpdate({
                    id: data.book,
                    'cf._id': { $eq: data.user._id }
                }, {
                    $inc: { book: -1 },
                    $pull: { cf: { _id: data.user._id } }
                }, (err, r) => {
                    if (r.value) {
                        userCollection.findOneAndUpdate({
                            _id: data.user._id
                        }, {
                            $pull: { book: data.book }
                        }, (er, rs) => {
                            if (rs.value) {
                                data.user.book = data.user.book.filter(b => b !== data.book)
                                const refreshToken = generateAuthToken(data.user);
                                res.setHeader('Set-Cookie', cookie.serialize('auth', refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: 'none',
                                    maxAge: 3600 * 24 * 7,
                                    path: '/',
                                }))
                                res.status(200).json({ ok: true, userData: data.user, book: data.book });
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