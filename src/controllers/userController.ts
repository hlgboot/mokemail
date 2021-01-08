import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express"

class userController{
    async create(req: Request, res: Response){
        const { email, tagId } = req.body

        const userExists = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(userExists){
            const userUp = await prisma.users.update({
                where:{
                    email: email
                },
                data:{
                    tags:{
                        connect: {
                            id: tagId
                        }
                    }
                }
            })
            return res.send("User has been updated")
        }

        const user = await prisma.users.create({
            data:{
                email: email,
                tags: {
                    connect: {
                        id: tagId
                    }
                }
            }
        })

        res.send("User has been created")
    };


}

export default new userController();