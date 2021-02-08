import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { JobService } from 'src/app/services/user/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  type:string = 'Nova ';
  job:any = {
    id: 0,
    title: '',
    description: '',
    status: false
  }
  
  constructor(public modalController: ModalController, 
    public toastController: ToastController,
    private service: JobService) { }
    
    ngOnInit() {
      if(this.job.id > 0){
        this.type = 'Editar ';
      } else {
        this.job = {
          id: 0,
          title: '',
          description: '',
          status: false
        }
      }
    }
    
    send(){
      if(this.job.id == 0){
        this.service.create(this.job).subscribe((res) => {
          this.toast('Dados salvos', 'dark');
          this.modalController.dismiss();
        }, err => {
          console.log(err);
          this.toast('Tente novamente mais tarde', 'danger');
        });
      } else {
        this.service.update(this.job).subscribe((res) => {
          this.toast('Dados salvos', 'dark');
          this.modalController.dismiss();
        }, err => {
          console.log(err);
          this.toast('Tente novamente mais tarde', 'danger');
        });
      }
    }
    
    async toast(msg:string, type:string) {
      const toast = await this.toastController.create({
        message: msg,
        color: type,
        position: 'middle',
        duration: 2000
      });
      toast.present();
    }
  }
  