import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from '../country/country.entity';
@Entity('travelplan')
export class TravelPlanEntity {
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

  @Column({ name: 'cca3_dest' })
  cca3: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'cca3_dest' })
  country_dest: CountryEntity;
}
