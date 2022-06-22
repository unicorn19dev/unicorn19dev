import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  type: string;

  codeId?: string;

  city?: string;

  address?: string;

  phone?: {
    code: string;
    phoneNumber: string;
  };

  medicalCode?: string;
}

export class LoginDTO {
  email: string;
  password: string;
}

export class PasswordRecoveryRequestDTO {
  email: string;
}

export class ChangePasswordDTO {
  newPassword: string;
  code: string;
}
