import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
//import { Profile } from './Profile.d.ts';
import './shared-styles.js';
import { Observable } from '../node_modules/rxjs';
import { ajax } from 'rxjs/ajax';
import './checklist-view.js';

class Profile extends PolymerElement {

  static get properties () {
    return {
      message: {
        type: String,
        value: ''
      },
      data: {
        type: Number,
        observer: 'getUser'
      },
      profile: {
        type: Object,
        value : {},
      },
      imagesrc: {
        type: String,
        value: ''
      },
      profileImage: {
        type : Boolean,
        value : true
      },
      contactInfo: {
        type : Object,
        value : {}
      },
      checklists: {
        type: Array,
        value : []
      },       
      profile$: {
        type: Observable
      }
    };
  }

  constructor() {
    // If you override the constructor, always call the 
    // superconstructor first.
    super();
    // Resolve warning about scroll performance 
    this.message = 'Netfugl profil: ';
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
      <template is="dom-if" if="[[profile]]">
        <h1>[[message]]</h1>
        <div>[[profile.firstName]] [[profile.lastName]] - [[profile.initials]] - b.[[profile.yearOfBirth]]</div>
          <template is="dom-if" if="[[profileImage]]">
            <span id="profileimage">
              <img src="[[imagesrc]]" style="width:100%;max-width:500px;height:auto" />
            </span>
          </template>
          <table>
            <template is="dom-if" if="[[profile.nickName]]">
                <tr>
                    <td>Nick name: </td>
                    <td>[[profile.nickName]]</td>
                </tr>
            </template>
            <template is="dom-if" if="[[profile.description]]">
                <tr>
                    <td>About Me: </td>
                    <td>[[profile.description]]</td>
                </tr>
            </template>
            <template is="dom-if" if="[[profile.work]]">
                <tr>
                    <td>Work: </td>
                    <td>[[profile.work]]</td>
                </tr>
            </template>
            <template is="dom-if" if="[[profile.dreamBirds]]">
                <tr>
                    <td>Dream birds: </td>
                    <td>[[profile.dreamBirds]]</td>
                </tr>
            </template>
          </table>
          <ul>
          <template is="dom-repeat" items="[[profile.accessories]]">
              <li><b>[[item.type]] : </b> [[item.desc]]</a></li>
          </template>
          </ul>
          <div style="border:1px solid #eee">
          <template is="dom-if" if="[[contactInfo.postalAddress]]">
          <div><span>postalAddress: </span><span>[[contactInfo.postalAddress]]</span><div>
          </template>
          <template is="dom-if" if="[[contactInfo.address2]]">
          <div><span>address2: </span><span>[[contactInfo.address2]]</span><div>
          </template>     
          <template is="dom-if" if="[[contactInfo.postalCode]]">
          <div><span>postalCode: </span><span>[[contactInfo.postalCode]] [[contactInfo.postalDistrict]]</span><div>
          </template>
          <template is="dom-if" if="[[contactInfo.country]]">
          <div><span>country: </span><span>[[contactInfo.country]]</span><div>
          </template>
          <template is="dom-if" if="[[contactInfo.mobilephone]]">
          <div><span>mobilephone: </span><span>[[contactInfo.mobilephone]]</span><div>
          </template>
          <template is="dom-if" if="[[contactInfo.email]]">
          <div><span>email: </span><span>[[contactInfo.email]]</span><div>
          </template>
          </div>
          <template is="dom-repeat" items="[[checklists]]">
          <checklist-view data="[[item]]"></checklist-view>
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

  getUser(){
    this.profile$ = ajax.getJSON('http://localhost:8080/profile?id=' + this.data);
    this.profile$
    .subscribe(result => {
      this.profile = result;
      var nZeros = 6 - this.profile.profileId.toString().length;
      var zeros = '';
      var zero = '0';
      for(var i=0;i<nZeros;i++){
        zeros += zero;
      }
      this.imagesrc = 'http://www.netfugl.dk/pictures/profile_pictures/profile_picture_' + zeros + this.profile.profileId + '.jpg';
      this.contactInfo = this.profile.contactInfo;
      this.checklists = [{ profile_id : this.profile.profileId, checklist : 'wp'},
        { profile_id : this.profile.profileId, checklist : 'dk'}] ;
      // ajax.get(this.imagesrc).subscribe().error(function(error){
      //  this.profileImage = false;
      // });
    });
  }
}

window.customElements.define('profile-view', Profile);
