import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';
import { CreateCatalogoDto, UpdateCatalogoDto } from '../dto/catalogo.dto';
import { GeneroService } from './genero.service';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(CatalogoCabecaEntity)
    private catalogoRepository: Repository<CatalogoCabecaEntity>,
    private generoService: GeneroService,
  ) {}

  async create(createCatalogoDto: CreateCatalogoDto): Promise<CatalogoCabecaEntity> {
    const genero = await this.generoService.findOne(createCatalogoDto.generoIdGenero);

    if (!genero) {
      throw new NotFoundException(`Gênero não encontrado.`);
    }

    const newCatalogo = this.catalogoRepository.create({
      ...createCatalogoDto,
      genero: genero,
    });
    return await this.catalogoRepository.save(newCatalogo);
  }

  async findAll(): Promise<CatalogoCabecaEntity[]> {
    return await this.catalogoRepository.find({ relations: ['genero'] });
  }

  async findOne(id: number): Promise<CatalogoCabecaEntity> {
    const catalogo = await this.catalogoRepository.findOne({
      where: { id_catalogo: id },
      relations: ['genero'],
    });
    if (!catalogo) {
      throw new NotFoundException(`Catálogo não encontrado.`);
    }
    return catalogo;
  }

  async update(id: number, updateCatalogoDto: UpdateCatalogoDto): Promise<CatalogoCabecaEntity> {
    const catalogo = await this.findOne(id);

    if (updateCatalogoDto.generoIdGenero) {
      const genero = await this.generoService.findOne(updateCatalogoDto.generoIdGenero);
      if (!genero) {
        throw new NotFoundException(`Gênero não encontrado.`);
      }
      catalogo.genero = genero;
    }

    const updatedCatalogo = this.catalogoRepository.merge(catalogo, updateCatalogoDto);
    return await this.catalogoRepository.save(updatedCatalogo);
  }

  async delete(id: number): Promise<void> {
    const catalogo = await this.findOne(id);
    await this.catalogoRepository.remove(catalogo);
  }
}


// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CatalogoCabecaEntity } from '../entity/catalogo-cabeca.entity';
// import { Repository } from 'typeorm';
// import { CreateCatalogoDto, UpdateCatalogoDto } from '../dto/catalogo.dto';

// // ESSA CLASSE ESTA SENDO CRIADA AUTOMATICAMENTE
// // POPULEI ELA PARA CASO ALGO ESPECIFICO DO CÓDIGO ESTEJA USANDO ELA AO INVES DA "Catalogo-cabeca.service"

// @Injectable()
// export class CatalogoCabecaService {
//   constructor(
//     @InjectRepository(CatalogoCabecaEntity)
//     private catalogoRepository: Repository<CatalogoCabecaEntity>,
//   ) {}

//   async findAll(): Promise<CatalogoCabecaEntity[]> {
//     return await this.catalogoRepository.find({
//       relations: ['catalogos', 'generos'],
//     });
//   }

//   async findOne(id: number): Promise<CatalogoCabecaEntity> {
//     const catalogo = await this.catalogoRepository.findOne({
//       where: { id_catalogo: id },
//       relations: ['catalogos', 'generos'],
//     });
//     if (!catalogo) {
//       throw new HttpException(`Catalogo não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//     return catalogo;
//   }

//   async create(
//     createCatalogoDto: CreateCatalogoDto,
//   ): Promise<CatalogoCabecaEntity> {
//     try {
//       return await this.catalogoRepository.save(
//         this.catalogoRepository.create(createCatalogoDto),
//       );
//     } catch (error) {
//       if (error.code === 'ER_DUP_ENTRY') {
//         throw new HttpException(
//           'Há registros repetidos.',
//           HttpStatus.BAD_REQUEST,
//         );
//       } else {
//         throw new HttpException(
//           'Erro ao criar o registro. Tente novamente mais tarde.',
//           HttpStatus.INTERNAL_SERVER_ERROR,
//         );
//       }
//     }
//   }

//   async update(
//     id: number,
//     updateCatalogoDto: UpdateCatalogoDto,
//   ): Promise<void> {
//     const result = await this.catalogoRepository.update(id, updateCatalogoDto);
//     if (result.affected === 0) {
//       throw new HttpException(`Catalogo não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//   }

//   async delete(id: number): Promise<void> {
//     const result = await this.catalogoRepository.delete(id);
//     if (result.affected === 0) {
//       throw new HttpException(`Catalogo não encontrado.`, HttpStatus.NOT_FOUND);
//     }
//   }
// }
