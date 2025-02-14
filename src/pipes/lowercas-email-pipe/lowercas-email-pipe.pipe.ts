import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LowercasEmailPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("Pipe correo a minusculas")
    const {email} = value;
    console.log(email)
    if (email) {
      value.email = email.toLowerCase();
    }
    return value;
  }
}
