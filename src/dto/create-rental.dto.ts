import { IsInt, IsNotEmpty, IsDate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions } from 'class-validator';
import { Type } from 'class-transformer';

// Custom validator to check if the return_date is between 1 and 3 weeks after the rental_date
@ValidatorConstraint({ async: false })
class DateBetween1And3WeeksValidator implements ValidatorConstraintInterface {
  validate(return_date: any, args: ValidationArguments): boolean {
    const rental_date = (args.object as any)['rental_date'];
    if (!rental_date || !return_date) {
      return false;
    }
    
    const minReturnDate = new Date(rental_date);
    minReturnDate.setDate(minReturnDate.getDate() + 7);

    const maxReturnDate = new Date(rental_date);
    maxReturnDate.setDate(maxReturnDate.getDate() + 21);


    return return_date >= minReturnDate && return_date <= maxReturnDate;
  }

  defaultMessage(args: ValidationArguments): string {
    return '$property must be between 1 and 3 weeks after rental_date';
  }
}

// Custom decorator to use the DateBetween1And3WeeksValidator
function DateBetween1And3Weeks(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: 'DateBetween1And3Weeks',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: DateBetween1And3WeeksValidator,
      options: validationOptions,
    });
  };
}

export class CreateRentalDto {
  @IsInt()
  @IsNotEmpty()
  inventory_id: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  rental_date: Date;

  @IsNotEmpty()
  @IsDate()
  @DateBetween1And3Weeks()
  @Type(() => Date)
  return_date: Date;

  @IsInt()
  @IsNotEmpty()
  staff_id: number;

  @IsInt()
  @IsNotEmpty()
  customer_id: number;

  @IsInt()
  @IsNotEmpty()
  film_id: number;
}
