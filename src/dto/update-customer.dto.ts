import { IsString, IsOptional, IsBoolean, IsInt, IsEmail, Length } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @Length(1, 45)
  @IsOptional()
  first_name?: string;

  @IsString()
  @Length(1, 45)
  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  email?: string;

  @IsInt()
  @IsOptional()
  address_id?: number;

  @IsInt()
  @IsOptional()
  store_id?: number;

  @IsBoolean()
  @IsOptional()
  activebool?: boolean;
}
