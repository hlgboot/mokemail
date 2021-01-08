import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express"
import { resolveContent } from 'nodemailer/lib/shared'

class tagsController{
    async index(req: Request, res: Response){
        const tags = await prisma.tags.findMany()

        res.json(tags)
    }
}

export default new tagsController();