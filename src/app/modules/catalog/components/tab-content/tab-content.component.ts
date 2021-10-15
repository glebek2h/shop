import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import * as Models from '../../state/catalog.models';

@Component({
    selector: 'app-tab-content',
    templateUrl: './tab-content.component.html',
    styleUrls: ['./tab-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent implements OnInit, AfterViewInit {
    @Input() offersData: Models.OffersCategories;
    @Input() offersPromos: Array<Models.PromosData>;
    @ViewChild('overlay') overlay: { nativeElement: string };

    categories: Array<Models.CategoryName>;
    data: Array<Models.CategoriesData>;
    filteredData: Array<Models.CategoriesData>;

    private element: { nativeElement: string };

    constructor(private readonly renderer: Renderer2) {}

    ngOnInit(): void {
        this.categories = this.offersData.categoryNames;
        this.data = this.offersData.data;
    }

    ngAfterViewInit(): void {
        this.element = this.overlay;
    }

    addClass(className: string, element: { nativeElement: string }) {
        this.renderer.addClass(element.nativeElement, className);
    }

    removeClass(className: string, element: { nativeElement: string }) {
        this.renderer.removeClass(element.nativeElement, className);
    }

    closeOverlay(event: {
        srcElement: { classList: { contains: (arg0: string) => string } };
    }) {
        if (event.srcElement.classList.contains('overlay-close')) {
            this.removeClass('active', this.element);
        }
    }

    onHover(event: { target: { innerText: string } }) {
        const mouseTarget = event.target.innerText;
        this.filteredData = this.data.filter(el => mouseTarget === el.category);
        this.addClass('active', this.element);
    }

    ngOnDestroy(): void {}
}
