import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma";
import { createUsersParams } from "src/services/users/params.users";


@Injectable()
export class UsersRepository {
    constructor( private readonly prisma: PrismaService){}

    register(params: createUsersParams): Promise<any>{
        return this.prisma.user.create({
            data:{
                nome: params.name,
                email: params.email,
                password: params.password
            }
        })
    }
}