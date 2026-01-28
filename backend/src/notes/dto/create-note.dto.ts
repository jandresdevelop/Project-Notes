import { IsOptional, IsString, IsNumber } from "class-validator";

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
