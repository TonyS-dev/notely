// backend/src/users/user.entity.ts
import { Note } from '../notes/note.entity';
import { Category } from '../categories/category.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users') // This will create a 'users' table
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // Ensure email is unique
  email: string;

  @Column()
  username: string;

  // !! todo: Hash passwords
  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // This defines the one-to-many relationship from the User's side
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
