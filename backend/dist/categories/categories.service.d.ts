import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoriesService {
    private categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    create(dto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
