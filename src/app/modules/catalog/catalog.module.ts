import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/shared/utils/utils';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { SuperOffersComponent } from './components/super-offers/super-offers.component';
import { PopularLinksComponent } from './components/popular-links/popular-links.component';
import { CatalogPromotionComponent } from './components/catalog-promotion/catalog-promotion.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOffers from './state/reducers/offers.reducer';
import * as fromLinks from './state/reducers/links.reducer';
import * as fromPromotions from './state/reducers/promotions.reducer';
import { OfferEffects } from './state/effects/offers.effects';
import { LinksEffects } from './state/effects/links.effects';
import { PromotionsEffects } from './state/effects/promotions.effects';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        CatalogComponent,
        CategoriesComponent,
        SuperOffersComponent,
        PopularLinksComponent,
        CatalogPromotionComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTabsModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        CatalogRoutingModule,
        StoreModule.forFeature(fromOffers.offersFeatureKey, fromOffers.reducer),
        StoreModule.forFeature(fromLinks.linksFeatureKey, fromLinks.reducer),
        StoreModule.forFeature(
            fromPromotions.promotionsFeatureKey,
            fromPromotions.reducer,
        ),
        EffectsModule.forFeature([
            OfferEffects,
            LinksEffects,
            PromotionsEffects,
        ]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
    exports: [CatalogComponent],
})
export class CatalogModule {}
