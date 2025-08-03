// backend/src/notes/note.entity.ts
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Category, (category) => category.notes, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'notes_categories',
    joinColumn: { name: 'note_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.notes, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
