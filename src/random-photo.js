/**
 * @license
 * Copyright (c) 2018 Netfugl
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class RandomPhoto extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles.js">
    #random-image {
      padding-top: 8px;
      height:70px;
      width:100%;
      background:radial-gradient(white,#e8e7be);
    }
   </style>

      <div id="random-image">
      <!-- replace with script for random image-->
      <center><img src="http://www.netfugl.dk/pictures/birds_user_uploads/small_pic/14550_UU_1139_Juv---med-krager-3.jpg" style="width:auto;height:62px"/></center>
      <!--replace end -->
      </div>
    `;
  }
}

window.customElements.define('random-photo', RandomPhoto);
