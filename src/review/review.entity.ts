import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../entities';
import { Perfume } from '../perfume/perfume.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Perfume, (perfume) => perfume.review)
  @JoinColumn({ name: 'perfume_id' })
  perfume: Perfume;

  @Column({ default: false, name: 'is_deleted', nullable: true })
  isDeleted: boolean;
}
