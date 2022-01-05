import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Perfume } from '../perfume/perfume.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Perfume, (perfume) => perfume.brand)
  perfumes: Perfume[];

  @Column({ default: false, name: 'is_deleted', nullable: true })
  isDeleted: boolean;
}
