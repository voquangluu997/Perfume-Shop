import { Review } from './../review/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../brands/brand.entity';
import { Fragrance } from '../fragrances/fragrance.entity';
import { Cart } from '../entities';

@Entity()
export class Perfume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true, default: 'stocking' })
  status: string;

  @Column({ name: 'publish_year', nullable: true })
  publishYear: string;

  @Column({ name: 'is_deleted', nullable: true, default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  origin: string;

  @OneToMany(() => Cart, (cart) => cart.perfume, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  carts: Cart[];

  @ManyToOne(() => Brand, (brand) => brand.perfumes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => Review, (review) => review.perfume)
  review: Review;
  @ManyToOne(() => Fragrance, (fragrance) => fragrance.perfumes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fragrance_id' })
  fragrance: Fragrance;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
