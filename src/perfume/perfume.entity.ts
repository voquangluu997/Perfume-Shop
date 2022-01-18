import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../brands/brand.entity';
import { Fragrance } from '../fragrances/fragrance.entity';

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

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'publish_year', nullable: true })
  publishYear: Date;

  @Column({ name: 'is_deleted', nullable: true, default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  origin: string;

  @ManyToOne(() => Brand, (brand) => brand.perfumes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

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
