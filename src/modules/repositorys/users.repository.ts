import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma.service";
import { createUsersParams } from "src/services/users/params.users";


@Injectable()
export class UsersRepository {
    constructor( private readonly prisma: PrismaService){}

    register(params: createUsersParams): Promise<any>{
        return this.prisma.user.create({
            data:{
                name: params.name,
                email: params.email,
                password: params.password
            }
        })
    }
}