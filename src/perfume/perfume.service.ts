import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PerfumeService {
    // constructor(
    //     @InjectRepository(User)
    //     private userRepository: Repository<User>,
    //   ) {}
    
      async getPerfume() {
        return 'ok';
      }


}
