import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { Category } from "../categories/category.entity";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToOne(() => Category, (category) => category.notes, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
  })
  category: Category | null;

  @CreateDateColumn()
  createdAt: Date;
}
