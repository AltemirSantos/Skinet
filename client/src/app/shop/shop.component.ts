import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParam = new ShopParams();
  totalCount = 0;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParam).subscribe(response => {
      this.products = response.data;
      this.shopParam.pageNumber = response.pageIndex;
      this.shopParam.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
        console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParam.brandId = brandId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParam.typeId = typeId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParam.sort = sort;
    this.getProducts();
  }

  onPageChange(event: any) {
    if (this.shopParam.pageNumber !== event) {
      this.shopParam.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParam.search = this.searchTerm.nativeElement.value;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParam = new ShopParams();
    this.getProducts();
  }
}
