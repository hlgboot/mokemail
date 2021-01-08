import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express"

class userController{
    async create(req: Request, res: Response){
        const { email, tagId } = req.body

        let user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(!user){
            user = await prisma.users.create({
                data:{
                    email: email
                }
            })
        }


        await prisma.tags.update({
            where:{
                id: tagId,
            },
            data:{
                Users: {
                    connect:{
                        id: user.id
                    }   
                }
            }
        })

        res.send("User has been created")
    };

    async disconnect(req: Request, res: Response){
        const { email, tagId } = req.body

        const user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        if(!user){
            return res.status(401).send("User not found")
        }

        await prisma.users.update({
            where: {
                email: email
            },
            data:{
                tags:{
                    disconnect:{
                        id: tagId
                    }
                }
            }
        })

        res.send("User removed from" + tagId) 
    }


}

export default new userController();