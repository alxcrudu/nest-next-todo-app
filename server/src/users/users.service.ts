import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    return this.userRepo.save(user);
  }

  findUserById(id: number) {
    return this.userRepo.findOneOrFail({ where: { id } });
  }

  findAll() {
    return this.userRepo.find();
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
