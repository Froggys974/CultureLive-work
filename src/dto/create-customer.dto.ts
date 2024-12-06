import { IsString, IsOptional, IsBoolean, IsInt, IsEmail, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(1, 45)
  first_name: string;

  @IsString()
  @Length(1, 45)
  last_name: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  email?: string;

  @IsInt()
  address_id: number;

  @IsInt()
  store_id: number;

  @IsBoolean()
  @IsOptional()
  activebool: boolean = true;
}
