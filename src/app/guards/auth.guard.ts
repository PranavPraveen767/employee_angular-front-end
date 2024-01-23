import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = () => {
  const authStatus= inject(AuthService)

  if(authStatus.isLogged()){
    return true
  }
  else{
     Swal.fire({
      icon:"info",

       title: 'Login Successfull',
      text:"Please Login"
     });
  }
  return true;
};
