//Import Prisma
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


//Import Transporter and Attachement type
import transporter from "../transporter"
import { Attachment } from 'nodemailer/lib/mailer'

interface sendParams {
    author_id: number
    subject: string
    body: string
    attachements? : Attachment[]
}

async function send({author_id , subject, body, attachements}: sendParams){
    const id = author_id

    const news = await prisma.newsletters.findUnique({
        where: {
            id: id
        }
    })
    if (!news){
        return 
    }
    const users = await prisma.users.findMany({
        where: {
            tags: {
                some:{
                    id: news.tagsId
                }
            }
        }
    })

    console.log(news, users)


    /*transporter.sendMail({
        from: `${news?.email}`,
        to: "bhj",
        subject: subject,
        text: body,
        attachments: attachements


    })*/
}

export default send