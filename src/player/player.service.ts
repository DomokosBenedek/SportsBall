import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayerService {

  db:PrismaService;
  constructor(db:PrismaService){
    this.db=db;
  }

  async create(createSongDto: CreatePlayerDto) {
    return await this.db.player.create({data:createSongDto});
  }

  async findAll() {
    return await this.db.player.findMany();
  }

  async findOne(id: number) {
    return await this.db.player.findUnique({where:{Id:id}});
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return await this.db.player.update({where:{Id:id},data:updatePlayerDto});
  }

  async remove(id: number) {
    try{
      return await this.db.player.delete({where:{Id:id}});
    }catch(error){
      return {error:error.message};
    };
  }
}
