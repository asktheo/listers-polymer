import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
//import { Profile } from './Profile.d.ts';
import './shared-styles.js';
import { Observable } from '../node_modules/rxjs';
import { ajax } from 'rxjs/ajax';

class Checklist extends PolymerElement {

  static get properties () {
    return {
      message: {
        type: String,
        value: ''
      },
      data: {
        type: Object,
        observer: 'getCheckList'
      },
      checklist: {
        type: Array,
        value : [],
      },
      checklist$: {
        type: Observable
      }
    };
  }

  constructor() {
    // If you override the constructor, always call the 
    // superconstructor first.
    super();
    // Resolve warning about scroll performance 
    this.message = 'Checklist: ';
  }
  
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <template is="dom-if" if="[[checklist]]">
          <template is="dom-repeat" items="[[checklist]]">
            <li>[[item.birdName]]</li>
          </template>
        </template>
  </div>
    `;
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
  }

  getCheckList(){
    console.log("routed: ", this.data);
    var url = this.data.checklist === 'wp' ? 'http://localhost:8080/wpchecklist' : 'http://localhost:8080/dkchecklist';
    url += '?profile_id=' + this.data.profile_id;
    this.checklist$ = ajax.getJSON(url);
    this.checklist$
    .subscribe(result => {
      this.checklist = result;
    });
  }
}

window.customElements.define('checklist-view', Checklist);
