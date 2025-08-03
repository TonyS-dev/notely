// backend/src/categories/category.entity.ts
import { Note } from '../notes/note.entity';
import { User } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Note, (note) => note.categories)
  notes: Note[];

  @ManyToOne(() => User, (user) => user.categories, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
