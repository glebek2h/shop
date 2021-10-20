import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CatalogState } from '../../state/catalog.state';
import * as OffersActions from '../../state/actions/offers.actions';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as OffersSelectors from '../../state/selectors/offers.selectors';
import * as catalogConstants from '../../catalog.constants';
import { OffersCategories } from '../../state/catalog.models';

@Component({
    selector: 'app-super-offers',
    templateUrl: './super-offers.component.html',
    styleUrls: ['./super-offers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperOffersComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject();

    readonly offers$ = this.store
        .select(OffersSelectors.selectOffers)
        .pipe(takeUntil(this.unsubscribe$));

    readonly isReadyToDisplay$ = this.offers$.pipe(
        map(el => !!el),
        takeUntil(this.unsubscribe$),
    );

    isOpenCategory = false;
    isOpenTab = false;
    indexCategory = 0;
    offerObject: OffersCategories;
    toggleClassForCategory = true;
    toggleClassForTab = false;

    constructor(private readonly store: Store<CatalogState>) {}

    ngOnInit(): void {
        this.store.dispatch(OffersActions.getOffers());
        this.selectCategory(this.indexCategory);
    }

    selectCategory(index: number): void {
        this.indexCategory = index;
        this.toggleClassForCategory = !this.toggleClassForCategory;
        this.isOpenCategory = true;
        this.isOpenTab = false;

        this.offerObject = {
            categoryNames:
                this.categories[this.indexCategory].categories.categoryNames,
            data: this.categories[this.indexCategory].categories.data,
        };
    }

    selectTab(): void {
        this.toggleClassForTab = !this.toggleClassForTab;
        this.isOpenTab = true;
        this.isOpenCategory = false;
    }

    // Temporary solution!!! In the future it will be in data base.

    categories = [
        {
            categoryName: catalogConstants.categoryElectronics,
            icon: catalogConstants.mobileIconPath,
            _id: 1,
            categories: {
                categoryNames: [
                    {
                        name: 'TV and video',
                        _id: '1',
                    },
                ],
                data: [
                    {
                        productName: 'Tv',
                        image: 'https://i.pinimg.com/originals/38/d3/74/38d374dbbf1ed36c52e830224e0cb5cd.png',
                        quantity: '405 products',
                        category: 'TV and video',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 1,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 1,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 1,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 1,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 1,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 1,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryLaptops,
            icon: catalogConstants.laptopIconPath,
            _id: 2,
            categories: {
                categoryNames: [
                    {
                        name: 'Gaming laptops, pc, monitors',
                        _id: '2',
                    },
                ],
                data: [
                    {
                        productName: 'Gaming laptops',
                        image: 'https://dlcdnwebimgs.asus.com/gain/a1059ba2-af08-49df-9e7c-9c12f551c61e/',
                        quantity: '405 products',
                        category: 'Gaming laptops, pc, monitors',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0kWmyLlLDec1FXmaKB90K85ZEy8mZlyFeA&usqp=CAU',
                    link: 'link 1',
                    _id: 2,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0kWmyLlLDec1FXmaKB90K85ZEy8mZlyFeA&usqp=CAU',
                    link: 'link 1',
                    _id: 2,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0kWmyLlLDec1FXmaKB90K85ZEy8mZlyFeA&usqp=CAU',
                    link: 'link 1',
                    _id: 2,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0kWmyLlLDec1FXmaKB90K85ZEy8mZlyFeA&usqp=CAU',
                    link: 'link 1',
                    _id: 2,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0kWmyLlLDec1FXmaKB90K85ZEy8mZlyFeA&usqp=CAU',
                    link: 'link 1',
                    _id: 2,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0kWmyLlLDec1FXmaKB90K85ZEy8mZlyFeA&usqp=CAU',
                    link: 'link 1',
                    _id: 2,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryTechniques,
            icon: catalogConstants.washerIconPath,
            _id: 3,
            categories: {
                categoryNames: [
                    {
                        name: 'Clothing care, sewing',
                        _id: '3',
                    },
                ],
                data: [
                    {
                        productName: 'Iron',
                        image: 'https://i.pinimg.com/originals/72/19/31/721931185e3e96d627e13b593dc60199.png',
                        quantity: '405 products',
                        category: 'Clothing care, sewing',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://vseodetyah.com/editorfiles/lego-rebenok-igraet.jpg',
                    link: 'link 1',
                    _id: 3,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://vseodetyah.com/editorfiles/lego-rebenok-igraet.jpg',
                    link: 'link 1',
                    _id: 3,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://vseodetyah.com/editorfiles/lego-rebenok-igraet.jpg',
                    link: 'link 1',
                    _id: 3,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://vseodetyah.com/editorfiles/lego-rebenok-igraet.jpg',
                    link: 'link 1',
                    _id: 3,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://vseodetyah.com/editorfiles/lego-rebenok-igraet.jpg',
                    link: 'link 1',
                    _id: 3,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://vseodetyah.com/editorfiles/lego-rebenok-igraet.jpg',
                    link: 'link 1',
                    _id: 3,
                },
            ],
        },
        {
            icon: catalogConstants.rollerIconPath,
            categoryName: catalogConstants.categoryRepair,
            _id: 4,
            categories: {
                categoryNames: [
                    {
                        name: 'Doord and windows',
                        _id: '4',
                    },
                ],
                data: [
                    {
                        productName: 'Door',
                        image: 'https://www.transparentpng.com/thumb/door-png/closed-door-png-transparent-images--25.png',
                        quantity: '405 products',
                        category: 'Doord and windows',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/September/obzor-wm-whirlpool-fwsd81283wcv/obzor-wm-whirlpool-fwsd81283wcv-top1-m.png',
                    link: 'link 1',
                    _id: 4,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/September/obzor-wm-whirlpool-fwsd81283wcv/obzor-wm-whirlpool-fwsd81283wcv-top1-m.png',
                    link: 'link 1',
                    _id: 4,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/September/obzor-wm-whirlpool-fwsd81283wcv/obzor-wm-whirlpool-fwsd81283wcv-top1-m.png',
                    link: 'link 1',
                    _id: 4,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/September/obzor-wm-whirlpool-fwsd81283wcv/obzor-wm-whirlpool-fwsd81283wcv-top1-m.png',
                    link: 'link 1',
                    _id: 4,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/September/obzor-wm-whirlpool-fwsd81283wcv/obzor-wm-whirlpool-fwsd81283wcv-top1-m.png',
                    link: 'link 1',
                    _id: 4,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2020/September/obzor-wm-whirlpool-fwsd81283wcv/obzor-wm-whirlpool-fwsd81283wcv-top1-m.png',
                    link: 'link 1',
                    _id: 4,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryHome,
            icon: catalogConstants.homeIconPath,
            _id: 5,
            categories: {
                categoryNames: [
                    {
                        name: 'kitchen utensils',
                        _id: '5',
                    },
                ],
                data: [
                    {
                        productName: 'Teapot',
                        image: 'https://pngimg.com/uploads/kettle/kettle_PNG8713.png',
                        quantity: '405 products',
                        category: 'kitchen utensils',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.festool.ru/-/media/tts/fcp/festool/products/above-the-fold-images/ol_bohren_schrauben/ol_akkubohrschrauber_cxs_txs_c_t_drc_tix/cordless-drill-1180x786.jpg',
                    link: 'link 1',
                    _id: 5,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.festool.ru/-/media/tts/fcp/festool/products/above-the-fold-images/ol_bohren_schrauben/ol_akkubohrschrauber_cxs_txs_c_t_drc_tix/cordless-drill-1180x786.jpg',
                    link: 'link 1',
                    _id: 5,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.festool.ru/-/media/tts/fcp/festool/products/above-the-fold-images/ol_bohren_schrauben/ol_akkubohrschrauber_cxs_txs_c_t_drc_tix/cordless-drill-1180x786.jpg',
                    link: 'link 1',
                    _id: 5,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.festool.ru/-/media/tts/fcp/festool/products/above-the-fold-images/ol_bohren_schrauben/ol_akkubohrschrauber_cxs_txs_c_t_drc_tix/cordless-drill-1180x786.jpg',
                    link: 'link 1',
                    _id: 5,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.festool.ru/-/media/tts/fcp/festool/products/above-the-fold-images/ol_bohren_schrauben/ol_akkubohrschrauber_cxs_txs_c_t_drc_tix/cordless-drill-1180x786.jpg',
                    link: 'link 1',
                    _id: 5,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.festool.ru/-/media/tts/fcp/festool/products/above-the-fold-images/ol_bohren_schrauben/ol_akkubohrschrauber_cxs_txs_c_t_drc_tix/cordless-drill-1180x786.jpg',
                    link: 'link 1',
                    _id: 5,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryCar,
            icon: catalogConstants.carIconPath,
            _id: 6,
            categories: {
                categoryNames: [
                    {
                        name: 'tires and wheels',
                        _id: '6',
                    },
                ],
                data: [
                    {
                        productName: 'Wheels',
                        image: 'https://avtoservis39.ru/upload/iblock/7db/7db57b03b97556565f3b1c7d21d31e73.png',
                        quantity: '405 products',
                        category: 'tires and wheels',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://ormatek.com/upload/resize_webp/products/6df/419/6df4197604ac11e7951c2c768a5115e1/main/680_510_1/6df41976-04ac-11e7-951c-2c768a5115e1_77c3128b-8996-11e7-9579-2c768a5115e1.webp',
                    link: 'link 1',
                    _id: 6,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://ormatek.com/upload/resize_webp/products/6df/419/6df4197604ac11e7951c2c768a5115e1/main/680_510_1/6df41976-04ac-11e7-951c-2c768a5115e1_77c3128b-8996-11e7-9579-2c768a5115e1.webp',
                    link: 'link 1',
                    _id: 6,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://ormatek.com/upload/resize_webp/products/6df/419/6df4197604ac11e7951c2c768a5115e1/main/680_510_1/6df41976-04ac-11e7-951c-2c768a5115e1_77c3128b-8996-11e7-9579-2c768a5115e1.webp',
                    link: 'link 1',
                    _id: 6,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://ormatek.com/upload/resize_webp/products/6df/419/6df4197604ac11e7951c2c768a5115e1/main/680_510_1/6df41976-04ac-11e7-951c-2c768a5115e1_77c3128b-8996-11e7-9579-2c768a5115e1.webp',
                    link: 'link 1',
                    _id: 6,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://ormatek.com/upload/resize_webp/products/6df/419/6df4197604ac11e7951c2c768a5115e1/main/680_510_1/6df41976-04ac-11e7-951c-2c768a5115e1_77c3128b-8996-11e7-9579-2c768a5115e1.webp',
                    link: 'link 1',
                    _id: 6,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://ormatek.com/upload/resize_webp/products/6df/419/6df4197604ac11e7951c2c768a5115e1/main/680_510_1/6df41976-04ac-11e7-951c-2c768a5115e1_77c3128b-8996-11e7-9579-2c768a5115e1.webp',
                    link: 'link 1',
                    _id: 6,
                },
            ],
        },
        {
            categoryName: catalogConstants.categorySport,
            icon: catalogConstants.bicycleIconPath,
            _id: 7,
            categories: {
                categoryNames: [
                    {
                        name: 'hiking and camping',
                        _id: '7',
                    },
                ],
                data: [
                    {
                        productName: 'Tent',
                        image: 'https://www.pngall.com/wp-content/uploads/2018/03/Camp-PNG-Photo.png',
                        quantity: '405 products',
                        category: 'hiking and camping',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 7,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 7,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 7,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 7,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 7,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://www.ortix.ru/upload/resize_cache/iblock/1f8/600_300_2/1f888fcc5fa63347a309766abed44e2d.jpg',
                    link: 'link 1',
                    _id: 7,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryChildren,
            icon: catalogConstants.strollerIconPath,
            _id: 8,
            categories: {
                categoryNames: [
                    {
                        name: "children's furniture",
                        _id: '8',
                    },
                ],
                data: [
                    {
                        productName: 'Oil heaters',
                        image: 'https://lh3.googleusercontent.com/proxy/dVGMzJb9vPWDtdhsaQf2AFnk5L6sacuwJ3lO6kLh8jIUYVWr4vtqdxKo-0m87QnFlM-y8TlQpZKJVZkVg7OmDelP1dzFH9HMXyYWUBpXuHSvrATQyvunObyepSj7M2Z8HQ',
                        quantity: '405 products',
                        category: "children's furniture",
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://stroy-podskazka.ru/images/article/croppedtop/718-400/2019/07/maslyanye-obogrevateli-obzor-vidov-sovety-po-vyboru-i-ekspluatacii-73.jpg',
                    link: 'link 1',
                    _id: 8,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://stroy-podskazka.ru/images/article/croppedtop/718-400/2019/07/maslyanye-obogrevateli-obzor-vidov-sovety-po-vyboru-i-ekspluatacii-73.jpg',
                    link: 'link 1',
                    _id: 8,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://stroy-podskazka.ru/images/article/croppedtop/718-400/2019/07/maslyanye-obogrevateli-obzor-vidov-sovety-po-vyboru-i-ekspluatacii-73.jpg',
                    link: 'link 1',
                    _id: 8,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://stroy-podskazka.ru/images/article/croppedtop/718-400/2019/07/maslyanye-obogrevateli-obzor-vidov-sovety-po-vyboru-i-ekspluatacii-73.jpg',
                    link: 'link 1',
                    _id: 8,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://stroy-podskazka.ru/images/article/croppedtop/718-400/2019/07/maslyanye-obogrevateli-obzor-vidov-sovety-po-vyboru-i-ekspluatacii-73.jpg',
                    link: 'link 1',
                    _id: 8,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://stroy-podskazka.ru/images/article/croppedtop/718-400/2019/07/maslyanye-obogrevateli-obzor-vidov-sovety-po-vyboru-i-ekspluatacii-73.jpg',
                    link: 'link 1',
                    _id: 8,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryOffice,
            icon: catalogConstants.chairIconPath,
            _id: 9,
            categories: {
                categoryNames: [
                    {
                        name: 'trade and finance',
                        _id: '9',
                    },
                ],
                data: [
                    {
                        productName: 'cash register',
                        image: 'https://www.askkt.ru/upload/iblock/b6b/b6b0a594f33d0d941f87339a09af1d3d.png',
                        quantity: '405 products',
                        category: 'trade and finance',
                    },
                ],
            },

            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://feflues.ru/upload/medialibrary/bb4/bb4372bd9ab93962b0b81fe4bfc0ea23.jpg',
                    link: 'link 1',
                    _id: 9,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://feflues.ru/upload/medialibrary/bb4/bb4372bd9ab93962b0b81fe4bfc0ea23.jpg',
                    link: 'link 1',
                    _id: 9,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://feflues.ru/upload/medialibrary/bb4/bb4372bd9ab93962b0b81fe4bfc0ea23.jpg',
                    link: 'link 1',
                    _id: 9,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://feflues.ru/upload/medialibrary/bb4/bb4372bd9ab93962b0b81fe4bfc0ea23.jpg',
                    link: 'link 1',
                    _id: 9,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://feflues.ru/upload/medialibrary/bb4/bb4372bd9ab93962b0b81fe4bfc0ea23.jpg',
                    link: 'link 1',
                    _id: 9,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://feflues.ru/upload/medialibrary/bb4/bb4372bd9ab93962b0b81fe4bfc0ea23.jpg',
                    link: 'link 1',
                    _id: 9,
                },
            ],
        },
        {
            categoryName: catalogConstants.categoryFood,
            icon: catalogConstants.dishIconPath,
            _id: 10,
            categories: {
                categoryNames: [
                    {
                        name: 'farm products',
                        _id: '10',
                    },
                ],
                data: [
                    {
                        productName: 'honey barrel',
                        image: 'https://p4elovod.ru/upload/iblock/c0a/c0ad807709817567d089fc1dd24d4337.png',
                        quantity: '405 products',
                        category: 'farm products',
                    },
                ],
            },
            promos: [
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://remstroiblog.ru/wp-content/uploads/pled-2.jpg',
                    link: 'link 1',
                    _id: 10,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://remstroiblog.ru/wp-content/uploads/pled-2.jpg',
                    link: 'link 1',
                    _id: 10,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://remstroiblog.ru/wp-content/uploads/pled-2.jpg',
                    link: 'link 1',
                    _id: 10,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://remstroiblog.ru/wp-content/uploads/pled-2.jpg',
                    link: 'link 1',
                    _id: 10,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://remstroiblog.ru/wp-content/uploads/pled-2.jpg',
                    link: 'link 1',
                    _id: 10,
                },
                {
                    title: 'ElectroHeating',
                    subTitle: 'discounted prices',
                    image: 'https://remstroiblog.ru/wp-content/uploads/pled-2.jpg',
                    link: 'link 1',
                    _id: 10,
                },
            ],
        },
    ];

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
