import {Component, Input, ViewEncapsulation} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {MessageService} from "primeng/api";
import {Product} from "../../../../shared/model/product";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input()
  product!: Product;

  constructor(private readonly homeService: HomeService, private messageService: MessageService) {
  }

  addProductToCart() {
    this.homeService.addProductToCart(this.product);
  }
}
