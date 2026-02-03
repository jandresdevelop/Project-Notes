import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepo.find();
  }

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.preload({
      id,
      ...dto,
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const result = await this.categoryRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("Category not found");
    }

    return { deleted: true };
  }
}
