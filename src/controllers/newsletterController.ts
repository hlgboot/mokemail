import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express"

class newsletterController{
    async create(req: Request, res: Response){
        const { email, name, tag } = req.body
        
        const tagExists = await prisma.tags.findUnique({
            where:{
                name: tag
            }
        })

        const newsletterExists = await prisma.newsletters.findUnique({
            where:{
                name: name
            }
        })

        if(tagExists || newsletterExists){
            return res.send("Try again! Your tag or name already exists")
        };

        const newsletter = await prisma.newsletters.create({
            data:{
                name: name,
                email: email,
                tag: {
                    create: {
                        name: tag
                    }
                }
            }
        })
        res.send("Your newsletter has been created")

    }; 

}

export default new newsletterController();