import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {UUID} from 'angular2-uuid';
import UploadTask = firebase.storage.UploadTask;
import {FirebaseAuthService} from './auth/firebase-auth.service';


@Injectable()
export abstract class FirebaseDatabaseService<ItemClass> {

  abstract basePath: string;

  protected storageRef = firebase.storage().ref();
  items: FirebaseListObservable<ItemClass[]> = null; //  list of objects
  item: FirebaseObjectObservable<ItemClass> = null; //   single



  constructor(protected db: AngularFireDatabase) { }

  protected getTimeStamp(): any {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  getItemsList(query = {}): FirebaseListObservable<ItemClass[]> {
    this.items = this.db.list(this.basePath, {
      query: query
    });
    return this.items;
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<ItemClass> {
    const itemPath =  `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath);
    return this.item;
  }
  createItem(item: ItemClass): FirebaseObjectObservable<ItemClass>  {
    if (!this.items) {
      this.getItemsList();
    }
    return this.items.push(item)
      .catch(error => this.handleError(error));
  }
  // Update an existing item
  updateItem(key: string, value: any): void {
    if (!this.items) {
      this.getItemsList();
    }
    this.items.update(key, value)
      .catch(error => this.handleError(error));
  }
  // Deletes a single item
  deleteItem(key: string): void {
    if (!this.items) {
      this.getItemsList();
    }
    this.items.remove(key)
      .catch(error => this.handleError(error));
  }
  // Deletes the entire list of items
  // deleteAll(): void {
  //   this.items.remove()
  //     .catch(error => this.handleError(error));
  // }
  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }

  createBase64Image(image, folder: string): UploadTask {
    const first = image.indexOf(':image/') + ':image/'.length;
    const last = image.indexOf(';base64');

    const format = image.substring(first, last);
    const storageRef = firebase.storage().ref();
    const selectedFile = image;
    const image_name = UUID.UUID() + '.' + format;
    const image_path = `/${folder}/${image_name}`;
    const iRef = storageRef.child(image_path);
    return iRef.putString(selectedFile, 'data_url');
  }
}
