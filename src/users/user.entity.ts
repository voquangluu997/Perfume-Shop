import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../booking/booking.entity';
import { Cart, Review } from '../entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(() => Review, (review) => review.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  reviews: Review[];

  @OneToMany(() => Cart, (cart) => cart.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  carts: Cart[];

  @OneToMany(() => Booking, (booking) => booking.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  bookings: Booking[];
}
