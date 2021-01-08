import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express"

class userController{
    async create(req: Request, res: Response){
        const { email } = req.body
        // const { id } = req.query

        const user = await prisma.users.create({
            data:{
                email: email
            }
        })

        res.send("User has been created")
    };


}

export default new userController();