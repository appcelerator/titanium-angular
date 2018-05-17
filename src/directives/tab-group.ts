import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    TitaniumElement
} from '../vdom';

@Directive({
    selector: 'TabGroup'
})
export class TabGroupDirective {

    private tabGroup: Titanium.UI.TabGroup;

    private _selectedIndex: number;

    private viewInitialized: boolean;

    constructor(el: ElementRef) {
        this.tabGroup = el.nativeElement.titaniumView;
    }

    @Input()
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    get titaniumView(): Titanium.UI.TabGroup {
        return this.tabGroup;
    }

    addTab(tab: TabDirective) {
        this.tabGroup.addTab(tab.titaniumView);
    }

    open() {
        this.tabGroup.open();
    }

}

@Directive({
    selector: 'Tab'
})
export class TabDirective implements OnInit {

    public element: TitaniumElement;

    private tab: Titanium.UI.Tab;

    private owner: TabGroupDirective;

    constructor(el: ElementRef, owner: TabGroupDirective) {
        this.element = el.nativeElement;
        this.tab = <Titanium.UI.Tab>this.element.titaniumView;
        this.owner = owner;
    }

    get titaniumView(): Titanium.UI.Tab {
        return this.tab;
    }

    ngOnInit() {
        const windowElement: TitaniumElement = <TitaniumElement>this.element.firstElementChild;
        if (!windowElement || windowElement.nodeName !== 'Window') {
            throw new Error('The first child of a Tab always must be a Window');
        }
        
        this.tab.setWindow(<Titanium.UI.Window>windowElement.titaniumView);
        this.owner.addTab(this);
    }

}