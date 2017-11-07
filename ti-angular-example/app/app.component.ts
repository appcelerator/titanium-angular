import { 
    AfterViewInit,
    Component,
    ViewChild
} from '@angular/core';

import { TabGroupDirective } from 'titanium-angular';

@Component({
    //moduleId: module.id,
    selector: "renderer-test",
    templateUrl: "./renderer-test.html"
})
export class RendererTestComponent implements AfterViewInit {

    @ViewChild(TabGroupDirective) tabGroup: TabGroupDirective;

    ngAfterViewInit() {
        this.tabGroup.open();
    }

    onOpen() {
        console.log('Tab group opened!');
    }

    onLabelClick(event: any) {
        alert(`Label text: ${event.source.text}`);
    }

}