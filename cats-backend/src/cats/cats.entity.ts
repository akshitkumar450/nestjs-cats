import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class CatsNew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  image: string;
}
