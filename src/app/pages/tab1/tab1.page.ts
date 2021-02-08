import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { JobService } from 'src/app/services/user/job.service';
import { JobPage } from './job/job.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listJobs:any = [];
  
  constructor(public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private routerOutlet: IonRouterOutlet,
    private serivce: JobService) {
      this.loadPage();
    }
    
    async loadPage() {
      this.listJobs = [];
      
      const loading = await this.loadingController.create({
        message: 'Buscando dados...'
      });
      loading.present();
      
      this.serivce.getAll().subscribe((res) => {
        this.loadingController.dismiss();
        this.listJobs = res;
      }, err => {
        console.log(err);
        this.loadingController.dismiss();
        this.toast('Tente novamente mais tarde', 'danger');
      });
      
    }
    
    async delete(id:number) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Confirmação',
        subHeader: 'Tem certeza que deseja deletar esta tarefa?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
          }, {
            text: 'Sim',
            handler: () => {
              this.serivce.delete(id).subscribe((res) => {
                console.log(res);
                this.loadPage();
              }, err => {
                console.log(err);
                this.toast('Tente novamente mais tarde', 'danger');
              });
            }
          }
        ]
      });
      
      await alert.present();
    }
    
    async changeStatus(job:any) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Confirmação',
        subHeader: 'Tem certeza que deseja alterar o status desta tarefa?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
          }, {
            text: 'Sim',
            handler: () => {
              this.serivce.updateStatus(job).subscribe((res) => {
                console.log(res);
                this.loadPage();
              }, err => {
                console.log(err);
                this.toast('Tente novamente mais tarde', 'danger');
              });
            }
          }
        ]
      });
      
      await alert.present();
    }
    
    async openModal(job: any) {
      const modal = await this.modalController.create({
        component: JobPage,
        mode: 'ios',
        cssClass: 'job-modal',
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: {
          'job': job
        }
      });
      
      modal.onDidDismiss().then(() => {
        this.loadPage();
      });
      return await modal.present();
    }
    
    doRefresh(event) {
      setTimeout(() => {
        this.loadPage()
        event.target.complete();
      }, 2000);
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
  