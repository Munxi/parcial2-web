import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from '../country/country.entity';
@Entity('travelplans')
export class TravelPlansEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  note: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'cca3_dest' })
  cca3_dest: CountryEntity;
}
