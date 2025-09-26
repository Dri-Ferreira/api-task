import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {

    @IsString() @IsOptional()
    id?: string;

    @IsString() @IsOptional()
    name?: string;

    @IsEmail() @IsOptional()
    email?: string;

    @IsString() @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password?: string;

}