/**
 * @license
 * Copyright (c) 2018 Netfugl
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class FrontView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
      <img src="http://www.netfugl.dk/pictures/banners/other/Flyway2016_banner_01.jpg" height="232" width="900" alt="Champions of the Flyway" border="0">
      </div>
    `;
  }
}

window.customElements.define('front-view', FrontView);
