import {
  Component,
  computed,
  inject,
  Input,
  input,
  PLATFORM_ID,
  Signal,
} from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WashlistService } from '../../../features/washlist/washlist/services/washlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly washlistService = inject(WashlistService);
  private readonly id = inject(PLATFORM_ID);
  @Input({ required: true }) isLogin!: boolean;

  // countCart!: number;
  // countWashlist!: number;
  countCart: Signal<number> = computed(() =>
    this.cartService.countNumperOfCart()
  );
  countWashlist: Signal<number> = computed(() =>
    this.cartService.countNumperOfWashlist()
  );

  ngOnInit(): void {
    // this.countCart = this.cartService.countNumperOfCart;
    // this.countWashlist = this.cartService.countNumperOfWashlist;
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // this.getCartNumber();
    // this.getWashlistNumber();
    if (isPlatformBrowser(this.id)) {
      this.getAllDataCartNumber();
      this.getAllDataWashlistNumber();
    }
  }

  singOut(): void {
    this.authService.logOut();
  }

  // getCartNumber(): void {
  //   this.cartService.countNumperOfCart.subscribe({
  //     next: (value) => {
  //       this.countCart = value;
  //     },
  //   });
  // }

  // getWashlistNumber(): void {
  //   this.cartService.countNumperOfWashlist.subscribe({
  //     next: (value) => {
  //       this.countWashlist = value;
  //     },
  //   });
  // }

  getAllDataCartNumber(): void {
    this.cartService.getLogedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumperOfCart.set(res.numOfCartItems);
        // this.cartService.countNumperOfCart.next(res.numOfCartItems);
      },
    });
  }
  getAllDataWashlistNumber(): void {
    this.washlistService.getLogedUserWashlist().subscribe({
      next: (res) => {
        this.cartService.countNumperOfWashlist.set(res.data.length);
        // this.cartService.countNumperOfWashlist.next(res.data.length);
      },
    });
  }
}
