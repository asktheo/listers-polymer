/**
 * @license
 * Copyright (c) 2018 Netfugl
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
//import { Profile } from './Profile.d.ts';
import './shared-styles.js';

class Profiles extends PolymerElement {

  static get properties () {
    return {
      message: {
        type: String,
        value: ''
      },
      loadComplete: {
        type: Boolean,
        value: false
      },
      profiles: {
        type: Array,
        value: [],
        observer: 'getUsers'
      },
      profiles$: {
        type: Observable
      }
    };
  }

  constructor() {
    // If you override the constructor, always call the 
    // superconstructor first.
    super();
    // Resolve warning about scroll performance 
    this.message = 'Netfugl profiles';
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
  }
  
  getUsers(){

    if(!this.loadComplete) {
      this.profiles$ = ajax.getJSON('http://localhost:8080/netfugl/profiles');
      this.profiles$
      //.map(res => res.json())
      .subscribe(result => {
        this.profiles = result;
        this.loadComplete = true;
      });
    }
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
        <h1>[[message]]</h1>
        <ul>
        <template is="dom-repeat" items="[[profiles]]">
            <li><a href="[[rootPath]]profile/[[item.profileId]]">[[item.firstName]] [[item.lastName]]</a> - <a href="[[rootPath]]checklist/[[item.profileId]]/wp">WPlist</a></li>
        </template>
        </ul>

      </div>
    `;
    
  }
}

window.customElements.define('profiles-view', Profiles);
