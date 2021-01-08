//Import Prisma
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


//Import Transporter and Attachement type
import transporter from "../transporter"
import { Attachment } from 'nodemailer/lib/mailer'

interface MailerParams {
    author_id: number
    subject: string
    body: string
    attachements? : Attachment[]
}

async function Mailer({author_id, subject, body} : MailerParams){
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
                some: {
                    id: news.tagsId
                }
            }
        }
    })

    console.log(news, users)

    users.map(async user => {
        await transporter.sendMail({
            from: `${news.email}`,
            to: `${user.email}`,
            subject: subject,
            text: body       
        })
    })


}

export default Mailer