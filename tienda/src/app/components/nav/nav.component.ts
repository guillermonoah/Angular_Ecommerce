import { Component,OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  public token:any;
  public id:any;
  public user : any = undefined;
  public user_lc : any = undefined;

  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ){
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id'); 

    console.log(this.user_lc);

    if (this.token) {
      this._clienteService.obtener_cliente_guest( this.id,this.token).subscribe(
        response=>{
          this.user= response.data;
          localStorage.setItem('user_data',JSON.stringify(this.user));            
          if(localStorage.getItem('user_data')){
            this.user_lc = JSON.parse(localStorage.getItem('user_data')!);
          }else{
            this.user_lc = undefined;
          }
        },error=>{
          console.log(error);                  
          this.user= undefined;
        }
      );
    }
  }

  ngOnInit(): void {
    
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
