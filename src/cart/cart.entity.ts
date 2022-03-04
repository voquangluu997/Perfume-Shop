import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../booking/booking.entity';
import { Perfume, User } from '../entities';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'NON_ORDER', nullable: true })
  status: string;

  @Column({ default: 1, nullable: true })
  quatity: number;

  @ManyToOne(() => Perfume, (perfume) => perfume.carts)
  @JoinColumn({ name: 'perfume_id' })
  perfume: Perfume;

  @ManyToOne(() => Booking, (booking) => booking.carts)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => User, (perfume) => perfume.carts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
