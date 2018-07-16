/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
//import { Profile } from './Profile.d.ts';
import './shared-styles.js';

class Profile extends PolymerElement {

  static get properties () {
    return {
      message: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    // If you override the constructor, always call the 
    // superconstructor first.
    super();
    // Resolve warning about scroll performance 
    this.message = 'Netfugl profil ...';
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
        <div>
      </div>
    `;
    
  }
}

window.customElements.define('profile-view', Profile);
