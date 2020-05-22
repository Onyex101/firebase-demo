import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(
    public authService: AuthService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    let n = Date.now();
    console.log(event);
    const file = event.target.files[0];
    console.log(file);
    const filePath = `${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`${n}`, file);
    console.log(task);
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
